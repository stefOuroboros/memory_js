import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";

const template = `
    <style>
        .grid-container {
            width: 50%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .grid-cell {
            position: relative;
            height: 50px;
            width: 50px;
            margin: 8px;
            background-color: black;
        }
    </style>
    `;
class GameGrid extends HTMLElement {

    // Handler attribute

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
        this.numberImages   = this.numberImages || 6;
        this.repeatImages   = this.repeatImages || 2;
        this.listImages     = getRandomListImages(this.numberImages);
        this.mapping        = [];

        console.log(getRandomListImages(this.numberImages));

        EventBus.subscribe('onCreateImageOnGrid', image => {
            console.log(image);
        });
    }
    connectedCallback() {
        const templateDyn = `
            <div class="grid-container">
                ${range(this.repeatImages * this.numberImages).map( n=>
                    `<div class="grid-cell">
                        <game-image></game-image>
                    </div>`
                ).join("")}
            </div>`;
        this.shadowRoot.innerHTML = template + templateDyn;
    }

    initGridImage() {

    }

}

customElements.define("game-grid", GameGrid);