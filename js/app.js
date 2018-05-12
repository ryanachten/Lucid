let cube, renderer, scene, camera, texture, effect;
let orientation = {};

const initMedia = new Promise(function(resolve, reject) {

    const video = document.createElement('video');
    const videoSize = 128;
    video.width = video.height = videoSize;

    // Uncomment to see video feed
    // document.querySelector('body').appendChild(video);

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

        // Request browser to go fullscreen
        const fullscreenButton = document.querySelector('.fullscreen');
        fullscreenButton.addEventListener("click", toggleFullScreen, false);

        // Add device rotation tracking
        window.addEventListener("deviceorientation", getDeviceOrientation, true);

        resolve(video);
      });
  });

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    // Request full screen
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {

      requestFullScreen.call(docEl);

      // Lock screen to landscape
      window.screen.orientation.lock('landscape-primary');
    }
    // Cancel full screen
    else {
      cancelFullScreen.call(doc);
      window.screen.orientation.unlock();
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

    const geometry = new THREE.SphereGeometry( 1, 25, 25);
    // const geometry = new THREE.BoxGeometry( 1, 1, 1);
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    effect = new THREE.StereoEffect( renderer );
    // camera.position.z = 5;

    window.addEventListener( 'resize', onWindowResize, false );

    resolve();
  });
}


function animate() {
	requestAnimationFrame( animate );

  // Assign shape rotation radians to device rotation degrees
  if (orientation.absolute) {
    const beta = orientation.beta * (Math.PI / 180); //range: -180 -> 180 //(orientation.beta+180)
    const gamma = orientation.gamma * (Math.PI / 180); //range: -90 -> 90 //((orientation.gamma+90)*2)
    const alpha = orientation.alpha * (Math.PI / 180); //range: 0 -> 360

    cube.rotation.x = gamma;
    cube.rotation.y = alpha;
    cube.rotation.z = beta;
  }


  // texture.offset.x -= 0.01;
  // texture.offset.y -= 0.01;

	effect.render(scene, camera);
};

function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

// animate();
(function(){

  initMedia.then( (video) => {
    initThree(video).then( () => {
      animate();
    });
  });
})();
