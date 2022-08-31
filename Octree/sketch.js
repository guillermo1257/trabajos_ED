let qt;
let count = 0;
let pv= false;
let tx = 0;
let ty = 0;
let tz = 0;

function setup () {
  createCanvas (1366 ,800, WEBGL) ;
  let boundary = new Cube (100 ,100 ,100 ,100, 100, 100) ;
  qt = new OctTree ( boundary , 8) ;

  for(let i=0; i < 1000; i ++) {
      console.log(i);
     // tx = Math.random () * 150;
      //ty = Math.random () * 150;
      //tz = Math.random () * 150;

      tx=randomGaussian(0, 150);
      ty=randomGaussian(0, 150);
      tz=randomGaussian(0, 150);

      //let x = randomGaussian(width/2, width/8);
      //let y = randomGaussian(height/2, height/8);

      // tx = 199;
      // ty = 199;
      // tz = -199;

        // console.log(tx);
        // console.log(ty);
        // console.log(tz);      

      let p = new Point (tx,ty,tz);
      qt.insert(p);
    }
}

function draw () {
  orbitControl();
  background (150) ;
  // translate(10, 0, 0);
  // normalMaterial();
  //normalMaterial();

  // //qt.show () ;
  // if (pv == false)
  // {
  //   console.log(frameCount);
  //   for(let i=0; i < 1; i ++) {
  //     // let p = new Point ( Math.random () * 400 , Math.random () * 400, Math.random () * 400) ;
  //     //   qt.insert (p);
  //       tx = Math.random () * 400;
  //       ty = Math.random () * 400;
  //       tz = Math.random () * 400;
  //       console.log(tx);
  //       console.log(ty);
  //       console.log(tz);
  //     }
  
  //   if (frameCount % 30 == 0)
  //   {
  
  //   }
  //   pv = true;
  //   console.log("1");
  // }

  // translate(tx, ty, tz);
  // sphere(5,20,20);  
  qt.show () ;

  // fill(255,0,0,191);
  // box(180, 80, 80,90,80,90);

  // stroke(0);
  // noFill();
  // box(80, 80, 80);

  // translate(100,1,1);
  // sphere(5,20,20);

  // stroke(250);  
  // fill(255);
  // box(180, 80, 80, 1, 1, 1);

  // if ( mouseIsPressed ) {

  //   mx = mouseX
  //   console.log(mx);
  //   push();
  //   // rotateZ(frameCount * 0.01);
    
  //   rotateX(mouseX/50);
  //   rotateY(mouseY/50);
    
  //   pop();
  // }    
 

  




  // if ( mouseIsPressed ) {
  // for (let i = 0; i < 1; i ++) {
  // let m = new Point ( mouseX + random (-5 ,5) , mouseY + random (-5 ,5) );
  // qt.insert (m)
  // }
  // }
  // background (0) ;
  // qt.show () ;
}