import React from 'react';
import { connect } from 'react-redux';
import { addActiveShader, removeActiveShader } from '../actions/settings';

class ShaderItem extends React.Component{

  constructor(props){
    super(props);
    this.onToggleFilter = this.onToggleFilter.bind(this);
  }

  onToggleFilter(e){
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
    }
    else{
      const name = e.target.value;
      this.props.dispatch(
        removeActiveShader(name)
      );
    }
  }

  render(){
    return(
      <div>
        <span>{this.props.shader}</span>
        <input type="checkbox" value={this.props.shader} onChange={this.onToggleFilter}/>
      </div>
    );
  }
}

const mapStateToProps = (settings) => {
  return {
    activeShaders: settings.shaderSettings.activeShaders
  }
}

export default connect(mapStateToProps)(ShaderItem);
