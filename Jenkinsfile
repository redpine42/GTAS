node {
    stage('Clone sources') {
        git url: 'https://github.com/redpine42/GTAS.git'
    }

    stage('Maven build') {
        rtMaven.tool = "Maven-3.3.9"
        buildInfo = rtMaven.run pom: 'gtas-parent/pom.xml', goals: 'clean install'
    }

}
