import React from "react";

import LayoutHead from './Layout/LayoutHead';
import LayoutBody from './Layout/LayoutBody';
import LayoutFoot from './Layout/LayoutFoot';

import Search from './Search/Search';
import CardCollection from './Cards/CardCollection';

export default class Layout extends React.Component {
    
    constructor() {
        
        super();
        
    }
    
    render() {
     
        return (
            
            <div>
            
                <LayoutHead />
            
                <LayoutBody>
                    <Search />
                    <CardCollection />
                </LayoutBody>
            
                <LayoutFoot />
            </div>
            
        );
        
    }
    
}