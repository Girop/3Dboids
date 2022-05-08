import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// initialize 3d environment
const CAGESIZE = 600
const BOID_QUANTITY = 30
const boids = []

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 500)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xcccccc)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)

class Cage {
    constructor(scene) {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(CAGESIZE, CAGESIZE, CAGESIZE),
            new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
        )
        scene.add(this.mesh)
    }
}
const cage = new Cage(scene)

class Boid {
    static boidIndex = 0

    constructor(scene) {
        this.viewDistance = 30
        this.speedLimit = 10
        this.nearby = []
        this.index = Boid.boidIndex
        Boid.boidIndex += 1

        this.position = new THREE.Vector3(
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50),
            Math.floor(Math.random() * 100 - 50)
        )
        // this.velocity = new THREE.Vector3().random().normalize()
        this.velocity = new THREE.Vector3()
        this.acceleration = new THREE.Vector3()
        console.log(this.velocity)
        this.mesh = new THREE.Mesh(
            new THREE.ConeGeometry(4, 20, 32),
            new THREE.MeshBasicMaterial({ color: 0x0000aa })
        )
        this.mesh.position.add(this.position)
        scene.add(this.mesh)
    }

    nearbyCheck(){
        for(let boid of boids){
            const distance = this.position.distanceTo(boid.distance)
            if(this.index != boid.index && distance < this.viewDistance){
                this.nearby.push(boid)
            }
        }
    }

    coherence() {

    }

    separation() {

    }

    aligment() {

    }

    live(){
        this.nearbyCheck()
        console.log(this.nearby)
        // kinematics of boid
        this.velocity.add(this.acceleration)
        this.velocity.clampLength(this.velocity)
        this.position.add(this.velocity)
        this.acceleration.set(0,0,0)
    }
}

// initial Stuff
for (let i = 0; i < BOID_QUANTITY; i++) {
    boids.push(new Boid(scene))
}

// event loop
function animate() {
    requestAnimationFrame(animate)

    for(let boid of boids){
        boid.live()
    }

    control.update()
    renderer.render(scene, camera)
}
animate()
// handle resize
// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight)
// })
