import { MONSTER_ASSET_KEYS } from "../../../assets/asset-keys";

const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: "FIGHT", 
    SWITCH: "SWITCH",
    ITEM: "ITEM",
    FLEE: "FLEE",
})

const battleUiTextStyle = {
    color: "black",
    fontSize: "1.875rem",
}


export class BattleMenu {
    /** @type {Phaser.scene} */
    #scene;
    /** @type {Phaser.GameObjects.Container} */
    #mainBattleMenuGameObj;
    /** @type {Phaser.GameObjects.Container} */
    #moveSelectionSubBattleMenuGameObj;
    /** @type {Phaser.GameObjects.Text} */
    #battleTextGameObjLine1;
    /** @type {Phaser.GameObjects.Text} */
    #battleTextGameObjLine2;


    /**
     * 
     * @param {Phaser.Scene} scene the Phaser 3 scene the battle menu will be added to.
     */
    constructor(scene) {
        this.#scene = scene;

        this.#createMainInfoPane()
        this.#createMainBattleMenu()
        this.#createMonsterAttackSubMenu();
    }

    
    showMainBattleMenu() {
        this.#battleTextGameObjLine1.setText("what should")
        this.#mainBattleMenuGameObj.setAlpha(1);
        this.#battleTextGameObjLine1.setAlpha(1);
        this.#battleTextGameObjLine2.setAlpha(1);
    }


    hideMainBattleMenu() {
        this.#mainBattleMenuGameObj.setAlpha(0);
        this.#battleTextGameObjLine1.setAlpha(0);
        this.#battleTextGameObjLine2.setAlpha(0);
    }

 
    showMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuGameObj.setAlpha(1);
    } 


    hideMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuGameObj.setAlpha(0);
    }


    #createMainBattleMenu() {
        this.#battleTextGameObjLine1 = this.#scene.add.text(
            20, 468, "what should", battleUiTextStyle
        )

        // TODO: make dynamic using monster data passed to this class instance.
        this.#battleTextGameObjLine2 = this.#scene.add.text(
            20, 512, `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next`, battleUiTextStyle
        )
        this.#mainBattleMenuGameObj = this.#scene.add.container(520, 448, [
            this.#createMainInfoSubPane(),

            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUiTextStyle),
            this.#scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, battleUiTextStyle),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, battleUiTextStyle),
            this.#scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleUiTextStyle),
        ])

        this.hideMainBattleMenu()
    }


    #createMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuGameObj = this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, "Slash", battleUiTextStyle),
            this.#scene.add.text(240, 22, "Growl", battleUiTextStyle),
            this.#scene.add.text(55, 70, "-", battleUiTextStyle),
            this.#scene.add.text(240, 70, "-", battleUiTextStyle),
        ])

        this.hideMonsterAttackSubMenu()
    }


    #createMainInfoPane() {
        const padding = 4
        const rectHeight = 124;

        this.#scene.add
        .rectangle(
            padding, 
            this.#scene.scale.height - rectHeight - padding, 
            this.#scene.scale.width - padding * 2,
            rectHeight,
            0xede4f3,
            1
        )
        .setOrigin(0)
        .setStrokeStyle(8, 0xe4434a, 1);
    }; 


    #createMainInfoSubPane() {
        const reactWidth = 500
        const reactHeight = 124

        return this.#scene.add
        .rectangle(0, 0, reactWidth, reactHeight, 0xede4f3, 1)
        .setOrigin(0)
        .setStrokeStyle(8, 0x905ac2, 1)
    };
}