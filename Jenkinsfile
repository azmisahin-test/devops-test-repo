pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-app"
        IMAGE_TAG = "1.0.0"
        KUBE_NAMESPACE = "default"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Docker Registry') {
            steps {
                script {
                    docker.withRegistry('https://my-docker-registry.com', 'docker-credentials-id') {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    kubectl.config.setContext('my-cluster')
                    kubectl.set('namespace', KUBE_NAMESPACE)
                    kubectl.apply('-f', 'k8s/deployment.yaml')
                }
            }
        }
    }
}
