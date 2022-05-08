import * as THREE from 'three'

class Boid{
    constructor(scene) {
        // ADD BOX => cage around 0, 50 width
        this.scene = scene
        this.position = new THREE.Vector3(
                Math.floor(Math.random() * 100 - 50),
                Math.floor(Math.random() * 100 - 50),
                Math.floor(Math.random() * 100 - 50)
        )
        this.vel = new THREE.Vector3(1, 0, 0)
    }

    create() {
        const geometry = new THREE.ConeGeometry(5, 20, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(this.position)
        this.mesh = mesh
        this.scene.add(mesh)
    }
<<<<<<< HEAD

    live() {
        this.pos.add(this.vel)
    }
=======
>>>>>>> efcf02656565d9ab418e8f92bb372e1fc84e8675
}

export default Boid
