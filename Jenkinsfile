pipeline {

    agent any

    environment {
        IMAGE_NAME = "vijayvs6383/nodejs-devops-poc"
        KUBECONFIG = "/var/jenkins_home/.kube/config-jenkins"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest -f docker/Dockerfile .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f kubernetes/
                kubectl rollout restart deployment/nodejs-app
                kubectl rollout status deployment/nodejs-app
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl get deployments
                kubectl get pods
                kubectl get svc
                '''
            }
        }
    }
}