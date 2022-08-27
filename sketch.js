let qtree;

function setup() {
	createCanvas(400, 400);
	
	let boundary = new Rectangle(200, 200, 200, 200);
	qtree = new QuadTree(boundary, 4);
	
	for(let i = 0; i < 3; i++) {
		//let p = new Point(random), random(height));
		//let x = randomGaussian(width/2, width/8);
		//let y = randomGaussian(height/2, height/8);
		let p = new Point(Math.random()*400, Math.random()*400);
		qtree.insert(p);
	}
	background(0)
	qtree.show();
}

