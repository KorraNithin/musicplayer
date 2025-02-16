let currentSong = new Audio();
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

const playMusic = (track)=>{
    currentSong.src = "/songs/" +  track
    currentSong.play()
    play.src = "svgs/pause.svg"

    document.querySelector(".songinfo").innerHTML = track
     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

    

}


async function main () {

  


//     //to list all songs
    let songs = await getSongs()
    console.log(songs)

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
    console.log(currentSong.currentTime, currentSong.currentduration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.currentduration)}`
})

}
main()

