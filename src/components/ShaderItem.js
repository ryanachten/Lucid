import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'rmwc/Switch';
import '@material/switch/dist/mdc.switch.min.css';
import { Slider } from 'rmwc/Slider';
import '@material/slider/dist/mdc.slider.min.css';

import { addActiveShader, removeActiveShader, updateShaderUniform } from '../actions/settings';

class ShaderItem extends React.Component{

  constructor(props){
    super(props);
    this.onToggleFilter = this.onToggleFilter.bind(this);
    this.onUniformsChange = this.onUniformsChange.bind(this);

    // Checks to see if shader is active in store
    // to provide accurate defaults
    const shaderIsActive = props.activeShaders.hasOwnProperty(props.shader);

    this.state = {
      shaderActive: shaderIsActive
    }
  }

  onToggleFilter(e){
    // If checkbox is active, add shader
    if (e.target.checked) {
      const name = e.target.value;
      const uniforms = this.props.uniforms;
      const uniformDefaults = {};
      Object.keys(uniforms).map( (uniform) => {
        uniformDefaults[uniform] = uniforms[uniform].default
      });
      this.props.dispatch(
        addActiveShader({ name, uniformDefaults })
      );
      this.setState( () => ({
        shaderActive: true
      }));
    }
    // If checkbox is inactive, remove shader
    else{
      const name = e.target.value;
      this.props.dispatch(
        removeActiveShader(name)
      );
      this.setState( () => ({
        shaderActive: false
      }));
    }
  }

  onUniformsChange(e){
    const uniform = e.detail.props['data-uniform'];
    const newValue = e.detail.value;
    this.props.dispatch(
      updateShaderUniform({
        shader: this.props.shader,
        uniform,
        newValue
      })
    );
  }

  render(){

    return(
      <div className="shaderItem__content">
        <span>{this.props.shader}</span>
        <Switch type="checkbox" value={this.props.shader}
          checked={this.state.shaderActive} onChange={this.onToggleFilter}
        />
        {this.state.shaderActive && (
          <div>
            { Object.keys(this.props.uniforms).map( (uniform) => (
              <div className="shaderItem__uniformContainer" key={uniform}>
                <span className="shaderItem__uniformLabel">{uniform}</span>
                <Slider type="range"
                  className="shaderItem__uniformSlider"
                  data-uniform={uniform}
                  min={this.props.uniforms[uniform].min}
                  max={this.props.uniforms[uniform].max}
                  value={this.props.activeShaders[this.props.shader][uniform]}
                  onInput={this.onUniformsChange}
                  step={0.01}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (settings) => {
  let activeShaders = {};
  if (settings.shaderSettings.activeShaders) {
    activeShaders = JSON.parse(settings.shaderSettings.activeShaders)
  }
  return {
    activeShaders
  }
};

export default connect(mapStateToProps)(ShaderItem);
