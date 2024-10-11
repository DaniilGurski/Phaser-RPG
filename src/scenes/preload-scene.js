import { Scene } from "phaser"
import { SCENE_KEYS } from "./scene-keys"
import { BATTLE_ASSET_KEYS, BATTLE_BG_ASSET_KEYS, CHARACTER_ASSET_KEYS, DATA_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS, WORLD_ASSET_KEYS } from "../assets/asset-keys";
import { DataUtils } from "../utils/data-utils";


export default class Preloader extends Scene {
    constructor() {
        super(SCENE_KEYS.PRELOAD_SCENE);
    }

    preload() {
        console.log(`${Preloader.name}:preload invoked`)

        const kennysAssetPath = "/assets/images/kenneys-assets";
        const monsterTamerAssetPath = "/assets/images/monster-tamer";
        const axulArtAssetPath = "/assets/images/axulart";
        const pbGamesAssetPath = "/assets/images/parabellum-games";

        // load json data
        this.load.json(DATA_ASSET_KEYS.ANIMATIONS, "assets/data/animations.json")
        

        // battle backgrounds
        this.load.image(
            BATTLE_BG_ASSET_KEYS.FOREST, 
            `${monsterTamerAssetPath}/battle-backgrounds/forest-background.png`,
        )
        
        
        // battle assets
        this.load.image(
            BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND, 
            `${kennysAssetPath}/ui-space-expansion/custom-ui.png`
        )
        
        
        // health bar assets
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP, 
            `${kennysAssetPath}/ui-space-expansion/barHorizontal_green_right.png`
        )

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.MIDDLE, 
            `${kennysAssetPath}/ui-space-expansion/barHorizontal_green_mid.png`
        )

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP, 
            `${kennysAssetPath}/ui-space-expansion/barHorizontal_green_left.png`
        )
           
        
        // monster assets
        this.load.image(
            MONSTER_ASSET_KEYS.CARNODUSK, 
            `${monsterTamerAssetPath}/monsters/carnodusk.png`
        )

        this.load.image(
            MONSTER_ASSET_KEYS.IGUANIGNITE, 
            `${monsterTamerAssetPath}/monsters/iguanignite.png`
        )


        // load world assets
        this.load.image(
            WORLD_ASSET_KEYS.WORLD_BACKGROUND,
            `${monsterTamerAssetPath}/map/level_background.png`
        )
        this.load.tilemapTiledJSON(
            WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL,
            `/assets/data/level.json`
        )
        this.load.image(
            WORLD_ASSET_KEYS.WORLD_COLLISION,
            `${monsterTamerAssetPath}/map/collision.png`
        )
        this.load.image(
            WORLD_ASSET_KEYS.WORLD_FOREGROUND,
            `${monsterTamerAssetPath}/map/level_foreground.png`
        )


        // load character images
        this.load.spritesheet(
            CHARACTER_ASSET_KEYS.PLAYER, 
            `${axulArtAssetPath}/character/custom.png`,
            {
                frameWidth: 64,
                frameHeight: 88,
            }
        )


        this.load.spritesheet(
            CHARACTER_ASSET_KEYS.NPC, 
            `${pbGamesAssetPath}/characters.png`,
            {
                frameWidth: 16,
                frameHeight: 16,
            }
        )
    }

    create() {
        console.log(`${Preloader.name}:create invoked`)
        this.#createAnimations()
        this.scene.start(SCENE_KEYS.WORLD_SCENE);
    }

    #createAnimations() {
        const animations = DataUtils.getAnimations(this);
        
        animations.forEach((animation) => {
            // generate frames if there are any
            const frames = animation.frames ? 
            this.anims.generateFrameNumbers(animation.assetKey, { frames: animation.frames }) :
            this.anims.generateFrameNumbers(animation.assetKey)

            this.anims.create({
                key: animation.key,
                frames: frames,
                frameRate: animation.frameRate,
                repeat: animation.repeat,
                yoyo: animation.yoyo
            })
        })
    }
}


