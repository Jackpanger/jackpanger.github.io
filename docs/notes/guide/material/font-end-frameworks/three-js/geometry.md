---
title: Geometry
createTime: 2024/11/04 22:27:18
permalink: /guide/materials/font-end-frameworks/three-js/geometry/
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
:::tip
BufferGeometry above doesn't set up uv or normal, then if we define MeshBasicMaterial with`{map: uvMap}`, the plane will still be in white color. However, the map will be applied on PlaneGeometry correctly.
:::

:::details How to set up uv and normal

```js
// uv
// Each two points define one color on the uv map for a specific vertex
const uv = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

// normal
// option 1
geometry.computeVertexNormals();
// option 2
const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

// vertex normal helper
import { VertexNormalsHelper } from "three/addons/helpers/VertexNormalsHelper.js";
const geometry = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
const helper = new VertexNormalsHelper(mesh, 1, 0xff0000);
scene.add(mesh);
scene.add(helper);
```

:::

### boundingBox/boundingSphere

Used to detect collision.

```js
let duckMesh = gltf.scene.getObjectByName("objectName");
let duckGeometry = duckMesh.geometry;
duckGeometry.computeBoundingBox();
let duckBox = duckGeometry.boundingBox;
// update world matrix
duckMesh.updateWorldMatrix(true, true);
duckBox.applyMatrix4(duckMesh.matrixWorld);
```

Bounding Box Helper:

```js
let boxHelper = new THREE.Box3Helper(duckBox, 0xffff00);
scene.add(boxHelper);
```

Make Geometry center and how to get it:

```js
// make geometry center
duckGeometry.center();
// get Geometry center
let center = duckGeometry.getCenter(new THREE.Vector3());
```

Bounding Sphere:

```js
let sphereGeometry = new THREE.SphereGeometry(duckSphere.radius, 16, 16);
let sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.copy(duckSphere.center);
scene.add(sphereMesh);
```

### BoundingBox group

```js
var box = new THREE.Box3();
let arrSpheres = [sphere1, sphere2, sphere3];
for (let i = 0; i < arrSpheres.length; i++) {
  arrSpheres[i].geometry.computeBoundingBox();
  let box3 = arrSpheres[i].geometry.boundingBox;
  arrSpheres[i].updateWorldMatrix(true, true);
  box3?.applyMatrix4(arrSpheres[i].matrixWorld);
  box.union(box3 || new THREE.Box3());
}
console.log(box);
let boxHelper = new THREE.Box3Helper(box, 0xffff00);
scene.add(boxHelper);
```

Or we can do this in a more convenient way:

```js
var box = new THREE.Box3();
let arrSpheres = [sphere1, sphere2, sphere3];
for (let i = 0; i < arrSpheres.length; i++) {
  let box3 = new THREE.Box3().setFromObject(arrSpheres[i]);
  box.union(box3);
}
let boxHelper = new THREE.Box3Helper(box, 0xffff00);
scene.add(boxHelper);
```

## Common Geometry

### [BoxGeometry](https://threejs.org/docs/index.html?q=geometry#api/en/geometries/BoxGeometry)

### [CapsuleGeometry](https://threejs.org/docs/index.html?q=geometry#api/en/geometries/CapsuleGeometry)

### [WireframeGeometry](https://threejs.org/docs/index.html?q=geometr#api/en/geometries/WireframeGeometry)

```js
let building = gltf.scene.children[0];
let geometry = building.geometry;
const wireframe = new THREE.WireframeGeometry(geometry);
const edges = new THREE.LineSegments(
  edgesGeometry,
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
scene.add(edges);
```

::: tip
WireframeGeometry shows every triangle of the model, while EdgesGeometry just displays faces.
:::

### [EdgesGeometry](https://threejs.org/docs/index.html?q=geometr#api/en/geometries/EdgesGeometry)

```js
let building = gltf.scene.children[0];
let geometry = building.geometry;
const edgesGeometry = new THREE.EdgesGeometry(geometry);
const edges = new THREE.LineSegments(
  edgesGeometry,
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
building.updateWorldMatrix(true, true);
edges.matrix.copy(building.matrixWorld);
edges.matrix.decompose(edges.position, edges.quaternion, edges.scale);
scene.add(edges);
```

If we want transform all the models into EdgesGeometry

```js
gltf.scene.traverse((child) => {
  if (child.isMesh) {
    let building = child;
    let geometry = building.geometry;
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edges = new THREE.LineSegments(
      edgesGeometry,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    building.updateWorldMatrix(true, true);
    edges.matrix.copy(building.matrixWorld);
    edges.matrix.decompose(edges.position, edges.quaternion, edges.scale);
    scene.add(edges);
  }
});
```
