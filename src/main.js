import Phaser from "phaser";
import InstructionScene from "./scenes/InstructionScene"; 
import TrialScene from "./scenes/TrialScene";
import EndScene from "./scenes/EndScene";

const config = {
  type: Phaser.AUTO, // auto render mode
  width: 800, 
  height: 600,
  parent: "game-container", // bond phaser to its container
  scene: [InstructionScene, TrialScene, EndScene], 
  scale: {
    mode: Phaser.Scale.FIT, // autofit
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
