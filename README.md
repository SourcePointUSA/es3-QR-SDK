# ES3 Compatible SDK (QR) GDPR ONLY

This project is a boilerplate for generating minified, ES3-compatible JavaScript. It uses Babel for transpilation and Terser for minification.

# Table of Contents

- [How to Install](#how-to-install)
- [Usage](#usage)
- [Outstanding issues](#putstanding-issues)


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
es3-QR-SDK/
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

## Example

```javascript
    <script type="text/javascript">
        window._sp_ = {
            config: {
                accountId: 22,
                propertyId: 37479,
                propertyHref: "https://hbb.tv",
                baseEndpoint: 'https://cdn.privacy-mgmt.com',
                messageDiv: "native_message",
                pmDiv: "pm", 
                qrId: "qr",
                qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=",
                pmUrl: "https://tcfv2.de/pm.php",
                events: {
                    onConsentReady: function( consentUUID, euconsent, vendorGrants) {
                        console.log('Custom - onConsentReady');
                        console.log('consentUUID: ' + consentUUID);
                        console.log('euconsent: ' + euconsent);
                        console.log(vendorGrants);
                    }
                }
            }
        }
    </script>

```

A complete example has been included in the "example" folder within this repository.

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

### Optional Event Callbacks

Currently, we have a single event being triggered. Once consent is ready, Sourcepoint offers an optional callback function onConsentReady that allows your organization to read vendor grants. This command can be called with JavaScript code embedded in a webpage: providing the consentUUID, the IAB TCString, and a vendorGrants object.


```javascript

 events: {
 	onConsentReady: function( consentUUID, euconsent, vendorGrants) {
    	console.log('Custom - onConsentReady');
        console.log('consentUUID: ' + consentUUID);
        console.log('euconsent: ' + euconsent);
        console.log(vendorGrants);
    }
}
```

 
## Vendor grants

A vendor grant is a boolean value that is true if an end-user has consented to all purposes assigned to a vendor. The vendor grant value is false if one or more purposes have been disallowed by the end-user. Where the vendor grant has been set to false, your organization should check which purposes have been rejected by the end-user. 

The grants section in the JSON response using the TCF API getCustomVendorConsents request lists the consented purposes for each vendor. The variable vendorGrant provides the vendor grant status.

The consented purposes are listed as follows:

| Parameter         | Description                                                                                              |
|-------------------|----------------------------------------------------------------------------------------------------------|
|  `vendor_id` | A unique identifier for each vendor persisiting across all Sourcepoint vendor lists |
|  `purpose_id	` | A unique identifier for each purpose (mind that this ID is changing depending on the Vendor List) |
|  `status	` | Status is  `true` if the purpose applies to an end-user. |
|  `vendorGrant	` | Status is `true` if all purposes for a vendor apply to an end-user. Status is `false` if one or more purposes for a vendor denies consent for one or more purposes. |

## Button Actions

The button actions in this project allow users to interact with the application through predefined functionalities. Each button triggers a specific behavior, enabling seamless integration and user-friendly workflows. Below is a detailed overview of the available actions and their corresponding outcomes.

| Action                  | Description                                                                                  | Code Example                          |
|-------------------------|----------------------------------------------------------------------------------------------|---------------------------------------|
| **Accept All**          | Accept all consent options.                                                                  | ``` _sp_.accept_all() ``` |
| **Continue Without Accepting** | Proceed without explicit consent while maintaining legitimate interest settings if configured. | ```_sp_.continue() ```   |
| **Reject All**          | Reject all consent options.                                                                  | ``` _sp_.reject() ```     |
| **Open Second Layer**   | Open the privacy manager modal for more detailed consent settings.                           | ```_sp_.loadPrivacyManagerModal() ``` |
| **Reload CMP**          | Reload the Consent Management Platform interface.                                            | ```_sp_.executeMessaging()``` |



# Outstanding Issues

1. Reconsent is in progress but currently not functioning.
2. Reporting functionality is not yet available.
3. The script assumes GDPR is always applicable—this needs to be dynamic based on the vendor list scope.
4. The message is fully hardcoded for now—the UI component exists and returns values via the APIs, but it's not yet integrated into the HTML.
