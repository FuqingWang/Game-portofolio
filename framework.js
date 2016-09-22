/*
Vector2 = function(x, y){

	this.x = 0;
	this.y = 0;
	
	if(x!=null & y == null)
	{
		this.x = x;
		this.y = x;
	}
	
	if(x != null)
		this.x = x;
	if(y != null)
		this.y = y;
		
	this.previousX = 0;
	this.previousY = 0;

	this.Set = function(x, y)
	{
		if(x == null && y == null)
			console.log("No value has been passed to vector2 function");
		else
		{
			this.previousX = this.x;
			this.previousY = this.y;
			
			if (x != null && y == null)
			{
				this.x = x;
				this.y = y;
			}
			
			if (x != null)
				this.x = x;
			if (y != null)
				this.y = y;
		
		}
	},
	
	this.Normalize = function()
	{
		var tmp = new Vector2(this.x, this.y);
		var mag = Math.sqrt(tmp.x*tmp.x + tmp.y*tmp.y);
		tmp.x = tmp.x/mag;
		tmp.y = tmp.y/mag;
		
		return tmp;
	},
	
	this.Distance = function(v)
	{
		if (v != null)
			return Math.sqrt((this.x - v.x)*(this.x - v.x) + (this.y - v.y)*(this.y - v.y));
		else
			return Math.sqrt((this.x - this.previousX)*(this.x - this.previousX) + (this.y - this.previousY)*(this.y - this.previousY));
	},
	
	this.HasChanged = function()
	{
		if(this.x != this.previousX || this.y != this.previousY)
			return true;
		return false;
	},
	
	this.Difference = function(v, invert)
	{
		var inv = 1;
		if(invert)
			inv = -1;
		
		if(v == null)
			return new Vector2((this.x - this.previousX)*inv, (this.y - this.previousY)*inv);
		else
			return new Vector2((this.x - v.x)*inv, (this.y - v.y)*inv);
	};
};

Color = function(r, g, b, a)
{
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 1;
	
	if(r!=null)
		this.r = r;
	if(g!=null)
		this.g = g;
	if(b!=null)
		this.b = b;
	if(a!=null)
		this.a = a;
	
	this.ToStandard = function(noAlpha)
	{
		if (noAlpha == null || !noAlpha)
			return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
		else
			return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	};
};

Rectangle = function(x, y, w, h)
{
	if (x == null || y == null || w == null || h == null)
	{
		alert("Invalid input");
		
		var errormsg = "The following was not provided: ";
		if(x == null)
			errormsg += " 'x' ";
		if(y == null)
			errormsg += " 'y' ";
		if(w == null)
			errormsg += " 'w' ";
		if(h == null)
			errormsg += " 'h' ";
		
		throw new Error(errormsg);
	}
	
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	
	this.color = new Color(0, 255, 0, 1);
	
	this.Intersect = function(shape)
	{
		var offset = 0;
		if (shape.radius != null)
			offset = shape.radius;
		
		if(this.Contains(shape.x - offset, shape.y - offset) ||
		   this.Contains(shape.x + shape.width - offset, shape.y - offset) ||
		   this.Contains(shape.x - offset, shape.y + shape.height - offset) ||
		   this.Contains(shape.x + shape.width - offset, shape.y + shape.height - offset))
		   {
			   return true;
		   }
		else if(shape.Contains(this.x - offset, this.y - offset) ||
		   shape.Contains(this.x + this.width - offset, this.y - offset) ||
		   shape.Contains(this.x - offset, this.y + this.height - offset) ||
		   shape.Contains(this.x + this.width - offset, this.y + this.height - offset))
		   {
			   return true;
		   }
		   
		   return false;
	},
	
	
	this.Contains = function(x,y)
	{
		if (x >= this.x && x <= this.x + this.width &&
			y >= this.y && y <= this.y + this.height)
			{
				return true;
			}
			else
				return false;
	},
	
	this.Draw = function(ctx)
	{
		ctx.fillStyle = this.color.ToStandard();
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
};
*/
Animation = function(source, rows, columns, width, height)
{
	var img = new Image();
	img.src = source;
	
	this.rows = rows;
	this.columns = columns;
	this.width = width;
	this.height = height;
	this.cropWidth = this.width/this.columns;
	this.cropHeight = this.height/this.rows;
	this.cropX = 0;
	this.cropY = 0;
	
	this.count = 0;
	this.xIndex = this.count % this.columns;
	// Math.floor calculates the integer division result
	this.yIndex = Math.floor(this.count / this.columns) % this.rows
	// start position of x and y
	this.x = 0;
	this.y = 200;
	// increment of x and y 
	this.xDis = 0;
	this.yDis = 0;
	
	
	this.speed = 4;
	this.jumpSpeed = 8;
	this.gravity = -0.8
	this.jumpLimit = 150;
	this.jump = false;
	this.ground = 200;
	
	this.test = 0;
	
	/*
	this.RightUpdate = function()
	{
		this.cropX = this.count % this.columns * this.cropWidth;
		this.cropY = Math.floor(this.count / this.columns) % rows * this.cropHeight;
		horizontal++;
		this.count++;
	};
	
	this.LeftUpdate = function()
	{
		this.cropX = this.count % this.columns * this.cropWidth;
		this.cropY = (Math.floor(this.count / this.columns) % rows + 2) * this.cropHeight;
		horizontal--;
		this.count++;
	};
	
	this.RightStatic = function()
	{
		this.cropX = 0;
		this.cropY = 0;
	};
	
	this.LeftStatic = function()
	{
		this.cropX = 0;
		this.cropY = 2 * this.cropHeight;
	};
	*/
	
	//added an map object to deal with multiple keystroke
	var map = {};
	onkeydown = onkeyup = function(e){
		e = e || event;
		map[e.keyCode] = e.type == 'keydown';
	}

	// 37 left, 38 up, 39 right
	// each case consists of an animation update and a position update
	this.Update = function()
	{
		// check if jump is available
		this.UpdatePosition();
		
		if(map[37] && map[38]) //left jump
		{
			// animation
			this.cropX = 16;
			this.cropY = 4*16;

		}
		else if(map[38] && map[39]) // right jump
		{
			// animation
			this.cropX = 0;
			this.cropY = 4*16;

		}
		else if(map[37]) // left
		{
			// animation
			if(this.y < this.ground){
				this.cropX = 16;
				this.cropY = 4*16;
			}else{
			this.cropX = this.count % this.columns * this.cropWidth;
			this.cropY = (Math.floor(this.count / this.columns) % this.rows + 2) * this.cropHeight;

			this.count++;
			}
		}
		else if(map[38]) // jump
		{
			// animation
			if (this.cropY <= 16 || (this.cropY == 4*16 && this.cropX == 0)) // facing right
			{
				this.cropX = 0;
			}
			
			// animation
			if ((this.cropY >= 2*16 && this.cropY <= 3*16) || (this.cropY == 4*16 && this.cropX == 16))	//facing left
			{
				this.cropX = 16;
			}
			this.cropY = 4*16;
		}
		else if(map[39]) // right
		{
			// animation
			if(this.y < this.ground){
				this.cropX = 0;
				this.cropY = 4*16;
			}else{
			this.cropX = this.count % this.columns * this.cropWidth;
			this.cropY = Math.floor(this.count / this.columns) % this.rows * this.cropHeight;

			this.count++;
			}
		}
		else // no key pressed
		{
			
			if (this.cropY <= 16 || (this.cropY == 4*16 && this.cropX == 0)) // facing right
			{
				this.cropY = 0;
			}
			if ((this.cropY >= 2*16 && this.cropY <= 3*16) || (this.cropY == 4*16 && this.cropX == 16))	//facing left
			{
				this.cropY = 2*16;
			}
			this.cropX = 0;
		}
	};
	
	this.UpdatePosition = function(){
		if(map[37])
			this.xDis--;
			
		if(map[38])
		{
			this.JumpIsAvailable();
			console.log(this.jump);
			if(this.jump){
				this.jumpy();
			}else{
				this.fall();
			}
		}
		if(!map[38] && this.y < this.ground)
		{
			this.fall();
		}
		
		if(map[39])
			this.xDis++;

	};
	
	this.jumpy = function(){
		this.y -= this.jumpSpeed;
	};
	
	this.fall = function(){
		this.y += this.jumpSpeed;
	};
	
	this.JumpIsAvailable = function(){
		if(this.y < this.jumpLimit){
			this.jump = false;
		}
		if(this.y == this.ground){
			this.jump = true;
		}
	};
	
	this.Draw = function(ctx)
	{
		//console.log(this.yDis + "  " + this.jumpSpeed);
		ctx.drawImage(img, this.cropX, this.cropY, this.cropWidth, this.cropHeight, this.x + this.xDis * this.speed, this.y, this.cropWidth, this.cropHeight);
	};
};