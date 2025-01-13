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
  constructor() {
    this.response = {
      rt: null,
      key: null,
      accuracy: null,
    };
  }

  trial(scene, trial, onComplete) {
    // Display the author name using Phaser
    const authorText = scene.add.text(400, 300, trial.author_name, {
      fontSize: "32px",
      color: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Start listening for keyboard responses
    const startTime = Date.now();
    const validKeys = ["f", "j"];
    const handleKeyPress = (event) => {
      if (validKeys.includes(event.key)) {
        // Stop listening to input
        scene.input.keyboard.off("keydown", handleKeyPress);

        // Compute response data
        this.response.rt = Date.now() - startTime;
        this.response.key = event.key;
        this.response.accuracy =
          event.key === "f"
            ? trial.is_true_author
              ? 1
              : -1
            : 0;

        // Remove the author text
        authorText.destroy();

        // Call the callback to end the trial
        if (onComplete) {
          onComplete(this.response);
        }
      }
    };

    scene.input.keyboard.on("keydown", handleKeyPress);
  }
}

AuthorRecognitionPlugin.info = info;

export default AuthorRecognitionPlugin;
