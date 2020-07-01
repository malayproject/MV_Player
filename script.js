const elVideo = document.getElementById("player");
const elPlayBtn = document.getElementById("play");
const elStopBtn = document.getElementById("stop");
const elHopForwardBtn = document.getElementById("hop10sf");
const elHopBackBtn = document.getElementById("hop10sb");
const elProgressBar = document.getElementById("progress");
const elTimeStamp = document.getElementById("timestamp");

var togglePlayBtn = function () {
  if (elPlayBtn.classList.contains("pause")) {
    elPlayBtn.classList.remove("pause");
  } else {
    elPlayBtn.classList.add("pause");
  }
};
var toggleVideoStatus = function () {
  if (elVideo.paused) {
    elVideo.play();
  } else {
    elVideo.pause();
  }
  togglePlayBtn();
};
var resetVideo = function () {
  elVideo.currentTime = 0;
  elVideo.pause();
  elPlayBtn.classList.remove("pause");
  showTime = showTimeElapsed;
};

var setVideo10sAhead = function () {
  console.log(elVideo.currentTime);
  if (elVideo.currentTime + 10 > elVideo.duration) {
    resetVideo();
    toggleVideoStatus();
  } else elVideo.currentTime = elVideo.currentTime + 10;
  console.log(elVideo.currentTime);
};
var setVideo10sBack = function () {
  console.log(elVideo.currentTime);
  if (elVideo.currentTime - 10 < 0) {
    resetVideo();
    toggleVideoStatus();
  } else elVideo.currentTime = elVideo.currentTime - 10;
  console.log(elVideo.currentTime);
};
var showTimeElapsed = function () {
  var hr = String(Math.floor(elVideo.currentTime / 60));
  if (Number(hr) < 10) hr = "0" + hr;
  var sec = String(Math.floor(elVideo.currentTime % 60));
  if (Number(sec) < 10) sec = "0" + sec;
  //console.log(`${hr}:${sec}`);
  elTimeStamp.innerText = `${hr}:${sec}/${showTotalDuration}`;
};
var showTimeLeft = function () {
  var hr = String(Math.floor((elVideo.duration - elVideo.currentTime) / 60));
  if (Number(hr) < 10) hr = "0" + hr;
  var sec = String(Math.floor((elVideo.duration - elVideo.currentTime) % 60));
  if (Number(sec) < 10) sec = "0" + sec;
  //console.log(`${hr}:${sec}`);
  elTimeStamp.innerText = `-${hr}:${sec}/${showTotalDuration}`;
};
var showTime = showTimeElapsed;
var toggleShowTime = () => {
  if (showTime == showTimeElapsed) showTime = showTimeLeft;
  else showTime = showTimeElapsed;
};
var showProgress = () => {
  elProgressBar.value = (elVideo.currentTime / elVideo.duration) * 100;
};
var showProgressAndTime = function () {
  showTime();
  showProgress();
};
var setVideoToTime = () => {
  elVideo.currentTime = (elProgressBar.value / 100) * elVideo.duration;
};
var showTotalDuration = (() => {
  let hr = String(Math.floor(elVideo.duration / 60));
  if (Number(hr) < 10) hr = "0" + hr;
  let sec = String(Math.floor(elVideo.duration % 60));
  if (Number(sec) < 10) sec = "0" + sec;
  return `${hr}:${sec}`;
})();
elVideo.addEventListener("click", toggleVideoStatus);
elPlayBtn.addEventListener("click", toggleVideoStatus);
elStopBtn.addEventListener("click", resetVideo);
elHopForwardBtn.addEventListener("click", setVideo10sAhead);
elHopBackBtn.addEventListener("click", setVideo10sBack);
elTimeStamp.addEventListener("click", toggleShowTime);
elProgressBar.addEventListener("change", setVideoToTime);
elVideo.onended = resetVideo;
elVideo.ontimeupdate = showProgressAndTime;
