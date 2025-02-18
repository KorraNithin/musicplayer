let currentSong = new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




async function getSongs() {
    
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let responce = await a.text();
    let div = document.createElement("div")
    div.innerHTML = responce;
    let as = div.getElementsByTagName("a")
    let songs = []
   for (let index = 0; index < as.length; index++) {
    const element = as[index];  
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
    
}
return songs
}

const playMusic = (track, pause = false)=>{
    currentSong.src = "/songs/" +  track
    if(!pause){
        currentSong.play()
        play.src = "svgs/pause.svg"
    }
    

    document.querySelector(".songinfo").innerHTML = track
     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

    

}


async function main () {

  


//     //to list all songs
     songs = await getSongs()
    console.log(songs)


    playMusic(songs[0], true)

let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li> 

     <img class="invert" src="svgs/music.svg" alt="">
                            <div class="info">
                             <div>${song}</div>
                             <div>Anuv Jain</div>
                          </div>
                          <div class="playnow">
                             Play Now
                             <img class="invert" src="svgs/play.svg" alt="">
                          </div>
    
    
    </li>`
} 
    
    
 

//to select every song from the list
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML)
  })

})

//to add evntlistnr to playbuttons
play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "svgs/pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "svgs/play.svg"
    }
})

// song time updating
currentSong.addEventListener("timeupdate", ()=>{
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`


    //for the seekbar to fill width according to the song 
document.querySelector(".circle").style.width = (currentSong.currentTime/currentSong.duration) * 100 + "%" ;
})


document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100 ;
    document.querySelector(".circle").style.width = percent + "%" ;
    currentSong.currentTime = (currentSong.duration) * percent/100

})

// Add an event listener to previous
previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index - 1) >= 0) {
        playMusic(songs[index - 1])
    }
})

// Add an event listener to next
next.addEventListener("click", () => {
   

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index + 1) < songs.length) {
        playMusic(songs[index + 1])
    }
})



}
main()

