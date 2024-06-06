const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let size=5
let color='black'
let isPressed=false
let x
let y

canvas.addEventListener('mousedown',(e)=>{
     isPressed=true;
     x=e.offsetX;
     y=e.offsetY;
     //console.log(isPressed,x,y);
})
canvas.addEventListener('mouseup',(e)=>{
     isPressed=false;
     x=undefined
     y=undefined
    // console.log(isPressed,x,y);
})
canvas.addEventListener('mousemove',(e)=>{
  if(isPressed){
   const x2=e.offsetX;
   const y2=e.offsetY
   // console.log(x2,y2);

    drwacircle(x2,y2)
    drawline(x,y,x2,y2)
   
 
   x=x2
   y=y2
  }
})
function drwacircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fillStyle=color
    ctx.fill()
}

function drawline(x1,y1,x2, y2){
 ctx.beginPath()
 ctx.moveTo(x1,y1)
 ctx.lineTo(x2,y2)
 ctx.strokeStyle=color
 ctx.lineWidth=size*2
 ctx.stroke()
}
// drwacircle(100,200)
// drawline(300,300,300,500)

