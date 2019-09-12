import { EventBus } from "../utils/EventBus.js";
const template = `
    <style>
        root {
            display: block;
            background-color: #FDFDFD;
            background-image: url('./back.svg');
            background-position: 50% 50%;
            background-size: 80%;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        }
    </style>
    <root></root>
`;

class GameImage extends HTMLElement {

    static get observedAttributes() {
        return ["turned"];
    }

    get found() {
        return JSON.parse(this.getAttribute("found").toLocaleLowerCase());
    }
    set found(value) {
        this.setAttribute("found", value);
    }

    get turned() {
        return JSON.parse(this.getAttribute("turned").toLocaleLowerCase());
    }
    set turned(value) {
        this.setAttribute("turned", value);
    }

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        //init image properties
        this.found = false;
        this.turned = false;
        this.path = null;

        this.addEventListener('click', event => {
            if (this.turned === false && this.found === false) {
                this.turned = true;
                this.root.querySelector("root").style.backgroundImage = "url(imagesGame/" + this.path + ")";
                EventBus.post("onTurnImage");
            }
        });
        EventBus.post('onCreateImageOnGrid', this);
    }

    connectedCallback() {
        this.root.innerHTML = template;
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName === 'turned' && newVal === 'false') {
            setTimeout(() => {
                this.root.querySelector("root").style.backgroundImage = "url(./back.svg)";
            }, 1000);
        }

        console.log("=======================");
        console.log(attrName, oldVal, newVal);
        console.log("=======================");

    }
}

customElements.define("game-image", GameImage);