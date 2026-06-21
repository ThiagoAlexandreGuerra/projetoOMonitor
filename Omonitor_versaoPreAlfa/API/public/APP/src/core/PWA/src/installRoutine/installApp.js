let deferredPrompt = null;

/**
 * Armazena o evento de instalação quando ele estiver disponível.
 */
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log(window.isSecureContext);alert(String(deferredPrompt));

});

/**
 * Limpa o evento quando a instalação for concluída.
 */
window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
});

/**
 * Abre a janela de instalação do PWA.
 * @returns {Promise<boolean>} true se o usuário aceitou, false caso contrário.
 */
export default async function installApp() {

    console.log(window.isSecureContext);
    console.log(deferredPrompt)
    if (!deferredPrompt) {
        return false;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    deferredPrompt = null;

    return outcome === "accepted";
}

/**
 * Verifica se o aplicativo já está instalado.
 * @returns {boolean}
 */
export function isAppInstalled() {

    // Android e alguns navegadores
    if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
    }

    // iOS Safari
    if (window.navigator.standalone === true) {
        return true;
    }

    return false;
}

/**
 * Verifica se a instalação está disponível.
 * @returns {boolean}
 */
export function canInstallApp() {
    return deferredPrompt !== null;
}