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
    this.load.image("book5", "assets/images/book5.jpg");
    this.load.image("book6", "assets/images/book6.png");
    this.load.image("fjkeys", "assets/images/fjkeys.png");

    // Preload sound effects
    this.load.audio("correct", "assets/sounds/correct.mp3");
    this.load.audio("wrong", "assets/sounds/wrong.mp3");
    this.load.audio("hmm", "assets/sounds/hmm.mp3");
  }

  create() {
    // Initialize jsPsych
    const jsPsych = initJsPsych();

    // Pass jsPsych explicitly to the plugin
    const artPlugin = new AuthorRecognitionPlugin(jsPsych);

    // Sound Effects
    this.sound.add("correct");
    this.sound.add("wrong");
    this.sound.add("hmm");

    // Background
    const { width, height } = this.sys.game.config;
    this.add.image(width / 2, height / 2, "background")
      .setAlpha(0.5) // Set transparency (50% opacity)
      .setScale(0.25) // Scale proportionally to fit screen
      .setScrollFactor(0); // Prevent it from moving if the camera pans

    this.add.image(width / 2, height * 0.8, "fjkeys").setScale(0.3);

    // Trial Data
    const trialData = [
      { author_name: 'Marion Coles Snow', is_true_author: false },
      { author_name: 'George Orwell', is_true_author: true },
      { author_name: 'A.C. Kelly', is_true_author: false },
      { author_name: 'Nora Ephron', is_true_author: true },
      { author_name: 'Frederick Mundow', is_true_author: false },
      { author_name: 'Nelson DeMille', is_true_author: true },
      { author_name: 'Jane Austen', is_true_author: true },
      { author_name: 'Jay Peter Holmes', is_true_author: false },
      { author_name: 'I.K. Nachbar', is_true_author: false },
      { author_name: 'Geoffrey Pritchett', is_true_author: false },
      { author_name: 'Larry Applegate', is_true_author: false },
      { author_name: 'Stephen Houston', is_true_author: false },
      { author_name: 'Virginia Woolf', is_true_author: true },
      { author_name: 'Amy Graham', is_true_author: false },
      { author_name: 'James Michener', is_true_author: true },
      { author_name: 'Cameron McGrath', is_true_author: false },
      { author_name: 'John Landau', is_true_author: false },
      { author_name: 'Saul Bellow', is_true_author: true },
      // { author_name: 'F. Scott Fitzgerald', is_true_author: true },
      // { author_name: 'Rick Riordan', is_true_author: true },
      // { author_name: 'Robert Ludlum', is_true_author: true },
      // { author_name: 'Ted Mantel', is_true_author: false },
      // { author_name: 'Gabriel Garcia Marquez', is_true_author: true },
      // { author_name: 'Veronica Roth', is_true_author: true },
      // { author_name: 'Khaled Hosseini', is_true_author: true },
      // { author_name: 'Raymond Chandler', is_true_author: true },
      // { author_name: 'Hiroyuki Oshita', is_true_author: false },
      // { author_name: 'Jessica Ann Lewis', is_true_author: false },
      // { author_name: 'Marvin Benoit', is_true_author: false },
      // { author_name: 'C.S. Lewis', is_true_author: true },
      // { author_name: 'Kazuo Ishiguro', is_true_author: true },
      // { author_name: 'Alex D. Miles', is_true_author: false },
      // { author_name: 'Lindsay Carter', is_true_author: false },
      // { author_name: 'Patrick Banville', is_true_author: false },
      // { author_name: 'Thomas Pynchon', is_true_author: true },
      // { author_name: 'Alice Walker', is_true_author: true },
      // { author_name: 'Gary Curwen', is_true_author: false },
      // { author_name: 'Antonia Cialdini', is_true_author: false },
      // { author_name: 'Jeremy Weissman', is_true_author: false },
      // { author_name: 'Walter LeMour', is_true_author: false },
      // { author_name: 'Jack London', is_true_author: true },
      // { author_name: 'Margaret Atwood', is_true_author: true },
      // { author_name: 'Francine Preston', is_true_author: false },
      // { author_name: 'Harry Coltheart', is_true_author: false },
      // { author_name: 'Salman Rushdie', is_true_author: true },
      // { author_name: 'Amy R. Baskin', is_true_author: false },
      // { author_name: 'James Joyce', is_true_author: true },
      // { author_name: 'Ralph Ellison', is_true_author: true },
      // { author_name: 'Beatrice Dobkin', is_true_author: false },
      // { author_name: 'Pamela Lovejoy', is_true_author: false },
      // { author_name: 'Keith Cartwright', is_true_author: false },
      // { author_name: 'Christina Johnson', is_true_author: false },
      // { author_name: 'Danielle Steel', is_true_author: true },
      // { author_name: 'Sue Grafton', is_true_author: true },
      // { author_name: 'Ayn Rand', is_true_author: true },
      // { author_name: 'Nicholas Sparks', is_true_author: true },
      // { author_name: 'Dan Brown', is_true_author: true },
      // { author_name: 'Giles Mallon', is_true_author: false },
      // { author_name: 'J.D. Salinger', is_true_author: true },
      // { author_name: 'Peter Flaegerty', is_true_author: false },
      // { author_name: 'David Ashley', is_true_author: false },
      // { author_name: 'T.S. Eliot', is_true_author: true },
      // { author_name: 'Roswell Strong', is_true_author: false },
      // { author_name: 'Wayne Fillback', is_true_author: false },
      // { author_name: 'Valerie Cooper', is_true_author: false },
      // { author_name: 'Ann Tsing', is_true_author: false },
      // { author_name: 'Elizabeth Engle', is_true_author: false },
      // { author_name: 'Clive Cussler', is_true_author: true },
      // { author_name: 'Samuel Beckett', is_true_author: true },
      // { author_name: 'Anne McCaffrey', is_true_author: true },
      // { author_name: 'Harriet Troudeau', is_true_author: false },
      // { author_name: 'Scott Alexander', is_true_author: false },
      // { author_name: 'Jodi Picoult', is_true_author: true },
      // { author_name: 'J.R.R. Tolkien', is_true_author: true },
      // { author_name: 'Judith Krantz', is_true_author: true },
      // { author_name: 'Isaac Asimov', is_true_author: true },
      // { author_name: 'Elinor Harring', is_true_author: false },
      // { author_name: 'Harper Lee', is_true_author: true },
      // { author_name: 'Willa Cather', is_true_author: true },
      // { author_name: 'Jonathan Kellerman', is_true_author: true },
      // { author_name: 'J.K. Rowling', is_true_author: true },
      // { author_name: 'Leslie Kraus', is_true_author: false },
      // { author_name: 'Martha Farah', is_true_author: false },
      // { author_name: 'Umberto Eco', is_true_author: true },
      // { author_name: 'John Irving', is_true_author: true },
      // { author_name: 'Joyce Carol Oates', is_true_author: true },
      // { author_name: 'Wally Lamb', is_true_author: true },
      // { author_name: 'Maryann Phillips', is_true_author: false },
      // { author_name: 'Arturo Garcia Perez', is_true_author: false },
      // { author_name: 'Padraig O\'Seaghdha', is_true_author: false },
      // { author_name: 'John Grisham', is_true_author: true },
      // { author_name: 'Vikram Roy', is_true_author: false },
      // { author_name: 'Kurt Vonnegut', is_true_author: true },
      // { author_name: 'Herman Wouk', is_true_author: true },
      // { author_name: 'Stewart Simon', is_true_author: false },
      // { author_name: 'Sarah Dessen', is_true_author: true },
      // { author_name: 'Elizabeth May Kenyon', is_true_author: false },
      // { author_name: 'S.L. Holloway', is_true_author: false },
      // { author_name: 'Ernest Hemingway', is_true_author: true },
      // { author_name: 'Gloria McCumber', is_true_author: false },
      // { author_name: 'Tony Hillerman', is_true_author: true },
      // { author_name: 'Isabel Allende', is_true_author: true },
      // { author_name: 'Walter Dorris', is_true_author: false },
      // { author_name: 'John Green', is_true_author: true },
      // { author_name: 'Mary Higgins Clark', is_true_author: true },
      // { author_name: 'Tom Clancy', is_true_author: true },
      // { author_name: 'Sue Hammond', is_true_author: false },
      // { author_name: 'Seamus Huneven', is_true_author: false },
      // { author_name: 'Katherine Kreutz', is_true_author: false },
      // { author_name: 'Seth Bakis', is_true_author: false },
      // { author_name: 'Jared Gibbons', is_true_author: false },
      // { author_name: 'William Faulkner', is_true_author: true },
      // { author_name: 'Erich Fagles', is_true_author: false },
      // { author_name: 'Margaret Mitchell', is_true_author: true },
      // { author_name: 'Michael Ondaatje', is_true_author: true },
      // { author_name: 'Stephenie Meyer', is_true_author: true },
      // { author_name: 'Bernard Malamud', is_true_author: true },
      // { author_name: 'Judith Stanley', is_true_author: false },
      // { author_name: 'Craig DeLord', is_true_author: false },
      // { author_name: 'Suzanne Collins', is_true_author: true },
      // { author_name: 'Ray Bradbury', is_true_author: true },
      // { author_name: 'Lisa Hong Chin', is_true_author: false },
      // { author_name: 'Kristen Steinke', is_true_author: false },
      // { author_name: 'Lisa Woodward', is_true_author: false },
      // { author_name: 'Vladimir Nabokov', is_true_author: true },
      // { author_name: 'Stephen King', is_true_author: true },
      // { author_name: 'Chris Schwartz', is_true_author: false },
      // { author_name: 'Marcus Lecherou', is_true_author: false },
      // { author_name: 'E.B. White', is_true_author: true },
      // { author_name: 'David Harper Townsend', is_true_author: false }
    ];

    // Set total trials
    artPlugin.setTotalTrials(trialData.length);

    // Progress Bar Dimensions
    const progressBarWidth = width * 0.3; // 30% of the screen width
    const progressBarHeight = height * 0.05; // 5% of the screen height

    // Draw the background of the progress bar
    const progressBarBackground = this.add.graphics();
    progressBarBackground.fillStyle(0x555555, 1); // Gray background
    progressBarBackground.fillRoundedRect(40, 30, progressBarWidth, progressBarHeight, 5);

    // Draw the progress bar (ensure it's on top of the background)
    const progressBar = this.add.graphics();
    progressBar.setDepth(1); // Ensure it's on top of the background

    // Add progress percentage text
    const progressText = this.add.text(
      40 + progressBarWidth + 10, // Position text to the right of the progress bar
      30 + progressBarHeight / 2, // Vertically center it with the progress bar
      "0% Answered",
      {
        fontSize: `${Math.max(16, height * 0.02)}px`, // Font size adjusts with screen size
        color: "#ffffff",
      }
    ).setOrigin(0, 0.5); // Align text to the left-center

    // Function to update the progress bar and percentage text
    const updateProgressBar = (currentTrial) => {
      const progress = (currentTrial + 1) / trialData.length; // Calculate progress percentage
      progressBar.clear();
      progressBar.fillStyle(0x4CAF50, 1); // Green color
      const progressWidth = Math.max(progress * progressBarWidth, 1); // Minimum width of 1 pixel
      progressBar.fillRoundedRect(40, 30, progressWidth, progressBarHeight, 5);

      // Update percentage text
      const percentage = Math.round(progress * 100); // Convert progress to percentage
      progressText.setText(`${percentage}% Answered`);
    };

    // Initial progress bar state
    updateProgressBar(-1); // Set initial progress as 0%


    // Function to start a trial
    const startTrial = (trial, currentTrialIndex) => {
      const bookCovers = ["book1", "book2", "book3", "book4", "book5", "book6"];
      const randomBookCover = Phaser.Utils.Array.GetRandom(bookCovers);
      const bookCover = this.add.image(width / 2, height / 2.5, randomBookCover).setScale(1.2);
    
      artPlugin.trial(this, trial, (response) => {
        // Destroy book cover
        bookCover.destroy();
    
        // Update progress bar
        updateProgressBar(currentTrialIndex);
    
        // Move to next trial
        const nextTrialIndex = currentTrialIndex + 1;
        if (nextTrialIndex < trialData.length) {
          startTrial(trialData[nextTrialIndex], nextTrialIndex);
        } else {
          artPlugin.saveData(); // Save data
          this.scene.start("EndScene");
        }
      });
    };
    
    // Start the first trial
    updateProgressBar(-1); // Initialize progress bar at 0%
    startTrial(trialData[0], 0);    
  }
}
