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
import landingPageBanks from "../layout/landingPage/components/landingPageBanks.js";
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
                                () => {events.onCleanDOMElements("lLandingPages");}
                            ],
                }),

                  new ExecutionBlock({

                            existe: ["landingPageBanks"],

                            onEnter: [
                                ()=>{landingPageBanks(this._navigation)}
                            ],

                            onExit: [
                                () => {events.onCleanDOMElements("lLandingPageBanks");}
                            ],
                }),

                new ExecutionBlock({

                            existe: ["questionConsole"],

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