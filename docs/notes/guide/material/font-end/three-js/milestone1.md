---
title: First Milestone
createTime: 2024/11/08 16:27:16
permalink: /guide/guide/materials/font-end/three-js/milestone1/
tags:
  - Three-js
  - Milestone
---

Congratulations! You have completed the first milestone of the Three-js tutorial.
Now you can combine the knowledge you have learned to create your own 3D scene with smooth camera movement.

## 1. Create all the models and bind the mouse event

::: code-tabs
@tab App.tsx

```js :collapsed-lines=10
import * as THREE from "three";
import "./App.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import { Water } from "three/examples/jsm/objects/Water2.js";
import { useEffect, useState } from "react";
import { transitionCamera } from "./utils/cameraUtils";
import { getHandlerWheel } from "./utils/index";
import { useRef } from "react";
import { getScreenResize } from "./utils/listenerUtils/screenResize";
import { createHeart } from "./models/heart";
function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const isAnimating = useRef(false);
  const [scenesRef, setScenesRef] = useState<Scene[]>([]);

  useEffect(() => {
    // scene
    const scene = new THREE.Scene();
    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 1;
    camera.position.x = 1;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(renderer.domElement);
    // adjust tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    // axes helper
    const axesHelper = new THREE.AxesHelper(5); // param: length of the helper line
    scene.add(axesHelper);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      TWEEN.update();
      camera.updateProjectionMatrix();
    }

    // add environment map
    const rgbeLoader = new RGBELoader();
    // rgbeLoader.load("", (texture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   scene.background = texture;
    //   scene.environment = texture;
    // });

    // add light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 50);
    directionalLight.position.set(2, 2, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.radius = 20;
    scene.add(directionalLight);

    // add model
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    // gltfLoader.load(
    //   "./models/scene.gltf",
    //   function (gltf) {
    //     const model = gltf.scene;
    //     scene.add(model);
    //     model.traverse((child) => {
    //       if (child.name === "Plane") {
    //         child.visible = false;
    //       }
    //       if (child instanceof THREE.Mesh) {
    //         child.castShadow = true;
    //         child.receiveShadow = true;
    //       }
    //     });
    //   },
    //   undefined,
    //   function (error) {
    //     console.error(error);
    //   }
    // );
    const SphereGeometry = new THREE.SphereGeometry(1, 20, 20);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(SphereGeometry, material);
    sphere.castShadow = true;
    scene.add(sphere);
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(0, -1, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // create heart animation
    const { starInstance, createHeartAnimation, reverseHeartAnimation } =
      createHeart();
    scene.add(starInstance);

    // set water background
    const waterGeometry = new THREE.CircleGeometry(2, 32);
    const water = new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      color: 0xeeeeff,
      flowDirection: new THREE.Vector2(3, 3),
      scale: 1,
    });
    water.rotation.x = Math.PI * -0.5;
    water.position.y = -0.8;
    scene.add(water);

    const scenes = [
      {
        name: "scene 1",
        callback: () => {
          transitionCamera(
            camera,
            controls,
            new THREE.Vector3(0, 0, 5),
            new THREE.Vector3(0, 0, 0)
          );
          createHeartAnimation();
        },
      },
      {
        name: "scene 2",
        callback: () => {
          transitionCamera(
            camera,
            controls,
            new THREE.Vector3(-2, 1, 2),
            new THREE.Vector3(3, 1, 1)
          );
          reverseHeartAnimation();
        },
      },
    ];
    // scenesRef.current = scenes;
    setScenesRef(scenes);

    // wheel event
    const handleWheel = getHandlerWheel(scenes, setCurrentScene, isAnimating);
    window.addEventListener("wheel", handleWheel, false);

    // screen resize event
    const screenResize = getScreenResize(renderer, camera);
    window.addEventListener("resize", screenResize);
    return () => {
      // Perform cleanup
      document.body.removeChild(renderer.domElement);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", screenResize);
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,
        pointerEvents: "none",
        transition: "all 1s",
        transform: `translate3d(0, ${-currentScene * 100}vh, 0)`,
      }}
    >
      {scenesRef.map((item) => (
        <div key={item.name} style={{ width: "100vw", height: "100vh" }}>
          <h1
            style={{ padding: "100px 50px", fontSize: "50px", color: "#fff" }}
          >
            {item.name}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default App;

```

:::

Here are the explanations of the code:

```js
const [currentScene, setCurrentScene] = useState(0);
const isAnimating = useRef(false);
const [scenesRef, setScenesRef] = useState<Scene[]>([]);
```

scenesRef is an array that stores the scenes. currentScene is the index of the current scene.
Since scenes array is used in the dom, we use useState to manage it to trigger the re-render of the dom. Same as the currentScene. When we change the currentScene, the dom will be re-rendered to switch the scene and translate the scene text.

```ts :collapsed-lines=10
import * as THREE from "three";

import TWEEN from "three/examples/jsm/libs/tween.module.js";
export function createHeart(
  starInstance: THREE.InstancedMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 10,
    }),
    100
  ),
  scale: number = 0.05,
  center: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
) {
  const size = starInstance.count;
  const starsArray: THREE.Vector3[] = [];
  const endArray: THREE.Vector3[] = [];
  for (let i = 0; i < size; i++) {
    const x = Math.random() * size - size / 2;
    const y = Math.random() * size - size / 2;
    const z = Math.random() * size - size / 2;
    starsArray.push(new THREE.Vector3(x, y, z));
    const matrix = new THREE.Matrix4();
    matrix.setPosition(x, y, z);
    starInstance.setMatrixAt(i, matrix);
  }
  // heart path
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, -22.5);
  heartShape.bezierCurveTo(0, -22.5, -5, -47.5, -25, -47.5);
  heartShape.bezierCurveTo(-55, -47.5, -55, -12.5, -55, -12.5);
  heartShape.bezierCurveTo(-55, 7.5, -35, 29.5, 0, 47.5);
  heartShape.bezierCurveTo(35, 29.5, 55, 7.5, 55, -12.5);
  heartShape.bezierCurveTo(55, -12.5, 55, -47.5, 25, -47.5);
  heartShape.bezierCurveTo(10, -47.5, 0, -22.5, 0, -22.5);
  for (let i = 0; i < size; i++) {
    const point = heartShape.getPoint(i / 100);
    endArray.push(
      new THREE.Vector3(
        point.x * scale + center.x,
        point.y * scale + center.y,
        center.z
      )
    );
  }
  function createHeartAnimation() {
    new TWEEN.Tween({ time: 0 })
      .to({ time: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((obj) => {
        for (let i = 0; i < 100; i++) {
          const x =
            starsArray[i].x + (endArray[i].x - starsArray[i].x) * obj.time;
          const y =
            starsArray[i].y + (endArray[i].y - starsArray[i].y) * obj.time;
          const z =
            starsArray[i].z + (endArray[i].z - starsArray[i].z) * obj.time;
          const matrix = new THREE.Matrix4();
          matrix.setPosition(x, y, z);
          starInstance.setMatrixAt(i, matrix);
        }
        starInstance.instanceMatrix.needsUpdate = true;
      })
      .start();
  }
  function reverseHeartAnimation() {
    new TWEEN.Tween({ time: 0 })
      .to({ time: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((obj) => {
        for (let i = 0; i < 100; i++) {
          const x =
            endArray[i].x + (starsArray[i].x - endArray[i].x) * obj.time;
          const y =
            endArray[i].y + (starsArray[i].y - endArray[i].y) * obj.time;
          const z =
            endArray[i].z + (starsArray[i].z - endArray[i].z) * obj.time;
          const matrix = new THREE.Matrix4();
          matrix.setPosition(x, y, z);
          starInstance.setMatrixAt(i, matrix);
        }
        starInstance.instanceMatrix.needsUpdate = true;
      })
      .start();
  }

  return {
    starInstance,
    starsArray,
    endArray,
    createHeartAnimation,
    reverseHeartAnimation,
  };
}
```

The general idea of the `createHeart` function is to create a star instance and use the tween library to animate the star instance.
The shape of the heart is defined by the `heartShape.getPoint` function from a predefined cubic bezier curve.

## 2. Define the listener functions

::: code-tabs
@tab cameraUtils.ts

```js :collapsed-lines=10
import TWEEN, { Easing } from "three/examples/jsm/libs/tween.module.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// transitionCamera
export function transitionCamera(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  position: THREE.Vector3,
  target: THREE.Vector3
) {
  new TWEEN.Tween(camera.position)
    .to(position, 1000)
    .easing(Easing.Quadratic.InOut)
    .start();

  new TWEEN.Tween(controls.target)
    .to(target, 1000)
    .easing(Easing.Quadratic.InOut)
    .start();
}
```

:::
Given camera, controls, position and target, we can use the transitionCamera function to smoothly transition the camera to the target position and the controls to the target target.

::: code-tabs
@tab wheelSwitch.ts

```js :collapsed-lines=10
import { MutableRefObject } from "react";
export function getHandlerWheel(
  scenes: Array<Scene>,
  setCurrentScene: React.Dispatch<React.SetStateAction<number>>,
  isAnimating: MutableRefObject<boolean>
): (e: WheelEvent) => void {
  return function handleWheel(e: WheelEvent): void {
    // console.log(isAnimating.current);
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (e.deltaY > 0) {
      setCurrentScene((prevScene: number) => {
        const newScene = (prevScene + 1) % scenes.length;
        scenes[newScene].callback();
        return newScene;
      });
    } else if (e.deltaY < 0) {
      setCurrentScene((prevScene: number) => {
        const newScene = (prevScene - 1 + scenes.length) % scenes.length;
        scenes[newScene].callback();
        return newScene;
      });
    }
    setTimeout(() => {
      isAnimating.current = false;
    }, 1000);
  };
}
```

:::
This function is used to handle the mouse wheel event. When the user scrolls the mouse wheel, the currentScene will be changed to the next or previous scene. Also isAnimating is used to prevent the scene from being switched multiple times when the user is scrolling the mouse wheel.

## 3. Display the final demo

<div id="imageContainer">
  <div id="loader">Loading...</div>
  <img id="myGif" src="/images/material/font-end/three-js/milestone1-demo.gif" alt="Milestone 1 Demo" style="display: none;">
</div>
