import Phaser from "phaser";

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: "InstructionScene" });
  }

  preload() {
    // Load background and welcome images
    this.load.image("background", "assets/images/library.jpg");
    this.load.image("welcome", "assets/images/welcome.png");
  }

  create() {
    // Add background and welcome image
    this.add.image(400, 300, "background").setScale(1);
    const welcomeImage = this.add.image(400, 250, "welcome");

    // Create the START button
    const graphics = this.add.graphics();
    graphics.fillStyle(0x4CAF50, 1); // Button color: green
    graphics.fillRoundedRect(300, 350, 200, 60, 15); // Draw rounded rectangle

    const startButtonText = this.add.text(400, 380, "START", {
      fontSize: "24px",
      color: "#fff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    const startButton = this.add.rectangle(400, 380, 200, 60).setInteractive({ useHandCursor: true });

    // START button hover effects
    startButton.on("pointerover", () => {
      graphics.clear();
      graphics.fillStyle(0x45a049, 1); // Change color to brighter green
      graphics.fillRoundedRect(300, 350, 200, 60, 15);
    });

    startButton.on("pointerout", () => {
      graphics.clear();
      graphics.fillStyle(0x4CAF50, 1); // Restore default color
      graphics.fillRoundedRect(300, 350, 200, 60, 15);
    });

    // START button click event: transition to instructions
    startButton.on("pointerdown", () => {
      // Hide welcome screen elements
      welcomeImage.setVisible(false);
      startButton.setVisible(false);
      graphics.clear();
      graphics.setVisible(false);
      startButtonText.setVisible(false);

      // Create the instruction dialog box
      const dialogBox = this.add.graphics();
      dialogBox.fillStyle(0x000000, 0.8); // Semi-transparent black background
      dialogBox.fillRoundedRect(50, 100, 700, 400, 15);

      const dialogText = this.add.text(70, 120, "", {
        fontSize: "18px",
        color: "#ffffff",
        wordWrap: { width: 660 },
      });

      // Instructions text
      const instructions = [
        "In this challenge, you will see a bunch of names down the page. Some of them are authors of books, and some of them are not.",
        "",
        "Your task is to identify the real author names from the fictitious names as precisely and quickly as possible.",
        "",
        "Select 'Author' for names that you KNOW FOR SURE are authors;",
        "select 'Do not know' if you don't recognize the name.",
        "",
        "You should only select 'Author' for those names about which you are ABSOLUTELY CERTAIN or else you will lose a point.",
        "",
        "Press CONTINUE to begin the challenge.",
      ];

      let currentLineIndex = 0;
      let currentCharIndex = 0;
      let currentText = ""; // The text currently displayed in the dialog

      // Function to type the next character
      const typeNextCharacter = () => {
        if (currentLineIndex >= instructions.length) {
          // Show the CONTINUE button when all lines are typed
          showContinueButton();
          return;
        }

        const line = instructions[currentLineIndex];
        if (currentCharIndex < line.length) {
          // Add the next character to the text
          currentText += line[currentCharIndex];
          dialogText.setText(currentText);
          currentCharIndex++;
        } else {
          // Move to the next line
          currentText += "\n";
          dialogText.setText(currentText);
          currentCharIndex = 0;
          currentLineIndex++;
        }
      };

      // Function to show the CONTINUE button
      const showContinueButton = () => {
        const continueButton = this.add.text(400, 400, "CONTINUE", {
          fontSize: "24px",
          color: "#ffffff",
          backgroundColor: "#4CAF50",
          padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        continueButton.on("pointerdown", () => {
          this.scene.start("TrialScene"); // Transition to TrialScene
        });
      };

      // Add a timed event to type each character
      this.time.addEvent({
        delay: 30, // Typing speed: 10ms per character
        callback: typeNextCharacter,
        callbackScope: this,
        loop: true,
      });
    });
  }
}
