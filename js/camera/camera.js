

class MyCamera extends THREE.PerspectiveCamera {
    
    constructor(params, gui) {
        
        var fov = 43;// does not really matter, we correct it later anyways
             
        super(fov, window.innerWidth / window.innerHeight, 0.01, 1000);
        this.focalLength = params.focalLength;
        
        this.targetSphere();
        
        // add some more directions as bookmarks
        this.bookmark = 'up';
        this.bookmarks = {
            'up':       [0, +1, 0],
            'down':     [0, -1, 0],
            'front':    [+1, 0, 0],
            'back':     [-1, 0, 0],
            'left':     [0, 0, -1],
            'right':    [0, 0, +1]
        };
        scene.add(this);
        this.extendGui(gui);

    }
    
    target(x, y, z) {
        
        // position the camera almost at the origin, but opposite the target
        var epsilon = 0.001;
        
        this.position.x = -epsilon * x;
        this.position.y = -epsilon * y;
        this.position.z = -epsilon * z;
    }
    
    targetSphere() {
        this.target(params.sphereX, params.sphereHeight, params.sphereZ);
    }
    
    update() {
        super.aspect = this.width / this.height;
        super.updateProjectionMatrix();
    }
    
    get focalLength() {
        return super.getFocalLength();
    }
    
    set focalLength(distance) {
        super.setFocalLength(distance);
    }
    
    get verticalAngle() {
        
        // var h = super.getFilmHeight();
        // var d = this.focalLength;
        // return 2 * Math.atan2(h / 2, d) * 180 /  Math.PI ;
        
        // we get this for free ...
        return this.fov;
    }
    
    get horizontalAngle() {
        var w = super.getFilmWidth();
        var d = this.focalLength;
        return 2 * Math.atan2(w / 2, d) * 180 /  Math.PI ;
    }

    get width() {
        return window.innerWidth;
    }

    get height() {
        return window.innerHeight;
    }
        
    remove() {
        this.gui.close();
        this.supergui.removeFolder(this.gui);
        scene.remove(this.mesh);
    }
    
    extendGui(supergui) {
        
        this.supergui = supergui;
        this.gui = supergui.addFolder('Camera');
    
        this.gui.add(this, 'focalLength', 5, 100);
        this.gui.add(this, 'verticalAngle', 1, 180).listenOnly();
        this.gui.add(this, 'horizontalAngle', 1, 180).listenOnly();
        this.gui.add(this, 'width', 1, 3000).listenOnly();
        this.gui.add(this, 'height', 1, 3000).listenOnly();
        this.gui.add(this, 'aspect', 0.1, 10).listenOnly();
        this.gui.add(this, 'targetSphere');
        
        var bookmarks = this.bookmarks;
        this.gui.add(this, 'bookmark', Object.keys(bookmarks)).onChange( key =>  this.target(...this.bookmarks[key]));
        
        this.gui.addLabels(labels);
        this.gui.open();
    }

}
