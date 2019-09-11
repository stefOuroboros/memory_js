import { getRandomListImages } from "../../config.js";

const template = `
    <style>
        div {
            background-color: #999;
        }
    </style>
    `;
class GameGrid extends HTMLElement {

    get numberImages() {
        return parseInt(this.getAttribute("numberImages"), 10);
    }
    set numberImages(value) {
        this.setAttribute("numberImages", value);
    }

    get repeatImages() {
        return parseInt(this.getAttribute("repeatImages"), 10);
    }
    set repeatImages(value) {
        this.setAttribute("repeatImages", value);
    }

    constructor() {

        super();

        this.attachShadow({ mode: "open" });

        this.numberImages = this.numberImages || 6;

        this.repeatImages = this.repeatImages || 2;

        console.log(getRandomListImages(this.numberImages));

    }
    connectedCallback() {
        const templateDyn = "<div>test</div>";
        this.shadowRoot.innerHTML = template + templateDyn;
    }
}

customElements.define("game-grid", GameGrid);