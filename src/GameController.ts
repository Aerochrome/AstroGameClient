import { RenderController } from "./RenderController"

export class GameController {
    renderController: RenderController
    
    constructor() {
        console.log("Starting up game ...")
        
        this.init()
        //this.initGameLoop()
    }

    init() {
        this.renderController = new RenderController(this)
    }

    initGameLoop() {
        window.requestAnimationFrame(this.renderController.gameLoop)
    }
}