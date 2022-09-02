class Point {
    constructor (x, y, userData){
    this.x = x;
    this.y = y;
    this.userData = userData;
    }
    }
    
    class Rectangle {
     constructor (x, y, w, h) {
     this.x = x; // center
     this.y = y;
     this.w = w; // half width
     this.h = h; // half height
     }
    
     // verifica si este objeto contiene un objeto Punto
     contains (point){
            return (
               (point.x >= (this.x - this.w))
            && (point.x <  (this.x + this.w))
            && (point.y >= (this.y - this.h))
            && (point.y <  (this.y + this.h))
        );
     }
    
     // verifica si este objeto se intersecta con otro objeto Rectangle
     intersects (range){
    		return !(
			   range.x - range.w > this.x + this.w
			|| range.x + range.w < this.x - this.w
			|| range.y - range.h > this.y + this.h
			|| range.y + range.h < this.y - this.h
		);
     }
     }


class QuadTree {
    constructor (boundary , n){
        this.boundary = boundary; // Rectangle
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;
    }

    // divide el quadtree en 4 quadtrees
    subdivide () {
        // Algoritmo
        // 1: Crear 4 hijos: qt_northeast , qt_northwest , qt_southeast ,qt_southwest
        // 2: Asignar los QuadTree creados a cada hijo
        // this.northeast = qt_northeast;
        // this.northwest = qt_northwest;
        // this.southeast = qt_southeast;
        // this.southwest = qt_southwest;    

        // this.x = x; // center
        // this.y = y;
        // this.w = w; // half width
        // this.h = h; // half height
        
        var x = 0;
        var y = 0;
        var w = (this.boundary.w / 2);
        var h = (this.boundary.h / 2); 
        
        
        x = (this.boundary.x + (this.boundary.w / 2));
        y = (this.boundary.y - (this.boundary.h / 2));
        var rect_northeast = new Rectangle(x, y, w, h);
        
        x = (this.boundary.x - (this.boundary.w / 2));
        y = (this.boundary.y - (this.boundary.h / 2));
        var rect_northwest = new Rectangle(x, y, w, h);

        x = (this.boundary.x + (this.boundary.w / 2));
        y = (this.boundary.y + (this.boundary.h / 2));
        var rect_southeast = new Rectangle(x, y, w, h);

        x = (this.boundary.x - (this.boundary.w / 2));
        y = (this.boundary.y + (this.boundary.h / 2));    
        var rect_southwest = new Rectangle(x, y, w, h);

        var qt_northeast = new QuadTree(rect_northeast, this.capacity);
        var qt_northwest = new QuadTree(rect_northwest, this.capacity);
        var qt_southeast = new QuadTree(rect_southeast, this.capacity);
        var qt_southwest = new QuadTree(rect_southwest, this.capacity);    

        this.northeast = qt_northeast;
        this.northwest = qt_northwest;
        this.southeast = qt_southeast;
        this.southwest = qt_southwest;    

        // 3.- Hacer: this.divided <- true 
        this.divided = true;
    }

    show () {
        stroke (255) ;
        strokeWeight (1) ;
        noFill();
        rectMode(CENTER);
        rect ( this.boundary.x , this.boundary.y , this.boundary.w *2 , this.boundary.h*2);
        if( this.divided ){
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        for (let p of this.points ){
            strokeWeight (4) ;
            point (p.x , p.y );
        }
    }

    insert(point){
        // Algoritmo
        // 1: Si el punto no esta en los limites (boundary) del quadtree Return
        if(!this.boundary.contains(point)){
            return;
        }
        
        // 2: Si (this.points.length) < (this.capacity),
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
            }            
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);
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
        }
        
        return found;
    }        
}