import Phaser from "phaser";
import Preloader from "./scenes/preload-scene";
import BattleScene from "./scenes/battle-scene";
import WorldScene from "./scenes/world-scene";

const game = new Phaser.Game({
    type: Phaser.CANVAS,

    pixelArt: false, 

    scale: {
        width: 1024, 
        height: 576,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTHt
    },

    parent: "game-container",

    scene: [Preloader, WorldScene],
});
