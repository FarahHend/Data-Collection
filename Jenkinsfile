pipeline {
    agent any
    tools { 
        jdk 'JAVA_HOME' 
        maven 'M2_HOME' 
    }
    stages {
        stage('GIT') {
            steps {
                cleanWs()
                git branch: 'main', url: 'https://github.com/FarahHend/Data-Collection.git'
            }
        }
        stage('Set Permissions') {
            steps {
                sh 'sudo chmod -R 755 ./Data-Collection'
                sh 'sudo chown -R jenkins:jenkins ./Data-Collection'
            }
        }
        stage('Compile Stage') {
            steps {
                dir('/Data-Collection/Backend-Springboot') {
                    sh 'ls -la'
                    sh 'mvn clean compile'
                }
            }
        }
    }
}
