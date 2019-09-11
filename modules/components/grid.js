const template = `
    <style>
        div {
            background-color: #999;
        }
    </style>
    `;
class GameGrid extends HTMLElement {
    constructor() {
        super();
        console.log('constru');
        
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const templateDyn = "<div>test</div>";
        this.shadowRoot.innerHTML = template + templateDyn;
        console.log("callback");
        
    }
}

customElements.define("game-grid", GameGrid);