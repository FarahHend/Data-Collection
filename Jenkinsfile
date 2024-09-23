pipeline {
    agent any
    tools { 
        jdk 'JAVA_HOME' 
        maven 'M2_HOME' 
    }
    stages {
        stage('GIT') {
            steps {
                git branch: 'main', url: 'https://github.com/FarahHend/CI-CD.git'
            }
        }
        stage('Compile Stage') {
            steps {
                dir('Backend-Springboot') {
                    sh 'mvn clean compile'
                }
            }
        }
    }
}
