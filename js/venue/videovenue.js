class VideoVenue {

    constructor(args, gui) {
        
        var texture, material, geometry;

        this.duration = args.duration;

        this.video = document.createElement( 'video' );
        this.video.loop = true;
        this.video.muted = true;
        this.video.src = 'video/venue/' + args.file ;
        this.video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
        this.video.currentTime = args.start;

        texture = new THREE.VideoTexture( this.video );
        material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );
        geometry = new THREE.SphereBufferGeometry( 500, 60, 60 );

        geometry.scale( 1, 1, -1 );

        this.mesh = new THREE.Mesh( geometry, material );
        scene.add( this.mesh );
    
        this.extendGui(gui);
        this.toggleVideo(!args.venueVideoPlay);

    }
    
    remove() {
        this.gui.close();
        this.supergui.removeFolder(this.gui);
        scene.remove(this.mesh);
    }

    seekVideo(time) {
        this.video.currentTime = time;
    }

    toggleVideo(state) {
        if(state) 
            this.video.play(); 
        else
            this.video.pause();
    }
    
    toggleAudio(state) {
        this.video.muted = state;
    }
    
    extendGui(supergui) {
        this.supergui = supergui;
        this.gui = supergui.addFolder('Video Player');
        this.gui.add(params, 'venueVideoTime', 0, this.duration, 1).onChange((time) => this.seekVideo(time)).listen();
        this.gui.add(params, 'venueVideoPlay').onChange((state) => this.toggleVideo(state) );
        this.gui.add(params, 'venueAudioMute').onChange((state) => this.toggleAudio(state) );
        this.gui.addLabels(labels);
        this.gui.open();
    }
    
    tick() {
        
        // set time slider
        params.venueVideoTime = (this.video && this.video.currentTime) || 0;
        
        // skip trailer 
        if(params.venueVideoTime >  this.duration) {
            this.seekVideo(0);
        }
    }
}
