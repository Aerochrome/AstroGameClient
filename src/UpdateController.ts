import { Spaceship } from "./Classes/Spaceship";
import { Vector2D } from "./Interfaces/Vector2D";
import { LoopController } from "./LoopController";

export class UpdateController {
    loopController: LoopController

    constructor(loopController: LoopController) {
        this.loopController = loopController;
    }

    performUpdate() {
        if (this.loopController.gamecontroller.debugMode) console.log("Performing Update");
        this.updateSpaceships();
    }

    updateSpaceships() {
        this.loopController.gamecontroller.entityController.spaceships.forEach((spaceship: Spaceship) => {
            /*let accelerationVector: Vector2D = {
                x: this.loopController.MS_PER_UPDATE * 0.2 * Math.cos((spaceship.rotation-90) * (Math.PI/180)),
                y: this.loopController.MS_PER_UPDATE * 0.2 * Math.sin((spaceship.rotation-90) * (Math.PI/180))
            }

            spaceship.velocityVector.x += accelerationVector.x;
            spaceship.velocityVector.y += accelerationVector.x;*/
            spaceship.position.x += spaceship.velocityVector.x
            spaceship.position.y += spaceship.velocityVector.y
          
            // Detect boundaries
            if (spaceship.position.x > this.loopController.canvasElement!.width) {
              spaceship.position.x -= this.loopController.canvasElement!.width
            }
            else if (spaceship.position.x < 0) {
              spaceship.position.x += this.loopController.canvasElement!.width
            }
            if (spaceship.position.y > this.loopController.canvasElement!.height) {
              spaceship.position.y -= this.loopController.canvasElement!.height
            }
            else if (spaceship.position.y < 0) {
              spaceship.position.y += this.loopController.canvasElement!.height
            }

        })


    }
}