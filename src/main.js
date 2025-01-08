import { initJsPsych } from 'jspsych';
import AuthorRecognitionPlugin from './jspsych-plugins/jspsych-ART.js';

// Initialize jsPsych
const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
});

// Define the timeline
const timeline = [];

const trial_data = [
  { author_name: 'J.K. Rowling', is_true_author: true },
  { author_name: 'Fictional Author', is_true_author: false },
  { author_name: 'George Orwell', is_true_author: true },
];

// Add trials
trial_data.forEach((data) => {
  timeline.push({
    type: AuthorRecognitionPlugin, // Pass the plugin class directly here
    author_name: data.author_name,
    is_true_author: data.is_true_author,
  });
});

// Start the experiment
jsPsych.run(timeline);
