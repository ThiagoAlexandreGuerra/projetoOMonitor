import {updateVirtualDom} from "../../virtualDOM/main/virtualDom.js";
import autoDisplay from "../utils/auto/autoDisplay.js";
import getCaller from "../utils/getters/getCaller.js";

export const StyleLayer = base => class extends base {
    
    constructor(...args) {

        super(...args);
        this.element                    = null;
        this._removConfgPadJaChamada    = false;
        this._styleConfig               = {};
        this._propertyConfig            = {};

        this._alignItems            = "";
        this._background            = "";
        this._backgroundColor       = "";
        this._backgroundImage       = "";
        this._backgroundRepeat      = "";
        this._backgroundPosition    = "";
        this._backgroundSize        = "";
        this._border                = "";
        this._borderTop             = "";
        this._borderRight           = "";
        this._borderBottom          = "";
        this._borderLeft            = "";
        this._borderRadius          = "";
        this._boxShadow             = "";
        this._boxSizing             = "";

        this._bottom                = "";
        this._top                   = "";
        this._left                  = "";
        this._right                 = "";
        this._gap                   = "";
        this._gridColumnStart       = "";
        this._color                 = "";
        this._cursor                = "";
        this._display               = "";
        this._scrollTop

        this._flexDirection         = "";
        this._flexWrap              = "";
        this._flexGrow              = "";
        this._flexShrink            = "";
        this._flexBasis             = "";
        this._justifyContent        = "";

        this._fontSize              = "";
        this._fontFamily            = "";
        this._fontWeight            = "";
        this._fontStyle             = "";
        this._lineHeight            = "";
        this._letterSpacing         = "";
        this._textAlign             = "";
        this._textDecoration        = "";
        this._textTransform         = "";

        this._height                = "";
        this._width                 = "";
        this._minWidth              = "";
        this._minHeight             = "";
        this._maxWidth              = "";
        this._maxHeight             = "";

        this._margin                = "";
        this._marginTop             = "";
        this._marginRight           = "";
        this._marginBottom          = "";
        this._marginLeft            = "";

        this._padding               = "";
        this._paddingTop            = "";
        this._paddingRight          = "";
        this._paddingBottom         = "";
        this._paddingLeft           = "";

        this._overflow              = "";
        this._overflowX             = "";
        this._overflowY             = "";

        this._opacity               = "";
        this._outline               = "";

        this._position              = "";
        this._transform             = "";
        this._transition            = "";

        this._visibility            = "";
        this._whiteSpace            = "";
        this._wordWrap              = "";

        this._zIndex                = "";

        this._id                    = "";
        this._className             = "";
        this._textContent           = "";
        this._innerHTML             = "";
        this._mask                  = "";
        this._clipPath              = "";
    }


   _set(prop, styleProp, value) {

        this[prop] = value;
        this._styleConfig[styleProp] = value;
        this._CallUpdateDOM(styleProp, value);

    }

    _setProperty(prop , propertyProp , value , isAddRoutine = false){

        if(isAddRoutine && Array.isArray(this[prop]) &&  this._propertyConfig[propertyProp]){

            this[prop] = this[prop].concat(value);
            this._propertyConfig[propertyProp] = `${this._propertyConfig[propertyProp]} ${(value)}`;

        }else{
            
            this[prop] = value;
            this._propertyConfig[propertyProp] = value;
        } 

        this._CallUpdateDOM(propertyProp, value);
        
    }

    _CallUpdateDOM(typeProp , value){

        updateVirtualDom({
            id: this.getId(),
            typeProp,
            value
        });
    }
    
    _setElementReference(el){
        if(el){
            this.element=el;
        }
    }

    _addStyleConfig(newStyle = {}) {
    
            if (
                typeof newStyle !== "object" ||
                newStyle === null
            ) {
                throw new Error(
                    "Style config must be an object."
                );
            }
    
            for (const key in newStyle) {
    
                if (!(key in this._styleConfig)) {
    
                    this._styleConfig[key] =
                        newStyle[key];
                }    
            }
    
            return this;
    }
    
    
    _updateStyleConfig(newStyle = {}) {
    
            if (
                typeof newStyle !== "object" ||
                newStyle === null
            ) {
                throw new Error(
                    "Style config must be an object."
                );
            }
    
            this._styleConfig = {
                ...this._styleConfig,
                ...newStyle
            };
    
            return this;
    }
    
    
    _swapStyleConfig(newStyle = {}) {
    
            if (
                typeof newStyle !== "object" ||
                newStyle === null
            ) {
                throw new Error(
                    "Style config must be an object."
                );
            }
    
            this._styleConfig =
                structuredClone(newStyle);
    
            return this;
    }

    _addPropertyConfig(newProperties = {}) {
    
            if (
                typeof newProperties !== "object" ||
                newProperties === null
            ) {
                throw new Error(
                    "Property config must be an object."
                );
            }
    
            for (const key in newProperties) {
    
                if (!(key in this._propertyConfig)) {
    
                    this._propertyConfig[key] =
                        newProperties[key];
                }
            }
    
            return this;
    }
    
    
    _updatePropertyConfig(newProperties = {}) {
    
            if (
                typeof newProperties !== "object" ||
                newProperties === null
            ) {
                throw new Error(
                    "Property config must be an object."
                );
            }
    
            this._propertyConfig = {
                ...this._propertyConfig,
                ...newProperties
            };
    
            return this;
    }
    
    
    _swapPropertyConfig(newProperties = {}) {
    
            if (
                typeof newProperties !== "object" ||
                newProperties === null
            ) {
                throw new Error(
                    "Property config must be an object."
                );
            }
    
            this._propertyConfig =
                structuredClone(newProperties);
    
            return this;
    }
    
    
    _removePropertyConfig(...properties) {
    
            for (const property of properties) {
    
                delete this._propertyConfig[property];
            }
    
            return this;
    }
    
    
    _getPropertyConfig(propertyName = null) {
    
            if (propertyName === null) {
                return structuredClone(this._propertyConfig);
            }
    
            return this._propertyConfig[propertyName];
    }
    
    
    _hasPropertyConfig(propertyName) {
    
            return propertyName in this._propertyConfig;
        }
    
    
    _clearPropertyConfig() {
    
            this._propertyConfig = {};
    
            return this;
    }

    _autoDisplay(element){
        autoDisplay(element);
    }

   
}
