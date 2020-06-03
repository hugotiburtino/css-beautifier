pipeline {
  agent any
  stages {
    stage('Lint') {
      steps {
        sh 'npm lint'
      }
    }
    stage('Build') {
      steps {
          sh 'web-ext build'
      }
    }
  }
}