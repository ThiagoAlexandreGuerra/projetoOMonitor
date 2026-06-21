import Navigation           from "../../core/navigation/domElementNavigator/Navigation.js";
import LayoutCoordinator    from "../../core/layoutHandler/LayoutCoordinator/LayoutCoordinator.js";
import ExecutionBlock       from "../../core/layoutHandler/ExecutionBlock/ExecutionBlock.js";
import Favicon              from "../../core/systemComponents/components/favicon/Favicon.js";

import intro            from "../layout/intro/intro.js";
import explanations     from "../layout/explanations/explanations.js";
import lab              from "../layout/lab/lab.js";
import showroom         from "../layout/showroom/showroom.js";
import landingPage      from "../layout/landingPage/landingPage.js";
import questionConsole  from "../layout/console/questionConsole.js";
import login            from "../layout/login/login.js";
export default class HomeView {

    constructor() {
        this._navigation = new Navigation();
    }

    
    criarLayout(events) {
    
        new Favicon("Monitor");
        
        new LayoutCoordinator(
                new ExecutionBlock({

                            existe: ["start"],

                            onEnter: [
                                () => intro(this._navigation),
                            ],
            
                            onExit: [
                                () => {events.onCleanDOMElements("intro");}
                            ],

                }), 

                new ExecutionBlock({

                            existe: ["landingPage"],

                            onEnter: [
                                ()=>{landingPage(this._navigation)}
                            ],

                            onExit: [
                                () => {events.onCleanDOMElements("lLandingPage");}
                            ],
                }),

                new ExecutionBlock({

                            existe: ["console"],

                            onEnter: [
                                ()=>{questionConsole(this._navigation)}
                            ],

                            onExit: [
                                ()=> {events.onCleanDOMElements("lConsole")}
                            ],
                }),

                new ExecutionBlock({

                            existe: ["login"],

                            onEnter: [
                                ()=>{login(this._navigation)}
                            ],

                            onExit: [
                                ()=> {events.onCleanDOMElements("lLogin")}
                            ],
                }),


        
        );

    
    }


    

}