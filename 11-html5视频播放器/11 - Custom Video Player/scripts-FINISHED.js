//1.点击播放和暂停，改变图标
const video = document.querySelector('.viewer');
video.addEventListener("click", videoClick);
const but = document.querySelector('.toggle');
but.addEventListener("click", videoClick);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

//2.改变音量大小和播放速度
const volumnRanges = document.querySelectorAll(".player__slider");
volumnRanges.forEach(volumnRange => volumnRange.addEventListener('change', volumnRangeUpdate));
volumnRanges.forEach(volumnRange => volumnRange.addEventListener('mousemove',volumnRangeUpdate));


//3.改变进度条
const progressFill = document.querySelector('.progress__filled');
video.addEventListener('timeupdate', timeProgress);

//4.快进
const skipButton = document.querySelectorAll("[data-skip]");
skipButton.forEach(button => button.addEventListener('click', skip));

//5.选取播放段
let mousedown = false;
const progress = document.querySelector('.progress');
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//1.点击播放和暂停，改变图标
console.dir(video);
function videoClick() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    but.textContent = icon;
}

//2.改变音量大小
function volumnRangeUpdate() {
    console.log(this.value);
    video[this.name] = this.value;
}

//3.改变进度条
function timeProgress() {
    const value = (video.currentTime / video.duration)*100;
    progressFill.style.flexBasis = `${value}%`;
}

//4.快进
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

//5.选取播放段
function scrub(e) {
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}