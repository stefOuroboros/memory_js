const template = `

`;

class HomePage extends HTMLElement {


    static get observedAttributes() {
        return ["difficulty"];
    }

    constructor() {
        super();
    }
    connectedCallback() {
        this.root.innerHTML = template;
    }
}


customElements.define("homePage", HomePage);