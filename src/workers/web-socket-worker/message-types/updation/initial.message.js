

export class InitialUpdation {
    actions = [];
    date = new Date();
    texts;
    title;

    constructor (data) {
        this.data = data;
        this.texts = this.createTexts(data);
        this.title = this.createTitle(data);
    }

    createTexts(data) {
        return []
    }

    createTitle(data) {
        return ''
    }
}