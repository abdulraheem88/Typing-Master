// Global variables
let currentLevel = 'easy';
let currentTheme = 'light';
let selectedTime = 120; // 2 minutes default
let gameState = 'setup'; // setup, playing, finished
let gameTimer = null;
let timeLeft = 0;
let startTime = null;
let currentText = '';
let currentPosition = 0;
let correctChars = 0;
let totalChars = 0;
let errors = 0;

// DOM elements
const elements = {
    body: document.body,
    gameSetup: document.getElementById('game-setup'),
    gameArea: document.getElementById('game-area'),
    results: document.getElementById('results'),
    levelButtons: document.querySelectorAll('.level-btn'),
    timerButtons: document.querySelectorAll('.timer-btn'),
    startBtn: document.getElementById('start-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    statsBtn: document.getElementById('stats-btn'),
    textContent: document.getElementById('text-content'),
    typingInput: document.getElementById('typing-input'),
    wpmDisplay: document.getElementById('wpm'),
    cpmDisplay: document.getElementById('cpm'),
    accuracyDisplay: document.getElementById('accuracy'),
    timerDisplay: document.getElementById('timer'),
    restartBtn: document.getElementById('restart-btn'),
    changeLevelBtn: document.getElementById('change-level-btn'),
    statsModal: document.getElementById('stats-modal'),
    closeStats: document.getElementById('close-stats'),
    statsGrid: document.getElementById('stats-grid')
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserPreferences();
    updateTheme();
});

function initializeApp() {
    // Set initial theme classes
    elements.body.className = `${currentLevel} ${currentTheme}`;
    
    // Initialize displays
    updateStats();
    updateTimer();
    
    // Load saved preferences
    const savedLevel = localStorage.getItem('typingMaster_level');
    const savedTheme = localStorage.getItem('typingMaster_theme');
    const savedTime = localStorage.getItem('typingMaster_time');
    
    if (savedLevel) {
        currentLevel = savedLevel;
        document.querySelector(`[data-level="${currentLevel}"]`).classList.add('active');
        document.querySelector(`[data-level="${currentLevel}"]`).siblings?.forEach(btn => btn.classList.remove('active'));
    }
    
    if (savedTheme) {
        currentTheme = savedTheme;
    }
    
    if (savedTime) {
        selectedTime = parseInt(savedTime);
        document.querySelector(`[data-time="${selectedTime}"]`).classList.add('active');
        document.querySelector(`[data-time="${selectedTime}"]`).siblings?.forEach(btn => btn.classList.remove('active'));
    }
    
    updateTheme();
}

function setupEventListeners() {
    // Level selection
    elements.levelButtons.forEach(btn => {
        btn.addEventListener('click', () => selectLevel(btn.dataset.level));
    });
    
    // Timer selection
    elements.timerButtons.forEach(btn => {
        btn.addEventListener('click', () => selectTime(parseInt(btn.dataset.time)));
    });
    
    // Game controls
    elements.startBtn.addEventListener('click', startGame);
    elements.restartBtn.addEventListener('click', restartGame);
    elements.changeLevelBtn.addEventListener('click', changeLevel);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.statsBtn.addEventListener('click', showStats);
    elements.closeStats.addEventListener('click', hideStats);
    
    // Typing input
    elements.typingInput.addEventListener('input', handleTyping);
    elements.typingInput.addEventListener('keydown', handleKeyDown);
    
    // Results buttons
    document.getElementById('try-again-btn')?.addEventListener('click', restartGame);
    document.getElementById('new-challenge-btn')?.addEventListener('click', changeLevel);
    document.getElementById('view-stats-btn')?.addEventListener('click', showStats);
    
    // Modal close on outside click
    elements.statsModal.addEventListener('click', (e) => {
        if (e.target === elements.statsModal) hideStats();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!elements.statsModal.classList.contains('hidden')) {
                hideStats();
            }
        }
    });
}

function selectLevel(level) {
    currentLevel = level;
    localStorage.setItem('typingMaster_level', level);
    
    // Update UI
    elements.levelButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
    });
    
    updateTheme();
}

function selectTime(time) {
    selectedTime = time;
    localStorage.setItem('typingMaster_time', time.toString());
    
    // Update UI
    elements.timerButtons.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.time) === time);
    });
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('typingMaster_theme', currentTheme);
    updateTheme();
}

function updateTheme() {
    elements.body.className = `${currentLevel} ${currentTheme}`;
    
    // Update theme toggle icon
    const icon = elements.themeToggle.querySelector('i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function loadUserPreferences() {
    // Load any additional user preferences from localStorage
    const preferences = JSON.parse(localStorage.getItem('typingMaster_preferences') || '{}');
    
    // Apply preferences if needed
    if (preferences.autoFocus !== false) {
        // Auto-focus input when game starts (default: true)
    }
}

function startGame() {
    gameState = 'playing';
    timeLeft = selectedTime;
    currentPosition = 0;
    correctChars = 0;
    totalChars = 0;
    errors = 0;
    startTime = Date.now();
    
    // Get random text for current level
    currentText = getRandomText(currentLevel);
    
    // Setup UI
    showSection('game-area');
    setupTextDisplay();
    elements.typingInput.disabled = false;
    elements.typingInput.value = '';
    elements.typingInput.focus();
    
    // Start timer
    startTimer();
    
    // Update displays
    updateStats();
    updateTimer();
}

function getRandomText(level) {
    const texts = textData[level];
    return texts[Math.floor(Math.random() * texts.length)];
}

function setupTextDisplay() {
    const textElement = elements.textContent;
    textElement.innerHTML = '';
    
    // Create character spans
    for (let i = 0; i < currentText.length; i++) {
        const span = document.createElement('span');
        span.textContent = currentText[i];
        span.className = 'char';
        if (i === 0) span.classList.add('current');
        textElement.appendChild(span);
    }
}

function startTimer() {
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function handleTyping(e) {
    if (gameState !== 'playing') return;
    
    const inputValue = e.target.value;
    const inputLength = inputValue.length;
    
    // Update character states
    updateCharacterStates(inputValue);
    
    // Update statistics
    updateStats();
    
    // Check if text is completed
    if (inputLength >= currentText.length) {
        endGame();
    }
}

function handleKeyDown(e) {
    if (gameState !== 'playing') return;
    
    // Prevent certain keys that might interfere
    if (e.key === 'Tab') {
        e.preventDefault();
    }
}

function updateCharacterStates(inputValue) {
    const chars = elements.textContent.querySelectorAll('.char');
    totalChars = inputValue.length;
    correctChars = 0;
    errors = 0;
    
    chars.forEach((char, index) => {
        char.classList.remove('correct', 'incorrect', 'current');
        
        if (index < inputValue.length) {
            if (inputValue[index] === currentText[index]) {
                char.classList.add('correct');
                correctChars++;
            } else {
                char.classList.add('incorrect');
                errors++;
            }
        } else if (index === inputValue.length) {
            char.classList.add('current');
        }
    });
    
    currentPosition = inputValue.length;
}

function updateStats() {
    if (gameState !== 'playing' || !startTime) {
        elements.wpmDisplay.textContent = '0';
        elements.cpmDisplay.textContent = '0';
        elements.accuracyDisplay.textContent = '100%';
        return;
    }
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const wordsTyped = correctChars / 5; // standard: 5 chars = 1 word
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const cpm = timeElapsed > 0 ? Math.round(correctChars / timeElapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    elements.wpmDisplay.textContent = wpm;
    elements.cpmDisplay.textContent = cpm;
    elements.accuracyDisplay.textContent = accuracy + '%';
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    elements.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function endGame() {
    gameState = 'finished';
    clearInterval(gameTimer);
    elements.typingInput.disabled = true;
    
    // Calculate final stats
    const timeElapsed = (selectedTime - timeLeft) / 60; // minutes
    const finalWpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;
    const finalCpm = timeElapsed > 0 ? Math.round(correctChars / timeElapsed) : 0;
    const finalAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    // Save score
    const score = {
        wpm: finalWpm,
        cpm: finalCpm,
        accuracy: finalAccuracy,
        level: currentLevel,
        time: selectedTime,
        date: new Date().toISOString()
    };
    
    saveScore(score);
    showResults(score);
}

function saveScore(score) {
    // Get existing scores
    const scores = JSON.parse(localStorage.getItem('typingMaster_scores') || '[]');
    
    // Add new score
    scores.push(score);
    
    // Keep only last 100 scores
    if (scores.length > 100) {
        scores.splice(0, scores.length - 100);
    }
    
    // Save back to localStorage
    localStorage.setItem('typingMaster_scores', JSON.stringify(scores));
    
    // Update best scores
    updateBestScores(score);
}

function updateBestScores(score) {
    const key = `typingMaster_best_${score.level}_${score.time}`;
    const currentBest = parseInt(localStorage.getItem(key) || '0');
    
    if (score.wpm > currentBest) {
        localStorage.setItem(key, score.wpm.toString());
    }
    
    // Update all-time best
    const allTimeBest = parseInt(localStorage.getItem('typingMaster_alltime_best') || '0');
    if (score.wpm > allTimeBest) {
        localStorage.setItem('typingMaster_alltime_best', score.wpm.toString());
    }
}

function showResults(score) {
    showSection('results');
    
    // Update result displays
    document.getElementById('final-wpm').textContent = score.wpm;
    document.getElementById('final-cpm').textContent = score.cpm;
    document.getElementById('final-accuracy').textContent = score.accuracy + '%';
    
    // Get best scores
    const personalBest = getBestScore(score.level, score.time);
    const levelRecord = getLevelRecord(score.level);
    const allTimeHigh = parseInt(localStorage.getItem('typingMaster_alltime_best') || '0');
    
    document.getElementById('personal-best').textContent = personalBest + ' WPM';
    document.getElementById('level-record').textContent = levelRecord + ' WPM';
    document.getElementById('all-time-high').textContent = allTimeHigh + ' WPM';
    
    // Show achievement badge
    const achievementBadge = document.getElementById('achievement-badge');
    const achievement = getAchievement(score, personalBest, allTimeHigh);
    achievementBadge.textContent = achievement;
    
    // Show motivational quote
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('motivational-quote').textContent = quote;
}

function getBestScore(level, time) {
    const key = `typingMaster_best_${level}_${time}`;
    return parseInt(localStorage.getItem(key) || '0');
}

function getLevelRecord(level) {
    const scores = JSON.parse(localStorage.getItem('typingMaster_scores') || '[]');
    const levelScores = scores.filter(s => s.level === level);
    return levelScores.length > 0 ? Math.max(...levelScores.map(s => s.wpm)) : 0;
}

function getAchievement(score, personalBest, allTimeHigh) {
    if (score.wpm > allTimeHigh) {
        return achievements.newRecord;
    } else if (score.wpm >= 80) {
        return achievements.excellent;
    } else if (score.wpm >= 60) {
        return achievements.good;
    } else if (score.wpm > personalBest) {
        return achievements.improving;
    } else {
        return achievements.keepTrying;
    }
}

function restartGame() {
    // Reset game state
    gameState = 'setup';
    clearInterval(gameTimer);
    
    // Reset variables
    currentPosition = 0;
    correctChars = 0;
    totalChars = 0;
    errors = 0;
    startTime = null;
    
    // Start new game with same settings
    startGame();
}

function changeLevel() {
    // Reset game state
    gameState = 'setup';
    clearInterval(gameTimer);
    
    // Show setup section
    showSection('game-setup');
    
    // Reset input
    elements.typingInput.value = '';
    elements.typingInput.disabled = true;
}

function showStats() {
    const scores = JSON.parse(localStorage.getItem('typingMaster_scores') || '[]');
    
    // Group scores by level and time
    const groupedStats = {};
    
    scores.forEach(score => {
        const key = `${score.level}_${score.time}`;
        if (!groupedStats[key]) {
            groupedStats[key] = {
                level: score.level,
                time: score.time,
                scores: []
            };
        }
        groupedStats[key].scores.push(score);
    });
    
    // Generate stats HTML
    let statsHtml = '';
    
    Object.values(groupedStats).forEach(group => {
        const bestWpm = Math.max(...group.scores.map(s => s.wpm));
        const avgWpm = Math.round(group.scores.reduce((sum, s) => sum + s.wpm, 0) / group.scores.length);
        const bestAccuracy = Math.max(...group.scores.map(s => s.accuracy));
        const attempts = group.scores.length;
        
        statsHtml += `
            <div class="result-card">
                <h3>${group.level.charAt(0).toUpperCase() + group.level.slice(1)} - ${group.time / 60}min</h3>
                <div class="score-details">
                    <div class="score-item">
                        <span>Best WPM</span>
                        <span>${bestWpm}</span>
                    </div>
                    <div class="score-item">
                        <span>Average WPM</span>
                        <span>${avgWpm}</span>
                    </div>
                    <div class="score-item">
                        <span>Best Accuracy</span>
                        <span>${bestAccuracy}%</span>
                    </div>
                    <div class="score-item">
                        <span>Attempts</span>
                        <span>${attempts}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    if (statsHtml === '') {
        statsHtml = '<p style="text-align: center; color: var(--text-secondary);">No statistics available yet. Start typing to build your stats!</p>';
    }
    
    elements.statsGrid.innerHTML = statsHtml;
    elements.statsModal.classList.remove('hidden');
}

function hideStats() {
    elements.statsModal.classList.add('hidden');
}

function showSection(sectionId) {
    // Hide all sections
    elements.gameSetup.classList.add('hidden');
    elements.gameArea.classList.add('hidden');
    elements.results.classList.add('hidden');
    
    // Show target section
    document.getElementById(sectionId).classList.remove('hidden');
}

// Utility functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectLevel,
        selectTime,
        startGame,
        endGame,
        updateStats,
        saveScore
    };
}