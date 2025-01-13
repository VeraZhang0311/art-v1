import Phaser from "phaser";
import AuthorRecognitionPlugin from "../jspsych-plugins/jspsych-ART";

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
  }

  create() {
    // Initialize the plugin
    const artPlugin = new AuthorRecognitionPlugin();

    // Display background
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
        { author_name: 'Marion Coles Snow', is_true_author: false },
        { author_name: 'George Orwell', is_true_author: true },
        { author_name: 'A.C. Kelly', is_true_author: false },
        { author_name: 'Nora Ephron', is_true_author: true },
        // { author_name: 'Frederick Mundow', is_true_author: false },
        // { author_name: 'Nelson DeMille', is_true_author: true },
        // { author_name: 'Jane Austen', is_true_author: true },
        // { author_name: 'Jay Peter Holmes', is_true_author: false },
        // { author_name: 'I.K. Nachbar', is_true_author: false },
        // { author_name: 'Geoffrey Pritchett', is_true_author: false },
        // { author_name: 'Larry Applegate', is_true_author: false },
        // { author_name: 'Stephen Houston', is_true_author: false },
        // { author_name: 'Virginia Woolf', is_true_author: true },
        // { author_name: 'Amy Graham', is_true_author: false },
        // { author_name: 'James Michener', is_true_author: true },
        // { author_name: 'Cameron McGrath', is_true_author: false },
        // { author_name: 'John Landau', is_true_author: false },
        // { author_name: 'Saul Bellow', is_true_author: true },
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

    const bookCovers = ["book1", "book2", "book3", "book4", "book5", "book6"];
    let currentTrial = 0;

    // Function to start a trial
    const startTrial = (trial) => {
      // Randomly select a book cover
      const randomBookCover = Phaser.Utils.Array.GetRandom(bookCovers);
      const bookCover = this.add.image(400, 300, randomBookCover).setScale(1);

      // Start the trial using the plugin
      artPlugin.trial(this, trial, (response) => {
        // Destroy the book cover
        bookCover.destroy();

        // Update the score
        if (response.accuracy === 1) this.score += 10;
        else if (response.accuracy === -1) this.score -= 10;
        this.scoreText.setText(`Score: ${this.score}`);

        // Move to the next trial or end the game
        currentTrial++;
        if (currentTrial < trialData.length) {
          startTrial(trialData[currentTrial]);
        } 
        else {
          this.downloadData(jsPsych); // Trigger data download
          this.scene.start("EndScene");
        }
      });
    };

    // Start the first trial
    startTrial(trialData[currentTrial]);
  }


  downloadData(jsPsych) {
    // Get the data in CSV format
    const csvData = jsPsych.data.get().csv();

    // Create a blob and a link to trigger the download
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "author_recognition_data.csv";

    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

}
