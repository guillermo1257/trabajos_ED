let qt;
let count = 0;
let pv= false;
let tx = 0;
let ty = 0;
let tz = 0;

function setup () {
  createCanvas (1366 ,800, WEBGL);
  let boundary = new Cube (100 ,100 ,100 ,100, 100, 100);
  
  qt = new Octree ( boundary , 4);

  for(let i=0; i < 25; i ++) {
      console.log(i);
      tx = Math.random () * 150;
      ty = Math.random () * 150;
      tz = Math.random () * 150;
      let p = new Point (tx,ty,tz);
      qt.insert(p);
    }
}

function draw () {
  orbitControl(); //Permite mover la imagen con el mouse
  background (150) ;
  qt.show () ;
}