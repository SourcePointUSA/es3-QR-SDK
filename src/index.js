(function() {
	if (typeof _sp_ !== 'undefined') {
  		console.error("_sp_ - object undefined");
	}

	var nonKeyedLocalState = null;
	var env = "prod";
	var scriptVersion = "0.0.1";
	var scriptType = "es3";
	var consentUUID = getCookieValue("consentUUID");
	var authId = getCookieValue("authId");
	var euConsentString = null;

	var cb = Math.floor(Math.random() * 1000000);

	var mmsDomain = _sp_.config.baseEndpoint;
	var baseEndpoint = _sp_.config.baseEndpoint;
	var propertyHref =  _sp_.config.propertyHref;
	var propertyId = _sp_.config.propertyId;
	var accountId = _sp_.config.accountId;
	var hasLocalData = false;
	var dateCreated = getCookieValue("consentDate");

	var consentStatus = JSON.parse(decodeURIComponent(getCookieValue("consentStatus")))
	var localState = JSON.parse(decodeURIComponent(getCookieValue("localState")))
	var metaData = JSON.parse(decodeURIComponent(getCookieValue("metaData")))

	var nonKeyedLocalState = JSON.parse(decodeURIComponent(getCookieValue("nonKeyedLocalState")))

	var	granularStatus = null;
	var	consentAllRef = null;
	var	gdprApplies = null;
	var messageDiv = _sp_.config.messageDiv;

	var messageId = null;
	var localState = null;

	


	addClickListener();
    getMetaData();
 
    if (consentUUID == null) {
        consentUUID = generateUUID();
        setCookie("consentUUID", consentUUID, 365);
        console.log("consentUUID: " + consentUUID + " generated and stored")
    } 

    if (authId == null) {
        authId = generateUUID();
        setCookie("authId", authId, 365);
        console.log("authId: " + authId + " generated and stored")
    } 

    getConsentStatus();
    
    
    function extendSpObject() {
       
            _sp_.executeMessaging = function() {
            	getMessages();
                console.log('Messaging executed!');
            };

            _sp_.loadPrivacyManagerModal = function() {
                console.log('Privacy Manager Modal loaded!');
            };
        
    }

   	extendSpObject();

   	// Sicherstellen, dass das Events-Objekt existiert
	window._sp_.config.events = window._sp_.config.events || {};

	var triggerEvent = function(eventName, args) {
	    var event = window._sp_.config.events[eventName];
	    if (typeof event === 'function') {
	        event.apply(null, args || []); // Event mit Parametern ausführen
	    } else {
	        console.log('No callback defined for event: ' + eventName);
	    }
	};


    //OnConsentReady
	var	onConsentReady = triggerEvent('onConsentReady', [
  		consentUUID,
  		euConsentString,
  		"placeholderforgrants"
	]);



/*Polyfill for JSON*/

if (!window.JSON) {
    window.JSON = {
        stringify: function(obj) {
            var t = typeof(obj);
            if (t != "object" || obj === null) {
                // simple data type
                if (t == "string") obj = '"' + obj + '"';
                return String(obj);
            } else {
                // array or object
                var n, v, json = [],
                    arr = (obj && obj.constructor == Array);
                for (n in obj) {
                    v = obj[n];
                    t = typeof(v);
                    if (t == "string") v = '"' + v + '"';
                    else if (t == "object" && v !== null) v = JSON.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        }
    };
}

// Polyfill für JSON.parse
if (typeof JSON.parse !== 'function') {
    JSON.parse = function(text) {
        try {
            return (new Function('return ' + text))();
        } catch (e) {
            throw new SyntaxError('JSON.parse: ungültiges JSON-Format');
        }
    };
}

function showElement(elementId) {
    var element = document.getElementById(elementId); // Hol das Element mit der ID
    if (element) {
        element.style.display = 'block'; // Setzt display auf block, um das Element anzuzeigen
    }
}

function hideElement(elementId) {
    var element = document.getElementById(elementId); // Hol das Element mit der ID
    if (element) {
        element.style.display = 'none'; // Setzt display auf block, um das Element anzuzeigen
    }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getCookieValue(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // Entfernt Leerzeichen um das Cookie herum
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring((name + "=").length, cookie.length);
        }
    }
    return null; // Gibt null zurück, falls das Cookie nicht gefunden wurde
}

function buildUrl(baseUrl, params) {
  var url = baseUrl + "?";
  var paramArray = [];

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      paramArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }
  }

  return url + paramArray.join("&");
}

function generateUUID() {
    var chars = '0123456789abcdef'.split('');
    var uuid = [],
        rnd = Math.random,
        r;

    for (var i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid[i] = '-';
        } else if (i === 14) {
            uuid[i] = '4'; // Die 13. Stelle ist immer "4" für UUID v4
        } else {
            r = 0 | rnd() * 16; // Zufällige Zahl zwischen 0 und 15
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
    }

    return uuid.join('');
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Millisekunden für die Anzahl der Tage
        expires = "; expires=" + date.toUTCString(); // Ablaufdatum im UTC-Format
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function checkMessageJson(response) {
    // Überprüfe, ob "campaigns" in der Antwort vorhanden ist und ein Array ist


    if (response.campaigns && Array.isArray(response.campaigns)) {
        // Durchlaufe die Kampagnen
        for (var i = 0; i < response.campaigns.length; i++) {
            var campaign = response.campaigns[i];
            // Überprüfe, ob die Nachricht vorhanden ist und "message_json" in der Nachricht existiert
            if (campaign.message && campaign.message.message_json) {
            	messageId = campaign.messageMetaData.messageId;
                console.log("Message id" + messageId + " shown");
                //console.log(campaign.message.message_json);
                return campaign.message.message_json;
            }
        }
    }
    onConsentReady;
	console.info("no message to be shown");
	return false;

}
 


function getMessages() {
    console.log("getMessages()");

    console.log(consentStatus);



    var baseURL = baseEndpoint + '/wrapper/v2/messages';
    var queryParams = '?hasCsp=true&env=prod';

    var body = {    
        accountId: accountId,
        campaignEnv: "prod",
        campaigns: {
            gdpr: {
                consentStatus: consentStatus,
                hasLocalData: hasLocalData,
                targetingParams: {}
            }
        },
        clientMMSOrigin: baseEndpoint,
        hasCSP: true,
        includeData: {
            localState: {
                type: "string"
            },
            actions: {
                type: "RecordString"
            },
            cookies: {
                type: "RecordString"
            }
        },
        propertyHref: _sp_.config.propertyHref,
        propertyId: _sp_.config.propertyId,
        authId: authId
    };

 

    // Stringify das JSON-Body-Objekt und URL-encode es
    var bodyEncoded = encodeURIComponent(JSON.stringify(body));

    // GDRP applies immer true
    var metaData = encodeURIComponent('{"gdpr":{"applies":true}}');
    

    // Füge die Parameter zur URL hinzu
    var fullURL = baseURL + queryParams +
        '&body=' + bodyEncoded +
        '&localState=' + localState +
        '&metadata=' + metaData +
        '&nonKeyedLocalState=' + nonKeyedLocalState +
        '&ch=' + cb +
        '&scriptVersion=4.25.2&scriptType=unified';

    var res = JSON.parse(httpGet(fullURL));

 
    localState = res.localState;
    setCookie("localState", JSON.stringify(res.localState), 365);
    nonKeyedLocalState = res.nonKeyedLocalState;
    setCookie("nonKeyedLocalState", JSON.stringify(res.nonKeyedLocalState), 365);
    //  metaData = res.metadata;
    //setCookie("metaData", JSON.stringify(res.metadata), 365);

    console.log("getMessageResp" + res);

    if (checkMessageJson(res)) {
        updateQrUrl("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.tcfv2.de/native/pm.php?authId="+authId+"&propertyId="+propertyId+"&propertyHref="+propertyHref);
    	//messageId = 
        showElement(messageDiv);

    }

}

function updateQrUrl( newUrl) {

    var image = document.getElementById("qr");

    if (image) {
        // Manipuliere die URL des Bildes, z.B. durch Hinzufügen eines Zeitstempels, um das Neuladen zu erzwingen
        var timestamp = new Date().getTime(); // Aktuelle Zeit als Parameter, um den Cache zu umgehen
        var separator = newUrl.indexOf('?') === -1 ? '?' : '&'; // Prüft, ob die URL bereits Parameter enthält
        
        // Setze die neue URL mit dem Zeitstempel
        image.src = newUrl + separator + 't=' + timestamp;
    }
}

function acceptAll() {
    var baseUrl = _sp_.config.baseEndpoint + '/wrapper/v2/choice/consent-all';
    var queryParams = {
        hasCsp: 'true',
        authId: authId,
        accountId: accountId,
        env: 'prod',
        includeCustomVendorsRes: 'true',
        metadata: JSON.stringify(metaData), // URL-encoded JSON
        propertyId: propertyId,
        withSiteActions: 'true',
        ch: cb,
        scriptVersion: scriptVersion,
        scriptType: scriptType
    };

    var queryString = [];
    for (var key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]));
        }
    }

    var consentdata = httpGet(baseUrl + '?' + queryString.join('&'));


    sendAcceptAllRequest(JSON.parse(consentdata));
    hideElement(messageDiv);

}

function liOnly(){

    /*get LI only Purposes and vendors*/
    var liURL = baseEndpoint + '/consent/tcfv2/consent/v3/' + propertyId + '/li-only';
    var liOnly = JSON.parse(httpGet(liURL));
    sendGranularChoiceRequest(liOnly);
}

function rejectAll(){
      var baseUrl = _sp_.config.baseEndpoint + '/wrapper/v2/choice/reject-all';
    var queryParams = {
        hasCsp: 'true',
        authId: authId,
        accountId: accountId,
        env: 'prod',
        includeCustomVendorsRes: 'true',
        metadata: JSON.stringify(metaData), // URL-encoded JSON
        propertyId: propertyId,
        withSiteActions: 'true',
        ch: cb,
        scriptVersion: scriptVersion,
        scriptType: scriptType
    };

    var queryString = [];
    for (var key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]));
        }
    }

    var consentdata = httpGet(baseUrl + '?' + queryString.join('&'));


    sendRejectAllChoiceRequest(JSON.parse(consentdata));
    hideElement(messageDiv);
}



function sendGranularChoiceRequest(pmSaveAndExitVariables){
    var req = new XMLHttpRequest();

    console.log(pmSaveAndExitVariables)
    var url = 'https://cmp.tcfv2.de/wrapper/v2/choice/gdpr/1?hasCsp=true&env=prod&ch='+cb+'&scriptVersion='+scriptVersion+'&scriptType='+scriptType;
    req.open('POST', url, false); 

    req.setRequestHeader('accept', '*/*');
    req.setRequestHeader('accept-language', 'de,en;q=0.9');
    req.setRequestHeader('content-type', 'application/json');
    
    var data = {
        accountId: accountId,
        applies: gdprApplies,
        authId: authId,
        messageId: messageId,
        mmsDomain: baseEndpoint,
        propertyId: propertyId,
        pubData: {},
        includeData: {
            actions: {type: "RecordString"},
            customVendorsResponse: {type: "RecordString"}
        },
        uuid: consentUUID,
        sampleRate: 1,
        sendPVData: false,
        pmSaveAndExitVariables : pmSaveAndExitVariables
    };

    // Wandle die Daten in einen JSON-String um
    var jsonData = JSON.stringify(data);

    // Callback für den Fall, dass die Anfrage abgeschlossen ist
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var res = JSON.parse(req.responseText);
            console.log(req.responseText);
            storeConsentResponse(res , pmSaveAndExitVariables);
        }else{
            console.error('error:', req.responseText);
        }
    };

    // Sende die Anfrage mit den JSON-Daten
    req.send(jsonData);

}


function sendRejectAllChoiceRequest(consentdata){
    console.log(consentdata);

    granularStatus = consentdata.gdpr.consentStatus.granularStatus;
    consentAllRef =  consentdata.gdpr.consentAllRef;
    gdprApplies = consentdata.gdpr.gdprApplies;
 
    var url = 'https://cmp.tcfv2.de/wrapper/v2/choice/gdpr/13?hasCsp=true&env=prod&ch='+cb+'&scriptVersion='+scriptVersion+'&scriptType='+scriptType;

    var req = new XMLHttpRequest();
    req.open('POST', url, false); // Asynchrone POST-Anfrage

    // Setze die HTTP-Header
 
    req.setRequestHeader('accept', '*/*');
    req.setRequestHeader('accept-language', 'de,en;q=0.9');
    req.setRequestHeader('content-type', 'application/json');

    // JSON-Daten, die im Body gesendet werden
    var data = {
        accountId: accountId,
        applies: gdprApplies,
        authId: authId,
        messageId: messageId,
        mmsDomain: baseEndpoint,
        propertyId: propertyId,
        pubData: {},
        includeData: {
            actions: {type: "RecordString"},
            customVendorsResponse: {type: "RecordString"}
        },
        uuid: consentUUID,
        sampleRate: 1,
        sendPVData: true
    };


    // Wandle die Daten in einen JSON-String um
    var jsonData = JSON.stringify(data);

    // Callback für den Fall, dass die Anfrage abgeschlossen ist
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var res = JSON.parse(req.responseText);
            console.log(req.responseText);
            storeConsentResponse(res , consentdata);
        }else{
            console.error('error:', req.responseText);
        }
    };

    // Sende die Anfrage mit den JSON-Daten
    req.send(jsonData);
}


function sendAcceptAllRequest(consentdata) {

	granularStatus = consentdata.gdpr.consentStatus.granularStatus;
	consentAllRef =  consentdata.gdpr.consentAllRef;
	gdprApplies = consentdata.gdpr.gdprApplies;
 
    var url = 'https://cmp.tcfv2.de/wrapper/v2/choice/gdpr/11?hasCsp=true&env=prod&ch='+cb+'&scriptVersion='+scriptVersion+'&scriptType='+scriptType;

    var req = new XMLHttpRequest();
    req.open('POST', url, false); // Asynchrone POST-Anfrage

    // Setze die HTTP-Header
 
    req.setRequestHeader('accept', '*/*');
    req.setRequestHeader('accept-language', 'de,en;q=0.9');
    req.setRequestHeader('content-type', 'application/json');

    // JSON-Daten, die im Body gesendet werden
    var data = {
        accountId: accountId,
        applies: gdprApplies,
        authId: authId,
        messageId: messageId,
        mmsDomain: baseEndpoint,
        propertyId: propertyId,
        pubData: {},
        includeData: {
            actions: {type: "RecordString"},
            customVendorsResponse: {type: "RecordString"}
        },
        uuid: consentUUID,
        sampleRate: 1,
        sendPVData: false,
        consentAllRef: consentAllRef,
        granularStatus:consentStatus,
        vendorListId: consentdata.gdpr.vendorListId
    };


    // Wandle die Daten in einen JSON-String um
    var jsonData = JSON.stringify(data);

    // Callback für den Fall, dass die Anfrage abgeschlossen ist
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
        	var res = JSON.parse(req.responseText);
        		(consentdata);
        }else{
        	console.error('error:', req.responseText);
        }
    };

    // Sende die Anfrage mit den JSON-Daten
    req.send(jsonData);
}

function storeConsentResponse(consentdata){
    console.log("storeConsentResponse:");
    console.log(consentdata);
    
    if(consentdata.consentStatus != undefined){
        setCookie("consentStatus", JSON.stringify(consentdata.consentStatus),365);
        consentStatus = consentdata.consentStatus;
    }
  
    consentUUID = consentdata.uuid;
	setCookie("consentUUID", consentdata.uuid, 365);
    consentDate = consentdata.dateCreated;
	setCookie("consentDate", consentdata.dateCreated, 365);


   	onConsentReady;

}



function addClickListenersToClass(cn) {
  var allElements = document.getElementsByClassName(cn); 
  var i;

  for (i = 0; i < allElements.length; i++) {
      addClickListener(allElements[i]);
  }
}


function addClickListener() {
    var optionsButton = document.getElementById('options');
    if (optionsButton) {
        optionsButton.onclick = function() {
           showElement("pm")
           hideElement(messageDiv)
        };
    }

    var acceptButtons = document.getElementsByClassName('sp_accept'); 
    var i;

    for (i = 0; i < acceptButtons.length; i++) {
        acceptButtons[i].onclick = function() {
            hideElement("pm");
            hideElement(messageDiv);
            acceptAll()
        };
    }

    var reloadButtons = document.getElementsByClassName('sp_reload');

    for (i = 0; i < reloadButtons.length; i++) {
        reloadButtons[i].onclick = function() {
            hideElement("pm");
            hideElement(messageDiv);
            getConsentStatus();
            getMessages();
          
        };
    }

    var continueButtons = document.getElementsByClassName('sp_continue'); 
    var i;

    for (i = 0; i < continueButtons.length; i++) {
        continueButtons[i].onclick = function() {
            hideElement("pm");
            hideElement(messageDiv);
            liOnly()
        };
    }

    var rejectButtons = document.getElementsByClassName('sp_reject'); 
    var i;

    for (i = 0; i < rejectButtons.length; i++) {
        rejectButtons[i].onclick = function() {
            hideElement("pm");
            hideElement(messageDiv);
            rejectAll();
        };    
    }
}

function getConsentStatus(){
    console.log("getConsentStatus() executed")
    var baseUrl = 'https://cmp.tcfv2.de/wrapper/v2/consent-status';
    var params = {
      hasCsp: 'true',
      accountId: accountId,
      env: 'prod',
      localState: JSON.stringify(localState),
      nonKeyedLocalState: JSON.stringify(nonKeyedLocalState), 
      metadata: JSON.stringify(metaData),
      propertyId: propertyId,
      withSiteActions: 'true',
      authId: authId,
      ch: cb,
      scriptVersion: scriptVersion,
      scriptType: scriptType
    };

    var res = JSON.parse(httpGet(buildUrl(baseUrl, params)));
 
    hasLocalData = true;
    setCookie("consentStatus", JSON.stringify(res.consentStatusData.gdpr.consentStatus),365)
    consentStatus = res.consentStatusData.gdpr.consentStatus;
    setCookie("consentUUID", res.consentStatusData.gdpr.consentUUID);

    console.log(res.consentStatusData.gdpr.euconsent);
    euConsentString = res.consentStatusData.gdpr.euconsent;
    console.log(euConsentString);
    setCookie("euconsent-v2", euConsentString);
 
    consentDate = res.consentStatusData.gdpr.dateCreated;
    setCookie("consentDate", consentDate);
    //setCookie("localState", JSON.stringify(res.localState),365);

 }

 function getMetaData(){
    var baseUrl = 'https://cmp.tcfv2.de/wrapper/v2/meta-data';

    var params = {
      hasCsp: 'true',
      accountId: accountId,
      //hardcode PROD ENV
      env: 'prod',
      //hardcode GDPR Campaign
      metadata: '{"gdpr":{}}',
      propertyId: propertyId,
      scriptVersion: scriptVersion,
      scriptType: scriptType
    };

    var res = JSON.parse(httpGet(buildUrl(baseUrl, params)));

    metaData = res;
    setCookie("metaData", JSON.stringify(metaData),365);

 }

})();



