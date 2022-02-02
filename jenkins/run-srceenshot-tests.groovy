#!/usr/bin/env groovy
/* groovylint-disable LineLength */
import ru.sbrf.ufs.pipeline.Const

/**
 * Пайплайн для прогона тестов скриншотного тестирования компонентов @sbbol/web-library.
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
        PR_CHECK_LABEL = 'screenshot_tests'
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
                    launch.upload(["tests/out/screenshot/allure/allure-results"]) {
                        sh("echo _auth=${NPM_AUTH_TOKEN} >> .npmrc")

                        docker.withRegistry(Const.OPENSHIFT_REGISTRY, ufsCredential) {

                            network = UUID.randomUUID()
                            sh(returnStdout: true, script: "docker network create ${network}")
                            def styleguidistContainer = docker.build('styleguidist-local')
                                    .run("--rm --network ${network} --network-alias styleguidist " +
                                            "--health-cmd 'curl -s localhost > /dev/null' --health-interval 100ms")
                            containers.add(styleguidistContainer.id)

                            waitContainer(styleguidistContainer.id)

                            def screenshotContainer = docker.image("registry.sigma.sbrf.ru/dev/ci00149046/ci00405008_sbbol-dev/screenshot-testing:1.2.0")
                                    .run("--rm --network ${network} --network-alias screenshot-service " +
                                            "--health-cmd 'wget -q localhost:58002 -O /dev/null' --health-interval 100ms")

                            containers.add(screenshotContainer.id)
                            waitContainer(screenshotContainer.id)

                            sh returnStdout: true, script: 'docker run --rm ' +
                                    "--network ${network} " +
                                    '-v "$(pwd)":/sbbol-web-library ' +
                                    '-v "$(pwd)"/../.npm:/.npm ' +
                                    '-w /sbbol-web-library ' +
                                    '-e NPM_CONFIG_USERCONFIG=/.npm ' +
                                    '-e "npm_config_cache=/.npm" ' +
                                    '-e STYLEGUIDIST_HOST=styleguidist ' +
                                    "-e STYLEGUIDIST_PORT=80 " +
                                    '-e SCREENSHOT_SERVICE_HOST=screenshot-service ' +
                                    "-e SCREENSHOT_SERVICE_PORT=58002 " +
                                    'registry.sigma.sbrf.ru/ci00149046/ci00405008_sbbolufs/node:12-alpine ' +
                                    '/bin/sh -c "npm install && npm run test:screenshot"'
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
                addArchiveArtifacts('tests/out/screenshot/allure/allure-results')
                // allure results: [[path: "tests/out/screenshot/allure/allure-results/**"]]
            }
        }
        cleanup {
            sh "docker stop ${containers.join(' ')} || true"
            sh "docker network rm ${network} || true"
            cleanWs()
        }
    }
}

