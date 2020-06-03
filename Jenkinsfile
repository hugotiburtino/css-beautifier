pipeline {
  agent any
  stages {
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