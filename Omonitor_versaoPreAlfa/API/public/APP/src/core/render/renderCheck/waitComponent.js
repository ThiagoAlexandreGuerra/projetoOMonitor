export default function waitComponent(component) {

    console.log(`component: `)
    console.log(component)
    return new Promise(resolve => {

        if (document.getElementById(component._id)) {
            resolve(true);
            return;
        }

        const observer = new MutationObserver(() => {

            if (document.getElementById(component._id)) {

                observer.disconnect();

                resolve(true);

            }

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    });

}