#!/usr/bin/env groovy
import ru.sbrf.ufs.pipeline.Const

/**
 * Пайплайн для публикации артефактов репозитория sbbol-web-library
 */
@Library(['ufs-jobs@master']) _
def ufsCredential = 'ID-CAB-SA-DCBSWT-jenkins'

String VERSION
String REPO_HASH

pipeline {
    agent {
        label 'linux'
    }
    parameters {
        booleanParam(name: 'checkmarx', description: 'Опция SAST для quality gate', defaultValue: false)
        booleanParam(name: 'publish', description: 'Опция публикации пакета', defaultValue: true)
        choice(name: 'segment', description: 'Выберите сегмент', choices:['same', 'major', 'minor', 'patch'])
        choice(name: 'tagName', description: 'Выберите тег', choices:['alpha', 'beta', 'rc', 'hotfix', 'empty'])
        string(name: 'branch', defaultValue: 'release-7.0')
    }
    options {
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }
    environment {
        GIT_PROJECT = 'CIBUFS'
        GIT_REPOSITORY = 'sbbol-web-library'
        NPM_AUTH_TOKEN = credentials('ID-CAB-SA-DCBSWT-jenkins-npm')
    }
    stages {
        stage('Init') {
            steps {
                script {
                    currentBuild.displayName += " (${env.NODE_NAME})"
                    currentBuild.getChangeSets().clear()
                    sh 'mkdir -p npmjs'
                    docker.withRegistry(Const.OPENSHIFT_REGISTRY, ufsCredential) {
                        sh "docker run -d --name node " +
                                "-e NPM_CONFIG_USERCONFIG=/.npm " +
                                "-v ${pwd()}/sbbol-web-library:/sbbol-web-library " +
                                "registry.sigma.sbrf.ru/ci00149046/ci00405008_sbbolufs/node:12-alpine sh -c \"trap : TERM INT; sleep infinity\""
                    }
                }
            }
        }
        stage('Checkout branch') {
            steps {
                script {
                    dir("sbbol-web-library") {
                        REPO_HASH = git.checkoutRef "bitbucket-dbo-key", GIT_PROJECT, GIT_REPOSITORY, "${params.branch}"
                        print "Initial commit hash: " + REPO_HASH
                    }
                }
            }
        }
        stage('UpVersion') {
            steps {
                script {
                    // запуск скрипта поднятия версии
                    dockerExec(container: 'node', cmd: "cd /sbbol-web-library;npm run updatePackageVersion -- \"-${params.segment} -${params.tagName}\"")

                    // проставляем VERSION
                    dir("sbbol-web-library") {
                        def packageJSON = readJSON file:'package.json'
                        VERSION = packageJSON.version
                        currentBuild.displayName += " ${VERSION}"
                    }
                }
            }
        }
        stage('Checkmarx') {
            steps {
                script {
                    if (params.checkmarx) {
                        echo "Checkmarx code analyze stage"

                        dir('sbbol-web-library') {
                            def devsecopsConfig = readYaml(file: 'jenkins/chechmarx-config.yml')
                            def repoUrl = "${Const.BITBUCKET_SERVER_INSTANCE_URL}/scm/cibufs/sbbol-web-library.git"

                            library('ru.sbrf.devsecops@master')
                            runOSS(devsecopsConfig, repoUrl, "${params.branch}/sbbol-web-library", REPO_HASH)
                            runSastCx(devsecopsConfig, repoUrl, "${params.branch}/sbbol-web-library", REPO_HASH)
                            def QGstatus = getOSSQGFlag(REPO_HASH)
                            println("OSS_RUN:${QGstatus.OSS_RUN} OSS_PASS:${QGstatus.OSS_PASS} OSS_HIGH_PASS:${QGstatus.OSS_HIGH_PASS} OSS_MEDIUM_PASS:${QGstatus.OSS_MEDIUM_PASS}")
                        }
                    }
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    if(params.publish){
                        // подготовка авторизации
                        dockerExec(container: 'node', cmd: "echo _auth=${NPM_AUTH_TOKEN} >> /sbbol-web-library/.npmrc")

                        // публикация
                        dockerExec(container: 'node', cmd: "cd /sbbol-web-library;npm run build-publish")

                        // проставляем git-tag
                        dir("sbbol-web-library") {
                            gitCommitAndPush("CIBUFS", "sbbol-web-library", "${params.branch}", "Update package.json version ${VERSION}", "${VERSION}")
                        }
                    }
                }
            }
        }
    }
    post {
        cleanup {
            cleanWs()
            sh "docker rm -f node"
        }
    }
}

/**
 * Коммит и пуш в git.
 * @param project - проект
 * @param repository - репозиторий
 * @param branch - ветка в которую коммитем
 * @param message - текст коммита
 * @param tag - текст tag для коммита
 */
def gitCommitAndPush(
    String project,
    String repository,
    String branch,
    String message,
    String tag
) {
    sshagent(credentials: ['bitbucket-dbo-key']) {

        sh 'git add package.json'
        sh "git commit -m '${message}'"
        sh "GIT_SSH_COMMAND='ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no' " +
            "git fetch ${BITBUCKET_SERVER_URL}/${project}/${repository}.git " +
            "${branch} -q"
        sh 'git checkout FETCH_HEAD'
        sh 'git merge HEAD@{1} --no-ff --no-commit'
        script {
            def conflictedFiles = sh script: 'git ls-files -u', returnStdout: true
            if (conflictedFiles.length() > 0) {
                error "There are conflicts\n$conflictedFiles"
            }
        }
        sh 'git add package.json'
        sh "git commit -m '${message}'"

        //  Проставляем git-тег.
        sh "git tag ${tag}"

        sh "GIT_SSH_COMMAND='ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no' " +
            "git push --atomic ${BITBUCKET_SERVER_URL}/${project}/${repository}.git " +
            "HEAD:${branch} ${tag}"
    }
}

def dockerExec(Map params) {
    def result = sh(
            script: "cd ${WORKSPACE}; docker exec ${params.container} sh -c '" + "${params.cmd}" + "'",
            returnStdout: params.returnStdout ? true : false)
    return result != null ? result.trim() : ''
}
