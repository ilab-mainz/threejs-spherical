window.addEventListener('load', onWindowLoad, false);
window.addEventListener( 'resize', onWindowResize, false );

// global variables
var camera, scene, renderer;
var gui, stats, controls, clock;
var sceneGui, sphereGui, motionGui;
var theVenue;
var theSphere;


function createGui() {
    


    gui = new dat.GUI();

    /////// sphere //////
    sphereGui = gui.addFolder('sphereTexture');
    
    sphereGui.add(params, 'sphereDetail', Object.keys(sphereDetails)).onChange(createParamSphere);
    sphereGui.add(params, 'sphereSize', 0.4, 6.0, 0.01).onChange(resizeSphere).listen();
    sphereGui.add(params, 'texture', Object.keys(sphereTextures)).onChange(createParamSphere);
    
    sphereGui.add(params, 'opacity', 0, 1, 0.01);
    sphereGui.add(params, 'ringOpacity', 0, 1, 0.01);
    sphereGui.add(params, 'gridOpacity', 0, 1, 0.01);

    sphereGui.add(params, 'sphereHeight', -10, 10, 0.1);
    sphereGui.add(params, 'sphereX', -10, 10, 0.1);
    sphereGui.add(params, 'sphereZ', -10, 10, 0.1);

    /////// motion //////
    motionGui = gui.addFolder('sphereMotion');
    motionGui.add(params, 'rotationSpeed', -2, 2, 0.01).name('Rotation').listen();
    motionGui.add(params, 'stopRotation').name('stop');
    motionGui.add(params, 'rotationX', 0, 360, 1).listen();
    motionGui.add(params, 'rotationY', 0, 360, 1).listen();

    /////// scene //////
    sceneGui = gui.addFolder('scene');
    sceneGui.add(params, 'background', Object.keys(backgroundTextures)).onChange(createParamBackground);
    
    gui.addLabels(labels);
    gui.width = 350;
    gui.openAll();


}

function onWindowLoad() {
    init();
    animate();
};

function init() {

    clock = new THREE.Clock();
    
    createGui();

    // create scene
    scene = new THREE.Scene();
    
    // create sphere and position it
    createParamSphere();
    updateSphere();
    createParamBackground();
   
    // create renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new MyCamera(params, gui);
    createControls( camera, renderer.domElement );
    initLights();
     
}

function initLights() {
    var light = new THREE.AmbientLight( 0x999999 );
    scene.add(light);
}

function onWindowResize(){
    updateCamera();
    controls.handleResize && controls.handleResize();
}

function updateSphere() {
    //theSphere.tick();
}

function updateCamera() {
    camera.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function createControls(camera, domElement) {
    controls = new THREE.OrbitControls( camera, domElement );
    controls.enableZoom = false ;
}

function createParamSphere() {
    var args = sphereTextures[params.texture];
    var gui = sphereGui;
    if(theSphere) theSphere.remove();
    theSphere = new ({ 
        image:  ImageSphere, 
        video:  VideoSphere 
    })[args.type](params, gui);
}

function resizeSphere(d) {
    theSphere.resize(d);
}

function createParamBackground() {
    var args = backgroundTextures[params.background];
    var gui = sceneGui;
    if(theVenue) theVenue.remove();
    theVenue = new ({
        image:  CubeVenue, 
        video:  VideoVenue 
    })[args.type](args, gui);

}

function animate() {
    theSphere.tick();
    theVenue.tick();
    var delta = clock.getDelta();
    renderer.render( scene, camera );
    controls.update();
    //stats.update();
    requestAnimationFrame( animate );
}


