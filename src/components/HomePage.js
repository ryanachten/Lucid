import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { setZoomOut, setTileCount, setGeometryShape,
  toggleTextureRotation, setTextureRotation } from '../actions/settings';

import ThreeProject from './ThreeProject';
import LoadingScreen from './LoadingScreen';

import FullScreenButton from './FullScreenButton';
import ShaderItem from './ShaderItem';
import SortableShaderList from './SortableShaderList';

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.onZoomOutToggle = this.onZoomOutToggle.bind(this);
    this.onTileCountChange = this.onTileCountChange.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
    this.onRotateTexture = this.onRotateTexture.bind(this);
    this.onTexRotateSpeedChange = this.onTexRotateSpeedChange.bind(this);
    this.onShuffleChange = this.onShuffleChange.bind(this);

    this.state = {
      allShaders: this.props.allShaders
    }
  }

  onZoomOutToggle(){
    this.props.dispatch(
      setZoomOut(!this.props.zoomOut)
    );
    $('.ui__zoomOut').toggleClass('active');
  }

  onTileCountChange(e){
    this.props.dispatch(
      setTileCount(e.target.value)
    );
  }

  onObjectChange(e){
    this.props.dispatch(
      setGeometryShape(e.target.value)
    );
  }

  onRotateTexture(){
    this.props.dispatch(
      toggleTextureRotation(!this.props.rotateTexture)
    );
    $('.ui__rotateTexture').toggleClass('active');
  }

  onTexRotateSpeedChange(e){
    const axis = e.target.getAttribute('data-axis');
    const speed = e.target.value;
    console.log('speed', speed);
    this.props.dispatch(
      setTextureRotation({ axis, speed })
    );
  }

  onShuffleChange(){
    // TODO
  }

  render = () => {

    return(
      <div>
        <div className="ui__container">

          <FullScreenButton />
          <button className="ui__objShuffle"
            onClick={this.onShuffleChange}>Shuffle Mode</button>

          <div className="ui__shapeContainer">
            <h2>Shape Settings</h2>
            <button className="ui__zoomOut"
              onClick={this.onZoomOutToggle}>Zoom Out</button>
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
          </div>

          <div className="ui__textureContainer">
            <h2>Texture Settings</h2>
            <input className="ui__tileCount" type="range" min="1" max="20" step="1"
            defaultValue={4} onChange={this.onTileCountChange} />
            <button className="ui__rotateTexture"
              onClick={this.onRotateTexture}>Rotate Texture</button>
              { this.props.rotateTexture && (
                <div>
                  <input className="ui__rotateTextureX" type="range"
                    data-axis="x" defaultValue={0.01}
                    min="-0.1" max="0.1" step="0.01"
                    onChange={this.onTexRotateSpeedChange} />
                  <input className="ui__rotateTextureY" type="range"
                    data-axis="y" defaultValue={0.01}
                    min="-0.1" max="0.1" step="0.01"
                    onChange={this.onTexRotateSpeedChange} />
                </div>
              )}
          </div>

          <SortableShaderList shaders={this.state.allShaders}/>
        </div>

        <ThreeProject
          zoomOut={this.props.zoomOut}
          tileCount={this.props.tileCount}
          rotateTexture={this.props.rotateTexture}
          rotateTextureSpeed={{
            x: this.props.rotateTextureX,
            y: this.props.rotateTextureY
          }}
          selectedObject={this.props.geometryShape}
          shuffle={this.state.shuffle}
          activeShaders={this.props.activeShaders}
        />
      </div>
    );
  };
}

const mapStateToProps = (settings) => {
  return {
    zoomOut: settings.zoomOut,
    tileCount: settings.textureSettings.tileCount,
    rotateTexture: settings.textureSettings.rotateTexture,
    rotateTextureX: settings.textureSettings.rotateX,
    rotateTextureY: settings.textureSettings.rotateY,
    geometryShape: settings.shapeSettings.geometryShape,
    allShaders: settings.shaderSettings.defaultShaderUniforms,
    activeShaders: settings.shaderSettings.activeShaders
  }
};

export default connect(mapStateToProps)(HomePage);
