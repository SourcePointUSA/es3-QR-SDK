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

## Script Configuration Parameters

| Parameter         | Type       | Description                                                                                              |
|-------------------|------------|----------------------------------------------------------------------------------------------------------|
| `accountId`       | `integer`  | **Required**. The unique identifier for your account on Sourcepoint.                                      |
| `propertyId`      | `integer`  | **Required**. Maps the implementation to a specific URL as set up in the Sourcepoint dashboard. Use this parameter to spoof messaging campaigns for testing or debugging.                                       |
| `propertyHref`    | `string`   | **Required**. The name or URL of the property to be connected.                                            |
| `baseEndpoint`    | `string`   | **Required**. The API endpoint. Use the default (`https://cdn.privacy-mgmt.com/`) unless a custom CNAME is required. |
| `messageDiv`      | `string`   | **Required**. The ID of the `<div>` element where your consent message will appear.                       |
| `pmDiv`           | `string`   | **Required**. The ID of the `<div>` element designated for the privacy manager.                           |
| `qrId`            | `string`   | **Required**. The ID of the `<img>` element where the QR code is displayed.                               |
| `qrUrl`           | `string`   | **Required**. The URL of the QR code generator (no default; must be hosted on your infrastructure).        |
| `pmUrl`           | `string`   | **Required**. The URL for the privacy manager's second-layer page (no default; must be hosted on your infrastructure). |
| `gdpr`            | `object`   | **Optional**. Adds GDPR TCF or GDPR Standard messaging campaigns to your configuration.                  |
| `isSPA`           | `boolean`  | **Optional**. Set to `true` to implement for a single-page application. Shows messages only when `window._sp_.executeMessaging();` is triggered. |
| `targetingParams` | `object`   | **Optional**. Allows setting arbitrary key/value pairs sent to Sourcepoint servers for decision-making in the scenario builder. Parameters set within U.S. Privacy (Legacy) or GDPR objects override this configuration.  |



## Button Actions
The button actions in this project allow users to interact with the application through predefined functionalities. Each button triggers a specific behavior, enabling seamless integration and user-friendly workflows. Below is a detailed overview of the available actions and their corresponding outcomes.

| Action                  | Description                                                                                  | Code Example                          |
|-------------------------|----------------------------------------------------------------------------------------------|---------------------------------------|
| **Accept All**          | Accept all consent options.                                                                  | ``` _sp_.accept_all() ``` |
| **Continue Without Accepting** | Proceed without explicit consent while maintaining legitimate interest settings if configured. | ```_sp_.continue() ```   |
| **Reject All**          | Reject all consent options.                                                                  | ```_sp_.reject()\n```     |
| **Open Second Layer**   | Open the privacy manager modal for more detailed consent settings.                           | ```_sp_.loadPrivacyManagerModal() ``` |
| **Reload CMP**          | Reload the Consent Management Platform interface.                                            | ```_sp_.executeMessaging()``` |



# Missing Pieces

1. Reconsent is in progress but not working atm
2. Reporting is not available at this point
3. Script assumes that GDPR always applies (need to make this dynamic using the vendor list scope)
4. Message needs to be completly hardcoded at this point -> UI component exists and returns values in the APIs
