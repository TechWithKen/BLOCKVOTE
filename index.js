// Initialize Three.js scene
function init3DScene() {
    const container = document.getElementById('3d-container');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Add floating cubes with voting-related textures
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x4e54c8,
        transparent: true,
        opacity: 0.5,
        wireframe: true
    });
    
    const cubes = [];
    const cubeCount = 15;
    
    // Create cubes with random positions
    for (let i = 0; i < cubeCount; i++) {
        const cube = new THREE.Mesh(geometry, material);
        
        // Random position between -10 and 10
        cube.position.x = Math.random() * 20 - 10;
        cube.position.y = Math.random() * 20 - 10;
        cube.position.z = Math.random() * 20 - 10;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        // Random size between 0.5 and 1.5
        const scale = Math.random() * 1 + 0.5;
        cube.scale.set(scale, scale, scale);
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.5
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Position camera
    camera.position.z = 15;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate cubes
        cubes.forEach(cube => {
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.01;
        });
        
        // Rotate particles slowly
        particles.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init3DScene);



document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "voting.html";
});
