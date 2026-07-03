import getId        from "../../componentIdentify/componentId/getId.js";
import StandartBox  from "./StandardBox.js";

export default class BoxWithChildBoxes extends StandartBox {

    constructor(
        hasChildren = 1,
        layout = "vertical",
        onHeritage = false
    ) {

        super(onHeritage);

        this._validateInput(
            hasChildren,
            onHeritage,
            layout
        );

        this._classIdentify = "BWC";
        this._id = getId(this._classIdentify);

        this._classNName.push("BoxWithChildBoxes");

        this._hasChildren = hasChildren;
        this._layout = layout;

        this._son = null;
        this._grandson = null;
        this._greatGrandson = null;

        this._sizeParentElementComparedToChildElement=0.9;
        this._auxFor = [
            "_son",
            "_grandson",
            "_greatGrandson"
        ];

        this._updatePropertyConfig({
            className: this.getElementClassNames(),
            id: this._id
        });

        this._updateStyleConfig({
            padding:"0px"
        })

        this._configureLayout();
        this._addSubChildren();

        this.BWCComponents = this._children;
    }

    _validateInput(
        hasChildren,
        onHeritage,
        layout
    ) {

        const validChildren =
            typeof hasChildren === "number" &&
            Number.isInteger(hasChildren) &&
            hasChildren >= 0 &&
            hasChildren <= 3;

        if (!validChildren) {
            throw new TypeError(
                "hasChildren must be an integer between 0 and 3."
            );
        }

        if (typeof onHeritage !== "boolean") {
            throw new TypeError(
                "onHeritage must be a boolean."
            );
        }

        const allowedLayouts = [
            "vertical",
            "horizontal",
            "cascade"
        ];

        if (!allowedLayouts.includes(layout)) {
            throw new TypeError(
                "layout must be 'vertical', 'horizontal' or 'cascade'."
            );
        }

        return true;
    }

    _heritage(parentHeritage){

        parentHeritage?.parentWidth == "auto"   || this.BWCResizeWidth(parentHeritage?.parentWidth);
        parentHeritage?.parentHeight == "auto"  || this.BWCResizeHeight(parentHeritage?.parentHeight);
    }

    BWCResizeWidth(value){

        this.setWidth(value);
       
        const newWidth = `${(this.getWidth()/this._hasChildren)*this._sizeParentElementComparedToChildElement}px`;
    
        this._son?.setWidth(newWidth);
        this._grandson?.setWidth(newWidth);
        this._greatGrandson?.setWidth(newWidth);

        return this;
    }

    BWCResizeHeight(value){

        this.setHeight(value);
        this._son?.setHeight(`${this.getHeight()*this._sizeParentElementComparedToChildElement}px`);
        this._grandson?.setHeight(`${this.getHeight()*this._sizeParentElementComparedToChildElement}px`);
        this._greatGrandson?.setHeight(`${this.getHeight()*this._sizeParentElementComparedToChildElement}px`);

        return this;
    }

    BWCSizeParentElementComparedToChildElement(value){

        this._sizeParentElementComparedToChildElement = value;

        return this;
    }

    getSon(){               return this._son;}
    getGrandson(){          return this._grandson;}
    getGreatGrandson(){     return this._greatGrandson;}

    _removeSon()            {this._removeChildBoxes(0); }
    _removeGrandson()       {this._removeChildBoxes(1); }
    _removeGreatGrandson()  {this._removeChildBoxes(2); }

    _removeChildBoxes(index){
        if (index < 0 || index >= this._children.length) return;
        this._children.splice(index, 1);
    }
    _configureLayout() {

        let flexDirection = "column";

        if (this._layout === "horizontal") {
            flexDirection = "row";
        }

        this._updateStyleConfig({
            display: "flex",
            flexDirection,
            gap: "10px",
            width: "500px",
            height: "500px"
        });
    }

    _addSubChildren() {

        if (this._layout === "cascade") {
            this._createCascadeChildren();
            return;
        }

        this._createRegularChildren();
    }

    _createRegularChildren() {

        for (let i = 0; i < this._hasChildren; i++) {

            const prop = this._auxFor[i];

            this[prop] = new StandartBox();

            this[prop]
                ._removeStandardPosition()
    

            this._defineChildSize(prop);

            this._children.push(this[prop]);
        }
    }

    _createCascadeChildren() {

        let currentParent = this;

        for (let i = 0; i < this._hasChildren; i++) {

            const prop = this._auxFor[i];

            const child = new StandartBox();

            child._removeStandardPosition();

            currentParent[prop] = child;

            this._resizeCascadeChild(child, currentParent );

            currentParent._children.push(child);

            currentParent = child;
        }
    }

    _resizeCascadeChild(child , currentParent) {

        const width =
            parseFloat(
                currentParent._styleConfig.width.replace("px", "")
            );

        const height =
            parseFloat(
                currentParent._styleConfig.height.replace("px", "")
            );
    
        child.setPadding("10px");
        child.setWidth(`${width * 0.9}px`);
        child.setHeight(`${height * 0.9}px`);
    }

    _defineChildSize(childProperty) {

        const width =
            parseFloat(
                this._styleConfig.width.replace("px", "")
            );

        const height =
            parseFloat(
                this._styleConfig.height.replace("px", "")
            );

        const child = this[childProperty];

        if (!child) {
            throw new Error(
                `Child '${childProperty}' not found.`
            );
        }

        let childWidth = width;
        let childHeight = height;

        if (this._layout === "vertical") {

            childWidth = width * 0.9;
            childHeight = height * 0.25;

        } else if (this._layout === "horizontal") {

            childWidth = width * 0.25;
            childHeight = height * 0.9;
        }

        child.setWidth(`${childWidth}px`);
        child.setHeight(`${childHeight}px`);
    }
}