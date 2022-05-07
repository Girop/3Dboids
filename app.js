import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 400)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xcccccc)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)


// why cant you work like normal boid ? 
class Boid {
    constructor() {
        this.pos = new THREE.Vector3(
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50)
        )
        this.createMesh()
    }

    createMesh() {
        let geometry = new THREE.ConeGeometry(5, 10, 26)
        let material = new THREE.MeshBasicMaterial({ color: 0x4747d1 })
        let mesh = new THREE.Mesh(geometry, material)
        this.mesh = mesh
        this.mesh.position.set(this.pos)
        scene.add(this.mesh)
    }
}
// this works 
const geometry = new THREE.ConeGeometry(5, 10, 26)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh1 = new THREE.Mesh(geometry, material)
mesh1.position.set(
    Math.floor(Math.random() * 100 - 50),
    Math.floor(Math.random() * 100 - 50),
    Math.floor(Math.random() * 100 - 50)
)
scene.add(mesh1)

const boids = []
for (let i = 0; i < 10; i++) {
    boids.push(new Boid())
}

// event loop
function animate() {
    requestAnimationFrame(animate)
    control.update()
    renderer.render(scene, camera)
}
animate()
// handle resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
})
