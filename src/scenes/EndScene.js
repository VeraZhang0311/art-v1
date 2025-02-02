import Phaser from "phaser";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    // Preload the background image
    this.load.image("background", "assets/images/library.jpg");

    // Load button click sound
    this.load.audio("click", "assets/sounds/click.mp3");
    this.load.audio("finish", "assets/sounds/finish.mp3");    
    
    const funFactCards = [
      "austen",
      "fitzgerald",
      "hemingway",
      "ishiguro",
      "joyce",
      "king",
      "marquez",
      "orwell",
      "rowling",
      "woolf",
    ];
    
    // Preload all fun fact cards
    funFactCards.forEach((card) => {
      this.load.image(card, `assets/images/funfacts/${card}.png`);
    });
    
    // Store the funFactCards array for use in the create method
    this.funFactCards = funFactCards;
  }

  create() {
    const { width, height } = this.sys.game.config;

    // Background
    this.add.image(width / 2, height / 2, "background")
      .setAlpha(0.5) // Set transparency (50% opacity)
      .setScale(0.25) // Scale proportionally to fit screen
      .setScrollFactor(0); // Prevent it from moving if the camera pans

    // Play the "finish" sound effect immediately when the scene starts
    this.sound.play("finish", { volume: 1.2 });

    // Randomly select a fun fact card
    const randomCardKey = Phaser.Utils.Array.GetRandom(this.funFactCards);

    // Display the random fun fact card
    this.add.image(width / 2, height / 2.2, randomCardKey);

    // Add Exit Button
    const exitButton = this.add.text(width / 2, height * 0.85, "Exit", {
      fontSize: "28px",
      color: "#ffffff",
      backgroundColor: "#ff4d4d", // Red background for the button
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // Exit button interaction
    exitButton.on("pointerdown", () => {
      this.sound.play("click"); // Play the click sound
      this.scene.start("BlankScene"); // Transition to BlankScene
    });  
  }
}
