import React from "react";
import * as CardActions from "../../_actions/CardActions";

import CardDefinition from "./CardDefinition";

export default class Card extends React.Component {
 
    constructor() {
        
        super();
        
        this.state = { 
            
            expanded: false, 
            entriesOpen: true,
            examplesOpen: false,
            wordreferenceOpen: false,
            lingueeOpen: false
        
        };
        this.updateFrontText = this.updateFrontText.bind(this);
        this.updateBackText = this.updateBackText.bind(this);
        
    }
    
    updateFrontText(e) {
        
        var cardData = this.props.cardData;
        
        cardData.frontText = e.target.value;
        CardActions.updateCard(this.props.cardKey, cardData);
        
    }
    
    updateBackText(e) {
        
        var cardData = this.props.cardData;
        
        cardData.backText = e.target.value;
        CardActions.updateCard(this.props.cardKey, cardData);
        
    }
    
    removeCard(e) {
     
        e.preventDefault();
        CardActions.removeCard(this.props.cardKey);
        
    }
    
    toggleCardExpand(e) {
        
        e.preventDefault();
        if( this.state.expanded ) {
            
            this.setState({ expanded: false });
        
        } else {
            
            this.setState({ expanded: true });
            
        }
        
    }
    
    handleActivateEntries(e) {
     
        e.preventDefault();
        this.setState({
            entriesOpen: true,
            examplesOpen: false,
            wordreferenceOpen: false,
            lingueeOpen: false
        });
        
    }
    
    handleActivateExamples(e) {
     
        e.preventDefault();
        this.setState({
            entriesOpen: false,
            examplesOpen: true,
            wordreferenceOpen: false,
            lingueeOpen: false
        });
        
    }
    
    handleActivateWordreference(e) {
     
        e.preventDefault();
        this.setState({
            entriesOpen: false,
            examplesOpen: false,
            wordreferenceOpen: true,
            lingueeOpen: false
        });
        
    }
    
    handleActivateLinguee(e) {
     
        e.preventDefault();
        this.setState({
            entriesOpen: false,
            examplesOpen: false,
            wordreferenceOpen: false,
            lingueeOpen: true
        });
        
    }
        
    //Throughout, we need to convert strings to html 
    render() {
        
        //originalData needs to be an object; entries and examples need to be arrays
        var entryKey = 0,
            exampleKey = 0,
            originalData = typeof this.props.cardData.originalData == "undefined"?{}:this.props.cardData.originalData,
            entries = typeof originalData.tuc == "undefined"?[]:originalData.tuc,
            examples = typeof originalData.examples == "undefined"?[]:originalData.examples,
            parsedEntries = entries.map( (entry)=>{
              
                var meaningKey = 0,
                    phrase = typeof entry == "undefined"?"":entry["phrase"],
                    phraseText = typeof phrase == "undefined"?"":phrase["text"],
                    meaningsArray =  typeof entry["meanings"] == "undefined"?[]:entry["meanings"],
                    meanings = meaningsArray.map( (meaning) => {
                       
                        var meaningText = typeof meaning["text"] == "undefined"?"":meaning["text"];
                        
                        meaningKey++;
                        
                        return ( <div key={meaningKey} class="single-meaning" dangerouslySetInnerHTML={{__html: meaningText}}></div>);
                        
                    });
                        
                entryKey++;
                        
                return (
                            <div key={entryKey} class="single-entry">
                                <div class="single-entry-phrase" dangerouslySetInnerHTML={{__html: phraseText}}></div>
                                <div class="single-entry-meanings">{meanings}</div>
                            </div>
                        );
                
            }),
            parsedExamples = examples.map( (example) => {
               
                var firstExampleText = typeof example["first"] == "undefined"?"":example["first"],
                    secondExampleText = typeof example["second"] == "undefined"?"":example["second"];
                    
                exampleKey++;
                
                return (
                            <div key={exampleKey} class="single-example">
                                <div dangerouslySetInnerHTML={{__html: firstExampleText}}></div>
                                <div dangerouslySetInnerHTML={{__html: secondExampleText}}></div>
                            </div>
                        );
                        
            });
                
            var additionalClasses = this.state.expanded?"expanded":"",
                entriesClass = this.state.entriesOpen?"active":"",
                examplesClass = this.state.examplesOpen?"active":"",
                wordreferenceClass = this.state.wordreferenceOpen?"active":"",
                lingueeClass = this.state.lingueeOpen?"active":"";
                        
        return ( 
        
            <div class={"card "+additionalClasses} id={"card-"+this.props.cardKey}>
            
                <div class="card-body">
                    <div class="card-definitions">
                        <CardDefinition cardKey={this.props.cardKey} toOriginLang={false} label="front" language="français" toLanguage="engish" onInputChange={this.updateFrontText} text={this.props.cardData.frontText} />
                        <CardDefinition cardKey={this.props.cardKey} toOriginLang={true} label="back" language="english" toLanguage="français" onInputChange={this.updateBackText} text={this.props.cardData.backText} />
                    </div>
            
                    <div class="card-delete-button" onClick={this.removeCard.bind(this)}>
                        <span class="ui ui-trash"></span>
                    </div>
                    <div class="card-expand-button" onClick={this.toggleCardExpand.bind(this)}>
                        <span class="ui ui-plus-square"></span>
                        <span class="ui ui-minus-square"></span>
                    </div>
                   
                </div>
            
                <div class="card-extra">
                    <div class="card-extra-menu-buttons">
                            <button class={entriesClass} onClick={this.handleActivateEntries.bind(this)}>Entries</button>
                            <button class={examplesClass} onClick={this.handleActivateExamples.bind(this)}>Examples</button>
                            <button class={wordreferenceClass} onClick={this.handleActivateWordreference.bind(this)}>Word Reference</button>
                            <button class={lingueeClass} onClick={this.handleActivateLinguee.bind(this)}>Linguee</button>
                    </div>
                        
                    <div class={"entries extra-content-single "+entriesClass}>
                        <div class="extra-content-single-body">
                            {parsedEntries}
                        </div>
                    </div>
            
                    <div class={"examples extra-content-single "+examplesClass}>
                        <div class="extra-content-single-body">
                            {parsedExamples}
                        </div>
                    </div>
                        
                    <div class={"word-reference extra-content-single "+wordreferenceClass}>
                        <div class="extra-content-single-body">
                            <iframe src={"http://www.wordreference.com/enfr/"+this.props.cardData.frontText}></iframe>
                        </div>
                    </div>
            
                    <div class={"linguee extra-content-single "+lingueeClass}>
                        <div class="extra-content-single-body">
                            <iframe src={"http://www.linguee.fr/francais-anglais/search?source=auto&query="+this.props.cardData.frontText}></iframe>
                        </div>
                    </div>
            
                </div>
            
            </div>
            
        );
        
    }
    
}