import { ParameterType } from "jspsych";

const info = {
  name: "author-recognition",
  parameters: {
    author_name: {
      type: ParameterType.STRING,
      default: '',
    },
    is_true_author: {
      type: ParameterType.BOOL,
      default: false,
    },
  },
};

class AuthorRecognitionPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }

  trial(display_element, trial) {
    // Display the author name
    display_element.innerHTML = display_element.innerHTML = `
      <div style="
        font-size: 24px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      ">
        ${trial.author_name}
      </div>
    `;

    // Set up response object
    let response = {
      rt: null,
      key: null,
      accuracy: null,
    };

    // Define valid keys
    const valid_keys = ["f", "j"];

    // Handle keyboard responses
    const keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: (info) => {
        response.rt = info.rt;
        response.key = info.key;

        // Compute accuracy
        if (info.key === "f") {
          response.accuracy = trial.is_true_author ? 1 : -1;
        } else if (info.key === "j") {
          response.accuracy = 0;
        }

        // End the trial
        this.endTrial(display_element, trial, response, keyboardListener);
      },
      valid_responses: valid_keys,
      rt_method: "performance",
      persist: false,
      allow_held_key: false,
    });
  }

  endTrial(display_element, trial, response, keyboardListener) {
    // Cancel keyboard listener
    this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

    // Clear display
    display_element.innerHTML = "";

    // Package trial data
    const trial_data = {
      rt: response.rt,
      key: response.key,
      accuracy: response.accuracy,
      author_name: trial.author_name,
      is_true_author: trial.is_true_author,
    };

    // Finish the trial
    this.jsPsych.finishTrial(trial_data);
  }
}

AuthorRecognitionPlugin.info = info;

export default AuthorRecognitionPlugin;
