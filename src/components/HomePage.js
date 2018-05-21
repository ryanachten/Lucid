import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import { setZoomOut, setTileCount, setGeometryShape } from '../actions/settings';

import ThreeProject from './ThreeProject';
import LoadingScreen from './LoadingScreen';
import initShaders from '../three/initShaders';

import FullScreenButton from './FullScreenButton';

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.onZoomOutToggle = this.onZoomOutToggle.bind(this);
    this.onTileCountChange = this.onTileCountChange.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
    this.onShuffleChange = this.onShuffleChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onUniformsChange = this.onUniformsChange.bind(this);

    this.state = {
      shuffle: false,
      filter: 'none',
      activeFilters: {}
    }
  }

  componentDidMount(){
    const shaders = initShaders();
    this.setState({ shaders });
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
    // this.setState( () => ({
    //   selectedObject: $('.ui__objectSelect')[0].value
    // }));
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
    newFilter.shader.uniforms[uniformName].value = newAmount;
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
          <div className="ui_filterContainer">
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
        </div>

        <ThreeProject
          zoomOut={this.props.zoomOut}
          tileCount={this.props.tileCount}
          selectedObject={this.props.geometryShape}
          shuffle={this.state.shuffle}
          filter={this.state.filter}
        />
      </div>
    );
  };
}

const mapStateToProps = (settings) => {
  return {
    zoomOut: settings.zoomOut,
    tileCount: settings.textureSettings.tileCount,
    geometryShape: settings.shapeSettings.geometryShape
  }
};

export default connect(mapStateToProps)(HomePage);
