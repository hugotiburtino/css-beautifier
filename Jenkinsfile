pipeline {
  agent any
  stages {
    stage('Install npm dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
          sh 'web-ext build'
      }
    }
  }
}