# @grial/cli
This simple CLI allow you to start a Grial server without worring about the server code, just write you API code and let Grial handle the rest.

## Usage
Install it

```bash
npm i @grial/cli
```

Install peer dependencies

```bash
npm i @grial/server
```

Add the following script to your `package.json`

```json
{
  "scripts": {
    "start": "grial start"
  }
}
```

Then start your API

```bash
npm start
```

## Commands
### `start`
Run the Grial API server
