export default class QuestionCache {

    #cache = new Map();

    has(id){
       
        return this.#cache.has(id);
    }

    get(id){
        return this.#cache.get(id);
    }

    add(question){
        const time = new Date().toLocaleTimeString('pt-BR');
        const date = new Date().toLocaleDateString('pt-BR');
        let storage = [{
            question,
            time,
            date
        }]
        this.#cache.set(question.id, storage);
       
    }

    clear(){
        this.#cache.clear();
    }

}