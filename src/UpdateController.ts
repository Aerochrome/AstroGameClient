import { Spaceship } from "./Classes/Spaceship";
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
          
            // Detect boundaries (and bounce off)
            if ((spaceship.position.x > this.loopController.canvasElement!.width) || spaceship.position.x < 0) {
              spaceship.velocityVector.x *= -1
              spaceship.rotation = this.findAngle(spaceship.velocityVector.x, spaceship.velocityVector.y)
            }

            if ((spaceship.position.y > this.loopController.canvasElement!.height) || spaceship.position.y < 0) {
              spaceship.velocityVector.y *= -1
              spaceship.rotation = this.findAngle(spaceship.velocityVector.x, spaceship.velocityVector.y)
            }

        })
    }

    findAngle(x: number, y: number) {
      let angle = Math.atan2(y, x);
      let degrees = 180 * angle / Math.PI;
      return (360 + Math.round(degrees)) % 360 + 90;
    }
}