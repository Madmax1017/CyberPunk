import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Consistent import paths for addons
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import gsap from 'gsap';
/**
 * 1. Scene & Camera Setup
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

/**
 * 2. Renderer Setup
 */
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true,
    alpha: true // Useful if you want a transparent background
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Modern Color & Tone Management
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;

/**
 * 3. Post-Processing (EffectComposer)
 */
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0015;
composer.addPass(rgbShiftPass);

/**
 * 4. Environment & Lighting
 */
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
let model ;
new RGBELoader().load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/pond_bridge_night_1k.hdr', (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    // Optional: scene.background = envMap;

    texture.dispose();
    pmremGenerator.dispose();
});

/**
 * 5. Object Loading
 */
const loader = new GLTFLoader();
loader.load('./DamagedHelmet.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);
}, undefined, (error) => {
    console.error('Check if DamagedHelmet.gltf and .bin are in the public folder:', error);
});
window,addEventListener("mousemove", (e) => {
if (model) {
    const rotationX=  (e.clientX/window.innerHeight - .5) *(Math.PI *.3);
    const rotationY=  (e.clientY/window.innerWidth -.5)* (Math.PI *.3);
    gsap.to(model.rotation,{
        x: rotationX,
        y: rotationY,
        duration: 0.5,
        ease: "power2.out"
    });
}
})
/**
 * 6. Interaction & Responsiveness
 */
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight); // Update composer too!
});

/**
 * 7. Animation Loop
 */
function animate() {
    requestAnimationFrame(animate);



    // CRITICAL CHANGE:
    // Do NOT use renderer.render(scene, camera) when using a composer.
    // composer.render() handles the rendering of the scene + effects.
    composer.render();
}

animate();