// dom elements
const elements = {
  word: document.getElementById('word') as HTMLHeadingElement,
  text: document.getElementById('text') as HTMLInputElement,
  scoreEl: document.getElementById('score') as HTMLParagraphElement,
  timeEl: document.getElementById('time') as HTMLParagraphElement,
  endgameEl: document.getElementById('end-game-container') as HTMLDivElement,
  settingsBtn: document.getElementById('settings-btn') as HTMLButtonElement,
  settings: document.getElementById('settings') as HTMLDivElement,
  difficultySelect: document.getElementById('difficulty') as HTMLSelectElement,
  reloadBtn: document.querySelector('.reload') as HTMLButtonElement,
  finalScore: document.querySelector('.final-score') as HTMLParagraphElement,
};

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word
let randomWord: string;

// Init score
let score = 0;

// Init time
let time = 10;

// timer
let timer: number;

// Set difficulty to value in ls or medium
let difficulty: 'easy' | 'medium' | 'hard' = 'medium';

// functions
const startGame = () => {
  // reseting the UI
  elements.endgameEl.classList.remove('display');
  elements.timeEl.textContent = `10s`;
  elements.scoreEl.textContent = '0';

  // assign a random word
  randomWord = words[Math.floor(Math.random() * words.length)];

  elements.word.textContent = randomWord;

  // reset all scores
  score = 0;
  time = 10;

  elements.text.focus();

  // start the timer
  timer = setInterval(() => {
    if (time <= 0) return lostGame();

    time--;
    elements.timeEl.textContent = `${time}s`;
  }, 1000);
};

const checkWord = () => {
  if (elements.text.value === randomWord) increaseScore();
};

const increaseScore = () => {
  if (difficulty === 'easy') time += 5;
  if (difficulty === 'medium') time += 3;
  if (difficulty === 'hard') time += 2;

  score++;

  elements.text.value = '';
  randomWord = words[Math.floor(Math.random() * words.length)];
  elements.word.textContent = randomWord;
  elements.scoreEl.textContent = `${score}`;
};

const lostGame = () => {
  clearInterval(timer);

  elements.endgameEl.classList.add('display');
  elements.finalScore.textContent = `Your final score is ${score}`;
};

const changeDifficulty = () => {
  difficulty = elements.difficultySelect.value as 'easy' | 'medium' | 'hard';
};

const toggleSettings = () => {
  elements.settings.classList.toggle('hide');
};

startGame();

// event listeners
elements.text.addEventListener('input', checkWord);

// restart game
elements.reloadBtn.addEventListener('click', startGame);

// game hardness
elements.difficultySelect.addEventListener('change', changeDifficulty);

// settings
elements.settingsBtn.addEventListener('click', toggleSettings);
