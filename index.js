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
    songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%5" , " ")} </li>`;
    
}
//to play the song
var audio = new Audio(songs);
audio.play();
}
main()