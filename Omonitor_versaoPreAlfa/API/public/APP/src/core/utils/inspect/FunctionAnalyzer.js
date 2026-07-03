import { parse } from "@babel/parser";

export default class FunctionAnalyzer {

    #function;
    #source;
    #ast;
    #functionNode;

    constructor(func){

        this.#function = func;

        this.#source = func.toString();

        this.#ast = parse(this.#source,{
            sourceType:"module"
        });

        this.#functionNode =
            this.#ast.program.body[0];

    }

}