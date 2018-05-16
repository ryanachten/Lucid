// stereoCamera and EffectComposer inspired by: https://rawgit.com/owntheweb/three.js/dev/examples/vr_effect_composer_stereo_camera.html
// Shader exmaples via: https://www.airtightinteractive.com/demos/js/shaders/preview/

let shape, renderer, scene, camera, texture, effect, stereoCamera, composer, renderPass;
let stats;
let geometryContainer;
let orientation = {};
let frameId;
let objShuffleAnimation;


function initMedia(){

  return new Promise((resolve, reject) => {

      const video = document.createElement('video');
      video.id = 'video__container';
      const videoSize = 128;
      video.width = video.height = videoSize;

      // Uncomment to see video feed
      document.querySelector('body').appendChild(video);

      const constraints = {
        video: {
          // Makes sure video size is square for webgl tiling
          width: videoSize, height: videoSize,
          // Makes sure back cam is used
          facingMode: "environment"
        },
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          // Assign stream to video src
          video.srcObject = stream;

          resolve(video);
        });
    });
};

const initThree = function (video) {
  return new Promise(function(resolve, reject) {

    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
    console.log(stats);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.domElement.id = "three__canvas"
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    stereoCamera = new THREE.StereoCamera();
    renderPass = new THREE.RenderPass(scene, stereoCamera.left);

    const kaleidoPass = new THREE.ShaderPass( THREE.KaleidoShader );

    copyPass = new THREE.ShaderPass(THREE.CopyShader);
    copyPass.renderToScreen = true;

    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(kaleidoPass);
    composer.addPass(copyPass);


    texture = new THREE.VideoTexture( video );

    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.repeat.x = 4;
    texture.repeat.y = 4;
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;

    const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    material.map = texture;

    geometryContainer = {
      box: new THREE.BoxGeometry( 1, 1, 1),
      cone: new THREE.ConeGeometry( 1, 1, 8),
      sphere: new THREE.SphereGeometry( 1, 25, 25),
      octa: new THREE.OctahedronGeometry( 1, 0),
      tetra: new THREE.TetrahedronGeometry( 1, 0),
      icosa: new THREE.IcosahedronGeometry( 1, 0),
      dodeca: new THREE.DodecahedronGeometry( 1, 0)
    };

    const geometry = geometryContainer.sphere;
    shape = new THREE.Mesh( geometry, material );
    scene.add( shape );
    effect = new THREE.StereoEffect( renderer );

    resolve();
  });
}

function animate() {
	frameId = requestAnimationFrame( animate );

  stats.begin();

  // Assign shape rotation radians to device rotation degrees
  if (orientation.absolute) {
    const beta = orientation.beta * (Math.PI / 180); //range: -180 -> 180
    const gamma = orientation.gamma * (Math.PI / 180); //range: -90 -> 90
    const alpha = orientation.alpha * (Math.PI / 180); //range: 0 -> 360

    shape.rotation.x = gamma;
    shape.rotation.y = alpha;
    shape.rotation.z = beta;
  }
  else{
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;
    shape.rotation.z += 0.01;
  }

  texture.offset.x -= 0.01;
  texture.offset.y -= 0.01;

  // effect.render(scene, camera);

  const size = renderer.getSize();
  stereoCamera.update(camera);


  if ( renderer.autoClear ) renderer.clear();
		renderer.setScissorTest( true );

  renderer.setScissor( 0, 0, size.width / 2, size.height );
  renderer.setViewport( 0, 0, size.width / 2, size.height);
  renderPass.camera = stereoCamera.cameraL;
  composer.render();

  renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
  renderer.setViewport( window.innerWidth / 2, 0, size.width / 2, size.height);
  renderPass.camera = stereoCamera.cameraR;
  composer.render();

  renderer.setScissorTest( false );

  stats.end();
};

const addEvents = () => {

  // Device rotation tracking
  window.addEventListener("deviceorientation", getDeviceOrientation, true);

  // Three.js resize handler
  window.addEventListener( 'resize', onWindowResize, false );

  // Request browser to go fullscreen
  const fullscreenButton = document.querySelector('.ui__fullscreen');
  fullscreenButton.addEventListener("click", toggleFullScreen, false);

  // Zoom out to get obj overview
  const zoomOutButton = document.querySelector('.ui__zoomOut');
  zoomOutButton.addEventListener("click", () => {
    if (!zoomOutButton.classList.contains('active')) {
      zoomOutButton.classList.add('active');
      camera.position.z = 5;
    }else{
      zoomOutButton.classList.remove('active');
      camera.position.z = 0;
    }
  });

  // Input slide for texture tile count
  const inputSlide = document.querySelector('.ui__tileCount');
  inputSlide.addEventListener( 'change', (e) => {
    const tileCount = e.target.value;
    texture.repeat = {x: tileCount, y: tileCount};
  });

  // Object select dropdown
  const objectSelect = document.querySelector('.ui__objectSelect');
  objectSelect.addEventListener( 'change', (e) => {
    const currentObject = geometryContainer[e.target.value];
    shape.geometry = currentObject;
  });

  // Shuffle object animation setting
  const shuffleObject = document.querySelector('.ui__objShuffle');
  shuffleObject.addEventListener("click", () => {
    if (!shuffleObject.classList.contains('active')) {
      shuffleObject.classList.add('active');
      objShuffleAnimation = window.setInterval( () => {
        const keyLength = Object.keys(geometryContainer).length;
        const currentObjIndex = Math.floor( Math.random() * keyLength);
        const currentObject = Object.keys(geometryContainer)[currentObjIndex];
        shape.geometry = geometryContainer[currentObject];

        // Update object select to reflect current object
        objectSelect.selectedIndex = currentObjIndex;
        // console.log(currentObject);
      }, 20000);
    }else{
      shuffleObject.classList.remove('active');
      window.clearInterval(objShuffleAnimation);
    }
  });
}

function toggleFullScreen(e) {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    // Request full screen
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {

      requestFullScreen.call(docEl);

      // Lock screen to landscape
      window.screen.orientation.lock('landscape-primary');

      e.target.classList.add('active');
    }
    // Cancel full screen
    else {
      cancelFullScreen.call(doc);
      window.screen.orientation.unlock();
      e.target.classList.remove('active');
  }
}

function getDeviceOrientation(event) {
  orientation.absolute = event.absolute;
  orientation.alpha    = event.alpha;
  orientation.beta     = event.beta;
  orientation.gamma    = event.gamma;
}

function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function init(){
  initMedia().then( (video) => {
    initThree(video).then( () => {
      animate();
      addEvents();
    });
  });
};
init();
