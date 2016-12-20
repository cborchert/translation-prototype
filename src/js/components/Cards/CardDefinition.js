import React from "react";
import ReactDOM from "react-dom";

import * as CardActions from "../../_actions/CardActions";

export default class CardDefinition extends React.Component {

    constructor() {
        
        super();
        this.state = { editing: false };
        
    }
    
    handleInputDisplayClick(e) {
        
        this.setState({ editing: true });
        
    }
    
    handleDoneEditing(e) {
        
        this.setState({ editing: false });
        
    }
    
    handleTranslateRequest() {
        
        CardActions.sendValueToTranslate(this.props.cardKey, this.props.text, this.props.toOriginLang );
        
    }
    
    render() {
        
        console.log("editing?", this.state.editing);
        var inputClickHandler = this.state.editing?()=>{return false;}:this.handleInputDisplayClick.bind(this),
            additionalClasses = this.state.editing?"editing":"";
        
        return (
            
            <div class={"card-definition card-definition-"+this.props.label+" "+additionalClasses}>
                <div class="card-input-container">
                    <div class="card-input-input" onClick={inputClickHandler}>
                        <input class="card-input" onFocus={this.handleInputDisplayClick.bind(this)} onBlur={this.handleDoneEditing.bind(this)} ref="definitionInput" value={this.props.text} onChange={this.props.onInputChange} />
                        <span class="ui ui-edit"></span>
                    </div>
                    <button class="card-done-editing" onClick={this.handleDoneEditing.bind(this)}>Done</button>
                </div>
                <div>
                    <span class="card-input-language">{this.props.language}</span>
                    <span class="card-translate-from-def" onClick={this.handleTranslateRequest.bind(this)}>translate this phrase to {this.props.toLanguage}</span>
                </div>
            </div>
            
        );
        
    }

}
