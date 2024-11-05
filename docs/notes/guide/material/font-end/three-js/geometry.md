---
title: Geometry
createTime: 2024/11/04 22:27:18
permalink: /guide/materials/font-end/three-js/geometry/
tags:
  - three.js
  - geometry
---

## BufferGeometry

### Construct Geometry

The front side of the geometry is oriented counterclockwise and is not visible from the back.

```js
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0,
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);
```

If we want the geometry double sided:

```js
const material = new THREE.MeshBasicMaterial({
  color: 0xff000,
  side: THREE.DoubleSide,
});
```

Rectangle:

```js
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
  -1.0, -1.0, 0.0,
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({
  color: 0xff000,
  side: THREE.DoubleSide,
  wireframe: true,
});
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);
```

As actually a cube only needs 24 vertices, some vertices should be shared with other triangles. The optimization is to use indices to construct rectangle:

```js
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
geometry.setIndex(new THREE.BufferAttribute(indices, 1));
const material = new THREE.MeshBasicMaterial({
  color: 0xff000,
  side: THREE.DoubleSide,
  wireframe: true,
});
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);
```

### Apply different materials on triangles

```js
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
geometry.setIndex(new THREE.BufferAttribute(indices, 1));
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const triangle = new THREE.Mesh(geometry, [material, material2]);
scene.add(triangle);
```

<img src="/images/material/font-end/three-js/geometry-group.png" alt="Geometry Group" width = "500px">

## Common Geometry

- [BoxGeometry
  ](https://threejs.org/docs/index.html?q=geometry#api/en/geometries/BoxGeometry)
- [CapsuleGeometry](https://threejs.org/docs/index.html?q=geometry#api/en/geometries/CapsuleGeometry)

- ...
