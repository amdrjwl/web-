const parseLyric=function(lrc) {
    let lyrics = lrc.split("\n");
   
    let lrcObj = {};
    for(let i=0;i<lyrics.length;i++){
        let lyric = decodeURIComponent(lyrics[i]);
        
        
      
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        
        
        let timeRegExpArr = lyric.match(timeReg);
        
     
      
         
        if(!timeRegExpArr)continue;
        
        let clause = lyric.replace(timeReg,'');
        
        for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
            let t = timeRegExpArr[k];
            
                
                
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
   
           
            let time = min * 60 + sec;
           
            lrcObj[time] = clause;
          
            
        }
    }
    return lrcObj;
}
const parseLyric2=function(lrc) {
    let lyrics = lrc.split("\n");
   
    let times =[]
    for(let i=0;i<lyrics.length;i++){
        let lyric = decodeURIComponent(lyrics[i]);
        
        
      
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        
        
        let timeRegExpArr = lyric.match(timeReg);
        
     
      
         
        if(!timeRegExpArr)continue;

        
        for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
            let t = timeRegExpArr[k];
            
                
                
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
   
           
            let time = min * 60 + sec;
         times.push(time)
          
            
        }
    }
    return times;
}
module.exports = {
	 parseLyric,
	  parseLyric2
}

