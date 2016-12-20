import React from "react";

import CardStore from "../../_stores/CardStore";
import Card from "./Card";

export default class CardCollection extends React.Component{
    
    constructor( props ) {
        
        super( props );
        
        this.state = {
            
            cardFeed: CardStore.getCards(),
            //open card from appstore
            
        };
        
        this.updateCards = this.updateCards.bind(this);
        
    }
    
    componentWillMount() {
     
        CardStore.on("change_cards", this.updateCards);
        
    }
    
    componentWillUnmount() {
     
        CardStore.removeListener("change_cards", this.updateCards);
        
    }
    
    updateCards() {
        
        //console.log("got an update!");
        
        var cardFeed = CardStore.getCards();
        
        this.setState({
            
            cardFeed
            
        });
        
    }
    
    render() {
     
        var cardFeed = this.state.cardFeed.map( (card) => {
           
            //console.log( card.key, card.cardData );
            return <Card key={card.key} cardKey={card.key} cardData={card.cardData} />
            
        });
        
        return ( 
            <div class="card-collection">
                {cardFeed}
            </div>
        );
        
    }
    
    
}