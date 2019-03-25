
class VideoSphere extends BaseSphere {
    
    constructor(params, gui) {
        
        var args, detail, video, texture, material;
                
        args = sphereTextures[params.texture];
        detail = params.sphereDetail;
        
        video = document.createElement( 'video' );
        video.setAttribute('id', 'video-sphere');
        
        video.loop = true;
        video.muted = false;
        video.src = 'video/globe/' + args.file ;
        video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
        video.currentTime = args.start || 0;
        video.autoplay = true;

        texture = new THREE.VideoTexture( video );
        material = new THREE.MeshBasicMaterial( { map: texture } );
        
        super(material);
        
        this.duration = args.duration;
        this.video = video;
    
        this.extendGui(gui);    
    }
    
    remove() {
        
        // remove gui
        this.gui.close();
        this.supergui.removeFolder(this.gui);
        
        // unload video
        this.video.pause();
        this.video.src = "";
        
        super.remove();
    }

    seekVideo(time) {
        this.video.currentTime = time;
    }

    playVideo() {
        this.video.play();
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
        this.gui.add(params, 'sphereVideoTime', 0, this.duration, 1).onChange((time) => this.seekVideo(time)).listen();
        this.gui.add(params, 'sphereVideoPlay').onChange((state) => this.toggleVideo(state) );
        this.gui.add(params, 'sphereAudioMute').onChange((state) => this.toggleAudio(state) );
        this.gui.addLabels(labels);
        this.gui.open();
    }
    
    tick() {
        
        // set time slider
        params.sphereVideoTime = (this.video && this.video.currentTime) || 0;
        
        // skip trailer 
        if(params.sphereVideoTime >  this.duration) {
            this.seekVideo(0);
        }
        super.tick();
    }
    
}

