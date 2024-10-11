import { DIRECTIONS } from "./directions";
import { TILE_SIZE } from "../config";
import { exhaustiveGuard } from "./guard";

export function getTargetPositionFromGameObjectPositionAndDirection(currentPosition, direction) {
    const targetPosition = {...currentPosition}; 

    switch(direction) {
        case DIRECTIONS.UP:
            targetPosition.y -= TILE_SIZE
            break;
        case DIRECTIONS.RIGHT:
            targetPosition.x += TILE_SIZE
            break;
        case DIRECTIONS.DOWN:
            targetPosition.y += TILE_SIZE
            break;
        case DIRECTIONS.LEFT:
            targetPosition.x -= TILE_SIZE
            break;
        default:
            exhaustiveGuard(direction);
    }

    return targetPosition
}