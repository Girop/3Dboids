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

    live() {
        this.pos.add(this.vel)
    }
}

export default Boid
