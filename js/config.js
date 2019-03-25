
var params = {
    showGrid: false,
    showSphere: true,
    sphereDetail: 'Heigh',
    sphereAxes: false,
    sphereRings: true,
    sphereGrid: true,
    showVenue: true,
    venueSize: 4,
    venueHeight: 12,
    opacity: 0.5,
    ringOpacity: 1.0,
    gridOpacity: 0.25,
    sphereSize: 2,
    sphereHeight: 2,
    sphereX: 0,
    sphereZ: 0,
    rotationX: 90,
    rotationY: 135,
    rotationSpeed: 0.2,
    texture: 'blue-marble',
    background: 'mainz-1',
    
    venueVideoPlay: true,
    venueVideoTime: 0,
    venueAudioMute: true,
    
    sphereVideoPlay: true,
    sphereVideoTime: 0,
    sphereAudioMute: false,
    
    stopRotation: function() { params.rotationSpeed = 0; },
    focalLength: 25,
    bookmarks: 'ahead'
};

var sphereDetails = { 
    Low: 8, 
    Medium: 16, 
    Heigh: 64 
};

var labels = {
    de: {
        rotationSpeed: 'Drehen',
        stopRotation: 'Anhalten!',
        showGrid: 'Gitter zeigen',
        showSphere: 'Kugel zeigen',
        showVenue: 'Umgebung zeigen',
        sphereDetail: 'Detail',
        sphereSize: 'Kugelgröße',
        sphereHeight: 'Höhe vom Betrachter',
        sphereX: 'Horizontaler Abstand',
        sphereZ: 'Vertikaler Abstand',
        venueWidth: 'Raumgröße',
        venueHeight: 'Raumhöhe',
        texture: 'Textur',
        background: 'Hintergrund',
        opacity: 'Deckkraft',
        ringOpacity: 'Deckkraft Ring',
        gridOpacity: 'Deckkraft Gitter',
        rotationY: 'Rotations-Winkel',
        rotationX: 'Kipp-Winkel',
        sceneVideoPlay: 'Play / Pause',
        sceneVideoTime: 'Position',
        sphereTexture: 'Kugel',
        sphereMotion: 'Bewegung',
        scene: 'Hintergrund',
        videoPlayer: 'Video Abspielen',
        camera: 'Kamera',
        focalLength: 'Brennweite',
        verticalAngle: 'Vertikaler Winkel',
        horizontalAngle: 'Horizontaler Winkel',
        width: 'Breite',
        height: 'Höhe',
        aspect: 'Bildverhältnis',
        targetSphere: 'Kugel suchen',
        bookmark: 'Lesezeichen',
        

    },
    en: {
        rotationSpeed: 'rotate',
        stopRotation: 'stop!',
        showGrid: 'show grid',
        showSphere: 'show sphere',
        sphereDetail: 'detail',
        sphereSize: 'size',
        sphereHeight: 'distance to the ground',
        sphereX: 'horizontal offset',
        sphereZ: 'vertical offset',
        rotationY: 'spin angle',
        rotationX: 'roll angle',
        venueSize: 'venue size',
        venueHeight: 'ceiling height',
        sceneVideoPlay: 'play / pause',
        sceneVideoTime: 'position',
        scene: 'background',
        sphereTexture: 'sphere texture',
        sphereMotion: 'sphere motion',
        scene: 'venue',
        videoPlayer: 'play video'
    }
};

var backgroundTextures = {
    'mainz-1':      { type: 'image', mapping: 'cube', file: 'mainz-1' },
    'mainz-2':      { type: 'image', mapping: 'cube', file: 'mainz-2' },
    'mainz-3':      { type: 'image', mapping: 'cube', file: 'mainz-3' },
    
    'dali-video':   { type: 'video', mapping: 'cube', file: 'dreams_of_dali.mp4', duration: 309, start: 82 },
    'nasa-video':   { type: 'video', mapping: 'cube', file: 'nasa_jpl_2020.webm', duration: 180, start: 82,  sphere: { x: 10, y: 0, z: 5  } }
}

var sphereTextures = {
    
    'blue-marble':  { type: 'image', mapping: 'equi', file: '2k/Land_ocean_ice_2048.jpg' },
    'black-white':  { type: 'image', mapping: 'equi', file: '2k/earth_specular_2048.jpg' },
    'timezones':    { type: 'image', mapping: 'equi', file: '2k/Utm-zones.jpg' },
    'atmosphere':   { type: 'image', mapping: 'equi', file: '2k/earth_atmos_2048.jpg' },
    'clouds':       { type: 'image', mapping: 'equi', file: '2k/earth_clouds_2048.png' },
    'mars':         { type: 'image', mapping: 'equi', file: '2k/c2880x2160.jpg' },
    'moon':         { type: 'image', mapping: 'equi', file: '1k/moon_1024.jpg' },
    'traffic':      { type: 'image', mapping: 'equi', file: '2k/anthropocene.png'},
    'facebook':     { type: 'image', mapping: 'equi', file: '2k/2048.png'},

    'moon-phases':  { type: 'video', mapping: 'equi', file: '2k/sos_phases_2048p30.mp4', duration: 24 },
    'weather':      { type: 'video', mapping: 'equi', file: '2k/weather-2018-10.webm', duration: 147 },           
    'geodesy':      { type: 'video', mapping: 'equi', file: '2k/Space_Geodesy.mp4', duration: 154 },
    'water-falls':  { type: 'video', mapping: 'equi', file: '2k/nasa_waterfalls_final_h264.mp4', duration: 519 },
    'remote-video': { type: 'video', mapping: 'equi', sos:  'extras/waterfalls/nasa_waterfalls_final_h264.mp4', duration: 519 }, 
    
    // 'one-day':      { type: 'video', mapping: 'equi', file: '2k/oneday_2048.mp4'},
    // 'air-traffic':  { type: 'video', mapping: 'equi', file: '2k/air_traffic_2048.mp4' },
    // 'ocean-flow':   { type: 'video', mapping: 'eqiu', file: '2k/ecco2_sst_gray_2048.mp4' },
    // 'hot-air':      { type: 'video', mapping: 'equi', file: '2k/hot-air-2048.mp4' },
    // 'human-era':    { type: 'video', mapping: 'equi', file: '2k/human-era-2048.mp4' },
    // 'wanderers':    { type: 'video', mapping: 'equi', file: '2k/wanderers_2048.mp4'},
    
}
