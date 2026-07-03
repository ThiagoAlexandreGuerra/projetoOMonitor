export default function wrap(object, behavior) {

    Object.assign(
        object,
        behavior
    );
    
    return object;
}