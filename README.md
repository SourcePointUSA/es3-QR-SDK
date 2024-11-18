# ES3 Compatible SDK (QR) GDPR ONLY

This project is a boilerplate for generating minified, ES3-compatible JavaScript. It uses Babel for transpilation and Terser for minification.

# Table of Contents

- [How to Install](#how-to-install)
- [Usage](#usage)
- [Missing Pieces](#missing-pieces)

# How to Install
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

# Usage
Edit the main source file in src/index.js.
Run npm run build to generate the production-ready code.
The minified file will be located at dist/index.min.js.



## Button Actions
The button actions in this project allow users to interact with the application through predefined functionalities. Each button triggers a specific behavior, enabling seamless integration and user-friendly workflows. Below is a detailed overview of the available actions and their corresponding outcomes.


### Accept All

 Accept all consent options.

```javascript
  _sp_.accept_all()
```

### Continue Without Accepting

Proceed without explicit consent while maintaining legitimate interest settings if configured.

```javascript
  _sp_.continue()
```

### Reject All

Reject all consent options.

```javascript
  _sp_.reject()
```

### Open Second Layer
Open the privacy manager modal for more detailed consent settings.

javascript
Code kopieren


```javascript
  _sp_.loadPrivacyManagerModal()
```

### Reload CMP

 Reload the Consent Management Platform interface.

```javascript
  _sp_.executeMessaging()
```


# Missing Pieces

1. Reconsent is in progress but not working atm
2. Reporting is not available at this point
3. Script assumes that GDPR always applies (need to make this dynamic using the vendor list scope)
4. Message needs to be completly hardcoded at this point -> UI component exists and returns values in the APIs
