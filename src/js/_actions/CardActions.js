import dispatcher from "../dispatcher";
import * as WebAPI from "../WebAPI";
   
export function addCard( cardData, assignedKey ) {
    
    dispatcher.dispatch({
        type: "ADD_CARD",
        cardData,
        assignedKey
    });

}
              
export function removeCard( key ) {
    
    dispatcher.dispatch({
        type: "REMOVE_CARD",
        key
    });
    
}
    
export function updateCard( key, cardData ) {
    
    dispatcher.dispatch({
        type: "UPDATE_CARD",
        key,
        cardData
    });
    
}
 
export function sendValueToTranslate( cardKey, value, toOriginLang ) {
    
    WebAPI.getTranslation( cardKey, value, toOriginLang );
    
}