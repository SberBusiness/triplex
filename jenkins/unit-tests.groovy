#!/usr/bin/env groovy
/* groovylint-disable LineLength */
import ru.sbrf.ufs.pipeline.Const

/**
 * Пайплайн для прогона тестов unit тестирования компонентов @sbbol/web-library.
 */
@Library(['ufs-jobs@master']) _

def ufsCredential = 'ID-CAB-SA-DCBSWT-jenkins'

void waitContainer(String containedId) {
    retryWithInterval(100, 1) {
        def state = sh(returnStdout: true, script: "docker inspect --format '{{.State.Health.Status}}' ${containedId}").trim()
        if(state != 'healthy') {
            error("Container state is ${state}")
        }
    }
}

containers = []
network = ''
launch = null
pullRequest = null

pipeline {
    /**
     * Базовый вариант CI пайплайна
     */
    agent {
        label 'ufs-pr-check'
    }
    parameters {
        string(name: 'pullRequestId', description: 'ID пулл-реквеста')
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    environment {
        GIT_REPOSITORY = 'sbbol-web-library'
        GIT_PROJECT = 'CIBUFS'
        PR_CHECK_LABEL = 'unit_tests'
        NPM_AUTH_TOKEN = credentials('ID-CAB-SA-DCBSWT-jenkins-npm')
    }

    stages {
        stage('Init') {
            steps {
                script {
                    launch = allureServer.launch(projectId: '4')
                    pullRequest = bitbucket.getPullRequest(ufsCredential, GIT_PROJECT, GIT_REPOSITORY, params.pullRequestId.toInteger())
                    setJobPullRequestLink(pullRequest)
                    env.BRANCH_NAME = pullRequest.fromRef.displayId
                    bitbucket.setBuildStatus(ufsCredential, 'INPROGRESS', PR_CHECK_LABEL, pullRequest.fromRef.latestCommit)
                    bitbucket.setJenkinsLabelInfo(
                            ufsCredential,
                            GIT_PROJECT,
                            GIT_REPOSITORY,
                            params.pullRequestId,
                            PR_CHECK_LABEL)
                }
            }
        }
        stage('Prepare project') {
            steps {
                script {
                    git.checkoutRef 'bitbucket-dbo-key', GIT_PROJECT, GIT_REPOSITORY, "${pullRequest.fromRef.displayId}:${pullRequest.fromRef.displayId} ${pullRequest.toRef.displayId}:${pullRequest.toRef.displayId}"
                    sh "git merge ${pullRequest.toRef.displayId}"
                }
            }
        }
        stage('Compile and Check') {
            steps {
                script {
                    launch.upload(["tests/out/unit/allure/allure-results"]) {
                        docker.withRegistry(Const.OPENSHIFT_REGISTRY, ufsCredential) {
                            sh("echo _auth=${NPM_AUTH_TOKEN} >> .npmrc")
                            sh returnStdout: true, script: 'docker run --rm ' +
                                    '-v "$(pwd)":/sbbol-web-library ' +
                                    '-v "$(pwd)"/../.npm:/.npm ' +
                                    '-w /sbbol-web-library ' +
                                    '-e NPM_CONFIG_USERCONFIG=/.npm ' +
                                    '-e "npm_config_cache=/.npm" ' +
                                    'registry.sigma.sbrf.ru/ci00149046/ci00405008_sbbolufs/node:12-alpine ' +
                                    '/bin/sh -c "npm install && npm run test:unit"'
                        }
                    }
                }
            }
        }

    }
    post {
        success {
            script {
                bitbucket.setBuildStatus(ufsCredential, 'SUCCESSFUL', PR_CHECK_LABEL, pullRequest.fromRef.latestCommit)
                bitbucket.setJenkinsLabelStatus(
                        ufsCredential,
                        GIT_PROJECT,
                        GIT_REPOSITORY,
                        params.pullRequestId,
                        PR_CHECK_LABEL,
                        true)
            }
        }
        failure {
            script {
                bitbucket.setBuildStatus(ufsCredential, 'FAILED', PR_CHECK_LABEL, pullRequest.fromRef.latestCommit)
            }
        }
        always {
            script {
                addArchiveArtifacts('tests/out/unit/allure/allure-results')
                // allure results: [[path: "tests/out/unit/allure/allure-results/**"]]
            }
        }
        cleanup {
            cleanWs()
        }
    }
}
