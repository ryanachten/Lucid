import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { setZoomOut, setTileCount, setGeometryShape} from '../actions/settings';

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

  onShuffleChange(){
    // TODO
  }

  render = () => {

    return(
      <div>
        <div className="ui__container">
          <FullScreenButton />
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

          <div className="ui_shaderContainer">
            <SortableShaderList shaders={this.state.allShaders}/>
            {/* { Object.keys(this.state.allShaders).map( (shader) => (
              // import and instant shader item thing

              // <ShaderItem key={shader} shader={shader} uniforms={this.state.allShaders[shader]}/>

            )) } */}

          </div>
        </div>

        <ThreeProject
          zoomOut={this.props.zoomOut}
          tileCount={this.props.tileCount}
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
    geometryShape: settings.shapeSettings.geometryShape,
    allShaders: settings.shaderSettings.defaultShaderUniforms,
    activeShaders: settings.shaderSettings.activeShaders
  }
};

export default connect(mapStateToProps)(HomePage);
