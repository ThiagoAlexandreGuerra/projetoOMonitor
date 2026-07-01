import { externalFontsLinks } from "./externalFontsLinks.js";
import { addLinksToDOM } from "../../../utils/tools/addLinksToDOM.js";

export default class ExternalFonts{
    constructor(){
        
    }

    catamaran(){
        addLinksToDOM(externalFontsLinks[`Catamaran`]);
        return `"Catamaran", sans-serif`;
    }

    FiraSans(){
        addLinksToDOM(externalFontsLinks[`FiraSans`]);
        return `"Fira Sans", sans-serif`
    }

    FacultyGlyphic(){
        addLinksToDOM(externalFontsLinks[`FacultyGlyphic`])
        return `"Faculty Glyphic", sans-serif`
    }

    JosefinSans(){
        addLinksToDOM(externalFontsLinks[`JosefinSans`])
        return `"Josefin Sans", sans-serif`;
    }
}