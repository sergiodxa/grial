# Grial
A Node.js framework for creating GraphQL API servers easily and without a lot of boilerplate.

![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg) ![standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg) ![license](https://img.shields.io/npm/l/@grial/server.svg)

## Why?
There's a lot of boilerplate code required to run a GraphQL API with Node.js, the server code it's almost always the same, create a server, load the resolvers and the schema and set the `/graphql` endpoint along with GraphiQL.

Grial allow you to only think about your business logic and API and is responsible for implementing the boilerplate code for you.

Grial also provide you with connectors you can use to consume many data sources easily.

## Documentation
You can check the Grial docs in the [repository wiki](https://github.com/sergiodxa/grial/wiki)

### Table of content
- [Setup](https://github.com/sergiodxa/grial/wiki/Setup)
- [File structure](https://github.com/sergiodxa/grial/wiki/File-structure)
- [Creating a connector](https://github.com/sergiodxa/grial/wiki/Creating-a-connector)
  - [Using multi instances of a single connector](https://github.com/sergiodxa/grial/wiki/Using-multi-instances-of-a-single-connector)
- [Creating a model](https://github.com/sergiodxa/grial/wiki/Creating-a-model)
  - [Testing](https://github.com/sergiodxa/grial/wiki/Creating-a-model#testing)
- [Creating a resolver](https://github.com/sergiodxa/grial/wiki/Creating-a-resolvers)
  - [Testing](https://github.com/sergiodxa/grial/wiki/Creating-a-resolvers#testing)
