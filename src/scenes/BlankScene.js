import Phaser from "phaser";

export default class BlankScene extends Phaser.Scene {
  constructor() {
    super({ key: "BlankScene" });
  }

  create() {

    // Set a blank (black) background
    this.cameras.main.setBackgroundColor("#fff"); // Black color
  }
}
