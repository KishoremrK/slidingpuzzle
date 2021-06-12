var y=0,r=0,w=0,l=0,o=0,b=0,g=0,p=0,move=0 ,s=0;
const color5 =[["black","black","black","black","black"],
               ["black","black","black","black","black"],
               ["black","black","black","black","black"],
               ["black","black","black","black","black"],
               ["black","black","black","black","black"]];
const color7 =[["","","","","","",""],
               ["","","","","","",""],
               ["","","","","","",""],
               ["","","","","","",""], 
               ["","","","","","",""],
               ["","","","","","",""],
               ["","","","","","",""]];

function hardshuffle() 
{ y=0,r=0,w=0,l=0,o=0,b=0,g=0,p=0;
  for (var row=1;row<=7;row++) { 
    for (var column=1;column<=7;column++) {  
      if (row==7&&column==7)
         {document.getElementById("k"+row+column) .style.backgroundColor = "black";} 
      else {     
         document.getElementById("k"+row+column) .style.backgroundColor = hardgetcolor();}
    } 
  } 
   var row2=Math.floor(Math.random()*7 + 1); 
   var column2=Math.floor(Math.random()*7 + 1); 
   swapTiles("k77","k"+row2+column2); 
   for (var row=1;row<=7;row++) { 
     for (var column=1;column<=7;column++) {  
        color7[row-1][column-1]= document.getElementById("k"+row+column) .style.backgroundColor;
     } 
   }   
}


function hardsqshuffle() 
{ y=0,r=0,w=0,l=0,o=0,b=0,g=0,p=0;
  for (var row=1;row<=5;row++) { 
  for (var col=1;col<=5;col++) { 
      document.getElementById("c"+row+col) .style.backgroundColor = hardgetcolor();
      color5[row-1][col-1]= document.getElementById("c"+row+col) .style.backgroundColor;
     }
   }
}  

function hardgetcolor(){
  var color;
  var fail=1;
  while(fail==1)
    {
   var c= Math.floor(Math.random()*8);
   switch(c)
    {case 0 : if(b<6){color="blue";b++;fail=0;}
               break;
    case 1 : if(y<6){color="yellow";y++;fail=0;}
              break;
     case 2 : if(w<6){color="white";w++;fail=0;}
               break;
     case 3 : if(l<6){color="lime";l++;fail=0;}
               break;
     case 4 : if(r<6){color="red";r++;fail=0;}
               break;
     case 5 : if(o<6){color="orange";o++;fail=0;}
               break; 
     case 6 : if(g<6){color="green";g++;fail=0;}
               break;  
     case 7 : if(p<6){color="blueviolet";p++;fail=0;}
               break;     
    }
    }  
return(color);
}

function swapTiles(cell1,cell2) 
{  
  var temp = document.getElementById(cell1).style.backgroundColor;
  document.getElementById(cell1).style.backgroundColor =        document.getElementById(cell2).style.backgroundColor;
  document.getElementById(cell2).style.backgroundColor = temp;
  issolved();
}

function issolved()
{
  for (var row=1;row<=5;row++)
  { 
  for (var col=1;col<=5;col++)
  { 
   if( document.getElementById("c"+row+col).style.backgroundColor != 
      document.getElementById("k"+(row+1)+(col+1)) .style.backgroundColor)
   {return;}
 }
 }
 clearInterval(timeVar);
 var sec = document.getElementById("seconds").innerHTML;
 var min= document.getElementById("minutes").innerHTML;  
 document.getElementById("win").style.display = "block";
 document.getElementById("message1").innerText=" MOVES : "+move ;
 document.getElementById("message2").innerText="TIME : "+min+":"+sec;  
 var s=score(min,sec,move); 
 document.getElementById("message").innerText=" SCORE : "+s; 
 } 

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

function resettimer()
{ clearInterval(timeVar);
  totalSeconds = 0;
  timeVar=setInterval(setTime, 1000);
} 

function reload()
{ hardsqshuffle();
 hardshuffle();
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
      document.getElementById("c"+row+col) .style.backgroundColor = color5[row-1][col-1];
    }
   }
  for (var row=1;row<=7;row++) { 
  for (var col=1;col<=7;col++) { 
      document.getElementById("k"+row+col) .style.backgroundColor = color7[row-1][col-1];
    }
   }
 document.getElementById("mov") .innerHTML= 0; 
 document.getElementById("win").style.display = "none";
 move=0; totalSeconds = 0;
 clearInterval(timeVar);
 stopTimer(); 
}



function clickTile(row,column) {
   
  //Checking if grey tile on the right
  if (column<7)
    {
      if ( document.getElementById("k"+row+(column+1)).style.backgroundColor=="black") 
         { swapTiles("k"+row+column,"k"+row+(column+1));
           move++;
           if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
              (document.getElementById("minutes").innerHTML =="00"))
               {  resettimer();}
           document.getElementById("mov") .innerHTML= move;     
           return;
         }
     }
   //Checking if grey tile on the left
    if (column>1)
    {
         if ( document.getElementById("k"+row+(column-1)).style.backgroundColor=="black") 
         {  swapTiles("k"+row+column,"k"+row+(column-1));
            move++;
            if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
                (document.getElementById("minutes").innerHTML =="00"))
            {  resettimer();}
            document.getElementById("mov") .innerHTML= move;           
           return;
         }
    }
 //Checking if grey tile is above
 if (row>1)
 {      if ( document.getElementById("k"+(row-1)+column).style.backgroundColor=="black") 
        {  swapTiles("k"+row+column,"k"+(row-1)+column);
           move++;
           if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
              (document.getElementById("minutes").innerHTML =="00"))
           {  resettimer();}
           document.getElementById("mov") .innerHTML= move;          
           return;
         }
 }
//Checking if grey tile is below
  if (row<7)
  {  if ( document.getElementById("k"+(row+1)+column).style.backgroundColor=="black")
      { swapTiles("k"+row+column,"k"+(row+1)+column);
        move++;
        if((move==1)&&(document.getElementById("seconds").innerHTML =="00")&& 
          (document.getElementById("minutes").innerHTML =="00"))
        {  resettimer();}         
        document.getElementById("mov") .innerHTML= move;          
        return;
      }
   } 
}


