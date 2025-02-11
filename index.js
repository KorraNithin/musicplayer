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
        songs.push(element.href.split("/songs/")[1].replaceAll("YouConvert.net" , " "))
    }
    // console.log(songs)
}
return songs

}
async function main () {
    //to list all songs
    let songs = await getSongs()
console.log(songs)

let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li> 
                            <img class="invert" src="music.svg" alt="">
                           <div class="info">
                            <div>${song.replaceAll("%5" , " ").replaceAll("B_ _ D", " ").replaceAll("OFFICIAL_MUSIC_VIDEO", " ").replaceAll("YouTube_", "nithin").replaceAll("The_Weeknd%2C_Ariana_Grande_-_Die_For_You_(Remix_Lyric_Video)_", "Die_for_You").replaceAll("Taylor_Swift_-_Blank_Space_", "Blank_space").replaceAll("SEVDALIZA_-_ALIBI_FT._PABLLO_VITTAR_YSEULT_( )_", "_ALIBI_FT").replaceAll("Lana_Del_Rey_-_Summertime_Sadness_(Official_Music_Video)_", "Summertime_Sadness").replaceAll("httpswww.youtube.comwatchvmKot2PXjxss_ ", "nithin").replaceAll("Dua_Lipa_-_Levitating_(Lyrics)_", "_Levitating_").replaceAll("Anuv_Jain_-_HUSN_(Lyrics)_", "_HUSN_")}</div>
                            <div>Anuv Jain</div>
                           </div>
                         <div class="playnow">
                            Play Now
                            <img class="invert" src="play.svg" alt="">
                         </div>
                           
                        
    
    
    
     </li>`;
    
}
//to play the song
var audio = new Audio(songs);
audio.play();
}
main()