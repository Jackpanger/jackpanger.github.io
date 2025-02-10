---
title: Simple Operations
createTime: 2024/11/04 21:06:26
permalink: /guide/materials/font-end-frameworks/three-js/operation/
---

## AxesHelper

```js
const axesHelper = new THREE.AxesHelper(5); // param: length of the helper line
scene.add(axesHelper);
```

<img src = "/images/material/font-end/three-js/axeshelper.jpg" alt="AxesHelper" width ="500px">

## [OrbitControls](https://threejs.org/docs/index.html#examples/en/controls/OrbitControls)

This is used to control the event of the canvas to control the page, such as scale, rotate, etc. of the view.

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera, renderer.domElement);
// inertia
controls.enableDamping = true;
// inertia factor
controls.dampingFactor = 0.01;
// Auto Rotate
controls.autoRotate = true;
function animate() {
  controls.update();
  renderer.render(scene, camera);
}
```

## [Vector Operation](https://threejs.org/docs/index.html#api/en/math/Vector3)

The most important thing is that the vector represents a relative position. In the example below, the child cube is at (0,0,0), rather than (3,0,0) in global coordinates.

```js
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
let parentCube = new THREE.Mesh(geometry, parentMaterial);
parentMaterial.wireframe = true;
parentCube.add(cube);
scene.add(parentCube);
parentCube.position.x = -3;
cube.position.set(3, 0, 0);
```

<img src = "/images/material/font-end/three-js/vector-position.png" alt="Vector Position" width ="500px">

### Scale(set)

```js
cube.scale.set(2, 2, 3);
```

Similarly, if we scale the parent element, all the children will be scaled as well

```js
parentCube.scale.set(2, 2, 3);
```

<img src = "/images/material/font-end/three-js/vector-scale.png" alt="Vector Scale" width ="500px">

### Rotate

This is based on Euler angles. 'XYZ' indicates the order of applying rotations: first around the X-axis, then the Y-axis, and finally the Z-axis. Default value is "XYZ".

```js
new THREE.Vector3(1, 1, 1).applyEuler(new THREE.Euler(0, 0, 0, "XYZ"));
```

### Transition/Rotation/Scale (Vertex Transformation)

These modify the vertices of the objects, affecting the operations above. We usually recommend operating on objects based at the origin rather than changing the position of the objects. However, you can also transition objects that are not at the origin and then perform the operations mentioned above, which may make it easier to manipulate the objects.

## Adapt to Screen Resize

```js
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
```

Click to enter and exit full screen:

```js
// enter
var btn = document.createElement("button");
btn.innerHTML = "click me full screen";
btn.style.position = "absolute";
btn.style.top = "10px";
btn.style.left = "10px";
btn.style.zIndex = "999";
btn.onclick = () => {
  document.body.requestFullscreen();
};
document.body.appendChild(btn);

// exit
var exitBtn = document.createElement("button");
exitBtn.innerHTML = "click me to exit full screen";
exitBtn.style.position = "absolute";
exitBtn.style.top = "10px";
exitBtn.style.left = "100px";
exitBtn.style.zIndex = "999";
exitBtn.onclick = () => {
  document.exitFullscreen();
};
document.body.appendChild(exitBtn);
```

Use GUI to do this:

```js
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
let eventObject = {
  Fullscreen: () => {
    document.body.requestFullscreen();
  },
  ExitFullscreen: () => {
    document.exitFullscreen();
  },
};

const gui = new GUI();
gui.add(eventObject, "Fullscreen").name("Full Screen");
gui.add(eventObject, "ExitFullscreen").name("Exit Full Screen");
```

GUI can also be used to control the attributes:

```js
// control position of the cube
let folder = gui.addFolder("Cube");
folder
  .add(cube.position, "x")
  .min(-10)
  .max(10)
  .step(1)
  .name("Cube X")
  .onChange((value) => {
    console.log(value);
  });
folder
  .add(cube.position, "y")
  .min(-10)
  .max(10)
  .step(1)
  .name("Cube Y")
  .onFinishChange((value) => {
    console.log(value);
  });
// change boolean value of wireframe
gui.add(parentMaterial, "wireframe").name("Wireframe");

// change color of material
let colorParams = {
  color: "#00ff00",
};
gui
  .addColor(colorParams, "color")
  .name("Cube Color")
  .onChange((value) => {
    cube.material.color.set(value);
  });
```

<img src = "/images/material/font-end/three-js/GUI pannel.png" alt="Vector Scale" width ="500px">
