import { Controller } from "@hotwired/stimulus";
import * as THREE from 'three';

export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.scene.fog = new THREE.FogExp2(0x193F3A, 0.002);
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // BASIC BOX GEO
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: false
    });

    this.originCube = this.createCube(0, 0, 0);
    // this.offsetCube = this.createCube(5, 5, -5);

    this.pointLight = new THREE.PointLight(0xffff00);
    this.pointLight.position.set(3, 3, -5);

    this.lightHelper = new THREE.PointLightHelper(this.pointLight);
    this.gridHelper = new THREE.GridHelper(100, 100);

    //CLOUDS
    let cloudParticles = [];
    this.loader = new THREE.TextureLoader();
    this.loader.load("/assets/smoke.png", function(texture){

      const cloudGeo = new THREE.PlaneGeometry(1, 1);
      const cloudMat = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });

      for (let fog = 0; fog < 25; fog++) {
        let cloud = new THREE.Mesh( cloudGeo, cloudMat );
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );

        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        cloud.material.opacity = 0.6;
        cloudParticles.push(cloud);
        this.scene.add( cloud );
      }

      this.animate();

  });

    this.scene.add(
      this.originCube,
      // this.offsetCube,
      this.pointLight,
      this.lightHelper,
      this.gridHelper
    );

    // BASIC BACKGROUND
    // const backgroundTexture = new THREE.TextureLoader().load(
    //   "/assets/storm_coming.jpeg"
    // );
    // this.scene.background = backgroundTexture;

    this.camera.position.z = 5;

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.originCube.rotation.x += 0.01;
    this.originCube.rotation.y += 0.01;

    // this.offsetCube.rotation.x -= 0.002;
    // this.offsetCube.rotation.y -= 0.003;

    this.renderer.render(this.scene, this.camera);
  }

  createCube(x, y, z) {
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x, y, z);

    return cube;
  }
}
