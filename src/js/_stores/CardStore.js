import * as CardActions from "../_actions/CardActions";
import dispatcher from "../dispatcher";
import EventEmitter from "events";
import _ from "underscore";

class CardStore extends EventEmitter {
    
    constructor() {

        super();
        this.cards = [];
        this.lastKey = 0;
        this.dispatchToken = "";

    }
    
    generateKey() {
        
        this.lastKey ++;
        return this.lastKey;
        
    }
    
    getCards() {
        
        return this.cards;
        
    }
    
    addCard( cardData, assignedKey ) {
        
        var key = (typeof assignedKey == "undefined")?this.generateKey():assignedKey;
        this.cards.unshift({key, cardData});
        this.emit("change_cards");
        
    }
    
    removeCard( key ) {
        
        this.cards = _.reject( this.cards, function(item){ return item.key == key } );
        this.emit("change_cards");
        
    }
    
    updateCard( cardKey, cardData ) {
        
        var index = _.findIndex( this.cards, {key: cardKey} );
        
        console.log( this.cards );
        
        if( index == -1 ){ return false; }

        this.cards[index].cardData = cardData;
        this.emit("change_cards");

    }

    handleActions(action) {

        switch(action.type) {
                
            case "ADD_CARD":
                
                this.addCard( action.cardData, action.assignedKey );
                
                break;
                
            case "REMOVE_CARD": 
                
                this.removeCard( action.key );
                
                break;
                
            case "UPDATE_CARD":
                
                this.updateCard( action.key, action.cardData );
                
                break

        }

    }

}

var cardStore = new CardStore;
cardStore.dispatchToken = dispatcher.register( cardStore.handleActions.bind(cardStore) );

export default cardStore;
