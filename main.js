var canvas 			= document.getElementById("canvas");
var ctx 			= canvas.getContext("2d");

canvas.width 		= document.body.clientWidth * 0.9;
canvas.height 		= document.body.clientHeight * 0.9;
canvas.style.width 	= canvas.width + "px";
canvas.style.height = canvas.height + "px";


//context.fillStyle = "red";
//context.fillRect(15,15,50,50);

var mario = new Animation("mario.png",2,4,64,32);

//mario.Draw(ctx);





setInterval(function(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	mario.Update();
	mario.Draw(ctx);
},80);

//var img = new Image();
//img.src = "mario.png";
// source, cropx, cropy, cropwidth, cropheight, display x, display x, display width, display height  
//ctx.drawImage(img, 0, 4*16, 1*16, 1*16, 0, 0, 1*16, 1*16);




