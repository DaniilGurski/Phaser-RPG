import { SCENE_KEYS } from "./scene-keys";
import { WORLD_ASSET_KEYS } from "../assets/asset-keys";
import { Scene } from "phaser";
import { Player } from "../world/characters/player";
import { DIRECTIONS } from "../utils/directions";
import { TILED_COLLISION_LAYER_ALPHA, TILE_SIZE } from "../config";
import Controls from "../utils/controls";


// putting the player near houses
const PLAYER_POSITION = Object.freeze({
    x: 6 * TILE_SIZE,
    y: 21 * TILE_SIZE,
})


export default class WorldScene extends Scene {
    #player;
    #controls

    constructor() {
        super(SCENE_KEYS.WORLD_SCENE);
    }

    create() {
        console.log(`${WorldScene.name}:create invoked`)


        // do not let the camera leave the background 
        this.cameras.main.setBounds(0, 0, 1280, 2176);
        this.cameras.main.setZoom(0.8);
        

        // collision
        const map = this.make.tilemap({
            key: WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL
        })

        const collisionTiles = map.addTilesetImage("collision", WORLD_ASSET_KEYS.WORLD_COLLISION)
        const collisionLayer = map.createLayer("Collision", collisionTiles, 0, 0);
        collisionLayer.setAlpha(TILED_COLLISION_LAYER_ALPHA).setDepth(2)

        if (!collisionLayer) {
            console.error(`${WorldScene.name}:create encountered error while creating collision layer`)
            return
        }

        this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND, 0)
        .setOrigin(0)

        this.#player = new Player({
            scene: this, 
            position: PLAYER_POSITION,
            direction: DIRECTIONS.DOWN,
            collisionLayer: collisionLayer
        })

        this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_FOREGROUND, 0)
        .setOrigin(0)

        this.#controls = new Controls(this);
        this.cameras.main.startFollow(this.#player.gameObject)
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update(time) {
        const selectedDirection = this.#controls.getDirectionKeyPressedDown();

        if (selectedDirection !== DIRECTIONS.NONE) {
            this.#player.moveCharacter(selectedDirection)
        }

        this.#player.update(time);
    }
}
