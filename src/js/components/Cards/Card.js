import React from "react";
import * as CardActions from "../../_actions/CardActions";

import CardDefinition from "./CardDefinition";

export default class Card extends React.Component {
 
    constructor() {
        
        super();
        
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
                        
        return ( 
        
            <div class="card" id={"card-"+this.props.cardKey}>
            
                <div class="card-body">
                    <div class="card-menu-button">menu</div>
                    <div class="card-definitions">
                        <CardDefinition cardKey={this.props.cardKey} toOriginLang={false} label="front" language="français" toLanguage="engish" onInputChange={this.updateFrontText} text={this.props.cardData.frontText} />
                        <CardDefinition cardKey={this.props.cardKey} toOriginLang={true} label="back" language="english" toLanguage="français" onInputChange={this.updateBackText} text={this.props.cardData.backText} />
                    </div>
                    <div class="card-ok-button">Ok</div>
                    <div class="card-expand-button">expand</div>
                </div>
            
                <div class="card-extra">
            
                    <div class="entries">
                        <h3>Entries</h3>
                        <div class="entries-body">
                            {parsedEntries}
                        </div>
                    </div>
            
                    <div class="examples">
                        <h3>Examples</h3>
                        <div class="examples-body">
                            {parsedExamples}
                        </div>
                    </div>
            
                </div>
            
            </div>
            
        );
        
    }
    
}