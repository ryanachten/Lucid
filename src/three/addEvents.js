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
