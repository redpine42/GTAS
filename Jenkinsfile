node {
    stage('Clone sources') {
        git url: https://github.com/redpine42/GTAS.git'
    }

    stage('Maven build') {
        buildInfo = rtMaven.run pom: 'gtas-parent/pom.xml', goals: 'clean install'
    }
}
