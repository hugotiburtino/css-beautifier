pipeline {
  agent any
  stages {
    stage('Install npm dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Lint JS') {
      steps {
        sh 'npm run lint-js'
      }
    }
    stage('Lint HTML') {
      steps {
        sh 'npm run lint-html'
      }
    }
    stage('Build') {
      steps {
          sh 'npm build'
      }
    }
    stage('Clear') {
      steps {
          sh 'rm -rf node_modules/'
      }
    }
  }
}
