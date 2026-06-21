import Question             from "../class/Question.js";
import QuestionCache        from "../class/QuestionCache.js";
import QuestionHistoric     from "../class/QuestionHistoric.js";
import isValidApiResponse   from "../isValid/isValidApiResponse.js";

export default class Main_ConsoleQuestion{

    constructor(){
        this._questionCache = new QuestionCache();
        this._questionHistoric = new QuestionHistoric();
        this._thisApiResponseQuestions = [];
    }

    main(apiResponse){

        this._thisApiResponseQuestions = [];
        console.log(apiResponse.data);

        apiResponse.data.forEach(question => {
            if(!(this._questionCache.has(question.id))){
                this._questionCache.add(question);
            }
            this._thisApiResponseQuestions.push(new Question(question));
        });

    }

    addApiResponse(apiResponse = null){
        console.log(apiResponse);
        if(isValidApiResponse(apiResponse)) return;
        this.main(apiResponse);
    }
    
    questionsToResolve(){
        return this._thisApiResponseQuestions;
    }

    answerQuestion(index, selectAlternative){
        
        this._questionHistoric.sendToHistoric(this._thisApiResponseQuestions[index] ,selectAlternative);
        return this._feedback(this._thisApiResponseQuestions[index]._answerKey , selectAlternative );
    }

    _feedback(answerKey , selectAlternative){

        let feedback = {
            menssage: "Parabéns",
            color: "green",
        }

        if(!(answerKey == selectAlternative)){
            
            feedback = {
                menssage: "Persista",
                color: "red",
            }
        }

        return feedback;
    }
}