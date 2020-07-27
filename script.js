var car1 , walls = [];
function setup() {
	createCanvas(800 , 400).center();
	car1 = new Car()
	car2 = new Car()
	walls[0] = new Wall(25, 220, 65, 52);
	walls[1] = new Wall(65, 52, 400, 20);
	walls[2] = new Wall(400, 20, 730, 60);
	walls[3] = new Wall(730, 60, 765, 200);
	walls[4] = new Wall(765, 200, 730, 325);
	walls[5] = new Wall(730, 325, 515, 375);
	walls[6] = new Wall(515, 375, 200, 350);
	walls[7] = new Wall(200, 350, 25, 220);
	walls[8] = new Wall(260, 210, 270, 125);
	walls[9] = new Wall(270, 125, 400, 125);
	walls[10] = new Wall(400, 125, 615, 145);
	walls[11] = new Wall(615, 145, 620, 200);
	walls[12] = new Wall(620, 200, 505, 230);
	walls[13] = new Wall(505, 230, 260, 210);	
}
function draw() {
	background(51)
	car1.show('red')
	for (let i=0; i<walls.length; i++) {
		walls[i].show()
		walls[i].color = 'black'
	}

	car1.keyboardMovementARROWS()
	car1.update()
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function Wall(stx , sty , endx , endy) {
	this.start = createVector(stx , sty)
	this.end = createVector(endx , endy)
	this.color = 'black'

	this.show = function() {
		stroke(this.color)
		strokeWeight(4)
		line(this.start.x , this.start.y , this.end.x , this.end.y)
	}
}

function intersect(a , b) {

	const x1 = a[0] , y1 = a[1]
	const x2 = a[2] , y2 = a[3]
	const x3 = b[0] , y3 = b[1]
	const x4 = b[2] , y4 = b[3]

	var d = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4)
	if (d == 0) return false
	var t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/d
	var u = ((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3))/d


	return ((0 <= t && t <= 1) && (0 <= u && u <= 1))
}

function Car() {
	this.pos = createVector(250 , 250)
	this.dir = createVector(1 , 0)
	this.acc = createVector()
	this.vel = createVector()
	this.friction = createVector()

	this.width = 36
	this.height = 20

	this.hitWall = function() { 
		for (let i=0; i<walls.length; i++) {
			push()
			rotate(this.dir.heading())
			let line1 = [walls[i].start.x , walls[i].start.y , walls[i].end.x , walls[i].end.y]
			let line2 = [this.pos.x+this.width/2, this.pos.y+this.height/2, this.pos.x+3*this.width/2, this.pos.y+this.height/2]
			if (intersect(line1 , line2)) walls[i].color = 'red'
			line2 = [this.pos.x+this.width/2 , this.pos.y+this.height/2, this.pos.x+this.width/2 , this.pos.y+3*this.height/2]
			if (intersect(line1 , line2)) walls[i].color = 'red'
			line2 = [this.pos.x-this.width/2 , this.pos.y+this.height/2, this.pos.x-this.width/2 , this.pos.y+3*this.height/2]
			if (intersect(line1 , line2)) walls[i].color = 'red'
			line2 = [this.pos.x+this.width/2 , this.pos.y-this.height/2, this.pos.x+3*this.width/2, this.pos.y-this.height/2]
			if (intersect(line1 , line2)) walls[i].color = 'red'
			pop()
		}
	}

	this.update = function() {
		this.hitWall()

		this.vel.add(this.acc)

		this.friction.set(this.vel)
		this.friction.normalize()
		this.friction.mult(-1)
		this.friction.mult(0.3) //cooficient of friction

		if (this.vel.mag() < this.friction.mag()) 
			this.vel.setMag(0)
		this.vel.add(this.friction)

		this.pos.add(this.vel)
	}

	this.show = function(clr) {
		push()
		translate(this.pos.x , this.pos.y)
		rotate(this.dir.heading())
		rectMode(CENTER)
		noStroke()
		fill(clr)
		rect(0 , 0 , this.width , this.height)
		pop()

		drawArrow(this.pos , this.vel , 'blue')		
		drawArrow(this.pos , this.dir , 'yellow')

	}

	this.keyboardMovementARROWS = function() {
		if (keyIsDown(LEFT_ARROW)) this.dir.rotate(-radians(4))			
		if (keyIsDown(RIGHT_ARROW)) this.dir.rotate(radians(4))
	
		if (keyIsDown(UP_ARROW)) {
			this.acc.set(this.dir)
			this.acc.setMag(0.4)
		} 		
		else if (keyIsDown(DOWN_ARROW)) {
			this.acc.set(this.dir)
			this.acc.setMag(-0.4)
		} else {
			this.acc.setMag(0)
		}
	}
	this.keyboardMovementKEYS = function() {
		if (keyIsDown(65)) this.dir.rotate(-radians(4))			
		if (keyIsDown(68)) this.dir.rotate(radians(4))
	
		if (keyIsDown(87)) {
			this.acc.set(this.dir)
			this.acc.setMag(0.4)
		} 		
		else if (keyIsDown(83)) {
			this.acc.set(this.dir)
			this.acc.setMag(-0.4)
		} else {
			this.acc.setMag(0)
		}
	}
}