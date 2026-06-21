export default function instantRenderer(tag, styles = {}, propertys = {}, append = false) {
  

    const element = document.createElement(tag);

    Object.assign(element.style, styles);
    Object.assign(element, propertys);
    
    if (append) {
        document.body.appendChild(element);
    }

    return element;
} 