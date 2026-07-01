export default class Question {

    constructor(question) {

        this._id = -1;
        this._answerKey = '';
        this._questionWording = "";
        this._review = "";
        this._solving = "";
        this._alternatives = [];

        this._fillQuestion(question);
    }

    _fillQuestion(question){

        this._id = question.id;
        this._answerKey = question.gabarito;
        this._questionWording = question.comando;
        this._solving = question.resolucao;
        this._review= question.revisao;

        question.alternativas.forEach(alternatives => {
            this._alternatives.push({
                text:alternatives.texto,
                alternative:alternatives.letra
            })
        });
    }
    getAnswerKey()          {return this._answerKey;}
    getQuestionWording()    {return this._questionWording;}
    getReview()             {return this._review;}
    getAlternatives()       {return this._alternatives;}
    getId()                 {return this._id;}

    setId(value)               {this._id;}
    setAnswerKey(value)        {this._answerKey = value;}
    setQuestionWording(value)  {this._questionWording = value;}
    setReview(value)           {this._review = value;}
    setAlternatives(value) {

        if (!Array.isArray(value)) {
            throw new Error("Alternatives must be an array");
        }
        this._alternatives = value;
    }

    addAlternative(text, alternative) {
        this._alternatives.push({
            text,
            alternative
        });
    }

    clearAlternatives() {
        this._alternatives = [];
    }
}