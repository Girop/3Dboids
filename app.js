import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const CAGESIZE = 600
const BOID_QUANTITY = 100
const boids = []

const collisionForce = 0.3
const directionForce = 0.3
const centerForce = 0.16

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

        this.velocity = new THREE.Vector3().random().normalize()
        this.acceleration = new THREE.Vector3(0,0,0)
        this.mesh = new THREE.Mesh(
            new THREE.ConeGeometry(4, 20, 32),
            new THREE.MeshBasicMaterial({ color: 0x0000aa })
        )
        this.mesh.position.add(this.position)
        scene.add(this.mesh)
    }

    nearbyCheck() {
        this.nearby = []

        for (let boid of boids) {
            const distance = this.position.distanceTo(boid.position)
            if (this.index != boid.index && distance < this.viewDistance) {
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
            boidToPosVec.sub(boid.position)
            boidToPosVec.divideScalar(distance)

            collisionVector.add(boidToPosVec)
        })
        return collisionVector.normalize().multiplyScalar(collisionForce)
    }

    matchDirection() {
        const directionVector = new THREE.Vector3()
        this.nearby.forEach(boid => {
            directionVector.add(boid.position)
        })
        return directionVector.normalize().multiplyScalar(directionForce)
    }

    centerFlock() {
        const avgPosition = new THREE.Vector3()
        this.nearby.forEach(boid => {
            avgPosition.add(boid.position)
        })
        avgPosition.divideScalar(this.nearby.length)

        return avgPosition.sub(this.position).multiplyScalar(centerForce)
    }

    live() {
        this.nearbyCheck()
        // Adding flock bechaviour effects
        // avoid collision too weak 
        this.acceleration.add(this.avoidCollision())
        this.acceleration.add(this.matchDirection())
        this.acceleration.add(this.centerFlock())
        // movement of boid
        this.velocity.add(this.acceleration)
        this.velocity.clampLength(0,3)
        this.position.add(this.velocity)
        this.acceleration.multiplyScalar(0)
        // graphical stuff
        this.mesh.position.add(this.velocity)
        // where to lookAt ? velocity / acceleration / or something  better ?
        // this.mesh.lookAt()

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
