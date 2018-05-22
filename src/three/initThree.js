import Stats from 'stats.js';
import * as THREE from 'three';
import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6';

const initThree = function ({mount, video}) {
  return new Promise(function(resolve, reject) {

    // Add stats for fps reading
    const stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
    stats.dom.id = 'stats-graph';

    // Create scene
    const scene = new THREE.Scene();

    // Add cameras
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    const stereoCamera = new THREE.StereoCamera();

    // Add renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.id = "three__canvas"
    renderer.setSize( window.innerWidth, window.innerHeight );
    mount.appendChild(renderer.domElement);

    // Add shader passes
    const renderPass = new RenderPass(scene, stereoCamera.left);
    const copyPass = new ShaderPass(CopyShader);
    copyPass.renderToScreen = true;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(copyPass);

    // Setup video texture using webcam video
    const texture = new THREE.VideoTexture( video );
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.repeat.x = 4;
    texture.repeat.y = 4;
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;

    const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    material.map = texture;

    const geometryContainer = {
      box: new THREE.BoxGeometry( 1, 1, 1),
      cone: new THREE.ConeGeometry( 1, 1, 8),
      sphere: new THREE.SphereGeometry( 1, 25, 25),
      octa: new THREE.OctahedronGeometry( 1, 0),
      tetra: new THREE.TetrahedronGeometry( 1, 0),
      icosa: new THREE.IcosahedronGeometry( 1, 0),
      dodeca: new THREE.DodecahedronGeometry( 1, 0)
    };

    const geometry = geometryContainer.sphere;
    const shape = new THREE.Mesh( geometry, material );
    scene.add( shape );

    resolve({ stats, scene, camera, stereoCamera, renderer, texture,
              material, geometryContainer, geometry, shape,
              // Shaders
              composer, renderPass
             });
  });
}

export default initThree;
