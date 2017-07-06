# Contributing to Grial

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Install the dependencies: `npm install`
3. Run `npm link` to link the local repo to NPM
4. Run `npm run build` to build and watch for code changes
5. Then npm link this repo inside any example app with `npm link grial`
6. Then you can run your example app with the local version of Grial (You may need to re-run the example app as you change server side code in the Grial repository)
