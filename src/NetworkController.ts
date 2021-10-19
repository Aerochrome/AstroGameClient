import io, { Socket } from 'socket.io-client'
import { GameController } from './GameController';

export class NetworkController {
    gameController: GameController
    io: Socket;

    constructor(gameController: GameController) {
        this.gameController = gameController

        this.initConnection()
    }

    initConnection() {
        this.io = io('ws://localhost:3001')
    }
}