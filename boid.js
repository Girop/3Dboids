import * as THREE from 'three'

class Boid{
    constructor(scene){
        this.scene = scene
        // ADD BOX => cage around 0, 50 width
        this.pos = new THREE.Vector3(
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50)
        )
        this.vel = new THREE.Vector3(1,0,0)
    }

    create(){
        const geometry = new THREE.ConeGeometry(5,10,26)
        const material = new THREE.MeshBasicMaterial({color:0xffff00})
        const mesh = new THREE.Mesh(geometry,material)
        mesh.position.set(this.pos)
        this.mesh = mesh
        this.scene.add(mesh)
    }
}

export default Boid