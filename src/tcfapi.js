	//*tcfapi*/

	 // Globales __tcfapi-Objekt erstellen
    window.__tcfapi = function (command, version, callback, parameter) {
        if (command === 'getTCData' && version === 2) {
            var tcData = {
                tcString: euConsentString,
                gdprApplies: true,
                eventStatus: 'tcloaded',
                cmpStatus: 'loaded'
            };
            callback(tcData, true);
        } else {
            // Unterstützt nur 'getTCData' für Version 2
            callback(null, false);
        }
    };

    // Prüfen, ob __tcfapiLocator im Dokument ist
    if (!document.getElementById('__tcfapiLocator')) {
        var locatorFrame = document.createElement('iframe');
        locatorFrame.style.display = 'none';
        locatorFrame.id = '__tcfapiLocator';
        document.body.appendChild(locatorFrame);
    }

    // Nachrichtensystem für __tcfapi
    window.addEventListener('message', function (event) {
        try {
            var data = event.data;
            if (typeof data === 'object' && data.__tcfapiCall) {
                var payload = data.__tcfapiCall;
                window.__tcfapi(
                    payload.command,
                    payload.version,
                    function (returnValue, success) {
                        event.source.postMessage(
                            {
                                __tcfapiReturn: {
                                    callId: payload.callId,
                                    returnValue: returnValue,
                                    success: success
                                }
                            },
                            '*'
                        );
                    },
                    payload.parameter
                );
            }
        } catch (e) {
            // Fehlerbehandlung für inkompatible Nachrichten
        }
    });