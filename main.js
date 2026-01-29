import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Initialize Three.js scene
let scene, camera, renderer;
let bees = [];
let particles = [];
let mouseX = 0, mouseY = 0;

function init() {
    console.log('Initializing 3D scene...');
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1b1b1b);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 25;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: false 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x1b1b1b, 1);
    document.getElementById('container3D').appendChild(renderer.domElement);
    
    console.log('Renderer created');
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    // Create visible elements
    createLargeParticles();
    createVisibleBees();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    console.log('Starting animation loop...');
    // Start animation loop
    animate();
}

function createBeeGeometry() {
    const group = new THREE.Group();
    
    // Bee body (larger and more visible)
    const bodyGeometry = new THREE.SphereGeometry(1.0, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffd700,
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Bee head
    const headGeometry = new THREE.SphereGeometry(0.6, 24, 24);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffaa00 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.x = 0.8;
    group.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(1.1, 0.2, 0.3);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(1.1, 0.2, -0.3);
    group.add(rightEye);
    
    // Bee stripes
    for (let i = 0; i < 3; i++) {
        const stripeGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.15, 32);
        const stripeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe.position.y = -0.3 + i * 0.3;
        group.add(stripe);
    }
    
    // Wings (larger and more visible)
    const wingGeometry = new THREE.EllipseGeometry(1.5, 0.8, 0, Math.PI * 2);
    const wingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(0.5, 0.8, 0.6);
    group.add(leftWing);
    
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.5, 0.8, -0.6);
    group.add(rightWing);
    
    // Antennae
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 12);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    leftAntenna.position.set(1.3, 0.6, 0.2);
    leftAntenna.rotation.z = -0.5;
    group.add(leftAntenna);
    
    const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    rightAntenna.position.set(1.3, 0.6, -0.2);
    rightAntenna.rotation.z = 0.5;
    group.add(rightAntenna);
    
    return group;
}

function createVisibleBees() {
    console.log('Creating visible bees...');
    
    for (let i = 0; i < 8; i++) {
        const bee = createBeeGeometry();
        
        // Position bees in visible area
        bee.position.x = (Math.random() - 0.5) * 20;
        bee.position.y = (Math.random() - 0.5) * 15;
        bee.position.z = (Math.random() - 0.5) * 10;
        
        // Store animation properties
        bee.userData = {
            speed: 0.02 + Math.random() * 0.03,
            amplitude: 2 + Math.random() * 3,
            frequency: 0.3 + Math.random() * 0.7,
            offset: Math.random() * Math.PI * 2,
            wingSpeed: 0.5 + Math.random() * 0.3
        };
        
        scene.add(bee);
        bees.push(bee);
        console.log(`Bee ${i} created at:`, bee.position);
    }
}

function createLargeParticles() {
    console.log('Creating large particles...');
    
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Create particle field
        positions[i3] = (Math.random() - 0.5) * 40;
        positions[i3 + 1] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;
        
        // Bright colors for visibility
        colors[i3] = Math.random();     // R
        colors[i3 + 1] = Math.random(); // G
        colors[i3 + 2] = Math.random(); // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particles.push(particleSystem);
    
    console.log('Particles created');
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate bees
    bees.forEach((bee, index) => {
        const data = bee.userData;
        
        // Flying motion - more pronounced for visibility
        bee.position.x += Math.sin(time * data.frequency + data.offset) * data.speed * 2;
        bee.position.y += Math.cos(time * data.frequency * 0.7 + data.offset) * data.speed * 1.5;
        bee.position.z += Math.sin(time * data.frequency * 0.5 + data.offset) * data.speed;
        
        // Wing flapping
        bee.children.forEach(child => {
            if (child.geometry && child.geometry.type.includes('Ellipse')) {
                child.rotation.y = Math.sin(time * data.wingSpeed * 10) * 0.8;
            }
        });
        
        // Rotation to face movement direction
        bee.rotation.y = time * 0.5 + index;
        
        // Keep bees in view
        if (Math.abs(bee.position.x) > 25) bee.position.x *= 0.8;
        if (Math.abs(bee.position.y) > 20) bee.position.y *= 0.8;
        if (Math.abs(bee.position.z) > 15) bee.position.z *= 0.8;
    });
    
    // Animate particles
    particles.forEach(particleSystem => {
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time * 0.3 + i * 0.005) * 0.02;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    });
    
    // Move camera based on mouse position
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    setTimeout(init, 100);
});