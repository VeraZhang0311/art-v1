import Phaser from "phaser";
import InstructionScene from "./scenes/InstructionScene";
import TrialScene from "./scenes/TrialScene";
import EndScene from "./scenes/EndScene";
import BlankScene from "./scenes/BlankScene";

const config = {
  type: Phaser.AUTO, // auto render mode
  width: window.innerWidth, // full screen width
  height: window.innerHeight, // full screen height
  parent: "game-container", // bond phaser to its container
  scene: [InstructionScene, TrialScene, EndScene, BlankScene],
  scale: {
    mode: Phaser.Scale.FIT, // autofit
    autoCenter: Phaser.Scale.CENTER_BOTH, // center horizontally and vertically
  },
};

const game = new Phaser.Game(config);

// Adjust game size dynamically on window resize
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
