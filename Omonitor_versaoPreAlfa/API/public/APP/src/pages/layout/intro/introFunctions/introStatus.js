const INTRO_INITIALIZED = "INTRO_INITIALIZED";

/**
 * Verifica se a intro já foi exibida nesta sessão.
 */
export function isIntroInitialized() {
    return sessionStorage.getItem(INTRO_INITIALIZED) === "true";
}

/**
 * Marca a intro como exibida.
 */
export function setIntroInitialized() {
    sessionStorage.setItem(INTRO_INITIALIZED, "true");
}

/**
 * Remove a marcação da intro.
 */
export function resetIntroInitialized() {
    sessionStorage.removeItem(INTRO_INITIALIZED);
}