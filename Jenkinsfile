node{
  stage ('Build') {
 
    git url: 'https://github.com/redpine42/GTAS.git'
 
    withMaven(
        // Maven installation declared in the Jenkins "Global Tool Configuration"
      maven: 'Maven') {
 
      // Run the maven build
      sh "mvn clean install"
    }
  }
}
