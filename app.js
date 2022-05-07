import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Boid from './boid'
// initialize 3d environment
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 300)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xcccccc)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)

// stuff
const boid = new Boid(scene)
boid.create()
scene.add(boid.mesh)

console.log(boid)
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
