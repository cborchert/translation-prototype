//Main file, renders the app

//Import React
import React from "react";
import ReactDOM from "react-dom";

//Import React Router
import { Router, Route, IndexRoute, Redirect, browserHistory, hashHistory} from "react-router";
//import createBrowserHistory from "history/lib/createBrowserHistory";
//const routerHistory = createBrowserHistory();

//Import dispatcher
import dispatcher from "./dispatcher";

//Import the components
import Layout from "./components/Layout";

class App extends React.Component {
 
    constructor() {

        //Super must be called before using this see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
        super();
        
    }

    componentWillMount() { }
    
    componentWillUnmount() { }
    
    render() {
     
        return (

            <div id="the-app">
            
                <Router history={hashHistory}>
                
                    <Route path="/" component={Layout} />
            
                </Router>
                
            </div>
            
        );

    }
  
}


const contentContainer = document.getElementById("app-root");
ReactDOM.render( <App />, contentContainer );  