import React from "react";
import * as CardActions from "../../_actions/CardActions";
import CardStore from "../../_stores/CardStore";

export default class Search extends React.Component {
    
    constructor() {
        
        super();
        this.state = { searchValue: "" }
        
    }
    
    handleSearchValueChange(e) {
        
        this.setState({ searchValue: e.target.value });
        
    }

    handleTranslateToOrigin(e) {
        
        var val = this.state.searchValue;
        
        if( val == "" ) {  return false; }
        
        var key = CardStore.generateKey(),
            cardData = {backText: val};
            
        CardActions.addCard( cardData, key );
        CardActions.sendValueToTranslate( key, val, true );
        
    }

    handleTranslateFromOrigin(e) {
        
        var val = this.state.searchValue;
        
        if( val == "" ) {  return false; }
        
        var key = CardStore.generateKey(),
            cardData = {frontText: val}; 
            
        CardActions.addCard( cardData, key );
        CardActions.sendValueToTranslate( key, val, false );
        
        
    }
    
    render() {
     
        return (
            
            <div class="search-bar">
            
                <input type="text" value={this.state.searchValue} onChange={this.handleSearchValueChange.bind(this)} />
                <button onClick={this.handleTranslateToOrigin.bind(this)}> &larr; French </button>
                <button onClick={this.handleTranslateFromOrigin.bind(this)}> &rarr; English </button>
            
            </div>
            
        );
        
    }
    
}