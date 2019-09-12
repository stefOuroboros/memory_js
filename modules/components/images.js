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

    static get observedAttribute() {
        return ["turned"];
    }

    get found() {
        return this.getAttribute("found").toLocaleLowerCase();
    }
    set found(value) {
        this.setAttribute("found", value);
    }

    get turned() {
        return this.getAttribute("turned").toLocaleLowerCase();
    }
    set turned(value) {
        this.setAttribute("turned", value);
    }

    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});
        //init image properties
        this.found  = false;
        this.turned = false;
        this.path   = null;
        EventBus.post('onCreateImageOnGrid', 'titi');
    }
    connectedCallback() {
        this.root.innerHTML = template;
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(attrName, oldVal, newVal);
    }
}

customElements.define("game-image", GameImage);