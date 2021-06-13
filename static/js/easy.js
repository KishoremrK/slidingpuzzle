var move=0 ,s=0;
const color3 =[["black","black","black"],["black","black","black"],["black","black","black"]];
const color5 =[["black","black","black","black","black"],
               ["black","black","black","black","black"],
               ["black","black","black","black","black"],
               ["black","black","black","black","black"],
               ["black","black","black","black","black"]];
function shuffle() {
 for (var row=1;row<=5;row++) { 
   for (var column=1;column<=5;column++) {  
      var row2=Math.floor(Math.random()*5 + 1); 
      var column2=Math.floor(Math.random()*5 + 1); 
      swapTiles("cell"+row+column,"cell"+row2+column2); 
    } 
 } 
 for (var row=1;row<=5;row++) { 
   for (var column=1;column<=5;column++) {  
     color5[row-1][column-1]= document.getElementById("cell"+row+column).style.backgroundColor;
   } 
  }     
}

var y=0,r=0,w=0,l=0,o=0,b=0;
function sqshuffle() 
{ y=0,r=0,w=0,l=0,o=0,b=0;
  for (var row=1;row<=3;row++) { 
  for (var col=1;col<=3;col++) { 
      document.getElementById("s"+row+col) .style.backgroundColor = getcolor();
      color3[row-1][col-1]= document.getElementById("s"+row+col) .style.backgroundColor;
     }
   }
}  

function getcolor(){
  var color;
  var fail=1;
  while(fail==1)
    {
   var c= Math.floor(Math.random()*6);
   switch(c)
    {case 0 : if(b<4){color="blue";b++;fail=0;}
               break;
    case 1 : if(y<4){color="yellow";y++;fail=0;}
              break;
     case 2 : if(w<4){color="white";w++;fail=0;}
               break;
     case 3 : if(l<4){color="lime";l++;fail=0;}
               break;
     case 4 : if(r<4){color="red";r++;fail=0;}
               break;
     case 5 : if(o<4){color="orange";o++;fail=0;}
               break;    
    }
    }  
return(color);
}


function resettimer()
{ clearInterval(timeVar);
  totalSeconds = 0;
  timeVar=setInterval(setTime, 1000);
} 

function reload()
{sqshuffle();
 shuffle();
 leaderboard();
 document.getElementById("mov") .innerHTML= 0; 
 document.getElementById("win").style.display = "none";
 move=0; totalSeconds = 0;
 clearInterval(timeVar);
 stopTimer(); 
 }

function stopTimer()
{ document.getElementById("seconds").innerHTML = "00";
  document.getElementById("minutes").innerHTML = "00";
   var m= document.getElementById("minutes").innerHTML ;
   var s= document.getElementById("seconds").innerHTML ; 
   document.getElementById("timer").innerHTML = m + ":" + s;    
} 



function reset()
{ for (var row=1;row<=5;row++) { 
  for (var col=1;col<=5;col++) { 
      document.getElementById("cell"+row+col) .style.backgroundColor = color5[row-1][col-1];
    }
   }
  for (var row=1;row<=3;row++) { 
  for (var col=1;col<=3;col++) { 
      document.getElementById("s"+row+col) .style.backgroundColor = color3[row-1][col-1];
    }
   }
 document.getElementById("mov") .innerHTML= 0; 
 document.getElementById("win").style.display = "none";
 move=0; totalSeconds = 0;
 clearInterval(timeVar);
 stopTimer(); 
}

 

function swapTiles(cell1,cell2) 
{  
  var temp = document.getElementById(cell1).style.backgroundColor;
  document.getElementById(cell1).style.backgroundColor =        document.getElementById(cell2).style.backgroundColor;
  document.getElementById(cell2).style.backgroundColor = temp;
  issolved();
}


function clickTile(row,column) {
   
         //Checking if grey tile on the right
       if (column<5) {
         if ( document.getElementById("cell"+row+(column+1)).style.backgroundColor=="grey") 
         {  swapTiles("cell"+row+column,"cell"+row+(column+1));
           move++;
           if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
   (document.getElementById("minutes").innerHTML =="00"))
  {  resettimer();}
  document.getElementById("mov") .innerHTML= move;     
           return;
         }
       }
       //Checking if grey tile on the left
       if (column>1) {
         if ( document.getElementById("cell"+row+(column-1)).style.backgroundColor=="grey") {
           swapTiles("cell"+row+column,"cell"+row+(column-1));
            move++;
if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
   (document.getElementById("minutes").innerHTML =="00"))
  {  resettimer();}
  document.getElementById("mov") .innerHTML= move;           
           return;
         }
       }
         //Checking if grey tile is above
       if (row>1) {
         if ( document.getElementById("cell"+(row-1)+column).style.backgroundColor=="grey") {
          
           swapTiles("cell"+row+column,"cell"+(row-1)+column);
            move++;
           if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
                 (document.getElementById("minutes").innerHTML =="00"))
             {  resettimer();}
            document.getElementById("mov") .innerHTML= move;          
           return;
         }
       }
       //Checking if grey tile is below
       if (row<5) {
         if ( document.getElementById("cell"+(row+1)+column).style.backgroundColor=="grey") {
            
           swapTiles("cell"+row+column,"cell"+(row+1)+column);
            move++;
  if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
   (document.getElementById("minutes").innerHTML =="00"))
  {  resettimer();}         
 document.getElementById("mov") .innerHTML= move;          
           return;
         }
       } 
  }


function issolved()
{
  for (var row=1;row<=3;row++)
  { 
  for (var col=1;col<=3;col++)
  { 
   if( document.getElementById("s"+row+col).style.backgroundColor != 
      document.getElementById("cell"+(row+1)+(col+1)) .style.backgroundColor)
   {return;}
 }
 }
 clearInterval(timeVar);
 var sec = document.getElementById("seconds").innerHTML;
 var min= document.getElementById("minutes").innerHTML;  
 document.getElementById("win").style.display = "block";
 playsound();
 document.getElementById("message1").innerText=" MOVES : "+move ;
 document.getElementById("message2").innerText="TIME : "+min+":"+sec;  
 var s=score(min,sec,move);
 topscorer(s);
 document.getElementById("message").innerText=" SCORE : "+s; 
 }

function playsound()
{  document.getElementById("myaudio").play();}

function score(min,sec,move)
{ min = min*60;
  var totalsec= parseInt(min) +parseInt(sec);
  var s1=(totalsec>3600) ? 100 : (100+((3600-totalsec)*10));
  var s2 =(move>200) ? 100: (100+((200-move)*10));
  return (s1+s2) ;
}

var totalSeconds = 0;
var timeVar= setInterval(setTime, 1000);

function setTime()
{  ++totalSeconds;
   document.getElementById("seconds").innerHTML = pad(totalSeconds%60);
   document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds/60));
   var m= document.getElementById("minutes").innerHTML ;
   var s= document.getElementById("seconds").innerHTML ; 
   document.getElementById("timer").innerHTML = m + ":" + s;    
}

function pad(val)
{  var valString = val + "";
   if(valString.length < 2)
     { return "0" + valString; }
   else
     { return valString; }
}

function topscorer(currentscore)
{
  var highscore = localStorage.getItem("topscore");
  if (currentscore >highscore)
    { localStorage.setItem("topscore",currentscore);
      var name = prompt("ENTER YOUR NAME");
      localStorage.setItem("topscorername",name);
      document.getElementById("message4").innerText=" YOU ARE THE TOP SCORER ";          }
  else
  { document.getElementById("message4").innerText=" TOP SCORE : "+highscore; }
}

function leaderboard()
{ var x,y;
  if(localStorage.getItem("topscore")==null)
     { localStorage.setItem("topscore",0);
       localStorage.setItem("topscorername","NONE");
      }
  x= localStorage.getItem("topscore");
  y= localStorage.getItem("topscorername");
 document.getElementById("board") .innerHTML= "LEADERBOARD";
 document.getElementById("topper") .innerHTML= y.toUpperCase()+"-"+x;
}
