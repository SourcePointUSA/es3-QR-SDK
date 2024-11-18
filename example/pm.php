<?php
setcookie("consentUUID", );
    $authId = (isset($_GET['authId'])) ? $_GET['authId'] : false;

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sourcepoint PM</title>


     <script type="text/javascript">

        var pmActionActionTaken = false;
            window._sp_ = {
                config: {
                    accountId:  2002,
                    propertyHref : "https://hbb.tv",
                    baseEndpoint: 'https://cmp.tcfv2.de',
                    authId : "<?PHP echo $authId ; ?>",
                    targetingParams:{            
                        "mode": 'nomessage'          
                	},
                    gdpr:{},
                    events: {
                        onMessageReady: function () {
                            console.log("onMessageReady");
                        },
                        onMessageChoiceSelect: function (choice_id, choice_type_id) {
                                console.log('onMessageChoiceSelect choice_id: ', choice_id);
                                console.log('onMessageChoiceSelect choice_id: ', choice_type_id);
                        },
                        onPrivacyManagerAction: function (pmData) {
                                console.log('onPrivacyManagerAction', pmData)
                                pmActionActionTaken = true
                        },
                        onMessageChoiceError: function (err) {
                                console.log('onMessageChoiceError', err)
                        },
                        onConsentReady: function (consentUUID, euconsent) {
                            if(pmActionActionTaken == false) {
                                _sp_.gdpr.loadPrivacyManagerModal(1196474);
                            }
                            else{
                                document.getElementById("thank_you").style.display = "block";
                            }
                 
                            console.log('onConsentReady');
                        },
                        onPMCancel: function () {
                            console.log('onPMCancel')
                        },
                        onMessageReceiveData: function (data) {
                            console.log('onMessageReceiveData', data)
                            console.log(JSON.stringify(data));
                        },
                        onSPPMObjectReady: function () {
                                console.log('onSPPMObjectReady')
                        }
                    },
                }
            }         
        </script>
        <script src="https://cmp.tcfv2.de/unified/wrapperMessagingWithoutDetection.js" async></script>


  </head>
  <body onload="">
    
    <div id="thank_you" style="position: relative;text-align: center;vertical-align: middle;height: 100vh;padding-top: 40vh; display: none;">
        Thank you for your choice. Please return to your TV and press the reload CMP button to finalize your preferences. If you'd like to make further changes, you can <a onclick="_sp_.gdpr.loadPrivacyManagerModal(1196474)" style="font-weight: bold; text-decoration: underline;">click here</a> to resurface the privacy management options.
    </div>



  </body>
</html>
