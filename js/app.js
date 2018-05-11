let cube, renderer, scene, camera, texture, effect;

const initMedia = new Promise(function(resolve, reject) {

    const video = document.createElement('video');
    const videoSize = 256;
    video.width = video.height = videoSize;

    const constraints = {
      video: {width: videoSize, height: videoSize},
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        resolve(video);
      });
  });

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
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    effect = new THREE.StereoEffect( renderer );
    // camera.position.z = 5;

    resolve();
  });
}


function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;
  texture.offset.x -= 0.001;
  texture.offset.y -= 0.001;

	effect.render(scene, camera);
};

// animate();
(function(){

  initMedia.then( (video) => {
    initThree(video).then( () => {
      animate();
    });
  });
})();
