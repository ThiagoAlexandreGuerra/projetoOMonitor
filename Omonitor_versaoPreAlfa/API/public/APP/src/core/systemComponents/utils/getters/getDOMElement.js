export default function getDOMElement(object) {

    const id = object._id;
    const element = document.querySelector(`#${id}`);

    if (element) {
        return element;
    }

    throw new TypeError("The id is invalid");
}