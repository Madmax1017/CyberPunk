⚡ Cyberpunk 2077 // 3D Interactive Terminal
A high-fidelity, visually immersive 3D web experience built with Three.js, Vite, and Tailwind CSS. This project features physically-based rendering (PBR), high-dynamic-range lighting, and custom post-processing effects to capture the gritty, neon aesthetic of Night City.

🚀 Live Features
Interactive 3D Viewport: Real-time rendering of a PBR "Damaged Helmet" model using GLTFLoader.

Image-Based Lighting (IBL): High-quality lighting and reflections powered by RGBELoader and PMREMGenerator for realistic metallic surfaces.

Glitch Post-Processing: Custom EffectComposer pipeline featuring an RGB Shift Shader to add digital chromatic aberration.

Advanced UI Overlay: A multi-layered interface using Tailwind CSS with mix-blend modes and blur filters for a seamless "HUD" feel.

Optimized Performance: Smart asset disposal and dynamic pixel-ratio scaling to maintain 60FPS.

🛠️ Tech Stack
Engine: Three.js

Bundler: Vite

Styling: Tailwind CSS

Assets: HDRIs from PolyHaven, GLTF Models.

📦 Installation
Clone the Repo

Bash
git clone https://github.com/Madmax1017/CyberPunk.git
cd CyberPunk
Install Dependencies

Bash
npm install
Launch Dev Environment

Bash
npm run dev
📂 Project Structure
Plaintext
├── public/
│   ├── DamagedHelmet.gltf    # 3D Model map
│   ├── DamagedHelmet.bin     # 3D Geometry data
│   └── environments/         # HDR lighting files
├── src/
│   ├── main.js               # Core Three.js & Post-processing logic
│   └── style.css             # Tailwind directives
└── index.html                # UI Stacking & Layering
🎮 Navigation
Rotate: Left Click + Drag

Zoom: Mouse Wheel

Pan: Right Click + Drag

💡 Tips for the "Netrunner" Look
Ensure your public folder contains both the .gltf and .bin files.

The Blue Glow is rendered behind the canvas using CSS blur, while the RGB Shift is handled via the GPU—giving you the best of both worlds.

License: MIT

Developed by: Madmax1017
