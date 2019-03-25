class CubeVenue {
    
    constructor(args, gui) {
        
        var loader;
        
        loader = new THREE.CubeTextureLoader();
        loader.setPath( './img/venue/' + args.file + '/' );

        this.background = loader.load( [
            'tile_1_0_0_0.jpg', // left 
            'tile_0_0_0_0.jpg', // right 
            'tile_3_0_0_0.jpg', // top
            'tile_2_0_0_0.jpg', // bottom
            'tile_4_0_0_0.jpg', // back
            'tile_5_0_0_0.jpg'  // front
        ] );
        
        this.background.format = THREE.RGBFormat;
        this.show();
        this.extendGui(gui);
   
    }
    
    remove() {
        delete this.background;
    }
    
    show() {
         scene.background = this.background;
    }
    
    hide() {
         scene.background = null;
    }
    
    toggle(visible) {
        if(visible) {
            this.show();
        } else {
            this.hide();
        }
    }
    
    tick() {
    }
    
    extendGui(supergui) {
    }
    
    
}