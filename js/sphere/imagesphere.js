class ImageSphere extends BaseSphere {
    
    constructor(params, gui) {
        
        var image, map, material;
        
        image = sphereTextures[params.texture].file;
        map = new THREE.TextureLoader().load("img/globe/"  + image);
        material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );
        material.side = THREE.DoubleSide;
        
        super(material);
    }
        
}
