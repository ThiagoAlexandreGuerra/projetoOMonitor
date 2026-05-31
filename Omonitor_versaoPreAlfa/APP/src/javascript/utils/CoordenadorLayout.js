export default class CoordenadorLayout {

    constructor(...blocos) {

        this._blocos = blocos;
        this._executando = false;

        this._observer = new MutationObserver(() => {
            this._avaliar();
        });

        this._observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this._avaliar();
    }

    _avaliar() {

        if (this._executando) return;

        this._executando = true;

        this._blocos.forEach(bloco => bloco.avaliar());

        this._executando = false;
    }

    destruir() {
        this._observer.disconnect();
    }
}