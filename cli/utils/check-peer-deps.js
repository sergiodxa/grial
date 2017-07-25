const pkg = require('../package.json')

if (pkg.peerDependencies) {
  Object.keys(pkg.peerDependencies).forEach(dependency => {
    try {
      require.resolve(dependency)
    } catch (err) {
      console.warn(
        `${dependency} not found. Please install ${dependency} using 'npm i ${dependency}'`
      )
      process.exit(0)
    }
  })
}
