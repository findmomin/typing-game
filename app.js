// dom elements
var elements = {
    word: document.getElementById('word'),
    text: document.getElementById('text'),
    scoreEl: document.getElementById('score'),
    timeEl: document.getElementById('time'),
    endgameEl: document.getElementById('end-game-container'),
    settingsBtn: document.getElementById('settings-btn'),
    settings: document.getElementById('settings'),
    difficultySelect: document.getElementById('difficulty'),
    reloadBtn: document.querySelector('.reload'),
    finalScore: document.querySelector('.final-score')
};
// List of words for game
var words = [
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
var randomWord;
// Init score
var score = 0;
// Init time
var time = 10;
// timer
var timer;
// Set difficulty to value in ls or medium
var difficulty = 'medium';
// functions
var startGame = function () {
    // reseting the UI
    elements.endgameEl.classList.remove('display');
    elements.timeEl.textContent = "10s";
    elements.scoreEl.textContent = '0';
    // assign a random word
    randomWord = words[Math.floor(Math.random() * words.length)];
    elements.word.textContent = randomWord;
    // reset all scores
    score = 0;
    time = 10;
    elements.text.focus();
    // start the timer
    timer = setInterval(function () {
        if (time <= 0)
            return lostGame();
        time--;
        elements.timeEl.textContent = time + "s";
    }, 1000);
};
var checkWord = function () {
    if (elements.text.value === randomWord)
        increaseScore();
};
var increaseScore = function () {
    if (difficulty === 'easy')
        time += 5;
    if (difficulty === 'medium')
        time += 3;
    if (difficulty === 'hard')
        time += 2;
    score++;
    elements.text.value = '';
    randomWord = words[Math.floor(Math.random() * words.length)];
    elements.word.textContent = randomWord;
    elements.scoreEl.textContent = "" + score;
};
var lostGame = function () {
    clearInterval(timer);
    elements.endgameEl.classList.add('display');
    elements.finalScore.textContent = "Your final score is " + score;
};
var changeDifficulty = function () {
    difficulty = elements.difficultySelect.value;
};
var toggleSettings = function () {
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
