import { VALID_EVENTS } from "./isValid/lists.js"

export const PermissionLayer = base => class extends base{

    constructor(...args) {

        super(...args);

        this._onHeritage = false;

    }

    isValidEventType(eventType) {

        if (typeof eventType !== "string") {
            return false;
        }

        return this.VALID_EVENTS.has(eventType);
    }
}