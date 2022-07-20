import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const CAGESIZE = 600
const BOID_QUANTITY = 100
const boids = []

const collisionForce = 0.3
const directionForce = 0.3
const centerForce = 0.16
const VIEW_DISTANCE = 30

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
// const cage = new Cage(scene)

class Boid {
    static boidIndex = 0

    constructor(scene) {
        this.nearby = []
        this.index = Boid.boidIndex
        Boid.boidIndex += 1

        this.velocity = new THREE.Vector3().random().normalize()
        this.mesh = new THREE.Mesh(
            new THREE.ConeGeometry(4, 20, 32),
            new THREE.MeshBasicMaterial({ color: 0x0000aa })
        )
        this.mesh.position.add(
            new THREE.Vector3(
                this.random(),
                this.random(),
                this.random(),
            )
        )
        scene.add(this.mesh)
    }

    random(){
        return Math.floor(Math.random() * 100) - 50 
    }

    nearbyCheck() {

        this.nearby = []

        for (let boid of boids) {
            const distance = this.mesh.position.distanceTo(boid.mesh.position)
            if (this.index != boid.index && distance < VIEW_DISTANCE) {
                this.nearby.push(boid)
            }
        }
    }

    avoidCollision() {
        const collisionVector = new THREE.Vector3()
        this.nearby.forEach(boid => {
            const distance = this.position.distanceTo(boid.position)
            const boidToPosVec = new THREE.Vector3()
            boidToPosVec.copy(this.position)
            boidToPosVec.sub(boid.mesh.position)
            boidToPosVec.divideScalar(distance)

            collisionVector.add(boidToPosVec)
        })
        return collisionVector.normalize().multiplyScalar(collisionForce)
    }

    matchDirection() {
        const directionVector = new THREE.Vector3(0, 0, 0)
        this.nearby.forEach(boid => {
            directionVector.add(boid.velocity)
        })
        return directionVector.normalize().multiplyScalar(directionForce)
    }

    centerFlock() {
        const avgPosition = new THREE.Vector3(0, 0, 0)
        this.nearby.forEach(boid => {
            avgPosition.add(boid.mesh.position)
        })

        return avgPosition
            .sub(this.mesh.position)
            .normalize()
            .multiplyScalar(centerForce)
    }

    live() {
        this.nearbyCheck()
        let acceleration = new THREE.Vector3(0, 0, 0)
        // acceleration += acceleration.add(this.centerFlock())
        // acceleration += acceleration.add(this.matchDirection())
        // acceleration += acceleration.add(this.avoidCollision())

        this.velocity.add(acceleration)
        this.mesh.position.add(this.velocity)
        // this.mesh.lookAt(this.velocity)
    }
}

// initial Stuff
for (let i = 0; i < BOID_QUANTITY; i++) {
    boids.push(new Boid(scene))
}

// event loop
function animate() {
    requestAnimationFrame(animate)
    for (let boid of boids) {
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
