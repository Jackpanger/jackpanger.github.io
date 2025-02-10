---
title: Basic
createTime: 2024/11/04 16:25:05
permalink: /guide/materials/font-end-frameworks/three-js/basic/
tags:
  - three.js
  - basic
---

> [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Installation) is one of the most popular 3D frameworks for websites. Here is a basic overview of the website's information.
>
> Author: phoat
>
> Website: [https://jackpanger.github.io/](https://jackpanger.github.io/)

## Installation

Before start, you need to have three basic files:

- main.js

  ```js
  import * as THREE from 'three';

  ...
  ```

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>My first three.js app</title>
      <style>
        body {
          margin: 0;
        }
      </style>
    </head>
    <body>
      <script type="module" src="/main.js"></script>
    </body>
  </html>
  ```

- public folder

Then install with NPM and a build tool:
:::steps

1. Install Node.js

2. Install three.js and a build tool, Vite

   ```sh
   # three.js
   npm install --save three

   # vite
   npm install --save-dev vite
   ```

3. From your terminal, run:

   ```sh
   npx vite
   ```

4. If everything went well, you'll see a URL like http://localhost:5173 appear in your terminal, and can open that URL to see your web application.

Other options please refer to the official site.
:::

## WebGL Compatibility Check

::: tip
Even though this is becoming less and less of a problem, some devices or browsers may still not support WebGL 2. The following method allows you to check if it is supported and display a message to the user if it is not. Import the WebGL support detection module, and run the following before attempting to render anything.
:::

```js
import WebGL from "three/addons/capabilities/WebGL.js";

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById("container").appendChild(warning);
}
```

## Create a Scene

- main.js

  ```js
  import * as THREE from "three";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
  ```

  :::details PerspectiveCamera
  The first attribute is the `field of view`. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.

  The second one is the `aspect ratio`. You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.

  The next two attributes are the `near` and `far` clipping plane. What that means, is that objects further away from the camera than the value of `far` or closer than `near` won't be rendered. You don't have to worry about this now, but you may want to use other values in your apps to get better performance.
  :::

  :::details Renderer
  Next up is the renderer. In addition to creating the renderer instance, we also need to set the size at which we want it to render our app. It's a good idea to use the width and height of the area we want to fill with our app - in this case, the width and height of the browser window. For performance intensive apps, you can also give `setSize` smaller values, like `window.innerWidth/2` and `window.innerHeight/2`, which will make the app render at quarter size.

  If you wish to keep the size of your app but render it at a lower resolution, you can do so by calling `setSize` with false as `updateStyle` (the third argument). For example, `setSize(window.innerWidth/2, window.innerHeight/2, false)` will render your app at half resolution, given that your \<canvas\> has 100% width and height.

  Last but not least, we add the `renderer` element to our HTML document. This is a \<canvas\> element the renderer uses to display the scene to us.
  :::

  :::details BoxGeometry
  This is an object that contains all the points (`vertices`) and fill (`faces`) of the cube. We'll explore this more in the future.
  :::
  :::details MeshBasicMaterial
  All materials take an object of properties which will be applied to them. To keep things very simple, we only supply a color attribute of 0x00ff00, which is green. This works the same way that colors work in CSS or Photoshop (`hex colors`).
  :::
  :::details Mesh
  A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
  :::
  By default, when we call `scene.add()`, the thing we add will be added to the coordinates `(0,0,0)`. This would cause both the camera and the cube to be inside each other. To avoid this, we simply move the camera out a bit.
  :::details requestAnimationFrame
  Perhaps the most important advantage compared to `setInterval` is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life. But here we use `setAnimationLoop`.

  ```js
     /**
     * A build in function that can be used instead of requestAnimationFrame. For WebXR projects this function must be used.
     * @param callback The function will be called every available frame. If `null` is passed it will stop any already ongoing animation.
     */
    setAnimationLoop(callback: XRFrameRequestCallback | null): void;
  ```

  Or if you want `requestAnimationFrame` version:

  ```js
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  ```

  :::

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>My first three.js app</title>
      <style>
        body {
          margin: 0;
        }
      </style>
    </head>
    <body>
      <script type="module" src="/main.js"></script>
    </body>
  </html>
  ```

## Creating Text

There are several ways to do that:

### 1. DOM + CSS

Using HTML is generally the easiest and fastest manner to add text. Use div and position absolutely with high z-index.

```js
<div id="info">Description</div>
```

```css
#info {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display: block;
}
```

### 2. Use [CSS2DRenderer](https://threejs.org/docs/index.html#examples/en/renderers/CSS2DRenderer) or [CSS3DRenderer](https://threejs.org/docs/index.html#examples/en/renderers/CSS3DRenderer)

Use these renderers to draw high-quality text contained in DOM elements to your three.js scene. This is similar to 1. except that with these renderers elements can be integrated more tightly and dynamically into the scene.

### 3. Draw text to canvas and use as a [Texture](https://threejs.org/docs/index.html#api/en/textures/Texture)

Use this method if you wish to draw text easily on a plane in your three.js scene.

### 4. Create a model in your favourite 3D application and export to three.js

Use this method if you prefer working with your 3d applications and importing the models to three.js.

### 5. Procedural Text Geometry

If you prefer to work purely in THREE.js or to create procedural and dynamic 3D text geometries, you can create a mesh whose geometry is an instance of THREE.TextGeometry:

```js
new THREE.TextGeometry(text, parameters);
```

In order for this to work, however, your TextGeometry will need an instance of THREE.Font to be set on its "font" parameter. See the [TextGeometry](https://threejs.org/docs/index.html#examples/en/geometries/TextGeometry) page for more info on how this can be done, descriptions of each accepted parameter, and a list of the JSON fonts that come with the THREE.js distribution itself.

### 6. Bitmap Fonts

BMFonts (bitmap fonts) allow batching glyphs into a single BufferGeometry. BMFont rendering supports word-wrapping, letter spacing, kerning, signed distance fields with standard derivatives, multi-channel signed distance fields, multi-texture fonts, and more. See [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui) or [three-bmfont-text](https://github.com/Experience-Monks/three-bmfont-text).

### 7. [Troika Text](https://www.npmjs.com/package/troika-three-text)

The troika-three-text package renders quality antialiased text using a similar technique as BMFonts, but works directly with any .TTF or .WOFF font file so you don't have to pregenerate a glyph texture offline. It also adds capabilities including:

- Effects like strokes, drop shadows, and curvature
- The ability to apply any three.js Material, even a custom ShaderMaterial
- Support for font ligatures, scripts with joined letters, and right-to-left/bidirectional layout
- Optimization for large amounts of dynamic text, performing most work off the main thread in a web worker

## Drawing Lines

```js
// Anti-Aliasing
// const renderer = new THREE.WebGLRenderer({ antialias: true });
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
```

Main different between the cube in the last article is that for lines we have to use LineBasicMaterial or LineDashedMaterial.

```js
//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
```

Note that lines are drawn between each consecutive pair of vertices, but not between the first and last (the line is not closed.)

Now that we have points for two lines and a material, we can put them together to form a line.

```js
const line = new THREE.Line(geometry, material);
scene.add(line);
renderer.render(scene, camera);
```

You should now be seeing an arrow pointing upwards, made from two blue lines.

<img src="/images/material/font-end/three-js/draw-line.jpg" alt="draw a line" width = "500px">

## Loading Models

:::tip
Where possible, we recommend using glTF (GL Transmission Format). Both .GLB and .GLTF versions of the format are well supported. Because glTF is focused on runtime asset delivery, it is compact to transmit and fast to load.

**Tools**:

- Blender by the Blender Foundation
- Substance Painter by Allegorithmic
- Modo by Foundry
- Toolbag by Marmoset
- Houdini by SideFX
- Cinema 4D by MAXON
- COLLADA2GLTF by the Khronos Group
- FBX2GLTF by Facebook
- OBJ2GLTF by Analytical Graphics Inc
  :::

## Loading

```js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "path/to/model.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
```

Sometimes the model is compressed so we need to decompress it before using it.

```js
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
const loader = new DRACOLoader();
loader.setDecoderPath("/examples/jsm/libs/draco/");
gltfLoader.setDRACOLoader(loader);
```

Or

```js
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
// Instantiate a loader
const loader = new DRACOLoader();

// Specify path to a folder containing WASM/JS decoding libraries.
loader.setDecoderPath("/examples/jsm/libs/draco/");

// Optional: Pre-fetch Draco WASM/JS module.
loader.preload();

// Load a Draco geometry
loader.load(
  // resource URL
  "model.drc",
  // called when the resource is loaded
  function (geometry) {
    const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  },
  // called as loading progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);
```

See [GLTFLoader documentation](https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader) for further details.
