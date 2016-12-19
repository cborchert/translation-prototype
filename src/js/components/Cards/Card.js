import React from "react";
import * as CardActions from "../../_actions/CardActions";

export default class Card extends React.Component {
 
    constructor() {
        
        super();
        
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
        
            <div class="card">
            
                <div class="card-body">
                    <div class="card-menu-button">menu</div>
                    <div class="card-definitions">
                        <div class="card-definition card-definition-front">
                            <div class="card-input-container">
                                {/*<input value={this.props.cardData.frontText}  />*/}
                                <div class="input" dangerouslySetInnerHTML={{__html: this.props.cardData.frontText}}></div>
                                <span>french</span>
                            </div> 
                            <button>&rarr; english</button>
                        </div>
                        <div class="card-definition card-definition-back">
                            <div class="card-input-container">
                                {/*<input value={this.props.cardData.backText}  />*/}
                                <div class="input" dangerouslySetInnerHTML={{__html: this.props.cardData.backText}}></div>
                                <span>english</span>
                            </div>
                            <button>&larr; french</button>
                        </div>
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