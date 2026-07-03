export default function observeComponent(component, callback) {

    console.log(component)
    if (!component || !component._id) {
        throw new Error("Componente inválido.");
    }

    let currentState = false;

    function verify() {

        const exists =
            document.getElementById(component._id) !== null;

        if (exists !== currentState) {

            currentState = exists;

            callback(currentState);

        }

    }

    verify();

    const observer = new MutationObserver(() => {
        verify();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return {
        disconnect() {
            observer.disconnect();
        },

        isConnected() {
            return currentState;
        }
    };
}