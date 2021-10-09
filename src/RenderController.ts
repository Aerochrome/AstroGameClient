import { GameController } from './GameController'

export class RenderController {

    gamecontroller: GameController
    canvasElement: HTMLCanvasElement|null
    canvasContext: CanvasRenderingContext2D|null

    oldTimestamp: number

    constructor(gamecontroller: GameController) {
        this.gamecontroller = gamecontroller
        
        this.initCanvas()
        this.initGameLoop()
    }

    initCanvas() {
        this.canvasElement = <HTMLCanvasElement> document.getElementById('maingame')
        this.canvasContext = this.canvasElement.getContext('2d')
    }

    initGameLoop() {
        window.requestAnimationFrame((timestamp: number) => this.gameLoop(timestamp))
    }

    // https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-smooth-canvas-animation
    gameLoop(timestamp: number) {
        console.log("I am rendering!")

        this.render(timestamp)

        window.requestAnimationFrame((timestamp: number) => this.gameLoop(timestamp))
    }

    render(delta: number) {
        //background
        this.canvasContext!.fillStyle = 'black'
        this.canvasContext!.fillRect(0, 0, this.canvasElement!.width, this.canvasElement!.height)

        // Debug information
        let secondsPassed = (delta - this.oldTimestamp)/1000
        this.oldTimestamp = delta;
        let fps = Math.round(1/secondsPassed)

        this.canvasContext!.font = '25px Arial';
        this.canvasContext!.fillStyle = 'white';
        this.canvasContext!.fillText("FPS: " + fps, 10, 30);
        this.canvasContext!.fillText("Seconds passed: " + secondsPassed, 10, 60);

        // draw entities
    }
}
