class BaseSphere {
    
    constructor(material) {

        var d, detail, geometry;
        
        d = params.sphereSize/2;
        detail = sphereDetails[params.sphereDetail];
        geometry = new THREE.SphereGeometry(1, 2 * detail, detail);
        
        this.sphereSurface = this.mesh = new THREE.Mesh( geometry, material );
        this.sphere = new THREE.Group();
        this.sphere.add(this.sphereSurface);
        
        this.sphereGrid = this.createWireframe( geometry );
        this.sphere.add(this.sphereGrid);
        
        this.sphereRings = this.createRings(detail);
        this.sphere.add(this.sphereRings);
        
        this.resizeMesh(this.sphere, d ,d, d);
        
        scene.add(this.sphere);
        
    }

    createWireframe( geometry ) {
        
        var geo, mat;
        
        geo = new THREE.EdgesGeometry( geometry );
        mat = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );
        return new THREE.LineSegments( geo, mat );
    }
    
    createRing(n) {
    
        var geometry, d, r, line, material, ring;
        
        geometry = new THREE.Geometry();
        d = 0.01;
        r = 1 + d/2;

        for(var j = 0; j <= n * 2; j++ ) {
            var ang = Math.PI * j / n;
            var v = new THREE.Vector3(0,  r * Math.cos( ang ), r * Math.sin( ang ));
            geometry.vertices.push( v );
        }

        line = new MeshLine();
        line.setGeometry(geometry, () => d);
        material = new MeshLineMaterial({ transparent: true });

        ring = new THREE.Mesh( line.geometry, material );
        
        return ring;
    }
    
    createRings(n) {
    
        var ring1, ring2, ring3, group;
        
        ring1 = this.createRing(n);
        
        ring2 = ring1.clone();
        ring2.rotation.y = Math.PI/2;
        
        ring3 = ring1.clone();
        ring3.rotation.z = Math.PI/2;
        
        group = new THREE.Group();
        group.add(ring1, ring2, ring3);
        
        return group;
        
    }
    
    resize(d) {
            this.resizeMesh(this.sphere, d/2, d/2, d/2);
    }  
    
    resizeMesh(mesh, w, d, h) {
        mesh.scale.x = w;
        mesh.scale.y = h;
        mesh.scale.z = d;
    }

    
    remove() {
        scene.remove(this.sphere);
        scene.remove(this.sphereGrid);
        scene.remove(this.sphereRings);
    }
    
    tick() {

        this.sphere.position.y = params.sphereHeight + (params.sphereSize / 2);
        this.sphere.position.x = params.sphereX;
        this.sphere.position.z = params.sphereZ;

        this.sphere.rotation.x = THREE.Math.degToRad( params.rotationX );
        this.sphere.rotation.y = THREE.Math.degToRad( params.rotationY );

        this.sphereSurface.material.opacity = params.opacity;
        this.sphereGrid.material.opacity = params.gridOpacity;
        this.sphereRings.children[0].material.opacity = params.ringOpacity;

        if(params.rotationSpeed != 0) {
            params.rotationY = (params.rotationY + params.rotationSpeed) % 360;
        }

        this.sphereSurface.visible = params.opacity > 0;
        this.sphereGrid.visible = params.gridOpacity > 0;
        this.sphereRings.visible = params.ringOpacity > 0;
    }

    

}
