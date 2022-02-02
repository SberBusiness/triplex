#!/usr/bin/env groovy
/* groovylint-disable LineLength */
import ru.sbrf.ufs.pipeline.Const

/**
 * Пайплайн для публикации докер образа демо библиотеки.
 */
@Library(['ufs-jobs@master']) _
def ufsCredential = 'ID-CAB-SA-DCBSWT-jenkins'

final String IMAGE_NAME = 'registry.sigma.sbrf.ru/dev/ci00149046/ci00405008_sbbol-dev/sbbol-web-library-styleguidist'
String imageNameWithTag = ''
String imageNodeEnv = ''

pipeline {
    agent {
        label 'team_builds_pdi'
    }
    parameters {
        choice(name: 'stand', choices: ['dev', 'dev2', 'prom'], description: "Какой стенд необходимо собрать (dev - 58004, dev2 - 58003, prom - 58000)")
        string(name: 'targetBranch', defaultValue: 'release-7.0')
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
        stage('Checkout branch') {
            steps {
                script {
                    currentBuild.displayName += " (${env.NODE_NAME})"
                    currentBuild.getChangeSets().clear()
                    git.checkoutRef 'bitbucket-dbo-key', GIT_PROJECT, GIT_REPOSITORY, "${params.targetBranch}"
                }
            }
        }
        stage('Prepare npm auth') {
            steps {
                script {
                    sh("echo _auth=${NPM_AUTH_TOKEN} >> .npmrc")
                }
            }
        }
        stage('Build image') {
            steps {
                script {
                    def packageJSON = readJSON file:'package.json'
                    def devBuild = params.stand != 'prom'
                    imageNodeEnv = devBuild ? "development" : "production"
                    imageNameWithTag = "${IMAGE_NAME}-${params.stand}:${packageJSON.version}"
                    docker.withRegistry(Const.OPENSHIFT_REGISTRY, ufsCredential) {
                        sh("docker build --force-rm --build-arg NODE_ENV=${imageNodeEnv} --build-arg " +
                                "STYLEGUIDIST_SETTINGS_MODE=${devBuild} -t ${imageNameWithTag} .")
                    }
                }
            }
        }
        stage('Push image') {
            steps {
                script {
                    docker.withRegistry(Const.OPENSHIFT_REGISTRY, ufsCredential) {
                        sh("docker push $imageNameWithTag")
                    }
                    sh("docker rmi $imageNameWithTag")
                }
            }
        }
        stage('Run container') {
            agent {
                label 'styleguide'
            }
            steps {
                script {
                    String PORT
                    if (params.stand == 'dev') {
                        PORT = '58004'
                    } else if (params.stand == 'prom') {
                        PORT = '58000'
                    } else {
                        PORT = '58003'
                    }
                    final String CONTAINER_NAME = "sbbol-web-library-styleguidist-${params.stand}"

                    sh "docker rmi \$(docker images -q '$IMAGE_NAME*') || true"
                    docker.withRegistry(Const.OPENSHIFT_REGISTRY, ufsCredential) {
                        sh "docker pull $imageNameWithTag"
                    }
                    sh "docker rm -f $CONTAINER_NAME || true"
                    sh "docker run -d --name $CONTAINER_NAME -p $PORT:80 $imageNameWithTag"
                }
            }
        }
    }
    post {
        cleanup {
            cleanWs()
        }
    }
}
