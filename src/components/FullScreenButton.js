import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { IconToggle } from 'rmwc/IconToggle';
import '@material/icon-toggle/dist/mdc.icon-toggle.min.css';
import {setFullScreenMode} from '../actions/settings';

class FullScreenButton extends React.Component{

  constructor(props){
    super(props);

    this.onFullscreenToggle = this.onFullscreenToggle.bind(this);

  }

  onFullscreenToggle(){

    var doc = window.document;
    var docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    // Request full screen
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {

      requestFullScreen.call(docEl);

      // Lock screen to landscape
      window.screen.orientation.lock('landscape-primary');
      this.props.dispatch(
        setFullScreenMode(true)
      );
    }

    // Cancel full screen
    else {

      const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      cancelFullScreen.call(doc);
      window.screen.orientation.unlock();

      this.props.dispatch(
        setFullScreenMode(false)
      );
    }
  }

  render(){
    return (
      <IconToggle className="fullscreen__toggle"
        on={{label: 'Exit fullscreen', content: 'fullscreen_exit'}}
        off={{label: 'Enter fullscreen', content: 'fullscreen'}}
        checked={this.props.fullscreenMode}
        onChange={this.onFullscreenToggle} />
    )
  }
}

export default connect()(FullScreenButton);
