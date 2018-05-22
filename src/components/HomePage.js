import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { setZoomOut, setGeometryShape} from '../actions/settings';

import ThreeProject from './ThreeProject';
import LoadingScreen from './LoadingScreen';

import FullScreenButton from './FullScreenButton';
import SortableShaderList from './SortableShaderList';
import TextureSettings from './TextureSettings';

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.onZoomOutToggle = this.onZoomOutToggle.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
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

  onObjectChange(e){
    this.props.dispatch(
      setGeometryShape(e.target.value)
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

          <TextureSettings
            tileCount={this.props.tileCount}
            rotateTexture={this.props.rotateTexture}
            rotateTextureX={this.props.rotateTextureX}
            rotateTextureY={this.props.rotateTextureY}
          />

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
