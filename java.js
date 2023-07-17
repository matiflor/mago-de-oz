const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicRImg = wrapper.querySelector(".img-area")
musicName = wrapper.querySelector(".song-details .name"),
musicPo = wrapper.querySelector(".po")
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nexBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progress-bar");
progressArea = wrapper.querySelector(".progress-area");
volumeRange = wrapper.querySelector("volume-progress");
sliderValue = document.querySelector("sliderValue");
let musicIndex = 1;
let tech = 1;
let is_playing= false;
let po = 100;
window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
}) 
let a= Math.floor(mainAudio.volume * 100 );
  sliderValue=mainAudio.volume%100
  function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `audio/${allMusic[indexNumb - 1].src}.mp3`;
  }
  musicPo.innerText = a;
  //play music function
  function playMusic(){
    wrapper.classList.add("paused");
    musicRImg.classList.toggle("play");
    mainAudio.play();
    playPauseBtn.querySelector("i").innerText ="pause";
    tech++;
  }
  //pause music function
  function pauseMusic(){
    wrapper.classList.remove("paused");
    mainAudio.pause();
    playPauseBtn.querySelector("i").innerText ="play_arrow";
    musicRImg.classList.toggle("play");
    tech--;
  }
  
  function nexMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    musicRImg.classList.toggle("pause");
    tech++
  }
  function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    musicRImg.classList.toggle("pause");
  }
  playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
    tech++;
  });

  nexBtn.addEventListener("click",()=>{
    nexMusic();
  });
  prevBtn.addEventListener("click",()=>{
    prevMusic();
  });
  let volume = mainAudio.volume;
document.addEventListener("keyup", (Event) => {
  if (Event.key == ' ') {
    if (is_playing) {
      musicRImg.classList.toggle("play");
      playPauseBtn.querySelector("i").innerText ="play_arrow";
      mainAudio.pause();
      is_playing = false;
    } else {
      mainAudio.play();
      playPauseBtn.querySelector("i").innerText ="pause";
      is_playing = true;
      musicRImg.classList.toggle("play");
    }}else if (Event.key == "ArrowRight") {
      if (volume < 1) {
        volume = volume + 0.1;
        mainAudio.volume = volume;
        if(a<100){
          a=a+10;
          musicPo.innerText = a;
        }   
      }
    } else if (Event.key == "ArrowLeft") {
      if (volume > 0.1) {
        volume = volume - 0.1;
        mainAudio .volume = volume;
        if(a>0){
          a=a-10;
          musicPo.innerText = a;
        }
    }
  }
});
const vole = mainAudio.volume;
let time = Math.floor(vole%100)
let vol = Math.floor(mainAudio.volume%100)
  mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width =`${progressWidth}%`;

   let musicCurrentTime = wrapper.querySelector(".current")
      musicDuration = wrapper.querySelector(".duration")
    mainAudio.addEventListener("loadeddata", ()=>{
      let audioDuration = mainAudio.duration;
      let totalMin = Math.floor(audioDuration / 60 );
      let totalSec = Math.floor(audioDuration%60);
      if(totalSec<10){
      totalSec=`0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
      let currentMIn = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if(currentSec< 10){
       currentSec=`0${currentSec}`
      }
      musicCurrentTime.innerText = `${currentMIn}:${currentSec}`; 
  
  })