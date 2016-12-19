import axios from 'axios';
import querystring from 'querystring';
import dispatcher from "./dispatcher";

const appProtocol = window.location.protocol+"//";
const appHostname = window.location.hostname;
const appPort = (window.location.port)?":"+window.location.port:"";
const appBaseUrl = appProtocol+appHostname+appPort;

export function getTranslation( cardKey, value, toOriginLang ) {
    
    //Example https://glosbe.com/gapi/translate?from=fra&dest=eng&format=json&phrase=soit&pretty=true

    var baseUrl = appBaseUrl+"/services/globse.php?",
        transDir = toOriginLang?"from=eng&dest=fra":"from=fra&dest=eng",
        format = "format=json&pretty=true",
        phrase = "phrase="+value,
        src = baseUrl+transDir+"&"+format+"&"+phrase;

    axios.get(src)
    .then(function (response) {

        var firstResponse = typeof response.data.tuc[0] == "undefined"?"":response.data.tuc[0],
            firstResponsePhrase = typeof firstResponse["phrase"] == "undefined"?"":firstResponse["phrase"],
            firstResponseText = typeof firstResponsePhrase["text"] == "undefined"?"":firstResponsePhrase["text"],
            firstResponseMeanings = firstResponse["meanings"],
            firstResponseFirstMeaning = typeof firstResponseMeanings == "undefined"?"":firstResponseMeanings[0],
            firstResponseFirstMeaningText = typeof firstResponseFirstMeaning["text"] == "undefined"?"":firstResponseFirstMeaning["text"],
            responseValue = firstResponseText == ""?firstResponseFirstMeaningText:firstResponseText;
            
        responseValue = responseValue.replace(/(\[<)+(?:.|\n)*?(\]>)+/gm, '');
//        responseValue = responseValue.replace(/\[(?:.|\n)*?\]/gm, '');
        
        var back = toOriginLang?value:responseValue,
            front = toOriginLang?responseValue:value,
            originalData = response.data;
        
        console.log(response);
        console.log(firstResponse);
        
        dispatcher.dispatch({
            type: "UPDATE_CARD",
            key: cardKey,
            cardData: {frontText:front, backText:back, originalData}
        });
        

    })
    .catch(function (response) {
     
        console.log(response);
    
    });

}
