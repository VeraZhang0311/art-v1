import Phaser from "phaser";

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: "InstructionScene" });
  }

  preload() {
    // Load background and welcome images
    this.load.image("background", "assets/images/library.png");
    this.load.image("welcome", "assets/images/welcome.png");

    // Load button click sound
    this.load.audio("click", "assets/sounds/click.mp3");
  }

  create() {
    // Add background and welcome image
    const { width, height } = this.sys.game.config;

    // Add sound effect
    this.sound.add("click");

    // Add and position the background to cover the entire screen
    this.add.image(width / 2, height / 2, "background")
      .setScale(0.25) // Scale proportionally to fit screen
      .setScrollFactor(0); // Prevent it from moving if the camera pans

    // Add and center the welcome image dynamically
    const welcomeImage = this.add.image(width / 2, height / 2.5, "welcome").setScale(0.6);

    const startButtonWidth = 200;
    const startButtonHeight = 60;
    const startButton = this.add.rectangle(
      width / 2, 
      height / 1.35, 
      startButtonWidth, 
      startButtonHeight
    ).setInteractive({ useHandCursor: true });

    // Use a graphics object to style the rectangle
    const graphics = this.add.graphics();
    graphics.fillStyle(0x4CAF50, 1); // Default green color
    graphics.fillRoundedRect(
      width / 2 - startButtonWidth / 2, // Align left edge of the rectangle
      height / 1.35 - startButtonHeight / 2, // Align top edge of the rectangle
      startButtonWidth,
      startButtonHeight,
      15 // Rounded corners radius
    );

    // Add the START button text and position it dynamically
    const startButtonText = this.add.text(width / 2, height / 1.35, "START", {
      fontSize: "24px",
      color: "#fff",
      fontStyle: "bold",
    }).setOrigin(0.5); // Center the text

    // START button hover effects
    startButton.on("pointerover", () => {
      graphics.clear();
      graphics.fillStyle(0x45a049, 1); // Brighter green on hover
      graphics.fillRoundedRect(
        width / 2 - startButtonWidth / 2,
        height / 1.35 - startButtonHeight / 2,
        startButtonWidth,
        startButtonHeight,
        15
      );
    });

    startButton.on("pointerout", () => {
      graphics.clear();
      graphics.fillStyle(0x4CAF50, 1); // Restore default color
      graphics.fillRoundedRect(
        width / 2 - startButtonWidth / 2,
        height / 1.35 - startButtonHeight / 2,
        startButtonWidth,
        startButtonHeight,
        15
      );
    });

    // START button click event: transition to instructions
    startButton.on("pointerdown", () => {
      // Play the click sound
      this.sound.play("click"); 

      // Hide welcome screen elements
      welcomeImage.setVisible(false);
      startButton.setVisible(false);
      graphics.clear();
      graphics.setVisible(false);
      startButtonText.setVisible(false);

      const dialogBoxWidth = width * 0.7; // Set the dialog box to 80% of the screen width
      const dialogBoxHeight = height * 0.65; // Set the dialog box to 50% of the screen height
      const dialogBoxX = (width - dialogBoxWidth) / 2; // Center horizontally
      const dialogBoxY = (height - dialogBoxHeight) / 2; // Center vertically

      const dialogBox = this.add.graphics();
      dialogBox.fillStyle(0x000000, 0.8); // Semi-transparent black background
      dialogBox.fillRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 15);

      // Add the instruction text inside the dialog box
      const padding = 30; // Padding inside the dialog box
      const dialogText = this.add.text(
        dialogBoxX + padding,
        dialogBoxY + padding,
        [
          "In this challenge, you will see a bunch of names down the page. Some of them are authors of books, and some of them are not.",
          "",
          "Your task is to identify the real author names from the fictitious names as precisely and quickly as possible.",
          "",
          "Press the 'F' key for names that you KNOW FOR SURE are authors;",
          "Press the 'J' key if you don't recognize the name.",
          "",
          "You should only press 'F' for those names about which you are ABSOLUTELY CERTAIN or else you will lose a point.",
          "",
          "Press CONTINUE to begin the challenge.",
        ].join("\n"),
        {
          fontSize: "24px",
          color: "#ffffff",
          wordWrap: { width: dialogBoxWidth - 2 * padding },
        }
      );

      // Show the CONTINUE button below the dialog box
      const continueButton = this.add.text(
        width / 2, 
        dialogBoxY + dialogBoxHeight - 2*padding, 
        "CONTINUE", 
        {
          fontSize: "26px",
          color: "#ffffff",
          backgroundColor: "#4CAF50",
          padding: { x: 20, y: 10 },
        }
      )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      continueButton.on("pointerdown", () => {
        this.sound.play("click"); // Play the click sound
        this.scene.start("TrialScene"); // Transition to TrialScene
      });
    });
  }
}
