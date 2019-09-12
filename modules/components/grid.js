import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";

const template = `
    <button class="difficulty" id="rookie" value="1">Rookie</button>
    <button class="difficulty" id="intermediate" value="2">Intermediate</button>
    <button class="difficulty" id="expert" value="3">Expert</button>
    <style>
        .grid-container {
            width: 50%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            background-color: grey;
        }
        .grid-cell {
            position: relative;
            height: 150px;
            width: 150px;
            margin: 8px;
            background-color: black;
        }
    </style>
    `;
class GameGrid extends HTMLElement {

    // Handler attribute
    static get observedAttributes() {
        return ["difficulty"];
    }
    
    get difficulty() {
        return JSON.parse(this.getAttribute("difficulty").toLowerCase());
    }
    set difficulty(value) {
        this.setAttribute("difficulty", value);
    }

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
        this.numberImages   = this.numberImages || 3;
        this.repeatImages   = this.repeatImages || 2;
        this.listImages = getRandomListImages(this.numberImages);
        this.difficulty = null;
        this.mapping = [];
        console.log(this.listImages);
        

        EventBus.subscribe('onCreateImageOnGrid', image => {
            this.mapping.push(this.initGridImagePath(image));
        });

        EventBus.subscribe('onTurnImage', () => {
            this.tryGridCombination(this.findGridImagesTurned());
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

    initGridImagePath(image) {

        let countRepeat;
        do {
            countRepeat = 0;
            image.path = this.listImages[Math.floor(Math.random() * this.listImages.length)];
            this.mapping.forEach(element => {
                if (element.path === image.path) {
                    countRepeat++;
                }
            });
        } while (countRepeat >= this.repeatImages);
        return image;
    }
    findGridImagesTurned() {
        return this.mapping.filter(image => image.turned === true && image.found === false); 
    }
    
    findGridImagesFound() {
        return this.mapping.filter(image => image.turned === true && image.found === true); 
    }

    markFoundImage(turnedImages) {
        turnedImages.map(image => image.found = true);
    }
    
    
    turnOffImage(turnedImages) {
        turnedImages.map(image => image.turned = false);
    }


    tryGridCombination(turnedImages) {
        console.log(turnedImages);
        let countSimilar = turnedImages.reduce((accumulator, currentImage) => {
            console.log('test reduce');
            
            return accumulator += turnedImages[0].path === currentImage.path ? 1 : 0; 
        }, 0);
        if (turnedImages.length === this.repeatImages && countSimilar === this.repeatImages) {
            this.markFoundImage(turnedImages);
        }
        if (turnedImages.length === this.repeatImages && countSimilar !== this.repeatImages) {
            this.turnOffImage(turnedImages);
        } 
        console.log(countSimilar);
    }
}

customElements.define("game-grid", GameGrid);