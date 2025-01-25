const info = {
  name: "author-recognition",
  parameters: {
    author_name: {
      type: "string",
      default: "",
    },
    is_true_author: {
      type: "boolean",
      default: false,
    },
  },
};

class AuthorRecognitionPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych; // Store the jsPsych instance
    this.trialCount = 0; // Track completed trials
    this.totalTrials = 0; // Total number of trials
  }

  setTotalTrials(total) {
    this.totalTrials = total; // Set the total number of trials
  }

  trial(scene, trial, onComplete) {
    // Display the author name using Phaser
    const { width, height } = scene.sys.game.config; 
    const authorText = scene.add.text(width / 2, height / 2.5, trial.author_name, {
      fontSize: "34px",
      color: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Handle keyboard responses
    const startTime = Date.now();
    const validKeys = ["f", "j"];
    const handleKeyPress = (event) => {
      if (validKeys.includes(event.key)) {
        // Stop listening for input
        scene.input.keyboard.off("keydown", handleKeyPress);

        // Compute response data
        const response = {
          rt: Date.now() - startTime,
          key: event.key,
          accuracy: event.key === "f" ? (trial.is_true_author ? 1 : -1) : 0,
        };

        // Push trial data directly to jsPsych
        this.jsPsych.data.get().push({
          author_name: trial.author_name,
          is_true_author: trial.is_true_author,
          rt: response.rt,
          key: response.key,
          accuracy: response.accuracy,
        });

        // Remove author text
        authorText.destroy();

        // Trigger callback to end trial
        if (onComplete) {
          onComplete(response);
        }
      }
    };

    // Listen for key presses
    scene.input.keyboard.on("keydown", handleKeyPress);
  }

  saveData(filename = "author_recognition_data.csv") {
    // Save all data to a CSV file
    this.jsPsych.data.get().localSave("csv", filename);
    console.log(`Data saved as ${filename}`);
  }
}

AuthorRecognitionPlugin.info = info;

export default AuthorRecognitionPlugin;
