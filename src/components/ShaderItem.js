import React from 'react';
import { connect } from 'react-redux';
import { addActiveShader, removeActiveShader, updateShaderUniform } from '../actions/settings';

class ShaderItem extends React.Component{

  constructor(props){
    super(props);
    this.onToggleFilter = this.onToggleFilter.bind(this);
    this.onUniformsChange = this.onUniformsChange.bind(this);

    this.state = {
      shaderActive: false
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
    const uniform = e.target.getAttribute('data-uniform');
    const newValue = e.target.value;
    console.log();
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
      <div>
        <span>{this.props.shader}</span>
        <input type="checkbox" value={this.props.shader} onChange={this.onToggleFilter}/>
        {this.state.shaderActive && (
          <div>
            { Object.keys(this.props.uniforms).map( (uniform) => (
              <div key={uniform}>
                <span>{uniform}</span>
                <input type="range"
                  data-uniform={uniform}
                  min={this.props.uniforms[uniform].min}
                  max={this.props.uniforms[uniform].max}
                  defaultValue={this.props.uniforms[uniform].default}
                  onChange={this.onUniformsChange}
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

export default connect()(ShaderItem);
