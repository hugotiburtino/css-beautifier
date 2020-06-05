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
          echo '${CSS_BEAUT_DIR}'
          sh 'npm run build -- --artifacts-dir $CSS_BEAUT_DIR/web-ext-artifacts'
      }
    }
    stage('Clear') {
      steps {
          sh 'rm -rf node_modules/'
      }
    }
  }
}
