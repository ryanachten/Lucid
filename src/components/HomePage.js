import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import projects from '../store';
import ThreeProject from './ThreeProject';
import LoadingScreen from '../components/LoadingScreen';
import initShaders from '../three/initShaders';

const defaultProject = 'oscil';

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.onFullscreenToggle = this.onFullscreenToggle.bind(this);
    this.onZoomOutToggle = this.onZoomOutToggle.bind(this);
    this.onTileCountChange = this.onTileCountChange.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
    this.onShuffleChange = this.onShuffleChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onUniformsChange = this.onUniformsChange.bind(this);

    this.state = {
      fullscreen: false,
      zoomOut: false,
      tileCount: 4,
      selectedObject: 'sphere',
      shuffle: false,
      filter: 'none',
    }
  }

  componentDidMount(){
    const shaders = initShaders();
    this.setState({ shaders });
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

  onZoomOutToggle(){
    this.setState((prevState) => ({
      zoomOut: !prevState.zoomOut
    }));
    $('.ui__zoomOut').toggleClass('active');
  }

  onTileCountChange(){
    this.setState( () => ({
      tileCount: $('.ui__tileCount')[0].value
    }));
  }

  onObjectChange(){
    this.setState( () => ({
      selectedObject: $('.ui__objectSelect')[0].value
    }));
  }

  onShuffleChange(){
    this.setState( (prevState) => ({
      shuffle: !prevState.shuffle
    }));
    $('.ui__objShuffle').toggleClass('active');
  }

  onFilterChange(){
    const filterName = $('.ui__filterSelect')[0].value;
    const filter = this.state.shaders[filterName];
    this.setState( () => ({
        filter
    }));
  }

  onUniformsChange(e){
    const uniformName = e.target.getAttribute('data-uniforms');
    const newAmount = e.target.value;
    const newFilter = this.state.filter;
    console.log(newFilter.shader.uniforms[uniformName].value);
    newFilter.shader.uniforms[uniformName].value = newAmount;
    console.log(newFilter.shader.uniforms[uniformName].value);
  }

  render = () => {

    return(
      <div>
        <div className="ui__container">
          <button className="ui__fullscreen"
            onClick={this.onFullscreenToggle}>Fullscreen</button>
          <button className="ui__zoomOut"
            onClick={this.onZoomOutToggle}>Zoom Out</button>
          <input className="ui__tileCount" type="range" min="1" max="20" step="1"
            defaultValue={4} onChange={this.onTileCountChange} />
          <select className="ui__objectSelect" defaultValue="sphere"
            onChange={this.onObjectChange}>
            <option value="box">Cube</option>
            <option value="cone">Cone</option>
            <option value="sphere">Sphere</option>
            <option value="octa">Octahedron</option>
            <option value="tetra">Tetrahedron</option>
            <option value="icosa">Icosahedron</option>
            <option value="dodeca">Dodecahedron</option>
          </select>
          <button className="ui__objShuffle"
            onClick={this.onShuffleChange}>Shuffle</button>
          { this.state.shaders && (
            <select className="ui__filterSelect" defaultValue="none"
              onChange={this.onFilterChange}>
              { Object.keys(this.state.shaders).map( (shader) => (
                <option key={shader}>{shader}</option>
              )) }
            </select>
          )}
        { this.state.filter !== 'none' && (
          <div className="ui__uniformContainer">
          { Object.keys(this.state.filter.uniforms).map( (uniform) => (
            <div key={uniform}>
              <span>{uniform}</span>
              <input data-uniforms={uniform} onChange={this.onUniformsChange}
                type="range"
                defaultValue={this.state.filter.uniforms[uniform].default}
                min={this.state.filter.uniforms[uniform].min}
                max={this.state.filter.uniforms[uniform].max}
                step={0.01}/>
            </div>
          )) }
          </div>
        ) }
        </div>

        <ThreeProject
          zoomOut={this.state.zoomOut}
          tileCount={this.state.tileCount}
          selectedObject={this.state.selectedObject}
          shuffle={this.state.shuffle}
          filter={this.state.filter}
        />
      </div>
    );
  };
}

export default HomePage;
