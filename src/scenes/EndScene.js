import Phaser from "phaser";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  init(data) {
    // Retrieve time and score passed from TrialScene
    this.finalTime = data.time || 0;
    this.finalScore = data.score || 0;
  }

  preload() {
    // Preload the background image
    this.load.image("background", "assets/images/library.jpg");
  }

  create() {
    const { width, height } = this.sys.game.config;

    // Background
    this.add.image(width / 2, height / 2, "background")
      .setAlpha(0.5) // Set transparency (50% opacity)
      .setScale(0.25) // Scale proportionally to fit screen
      .setScrollFactor(0); // Prevent it from moving if the camera pans

    // Gray frame (box)
    const boxWidth = width * 0.6;
    const boxHeight = height * 0.7;
    const boxX = width / 2 - boxWidth / 2;
    const boxY = height / 2 - boxHeight / 2;
    const box = this.add.graphics();
    box.fillStyle(0x000000, 0.8); // Light gray with slight transparency
    box.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 15); // Position, size, and rounded corners

    // Title
    this.add.text(width / 2, height * 0.3, "Results", {
      fontSize: "36px",
      color: "#f2e02c",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Display Final Time and Score
    this.add.text(width / 2, height * 0.4, `Time: ${this.finalTime}s`, {
      fontSize: "28px",
      color: "#f2e02c",
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.45, `Score: ${this.finalScore}`, {
      fontSize: "28px",
      color: "#f2e02c",
    }).setOrigin(0.5);

    // Determine the message based on the score
    let message = "";
    if (this.finalScore > 0) {
      message = "You're amazing! Keep up the great work!";
    } else if (this.finalScore === 0) {
      message = "Not bad! Keep practicing, and you'll improve!";
    } else {
      message = "You need to read more and discover great authors!";
    }

    // Display the message
    this.add.text(width / 2, height * 0.5, message, {
      fontSize: "24px",
      color: "#45A049",
      align: "center",
      wordWrap: { width: width * 0.7 },
    }).setOrigin(0.5);

    // Add a Restart Button
    const restartButton = this.add.text(width / 2, height * 0.7, "Restart", {
      fontSize: "28px",
      color: "#ffffff",
      backgroundColor: "#4CAF50",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    restartButton.on("pointerdown", () => {
      this.scene.start("TrialScene"); // Restart the game
    });
  }
}
