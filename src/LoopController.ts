import { Spaceship } from './Classes/Spaceship';
import { GameController } from './GameController'
import { UpdateController } from './UpdateController';

export class LoopController {

    readonly MS_PER_UPDATE: number = 33.33; // 30 FPS

    gamecontroller: GameController
    updateController: UpdateController

    canvasElement: HTMLCanvasElement|null
    canvasContext: CanvasRenderingContext2D|null

    oldTimestamp: number
    elapsed: number
    lag: number = 0.0

    constructor(gamecontroller: GameController) {
        this.gamecontroller = gamecontroller
        this.updateController = new UpdateController(this);
  
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
        this.elapsed = (timestamp - this.oldTimestamp)
        this.oldTimestamp = timestamp;

        if (!isNaN(this.elapsed)) {
            this.lag += this.elapsed
        }

        while (this.lag >= this.MS_PER_UPDATE) {
            this.update()
            this.lag -= this.MS_PER_UPDATE
        }



        this.render(timestamp)

        window.requestAnimationFrame((timestamp: number) => this.gameLoop(timestamp))
    }

    update() {
        if (this.gamecontroller.debugMode) console.log("I should run on 30 fps");
        this.updateController.performUpdate();
    }

    render(delta: number) {
        if (this.gamecontroller.debugMode) console.log("rendering")

        //background
        this.canvasContext!.fillStyle = 'black'
        this.canvasContext!.fillRect(0, 0, this.canvasElement!.width, this.canvasElement!.height)

        // Debug information
        let fps = Math.round(1000/this.elapsed)

        this.canvasContext!.font = '25px Arial';
        this.canvasContext!.fillStyle = 'white';
        this.canvasContext!.fillText("FPS: " + fps, 10, 30);
        this.canvasContext!.fillText("Seconds passed: " + this.elapsed, 10, 60);
        this.canvasContext!.fillText("Lag: " + this.lag, 10, 90);
        
        // draw entities
        this.renderSpaceships()
    }

    renderSpaceships() {

        //console.log(this.gamecontroller.entityController.spaceships)
        this.gamecontroller.entityController.spaceships.forEach((spaceship: Spaceship) => {
            this.canvasContext!.save();
            this.canvasContext!.strokeStyle = 'white'
            this.canvasContext!.lineWidth = 2
            
            this.canvasContext!.translate(spaceship.position.x, spaceship.position.y)
            this.canvasContext!.rotate((Math.PI/180) * spaceship.rotation)
            this.canvasContext!.beginPath()
            this.canvasContext!.moveTo(0, 0)
            this.canvasContext!.lineTo(10, 10)
            this.canvasContext!.lineTo(0, -20)
            this.canvasContext!.lineTo(-10, 10)
            this.canvasContext!.lineTo(0, 0)
            this.canvasContext!.closePath()
            this.canvasContext!.stroke()
            
            this.canvasContext!.restore()
        });
    }
}
