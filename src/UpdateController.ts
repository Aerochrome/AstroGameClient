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

        this.updateUserShipRotation();
        this.updateUserShipMovement();
        this.updateSpaceships();
    }

    updateUserShipRotation() {
      let ship = this.loopController.gamecontroller.entityController.userShip;

      if (this.loopController.userInputController.userInputState.left) {
        ship.rotation -= this.loopController.MS_PER_UPDATE * 0.316;
      } else if (this.loopController.userInputController.userInputState.right) {
        ship.rotation += this.loopController.MS_PER_UPDATE * 0.316;
      }
    }

    updateUserShipMovement() {
      let spaceship = this.loopController.gamecontroller.entityController.userShip;
      let accelerationVector: Vector2D = {
        x: this.loopController.MS_PER_UPDATE * 0.012 * Math.cos((spaceship.rotation-90) * (Math.PI/180)),
        y: this.loopController.MS_PER_UPDATE * 0.012 * Math.sin((spaceship.rotation-90) * (Math.PI/180))
      }

      let state = this.loopController.userInputController.userInputState; 
      if (state.up) {
        spaceship.velocityVector.x += accelerationVector.x;
        spaceship.velocityVector.y += accelerationVector.y;
      } else if (state.down) {
        spaceship.velocityVector.x -= accelerationVector.x;
        spaceship.velocityVector.y -= accelerationVector.y;
      } else {
        spaceship.velocityVector.x -= spaceship.velocityVector.x * 0.009
        spaceship.velocityVector.y -= spaceship.velocityVector.y * 0.009
      }

      // Limit movement speed
      if (spaceship.velocityVector.x > 20) {
        spaceship.velocityVector.x = 20
      }
      else if (spaceship.velocityVector.x < -20) {
        spaceship.velocityVector.x = -20
      } 
      if (spaceship.velocityVector.y > 20) {
        spaceship.velocityVector.y = 20
      }
      else if (spaceship.velocityVector.y < -20) {
        spaceship.velocityVector.y = -20
      }
    }

    updateSpaceships() {
        this.loopController.gamecontroller.entityController.spaceships.forEach((spaceship: Spaceship) => {
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