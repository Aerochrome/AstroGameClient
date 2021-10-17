import { Vector2D } from "../Interfaces/Vector2D"

export class Spaceship {
    id: number

    position: Vector2D = {'x': 0, 'y': 0}
    rotation: number = 0
    velocityVector: Vector2D = {'x': 0, 'y': 0}
    color: string
    
    constructor(id: number, posx: number, posy: number, rotation: number, color: string = 'white') {
        this.id = id
        this.position.x = posx
        this.position.y = posy
        this.rotation = rotation
        this.color = color
    }
}