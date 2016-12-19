import React from "react";


export default class LayoutBody extends React.Component {
    
    constructor() {
        
        super();
        
    }
    
    render() {
     
        return (
            
            <div id="app-body">
                {this.props.children} 
            </div>
            
        );
        
    }
    
}