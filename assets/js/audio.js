const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

// Format time to mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar
function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

// Set audio time on progress bar click
progressBar.addEventListener('click', (e) => {
  const clickX = e.offsetX;
  const width = progressBar.offsetWidth;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Play audio
playBtn.addEventListener('click', () => {
  audio.play();
  console.log(audio)
  playBtn.disabled = true;
  pauseBtn.disabled = false;
});

// Pause audio
pauseBtn.addEventListener('click', () => {
  audio.pause();
  playBtn.disabled = false;
  pauseBtn.disabled = true;
});

// Load audio metadata
audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

// Update progress as audio plays
audio.addEventListener('timeupdate', updateProgress);

// Reset player when audio ends
audio.addEventListener('ended', () => {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  progress.style.width = '0%';
  currentTimeDisplay.textContent = '0:00';
});
