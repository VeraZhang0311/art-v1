import Phaser from "phaser";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    // Preload the background image
    this.load.image("background", "assets/images/library.jpg");
    
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
    
      // Preload the background image
      this.load.image("background", "assets/images/library.jpg");
    
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

    // Randomly select a fun fact card
    const randomCardKey = Phaser.Utils.Array.GetRandom(this.funFactCards);

    // Display the random fun fact card
    this.add.image(width / 2, height / 2, randomCardKey);
  }
}
