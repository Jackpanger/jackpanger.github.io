---
title: Light
createTime: 2024/11/05 02:56:04
permalink: /guide/materials/font-end-frameworks/three-js/light/
tags:
  - three.js
  - light
---

## Raycaster

This class is designed to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.

```js
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
sphere1.position.x = -4;
scene.add(sphere1);
const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(sphere2);
const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff00ff })
);
sphere3.position.x = 4;
scene.add(sphere3);
// create raycaster
const raycaster = new THREE.Raycaster();
// Create mouse vector
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
  if (intersects.length > 0) {
    if (intersects[0].object._isSelect) {
      intersects[0].object.material.color.set(
        intersects[0].object._originalColor
      );
      intersects[0].object._isSelect = false;
      return;
    }
    intersects[0].object._isSelect = true;
    // To prevent shallow copy
    intersects[0].object._originalColor =
      intersects[0].object.material.color.getHex();
    intersects[0].object.material.color.set(0xff0000);
  }
});
```

## Basic settings

```js
// 1. Materials support shadow
// 2. Renderer enable shadow calculation
renderer.shadowMap.enabled = true;
// 3. Set enable shadow from light
directionalLight.castShadow = true;
// 4. Set enable shadow from object
sphere.castShadow = true;
// 5. Set receive shadow from object
plane.receiveShadow = true;
```

## AmbientLight

This light globally illuminates all objects in the scene equally.
This light cannot be used to cast shadows as it does not have a direction.

```js
const SphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({});
const sphere = new THREE.Mesh(SphereGeometry, material);
sphere.castShadow = true;
scene.add(sphere);

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
```

<img src="/images/material/font-end/three-js/ambientLight.png" alt="draw a line" width = "500px">

## DirectionalLight

A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel.

```js
// import a plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.radius = 20;
// Shadow Resolution
directionalLight.shadow.mapSize.set(2048, 2048);
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
scene.add(directionalLight);
```

If we plan to modify the near side to see the effects of the light:

```js
gui
  .add(directionalLight.shadow.camera, "near")
  .min(0.1)
  .max(10)
  .step(0.1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
  });
```

## PointLight

A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

We can put the pointLight into a small ball to make it look like a lamp.

```js
const pointLight = new THREE.PointLight(0xff0000, 3);
// pointLight.position.set(1, 1, 1);
pointLight.castShadow = true;
pointLight.shadow.radius = 20;
pointLight.decay = 2;
pointLight.distance = 10;
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
smallBall.position.set(2, 2, 2);
smallBall.add(pointLight);
```

<img src="/images/material/font-end/three-js/pointLight-ball.png" alt="draw a line" width = "500px">

## SpotLight

This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.

```js
const spotLight = new THREE.SpotLight(0xffffff, 30);
spotLight.position.set(2, 2, 2);
spotLight.target = sphere;
spotLight.castShadow = true;
spotLight.shadow.radius = 10;
spotLight.angle = Math.PI / 4;
spotLight.distance = 10; //max distance of light
spotLight.penumbra = 0.5; // softness of the shadow like a flashlight
spotLight.decay = 2; // the light will decay as it goes further
// spotLight.shadow.mapSize.set(2048, 2048);
scene.add(spotLight);
```

## RectAreaLight

RectAreaLight emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting.

## Commonly used Materials

::: warning
There are materials that does not support light: MeshBasicMaterial
:::

### MeshStandardMaterial

A standard physically based material, using Metallic-Roughness workflow.

Physically based rendering (PBR) has recently become the standard in many 3D applications, such as Unity, Unreal and 3D Studio Max.

This approach differs from older approaches in that instead of using approximations for the way in which light interacts with a surface, a physically correct model is used. The idea is that, instead of tweaking materials to look good under specific lighting, a material can be created that will react 'correctly' under all lighting scenarios.

In practice this gives a more accurate and realistic looking result than the MeshLambertMaterial or MeshPhongMaterial, at the cost of being somewhat more computationally expensive. MeshStandardMaterial uses per-fragment shading.

### MeshLambertMaterial

A material for non-shiny surfaces, without specular highlights.

The material uses a non-physically based Lambertian model for calculating reflectance. This can simulate some surfaces (such as untreated wood or stone) well, but cannot simulate shiny surfaces with specular highlights (such as varnished wood). MeshLambertMaterial uses per-fragment shading.

### MeshPhongMaterial

A material for shiny surfaces with specular highlights.

The material uses a non-physically based Blinn-Phong model for calculating reflectance. Unlike the Lambertian model used in the MeshLambertMaterial this can simulate shiny surfaces with specular highlights (such as varnished wood). MeshPhongMaterial uses per-fragment shading.

### MeshPhysicalMaterial

An extension of the MeshStandardMaterial, providing more advanced physically-based rendering properties

### MeshToonMaterial

A material implementing toon shading.
