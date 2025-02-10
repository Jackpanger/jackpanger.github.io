---
title: Animation
createTime: 2024/11/05 15:50:09
permalink: /guide/materials/font-end-frameworks/three-js/animation/
---

## Tween

Define 3D object:

```js
import TWEEN from "three/examples/jsm/libs/tween.module.js";
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
sphere1.position.x = -4;
scene.add(sphere1);
```

Add animation features on the object:

```js
const tween = new TWEEN.Tween(sphere1.position);
tween.to({ x: 4 }, 2000).onUpdate(() => {
  console.log(sphere1.position.x);
});
// move back and forth
tween.yoyo(true);
tween.delay(1000);
tween.repeat(Infinity);
tween.easing(TWEEN.Easing.Quadratic.InOut);
// tween.repeat(2);
tween.start();
```

More details about [Easing](https://sbcode.net/threejs/tween/#tween-easing-options).

Start to animate:

```js
function animate() {
  controls.update();
  renderer.render(scene, camera);
  TWEEN.update();
}
```

Combine animations into one:

```js
let tween2 = new TWEEN.Tween(sphere1.position);
tween2.to({ y: -4 }, 2000);
tween.chain(tween2);
tween2.chain(tween);
tween.start();
```

Callbacks:

```js
tween.onStart(() => {});
tween.onUpdate(() => {});
tween.onComplete(() => {});
tween.onStop(() => {});
tween.onRepeat(() => {});
tween.onEveryStart(() => {});
```

Stop is like a pause to stop the animation, while Complete is when all the animation is finished.

```js
let param = {
  stop: () => {
    tween.stop();
  },
};
gui.add(param, "stop");
```
