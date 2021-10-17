import { Spaceship } from "./Classes/Spaceship";
import { GameController } from "./GameController";

export class EntityController {
    gameController: GameController
    spaceships: Spaceship[] = []
    userShip: Spaceship

    constructor(gamecontroller: GameController) {
        this.gameController = gamecontroller;
    }

    addSpaceship(spaceship: Spaceship): number {
        spaceship.id = this.spaceships.length;
        this.spaceships.push(spaceship);
        return spaceship.id;
    }
}