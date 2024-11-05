---
title: Simple Operations
createTime: 2024/11/04 21:06:26
permalink: /guide/materials/font-end/three-js/operation/
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
parentCube.add(cube);
scene.add(parentCube);
parentCube.position.x = -3;
cube.position.set(3, 0, 0);
```

<img src = "/images/material/font-end/three-js/vector-position.png" alt="Vector Position" width ="500px">

### Scale

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

## Adapt to Screen Resize

```js
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
```

Click to enter and exit to full screen:

```js
var btn = document.createElement("button");
btn.innerHTML = "click me full screen";
btn.style.position = "absolute";
btn.style.top = "10px";
btn.style.left = "10px";
btn.style.zIndex = "999";
btn.onclick = () => {
  renderer.domElement.requestFullscreen();
};
document.body.appendChild(btn);
```
