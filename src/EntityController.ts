import { Spaceship } from "./Classes/Spaceship";
import { GameController } from "./GameController";

export class EntityController {
    gameController: GameController
    spaceships: Spaceship[] = []

    constructor(gamecontroller: GameController) {
        this.gameController = gamecontroller;
    }

    addSpaceship(spaceship: Spaceship) {
        spaceship.id = this.spaceships.length;
        this.spaceships.push(spaceship);
    }
}