import Paragraph from "../../../core/systemComponents/components/paragraph/Paragraph.js";

export default function createParagraphsFromData(objectText){
            if(isObject(objectText)){objectText = [objectText]};

            let paragraphs =[];
            objectText.forEach((txt)=>{
                paragraphs.push(new Paragraph({title:txt.title , subtitle:txt.subtitle , text:txt.text , comment:txt.comment }))
            })
            return paragraphs;
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}