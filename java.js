const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicRImg = wrapper.querySelector(".img-area")
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nexBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progress-bar");
progressArea = wrapper.querySelector(".progress-area");

let musicIndex = 1;
 
window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
}) 

  function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `audio/${allMusic[indexNumb - 1].src}.mp3`;
  }
  //play music function
  function playMusic(){
    wrapper.classList.add("paused");
    musicRImg.classList.toggle("play");
    mainAudio.play();
    playPauseBtn.querySelector("i").innerText ="pause";
  }
  //pause music function
  function pauseMusic(){
    wrapper.classList.remove("paused");
    mainAudio.pause();
    playPauseBtn.querySelector("i").innerText ="play_arrow";
    musicRImg.classList.toggle("play");
  }
  function nexMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    musicRImg.classList.toggle("play");
  }
  function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    musicRImg.classList.toggle("play");
  }
  playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
  });

  nexBtn.addEventListener("click",()=>{
    nexMusic();
  });
  prevBtn.addEventListener("click",()=>{
    prevMusic();
  });
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