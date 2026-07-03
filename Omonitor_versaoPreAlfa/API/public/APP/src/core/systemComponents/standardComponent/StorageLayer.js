export const StorageLayer = base => class extends base{

     constructor(...args) {

        super(...args);

        this._children          = [];
        this._isChild           = false;
        this._function          = [];
        this._behaviorFunction  = [];
        this._elementCallbacks  = [{
                                        callbackFunction: null,
                                        eventType:"", 
                                    }];
    }
}