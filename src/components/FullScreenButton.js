import React from 'react';
import $ from 'jquery';

const onFullscreenToggle = () => {

  var doc = window.document;
  var docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

  // Request full screen
  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {

    requestFullScreen.call(docEl);

    // Lock screen to landscape
    window.screen.orientation.lock('landscape-primary');

    $('.ui__fullscreen').addClass('active');
  }
  // Cancel full screen
  else {

    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    cancelFullScreen.call(doc);
    window.screen.orientation.unlock();

    $('.ui__fullscreen').removeClass('active');
  }
}

export default () => {
  return (
    <button className="ui__fullscreen"
      onClick={onFullscreenToggle}>Fullscreen</button>
  )
}
