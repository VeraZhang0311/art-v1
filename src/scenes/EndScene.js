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
    // Background
    this.add.image(400, 300, "background").setScale(1);

    // Gray frame (box)
    const box = this.add.graphics();
    box.fillStyle(0x000000, 0.8); // Light gray with slight transparency
    box.fillRoundedRect(100, 100, 600, 400, 15); // Position, size, and rounded corners

    // Title
    this.add.text(400, 150, "Results", {
      fontSize: "36px",
      color: "#f2e02c",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Display Final Time and Score
    this.add.text(400, 220, `Time: ${this.finalTime}s`, {
      fontSize: "28px",
      color: "#f2e02c",
    }).setOrigin(0.5);

    this.add.text(400, 260, `Score: ${this.finalScore}`, {
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
    this.add.text(400, 330, message, {
      fontSize: "24px",
      color: "#45A049",
      align: "center",
      wordWrap: { width: 500 },
    }).setOrigin(0.5);

    // Add a Restart Button
    const restartButton = this.add.text(400, 410, "Restart", {
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
