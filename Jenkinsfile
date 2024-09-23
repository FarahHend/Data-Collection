pipeline {
    agent any
    tools { 
        jdk 'JAVA_HOME' 
        maven 'M2_HOME' 
    }
    stages {
        stage('GIT') {
            steps {
                git branch: 'master', url: 'https://github.com/FarahHend/Data-Collection.git'
            }
        }
        stage('Compile Stage') {
            steps {
                dir('Data-Collection/Backend-Springboot') {
                    sh 'mvn clean compile'
                }
            }
        }
    }
}
