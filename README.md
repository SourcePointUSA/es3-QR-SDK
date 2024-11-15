# ES3 Compatible SDK (QR)

This project is a boilerplate for generating minified, ES3-compatible JavaScript. It uses Babel for transpilation and Terser for minification.

## Setup
1. Clone the repository or download the files.
2. Install the dependencies:

```bash
npm install
```

This project is a boilerplate for generating minified, ES3-compatible JavaScript. It uses Babel for transpilation and Terser for minification.

Setup
Clone the repository or download the files.


##Building the Project
To transpile and minify the JavaScript code, run:

```bash
npm run build
```
This will:

Transpile the JavaScript files from the src folder into ES3-compatible code.
Minify the output and save it in the dist folder.

File Structure

```bash
my-npm-project/
├── src/                 # Source files
│   └── index.js         # Main JavaScript file
├── dist/                # Build output
│   └── index.min.js     # Minified ES3-compatible JavaScript
├── package.json         # Project configuration
├── babel.config.json    # Babel configuration for ES3 compatibility
└── README.md            # Project instructions
```

Usage
Edit the main source file in src/index.js.
Run npm run build to generate the production-ready code.
The minified file will be located at dist/index.min.js.


## API Reference

#### Example Request

```http
  GET /api/example
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

