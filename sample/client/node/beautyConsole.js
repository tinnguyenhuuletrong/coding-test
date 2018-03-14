var jclrz = require('json-colorz');

var obj = {
  install: false,
  devpackages: ["colorz", "json-colorz"],
  packages: [1, 2, 3],
  git: false,
  verbose: /(app)/,
  dryrun: true,
  files: {
    gitignore: false,
    eslintrc: true,
    index: true,
    license: false,
    package: true,
    readme: true,
    test: false,
    travis: false
  },
  meta: {
    date: "Mon Oct 19 2015 16:48:33 GMT-0400 (EDT)",
    year: "2015",
    packageName: "testproj607",
    type: "private",
    repo: "none",
    remote: false,
    push: false,
    author: "Your Name",
    email: "git@your.email",
    name: "yourHandle",
    url: "https://github.com/yourHandle/testproj607",
    version: "0.1.0",
    license: "ISC",
    description: "An awesome module being created"
  }
}

module.exports.log = function(obj) {
  jclrz(obj)
}