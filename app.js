import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// initialize 3d environment
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 500)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xcccccc)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)






class Boid {
    constructor() {
        this.position = new THREE.Vector3(
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50)
        )

        const geometry = new THREE.ConeGeometry(4, 20, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.add(this.position)
        scene.add(this.mesh)
    }

    live(){

    }
}

// //stuff
const boids = []
for (let i = 0; i < 20; i++) {
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
