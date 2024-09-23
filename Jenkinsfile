pipeline {
    agent any
    tools { 
        jdk 'JAVA_HOME' 
        maven 'M2_HOME' 
    }
    stages {
        stage('GIT') {
            steps {
                git branch: 'main', url: 'https://github.com/FarahHend/Data-Collection.git'
            }
        }
        stage('Compile Stage') {
            steps {
                dir('Data-Collection/Backend-Springboot') {
                    sh 'ls -la'
                    sh 'mvn -f pom.xml clean compile'
                }
            }
        }
    }
}
