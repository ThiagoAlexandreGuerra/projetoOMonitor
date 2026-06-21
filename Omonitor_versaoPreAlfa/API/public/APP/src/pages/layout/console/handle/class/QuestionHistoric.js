export default class QuestionHistoric {

    constructor() {
        this._historic = new Map();
        this._alreadyStorage = new Set();
        this._callOrderIndex = 1;
    }

    // =========================
    // CORE
    // =========================
    sendToHistoric(question, select) {

        if (!this._alreadyStorage.has(question.id)) {
            this._newQuestion(question, select);
        } else {
            this._updateStatusQuestion(question, select);
        }
    }

    _newQuestion(question, select) {
        const now = this._getDateTime();

        const record = {
            callOrder: this._callOrderIndex++,
            questionId: question.id,
            quest: question,
            modifications: [now],
            areadyMade: true,
            selectAlternative: select,
        };

        this._historic.set(question.id, record);
        this._alreadyStorage.add(question.id);
    }

    _updateStatusQuestion(question, select) {

        const now = this._getDateTime();

        const record = this._historic.get(question.id);

        if (!record) return;

        record.modifications.push(now);
        record.selectAlternative = select;
        record.areadyMade = true;

        this._historic.set(question.id, record);
    }

    _getDateTime() {
        const d = new Date();
        return {
            time: d.toLocaleTimeString('pt-BR'),
            date: d.toLocaleDateString('pt-BR'),
            timestamp: d.getTime()
        };
    }

    // =========================================================
    // GETTERS
    // =========================================================

    // 1. Todas as questões
    getAllHistoric() {
        return Array.from(this._historic.values());
    }

    // 2. Por ID da questão
    getQuestionById(questionId) {
        return this._historic.get(questionId) || null;
    }

    // 3. Por call order index
    getQuestionForCallOrderIndex(index) {
        return this.getAllHistoric()
            .find(q => q.callOrder === index) || null;
    }

    // 4. Por data específica (ex: "19/06/2026")
    getQuestionForDate(date) {
        return this.getAllHistoric().filter(q => {
            return q.modifications.some(m => m.date === date);
        });
    }

    // 5. Por range de datas
    getQuestionForRangeDate(startDate, endDate) {

        return this.getAllHistoric().filter(q => {

            return q.modifications.some(m => {
                const current = this._parseDate(m.date);
                return current >= this._parseDate(startDate)
                    && current <= this._parseDate(endDate);
            });
        });
    }

    // 6. Por range de tempo (timestamp)
    getQuestionForRangeTime(startTimestamp, endTimestamp) {

        return this.getAllHistoric().filter(q => {

            return q.modifications.some(m => {
                return m.timestamp >= startTimestamp &&
                       m.timestamp <= endTimestamp;
            });
        });
    }

    // =========================================================
    // HELPERS
    // =========================================================

    _parseDate(dateStr) {
        // converte "19/06/2026" → timestamp
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`).getTime();
    }
}