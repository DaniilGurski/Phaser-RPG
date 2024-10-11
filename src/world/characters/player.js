import { CHARACTER_ASSET_KEYS } from "../../assets/asset-keys";
import { DIRECTIONS } from "../../utils/directions";
import { exhaustiveGuard } from "../../utils/guard";
import { Character } from "./character";


/**
 * @typedef {Omit<import("./character").CharacterConfig, "assetKey" | "assetFrame">} PlayerConfig
*/
export class Player extends Character {
    /**
     * 
     * @param {PlayerConfig} config 
     */
    constructor(config) {
        super({
            ...config, 
            assetKey: CHARACTER_ASSET_KEYS.PLAYER,
            idleFrameConfig: {
                NONE: 7,
                UP: 1,
                LEFT: 10,
                DOWN: 7,
                RIGHT: 4,
            },
            // better aligment relative to other sprites / tiles
            origin: {x: 0, y: 0.2},
        })
    }
    
    /**
     * 
     * @param {import("../../utils/directions").Direction} direction 
     * @returns {void}
    */
    moveCharacter(direction) {
        super.moveCharacter(direction)

        switch(this._direction) {
            case DIRECTIONS.DOWN:
            case DIRECTIONS.LEFT:
            case DIRECTIONS.RIGHT:
            case DIRECTIONS.UP:
                // prevent animation from resetting
                if (
                    !this._phaserGameObj.anims.isPlaying ||
                    this._phaserGameObj.anims.currentAnim?.key !== `PLAYER_${this.direction}`
                ) {
                    this._phaserGameObj.play(`PLAYER_${this._direction}`);
                }
                break;
            case DIRECTIONS.NONE: 
                break;
            default:
                exhaustiveGuard(this._direction)
        }
    }
}