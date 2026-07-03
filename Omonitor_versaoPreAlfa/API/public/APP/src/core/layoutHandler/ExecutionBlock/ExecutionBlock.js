export default class ExecutionBlock {

    constructor({
        onEnter = [],
        onExit = [],
        existe = [],
        naoExiste = []
    }) {

        this._onEnter = onEnter;
        this._onExit = onExit;
        this._existe = existe;
        this._naoExiste = naoExiste;

        this._estadoAnterior = false;
    }

    get estadoAtual() {

        const existeOk = this._existe.every(classe =>
            document.querySelector("." + classe)
        );

        const naoExisteOk = this._naoExiste.every(classe =>
            !document.querySelector("." + classe)
        );
        
        return existeOk && naoExisteOk;
    }

    avaliar() {

        const atual = this.estadoAtual;
        
        
        if (atual && !this._estadoAnterior) {
            this._onEnter.forEach(fn => fn());
        }
       
        if (!atual && this._estadoAnterior) {
            this._onExit.forEach(fn => fn());
        }
 
        this._estadoAnterior = atual;
    }
}