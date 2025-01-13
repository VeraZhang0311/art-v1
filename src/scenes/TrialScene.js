import Phaser from "phaser";
import AuthorRecognitionPlugin from "../jspsych-plugins/jspsych-ART";
import { initJsPsych } from "jspsych";

export default class TrialScene extends Phaser.Scene {
  constructor() {
    super({ key: "TrialScene" });
  }

  preload() {
    // Preload assets
    this.load.image("background", "assets/images/trial-background.jpg");
    this.load.image("book1", "assets/images/book1.jpg");
    this.load.image("book2", "assets/images/book2.jpg");
    this.load.image("book3", "assets/images/book3.jpg");
    this.load.image("book4", "assets/images/book4.jpg");
  }

  create() {
    // Initialize jsPsych
    const jsPsych = initJsPsych();

    // Pass jsPsych explicitly to the plugin
    const artPlugin = new AuthorRecognitionPlugin(jsPsych);

    // Background
    this.add.image(400, 300, "background").setScale(1);

    // Timer and Score
    this.timerValue = 0;
    this.score = 0;

    // Display Timer and Score
    this.timerText = this.add.text(20, 20, `Time: ${this.timerValue}s`, {
      fontSize: "24px",
      color: "#ffffff",
    });
    this.scoreText = this.add.text(20, 60, `Score: ${this.score}`, {
      fontSize: "24px",
      color: "#ffffff",
    });

    // Timer increments
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timerValue++;
        this.timerText.setText(`Time: ${this.timerValue}s`);
      },
      callbackScope: this,
      loop: true,
    });

    // Trial Data
    const trialData = [
      { author_name: "George Orwell", is_true_author: true },
      { author_name: "Marion Coles Snow", is_true_author: false },
      { author_name: "Virginia Woolf", is_true_author: true },
      { author_name: "A.C. Kelly", is_true_author: false },
    ];

    // Set total trials
    artPlugin.setTotalTrials(trialData.length);

    // Function to start a trial
    const startTrial = (trial) => {
      const bookCovers = ["book1", "book2", "book3", "book4"];
      const randomBookCover = Phaser.Utils.Array.GetRandom(bookCovers);
      const bookCover = this.add.image(400, 300, randomBookCover).setScale(0.5);

      artPlugin.trial(this, trial, (response) => {
        // Destroy book cover
        bookCover.destroy();

        // Update score
        if (response.accuracy === 1) this.score += 10;
        else if (response.accuracy === -1) this.score -= 10;
        this.scoreText.setText(`Score: ${this.score}`);

        // Move to next trial
        const nextTrialIndex = trialData.indexOf(trial) + 1;
        if (nextTrialIndex < trialData.length) {
          startTrial(trialData[nextTrialIndex]);
        } else {
          artPlugin.saveData(); // Save data
          this.scene.start("EndScene");
        }
      });
    };

    // Start the first trial
    startTrial(trialData[0]);
  }
}
