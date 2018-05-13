let shape, renderer, scene, camera, texture, effect;
let geometryContainer;
let orientation = {};
let frameId;


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

  const objectSelect = document.querySelector('.ui__objectSelect');
  objectSelect.addEventListener( 'change', (e) => {
    const currentObject = geometryContainer[e.target.value];
    shape.geometry = currentObject;
  });
}

const removeEvents = () => {
  document.querySelector('.ui__fullscreen').removeEventListener("click", toggleFullScreen);
  window.removeEventListener("deviceorientation", getDeviceOrientation, true);
  window.removeEventListener( 'resize', onWindowResize, false );
}

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

const initThree = function (video) {
  return new Promise(function(resolve, reject) {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.domElement.id = "three__canvas"
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

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

  // Assign shape rotation radians to device rotation degrees
  if (orientation.absolute) {
    const beta = orientation.beta * (Math.PI / 180); //range: -180 -> 180 //(orientation.beta+180)
    const gamma = orientation.gamma * (Math.PI / 180); //range: -90 -> 90 //((orientation.gamma+90)*2)
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

	effect.render(scene, camera);
};

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
