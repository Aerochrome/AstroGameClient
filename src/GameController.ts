import { Spaceship } from "./Classes/Spaceship";
import { EntityController } from "./EntityController";
import { Vector2D } from "./Interfaces/Vector2D";
import { LoopController } from "./LoopController"
import { NetworkController } from "./NetworkController";

export class GameController {
    loopController: LoopController
    entityController: EntityController
    networkController: NetworkController

    debugMode = false;
    
    constructor() {
        console.log("Starting up game ...")
        this.init()

        this.initTestSpaceships()
        this.initUserShip()
    }

    init() {
        this.entityController = new EntityController(this)
        this.loopController = new LoopController(this)
        this.networkController = new NetworkController(this)
    }

    initTestSpaceships() {
        for(let i=1; i<=5; i++) {
            let randomPos = this.randomPlaceInCanvas();
            let ship = new Spaceship(0, randomPos.x, randomPos.y, this.randomIntInInterval(0, 360));

            let accelerationVector: Vector2D = {
                x: this.loopController.MS_PER_UPDATE * 0.2 * Math.cos((ship.rotation-90) * (Math.PI/180)),
                y: this.loopController.MS_PER_UPDATE * 0.2 * Math.sin((ship.rotation-90) * (Math.PI/180))
            }

            ship.velocityVector.x += accelerationVector.x;
            ship.velocityVector.y += accelerationVector.y;

            this.entityController.addSpaceship(ship)
        }
    }

    initUserShip() {
        let ship = new Spaceship(0, this.loopController.canvasElement!.width/2, this.loopController.canvasElement!.height/2, 0, 'gray')
        this.entityController.addSpaceship(ship)
        this.entityController.userShip = ship
    }

    randomPlaceInCanvas() { // min and max included 
        return {
            x: this.randomIntInInterval(0, this.loopController.canvasElement!.width),
            y: this.randomIntInInterval(0, this.loopController.canvasElement!.height)
        }
    }

    randomIntInInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}