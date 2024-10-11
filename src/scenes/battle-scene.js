import { Scene } from "phaser"
import { BattleMenu } from "../battle/ui/menu/battle-menu";
import { SCENE_KEYS } from "./scene-keys"
import { BATTLE_ASSET_KEYS, BATTLE_BG_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/asset-keys";

export default class BattleScene extends Scene {
    /** @type {BattleMenu} */
    #battleMenu

    constructor() {
        super(SCENE_KEYS.BATTLE_SCENE);
    }

    create() {
        console.log(`${BattleScene.name}:create invoked`)

        // create main background
        this.add.image(0, 0, BATTLE_BG_ASSET_KEYS.FOREST).setOrigin(0)

        // render out the player and enemy monsters
        this.add.image(768, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0)
        this.add.image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0).setFlipX(true)

        // render out player health bar
        const playerMonsterName = this.add.text(
            30,
            20,
            MONSTER_ASSET_KEYS.IGUANIGNITE,
            {
                color: "#7E3D3F",
                fontSize: "2rem",
            }
        )

        const playerLevel = this.add.text(
            playerMonsterName.width + 30,
            23,
            "L0",
            {
                color: "#ED474B",
                fontSize: "1.75rem",
            }
        )

        const playerHpLabel = this.add.text(
            30,
            55,
            "HP",
            {
                color: "#FF6505",
                fontSize: "1.5rem",
                fontStyle: "italic"
            }
        )

        const playerHp = this.add.text(
            443,
            80,
            "25 / 25",
            {
                color: "#7E3D3F",
                fontSize: "1rem",
            }
        ).setOrigin(1, 0)

        this.add.container(556, 318, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0),
            playerMonsterName,
            playerLevel,
            playerHpLabel,
            playerHp,
            this.#createHealthBar(34, 34),
        ]);

        // render out player health bar
        const enemyMonsterName = this.add.text(
            30,
            20,
            MONSTER_ASSET_KEYS.IGUANIGNITE,
            {
                color: "#7E3D3F",
                fontSize: "2rem",
            }
        )

        const enemyLevel = this.add.text(
            enemyMonsterName.width + 30,
            23,
            "L0",
            {
                color: "#ED474B",
                fontSize: "1.75rem",
            }
        )

        const enemyHpLabel = this.add.text(
            30,
            55,
            "HP",
            {
                color: "#FF6505",
                fontSize: "1.5rem",
                fontStyle: "italic"
            }
        )

        this.add.container(0, 0, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0).setScale(1, 0.8),
            enemyMonsterName,
            enemyLevel,
            enemyHpLabel,
            this.#createHealthBar(34, 34),
        ]);


        // render out the main info a nd sub info panes
        this.#battleMenu = new BattleMenu(this);
        this.#battleMenu.showMainBattleMenu();
    }

    #createHealthBar(x, y) {
        const scaleY = 0.7;

        const leftCap = this.add.image(
            x,
            y,
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP
        ).setOrigin(0, 0.5).setScale(1, scaleY);

        const middle = this.add.image(
            leftCap.x + leftCap.width,
            y,
            HEALTH_BAR_ASSET_KEYS.MIDDLE
        ).setOrigin(0, 0.5).setScale(1, scaleY);
        middle.displayWidth = 360;

        const rightCap = this.add.image(
            middle.x + middle.
                displayWidth,
            y,
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
        ).setOrigin(0, 0.5).setScale(1, scaleY);

        return this.add.container(x, y, [leftCap, middle, rightCap]);
    }
}