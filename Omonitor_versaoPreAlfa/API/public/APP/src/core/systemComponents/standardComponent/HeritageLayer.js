export const HeritageLayer = base => class extends base {

     constructor(...args) {

        super(...args);
        this.heritage = [];
    }

    setHeritage(...styles){
        this.heritage = styles
    }

    getBackgroundColor() {

        return this.heritage["backgroundColor"] || null;
    }

    getWidth() {

        return this.heritage["width"] || null;
    }

    getHeight() {

        return this.heritage["height"] || null;
    }

    getZIndex() {

        return this.heritage["zIndex"] || null;
    }
}