let songIndex=1;
let audioelement=new Audio('1.mp3');
let masterplay=document.getElementById('masterplay');
let progressbar=document.getElementById('progressbar')
let songname=Array.from( document.getElementsByClassName('songitem'));
let songs =[
    { songName:"Shambhu",filePath:"song1.mp3",coverPath:"cover.jpg"},
    { songName:"daku",filePath:"song2.mp3",coverPath:"cover.jpg"},
    { songName:"amplifier",filePath:"song.mp3",coverPath:"cover.jpg"},
]
songname.forEach((a,i)=>{
    console.log(a,i)
    a.getElementsByTagName("img")[0].src=songs[i].coverPath;
    a.getElementsByClassName("songname")[0].innerText=songs[i].songName;
})  
masterplay.addEventListener('click',()=>{
    if(audioelement.paused||audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
    }else{
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
    }
})
audioelement.addEventListener('timeupdate',()=>{
    progress= parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value=progress;

})
progressbar.addEventListener('change',()=>{
    audioelement.currentTime=progressbar.value * audioelement.duration/100;
})

const makeAllplay=()=>{
    Array.from(document.getElementsByClassName("playsong")).forEach((elem)=>{
        elem.classList.remove('fa-circle-pause');
        elem.classList.add('fa-circle-play'); 
    })
}
Array.from(document.getElementsByClassName("playsong")).forEach((elem)=>{
    elem.addEventListener('click',(e)=>{
        makeAllplay();
        console.log(e.target);
        songIndex=parseInt(e.target.id)
        if(audioelement.paused||audioelement.currentTime<=0){
            audioelement.play();
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioelement.src=`${songIndex}.mp3`
            audioelement.currentTime=0;
            audioelement.play();
            masterplay.classList.remove('fa-circle-play')
            masterplay.classList.add('fa-circle-pause')
        }else{
            audioelement.pause();
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            masterplay.classList.remove('fa-circle-pause')
            masterplay.classList.add('fa-circle-play')
        }
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=3){
        songIndex=1;
    }else{
        songIndex+=1;
    }
    audioelement.src=`${songIndex}.mp3`
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex=1;
    }else{
        songIndex-=1;
    }
    audioelement.src=`${songIndex}.mp3`
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})
