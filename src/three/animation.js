import * as THREE from 'three';

function animate({
    // Three assets
    stats, scene, camera, stereoCamera, renderer,
    texture, material, shape, composer, renderPass,
    // Device orientation
    orientation
  }) {

  stats.begin();

  // Assign shape rotation radians to device rotation degrees
  if (orientation && orientation.absolute) {
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

export default animate;