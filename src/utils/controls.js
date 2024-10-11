import { DIRECTIONS } from "./directions";


export default class Controls {
    #scene
    #cursorKeys 
    #lockPlayerInput

    constructor(scene) {
        this.#scene = scene;
        this.#cursorKeys = this.#scene.input.keyboard.createCursorKeys();
        this.#lockPlayerInput = false
    }


    get isInputLocked() {
        return this.#lockPlayerInput;
    }


    set lockInput(val) {
        this.#lockPlayerInput = val;
    }


    wasSpaceKeyPressed() {
        return this.#cursorKeys && Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space);
    }


    wasBackKeyPressed() {
        return this.#cursorKeys && Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift);
    }


    getDirectionKeyJustPressDown() {
        if (!this.#cursorKeys) {
            return DIRECTIONS.NONE
        }

        let selectedDirection = DIRECTIONS.NONE

        if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.up)) {
            selectedDirection = DIRECTIONS.UP
        } else if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.right)) {
            selectedDirection = DIRECTIONS.RIGHT
        } else if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.down)) {
            selectedDirection = DIRECTIONS.DOWN
        } else if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.left)) {
            selectedDirection = DIRECTIONS.LEFT
        }

        return selectedDirection
    }


    getDirectionKeyPressedDown() {
        if (this.#cursorKeys === undefined) {
            return DIRECTIONS.NONE
        }

        let selectedDirection = DIRECTIONS.NONE

        if (this.#cursorKeys.up.isDown) {
            selectedDirection = DIRECTIONS.UP
        } else if (this.#cursorKeys.right.isDown) {
            selectedDirection = DIRECTIONS.RIGHT
        } else if (this.#cursorKeys.down.isDown) {
            selectedDirection = DIRECTIONS.DOWN
        } else if (this.#cursorKeys.left.isDown) {
            selectedDirection = DIRECTIONS.LEFT
        }

        return selectedDirection
    }
}