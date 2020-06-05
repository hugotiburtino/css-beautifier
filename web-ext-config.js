module.exports = {
    verbose: true,
    build: {
      overwriteDest: true,
    },
    ignoreFiles: [
        'sandbox/',
        'screenshots/',
        'Jenkinsfile',
        'web-ext-config.js',
        'package.json',
        'package-lock.json'
      ]
}
