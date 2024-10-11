import { TILE_SIZE } from "../../config";
import { DIRECTIONS } from "../../utils/directions";
import { getTargetPositionFromGameObjectPositionAndDirection } from "../../utils/grid-utils";
import { exhaustiveGuard } from "../../utils/guard";


/**
 * @typedef CharacterIdleFrameConfig
 * @type {object}
 * @property {number} UP
 * @property {number} LEFT
 * @property {number} DOWN
 * @property {number} LEFT
 * @property {number} NONE
 */

/**
 * @typedef CharacterConfig
 * @type {object}
 * @property {Phaser.Scene} scene
 * @property {string} assetKey
 * @property {number} [assetFrame=0]
 * @property {Coordinate} [origin={x: 0, y: 0}]
 * @property {Coordinate} position
 * @property {import("../../utils/directions").Direction} direction
 * @property {() => void} [spriteGridMovementFinishedCallback]
 * @property {CharacterIdleFrameConfig} idleFrameConfig
 * @property {Phaser.Tilemaps.TilemapLayer} [collisionLayer]
 */

export class Character {
    /** @type {Phaser.Scene} */
    _scene;
    /** @type {Phaser.GameObjects.Sprite} */
    _phaserGameObject;
    /** @protected @type {import("../../utils/directions").Direction} */
    _direction;
    /** @protected @type {boolean} */
    _isMoving;
    _targetPosition;
    _previousTargetPosition;

    /** @protected @type {() => void | undefined} */
    _spriteGridMovementFinishedCallback;

    /** @protected @type {CharacterIdleFrameConfig} */
    _idleFrameConfig;

    /** @protected @type {Coordinate} */
    _origin;

    /** @protected @type {Phaser.Tilemaps.TilemapLayer | undefined} */
    _collisionLayer;

    /**
    * 
    * @param {CharacterConfig} config 
    */
    constructor(config) {
        this._scene = config.scene

        this._origin = config.origin ? { ...config.origin } : { x: 0, y: 0 }
        this._direction = config.direction
        this._idleFrameConfig = config.idleFrameConfig,
            this._collisionLayer = config.collisionLayer;

        this._phaserGameObj = this._scene.add.sprite(
            config.position.x,
            config.position.y,
            config.assetKey,
            this._getIdleFrame(),
        ).setOrigin(this._origin.x, this._origin.y);


        this._isMoving = false
        this._targetPosition = { ...config.position }
        this._previousTargetPosition = { ...config.position }
        this._spriteGridMovementFinishedCallback = config.spriteGridMovementFinishedCallback
    }


    /** @type {Phaser.GameObjects.Sprite} */
    get gameObject() {
        return this._phaserGameObj;
    }


    /** @type {boolean} */
    get isMoving() {
        return this._isMoving;
    }


    /** @type {import("../../common/direction").Direction} */
    set direction(value) {
        this._direction = value
    }


    _getIdleFrame() {
        return this._idleFrameConfig[this._direction];
    }


    /**
     * 
     * @param {import("../../utils/directions").Direction} direction 
     * @returns {void}
     */
    moveCharacter(direction) {
        // do not move character again untill previous movement is finished (?)
        if (this._isMoving) {
            return;
        }

        this._moveSprite(direction);
    }


    /**
     * 
     * @param {import("../../utils/directions").Direction} direction 
     * @returns {void}
     */
    _moveSprite(direction) {
        this.direction = direction;

        if (this._isBlockingTile()) {
            return;
        }

        this._isMoving = true
        this.#handleSpriteMovement()
    }


    _isBlockingTile() {
        if (this._direction === DIRECTIONS.NONE) {
            return;
        }

        // get the nearest tile relative to the player's direction to check for collision layers
        const targetPosition = { ...this._targetPosition };
        const updatedPosition = getTargetPositionFromGameObjectPositionAndDirection(targetPosition, this._direction)

        return this.#isCollisionLayer(updatedPosition);
    }


    #handleSpriteMovement() {
        if (this._direction === DIRECTIONS.NONE) {
            return;
        }

        const updatedPosition = getTargetPositionFromGameObjectPositionAndDirection(this._targetPosition, this._direction)
        this._previousTargetPosition = { ...this._targetPosition }
        this._targetPosition.x = updatedPosition.x
        this._targetPosition.y = updatedPosition.y


        // smooth transition in movement
        this._scene.add.tween({
            delay: 0,
            duration: 600,
            y: {
                from: this._phaserGameObj.y,
                start: this._phaserGameObj.y,
                to: this._targetPosition.y
            },

            x: {
                from: this._phaserGameObj.x,
                start: this._phaserGameObj.x,
                to: this._targetPosition.x
            },

            targets: this._phaserGameObj,

            onComplete: () => {
                this._isMoving = false
                this._previousTargetPosition = { ...this._targetPosition };

                // if callback function is provided, run it.
                if (this._spriteGridMovementFinishedCallback) {
                    this._spriteGridMovementFinishedCallback()
                }
            }
        })
    }


    #isCollisionLayer(position) {
        if (!this._collisionLayer) {
            return false;
        }

        const { x, y } = position;

        // return index of -1 if no collision tile
        const tile = this._collisionLayer.getTileAtWorldXY(x, y, true)

        return tile.index !== -1;
    }


    update(time) {
        if (this._isMoving) {
            return;
        }

        const idleFrame = this._phaserGameObj.anims.currentAnim?.frames[1].frame.name

        this._phaserGameObj.anims.stop()

        // always reset animation to idle frame when stopped moving
        if (!idleFrame) {
            return
        }

        switch (this._direction) {
            case DIRECTIONS.DOWN:
            case DIRECTIONS.LEFT:
            case DIRECTIONS.RIGHT:
            case DIRECTIONS.UP:
                this._phaserGameObj.setFrame(idleFrame)
                break;
            case DIRECTIONS.NONE:
                break;
            default:
                exhaustiveGuard(this._direction)
        }
    }
}