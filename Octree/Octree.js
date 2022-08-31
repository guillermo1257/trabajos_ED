class Point {
    constructor (x, y, z, userData) {
        this.x = x;
        this.y = y;
        this.z = z; 
        this.userData = userData;
    }
}
    
    class Cube {
     constructor (x, y, z, w, h, d) {
        this.x = x; // center
        this.y = y;
        this.z = z; 
        this.w = w; // half width
        this.h = h; // half height
        this.d = d; // half depth
     }
    
     // verifica si este objeto contiene un objeto Punto
     contains ( point )
     {
        console.log(this.x - this.w);
        console.log(point.x);

        console.log(this.y - this.h);
        console.log(point.y);
        
        console.log(this.z - this.d);
        console.log(point.z);        
        if ((point.x >= (this.x - this.w))
             && (point.x <  (this.x + this.w))
             && (point.y >= (this.y - this.h))
             && (point.y <  (this.y + this.h))
             && (point.z >= (this.z - this.d))
             && (point.z <  (this.z + this.d))) 
            
        { 
            console.log("contiene"); 
            return true;
        }
        else
        {
            console.log("no contiene");
            return false
        }
     }
    
     // verifica si este objeto se intersecta con otro objeto Cube
     intersects ( range ){
    		return !(
			   range.x - range.w > this.x + this.w
			|| range.x + range.w < this.x - this.w
			|| range.y - range.h > this.y + this.h
			|| range.y + range.h < this.y - this.h
			|| range.z - range.d > this.z + this.d
			|| range.z + range.d < this.z - this.d            
		);
     }
     }


class Octree
{
    constructor ( boundary , n){
        this.boundary = boundary; // Cube
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;
    }

    // divide el Octree en 8 Octrees
    subdivide () {
        var x = 0;
        var y = 0;
        var z = 0;
        var w = (this.boundary.w / 2);
        var h = (this.boundary.h / 2); 
        var d = (this.boundary.d / 2); 
        
        
        x = (this.boundary.x + (this.boundary.w / 2));
        y = (this.boundary.y - (this.boundary.h / 2));
        z = (this.boundary.z + (this.boundary.d / 2));
        var rect_northeast = new Cube(x, y, z, w, h, d);
        
        x = (this.boundary.x - (this.boundary.w / 2));
        y = (this.boundary.y - (this.boundary.h / 2));
        z = (this.boundary.z + (this.boundary.d / 2));
        var rect_northwest = new Cube(x, y, z, w, h, d);

        x = (this.boundary.x + (this.boundary.w / 2));
        y = (this.boundary.y + (this.boundary.h / 2));
        z = (this.boundary.z + (this.boundary.d / 2));
        var rect_southeast = new Cube(x, y, z, w, h, d);

        x = (this.boundary.x - (this.boundary.w / 2));
        y = (this.boundary.y + (this.boundary.h / 2));   
        z = (this.boundary.z + (this.boundary.d / 2)); 
        var rect_southwest = new Cube(x, y, z, w, h, d);

        x = (this.boundary.x + (this.boundary.w / 2));
        y = (this.boundary.y - (this.boundary.h / 2));
        z = (this.boundary.z - (this.boundary.d / 2));
        var b_rect_northeast = new Cube(x, y, z, w, h, d);
        
        x = (this.boundary.x - (this.boundary.w / 2));
        y = (this.boundary.y - (this.boundary.h / 2));
        z = (this.boundary.z - (this.boundary.d / 2));
        var b_rect_northwest = new Cube(x, y, z, w, h, d);

        x = (this.boundary.x + (this.boundary.w / 2));
        y = (this.boundary.y + (this.boundary.h / 2));
        z = (this.boundary.z - (this.boundary.d / 2));
        var b_rect_southeast = new Cube(x, y, z, w, h, d);

        x = (this.boundary.x - (this.boundary.w / 2));
        y = (this.boundary.y + (this.boundary.h / 2));   
        z = (this.boundary.z - (this.boundary.d / 2)); 
        var b_rect_southwest = new Cube(x, y, z, w, h, d);        

        var qt_northeast = new Octree(rect_northeast, this.capacity);
        var qt_northwest = new Octree(rect_northwest, this.capacity);
        var qt_southeast = new Octree(rect_southeast, this.capacity);
        var qt_southwest = new Octree(rect_southwest, this.capacity);

        var qt_b_northeast = new Octree(b_rect_northeast, this.capacity);
        var qt_b_northwest = new Octree(b_rect_northwest, this.capacity);
        var qt_b_southeast = new Octree(b_rect_southeast, this.capacity);
        var qt_b_southwest = new Octree(b_rect_southwest, this.capacity);         

        this.northeast = qt_northeast;
        this.northwest = qt_northwest;
        this.southeast = qt_southeast;
        this.southwest = qt_southwest;    

        this.b_northeast = qt_b_northeast;
        this.b_northwest = qt_b_northwest;
        this.b_southeast = qt_b_southeast;
        this.b_southwest = qt_b_southwest;           

        // 3.- Hacer: this.divided <- true 
        this.divided = true;
    }

    insert ( point ){
        // Algoritmo
        // 1: Si el punto no esta en los limites ( boundary ) del Octree Return
        if(!this.boundary.contains(point)) {
            return;
        }
        
        // 2: Si ( this.points.length ) < ( this.capacity ),
            // 2.1 Insertamos en el vector this.points
            // Sino
        // 2.2 Dividimos si aun no ha sido dividido
        // 2.3 Insertamos recursivamente en los 4 hijos.        
        if(this.points.length < this.capacity) {
            this.points.push(point);
        } 
        else {
            if(!this.divided) {
                this.subdivide();
                console.log("sub");
            }           
            
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);

            this.b_northwest.insert(point);
            this.b_northeast.insert(point);
            this.b_southwest.insert(point);
            this.b_southeast.insert(point);            
        }
    }

    show () {

        // stroke (this.boundary.color) ;
        strokeWeight (5) ;
        noFill () ;
        // rectMode ( CENTER );
        push();
        translate(this.boundary.x , this.boundary.y , this.boundary.z);
        box (this.boundary.w * 2 , this.boundary.h*2, this.boundary.d*2) ;
        pop();
        if( this.divided ) {
            this.northeast.show () ;
            this.northwest.show () ;
            this.southeast.show () ;
            this.southwest.show () ;
            this.b_northeast.show () ;
            this.b_northwest.show () ;
            this.b_southeast.show () ;
            this.b_southwest.show () ;  
        }

        for (let p of this.points ){
            push();
            //let c = color(255, 204, 0);
            // fill(this.boundary.color);
            // stroke(this.boundary.color);
            //Grafica cada punto como una esfera
            translate(p.x, p.y, p.z);
            sphere(3,20,20);
            pop();
        }
    }
        
    query(range, found) {
        if(!found) {
            found = [];
        }
        
        if(!this.boundary.intersects(range)) {
            return found;
        }
        
        for(let p of this.points) {
            if(range.contains(p)) {
                found.push(p);
            }
        }
        
        if(this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);

            this.b_northwest.query(range, found);
            this.b_northeast.query(range, found);
            this.b_southwest.query(range, found);
            this.b_southeast.query(range, found);            
        }
        
        return found;
    }        
}