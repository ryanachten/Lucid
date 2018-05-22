import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import ThreeProject from './ThreeProject';
import LoadingScreen from './LoadingScreen';

import FullScreenButton from './FullScreenButton';
import SortableShaderList from './SortableShaderList';
import ShapeSettings from './ShapeSettings';
import TextureSettings from './TextureSettings';


class HomePage extends React.Component{
  constructor(props){
    super(props);
  }

  render = () => {

    return(
      <div>
        <div className="ui__container">

          <FullScreenButton />

          <ShapeSettings
            zoomOut={this.props.zoomOut}
            geometryShape={this.props.geometryShape}
          />

          <TextureSettings
            tileCount={this.props.tileCount}
            rotateTexture={this.props.rotateTexture}
            rotateTextureX={this.props.rotateTextureX}
            rotateTextureY={this.props.rotateTextureY}
          />

          <SortableShaderList shaders={this.props.allShaders}/>
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
