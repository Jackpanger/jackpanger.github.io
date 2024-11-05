---
title: Materials
createTime: 2024/11/05 00:51:36
permalink: /guide/8jvb/guide/materials/font-end/three-js/materials/
tags:
  - three.js
  - materials
---

## Maps

Loaders

```js
textureLoader.load("path/to/texture");
```

ColorSpace:
:::details why use sRGB?
sRGB uses a gamma curve to adjust color values, making colors appear more natural on display devices. This gamma curve allocates more detail to darker areas and less to brighter areas, aligning with human visual perception.
:::

```js
// Non-Linear Color Space
texture.colorSpace = THREE.SRGBColorSpace;
// if we want to change colorSpace in real time. Remember to update the texture in GUI when changes.
gui
  .add(texture, "colorSpace", {
    sRGB: THREE.SRGBColorSpace,
    Linear: THREE.LinearSRGBColorSpace,
  })
  .onChange(() => {
    texture.needsUpdate = true;
  });
```

Customize materials by maps:

```js
new THREE.MeshBasicMaterial({
  color: 0xff0000,
  map: texture,
  transparent: true,
  aoMap: aoMap,
  aoMapIntensity: 1,
  alphaMap: alphaMap,
  lightMap: lightMap,
  specularMap: specularMap,
  reflectivity: 1,
});
```

### Map

A standard map that applies a texture to the geometry.

### Alpha Map

The black areas of the map are transparent, while the white areas are opaque.

### Env Map

Applies a texture to the entire environment, creating reflective or refractive effects.

```js
import { RGBELoader } from "three/examples/jsm/Addons.js";
let rgbeLoader = new RGBELoader();
rgbeLoader.load("xxx", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  planeMaterial.envMap = envMap;
});
```

### Specular Map

Controls the reflectivity or shininess of the surface by defining where highlights (specular reflections) should appear.

### Light Map

A Light Map is a texture map used in 3D rendering to simulate lighting and shadows on a surface without real-time computation. Light maps are pre-baked textures that contain lighting information, which helps improve performance by reducing the need to calculate complex lighting in real time.

### AO Map(Ambient Occlusion Map)

An Ambient Occlusion (AO) Map is a texture used in 3D graphics to simulate how ambient lighting affects the crevices, corners, and folds of an object. It adds depth and realism by darkening areas where light would have a harder time reaching, such as small cracks or the spaces between objects.

### Quick Recap

- Specular Map: Controls glossiness and reflection effects.
- Light Map: Stores pre-calculated lighting and shadow information to improve performance.
- AO Map (Ambient Occlusion Map): Enhances shadow effects from ambient light, making details appear more realistic.

## Fog

### Linear Fog

```js
scene.fog = new THREE.Fog(0x999999, 0.01, 100);
```

### Exponential Fog

```js
scene.fog = new THREE.FogExp2(0x999999, 0.1);
```
