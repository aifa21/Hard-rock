var  input = document.querySelector('.input');
var button= document.querySelector('.submit');



button.addEventListener('click',function(){
   
    fetch(`https://api.lyrics.ovh/suggest/`+input.value)
    .then(response=>response.json())
    .then(data=>{
     console.log(data);
     let fancyResult=document.getElementById('fancy');
     fancyResult.innerHTML="";
     
     
       for(let i=0;i<10;i++){
           let title =data.data[i].title;
           let artistName=data.data[i].artist.name;
           let image=data.data[i].album.cover_small;
           

            fancyResult.innerHTML+=` <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
               <h3 class="lyrics-name" id="title">${title}</h3>
               <p class="author lead" > Album by <span id="artistName">${artistName}</span></p>
           </div>
           
           <div class="col-md-3 text-md-right text-center">
               <button onclick="getLyrics('${artistName}','${title}','${image}')" class="btn btn-success lyrics-btn">Get Lyrics</button>
           </div></div>`;

          
           
       }

        
    })
    
   
    })



    //...............Lyrics.....................


    


    function getLyrics(artistName,title,image){
    
        document.getElementById("lyricsTitle").innerText=title;
        document.getElementById("artist-name").innerText=artistName;
        document.getElementById("lyricsImage").innerHTML=`<img src="${image}" class="img-fluid">`

        fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data.lyrics);
            if(data.lyrics==undefined){
                document.getElementById("lyric").innerText="No Lyrics Found";
            }
            else{
         document.getElementById("lyric").innerText=data.lyrics;
            }
          
        })
        
       
        }

       