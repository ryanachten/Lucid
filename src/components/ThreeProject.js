import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import $ from 'jquery';

import initMedia from '../three/initMedia';
import initThree from '../three/initThree';
import initShaders from '../three/initShaders'
import animation from '../three/animation';

class ThreeProject extends React.Component {
  constructor(props) {
    super(props)
    this.onWindowResize = this.onWindowResize.bind(this);
    this.getDeviceOrientation = this.getDeviceOrientation.bind(this);
    this.animate = this.animate.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleTileCount = this.handleTileCount.bind(this);
    // this.handleSelectedFilter = this.handleSelectedFilter.bind(this);
    this.handleActiveShaders = this.handleActiveShaders.bind(this);

    this.state = {
      orientation: {},
      allShaderPasses: undefined
    };
  }

  componentDidMount() {
    initMedia().then( (video) => {
        initThree({mount: this.mount, video}).then( (assets) => {
          // Adds assets from three.js setup to state
          this.setState( () => ({ ...assets }) );
          // Add resize and device orientation events
          const allShaderPasses = initShaders();
          this.setState(() => ({allShaderPasses}));
          window.addEventListener( 'resize', this.onWindowResize, false );
          window.addEventListener("deviceorientation", this.getDeviceOrientation, true);
          // Then starts animation
          this.start();
        });
      });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.zoomOut !== this.props.zoomOut) {
      this.handleZoomOut(nextProps.zoomOut);
    }
    if (nextProps.tileCount !== this.props.tileCount) {
      this.handleTileCount(nextProps.tileCount);
    }
    if (nextProps.selectedObject !== this.props.selectedObject) {
      this.handleSelectedObject(nextProps.selectedObject);
    }
    if (nextProps.activeShaders !== this.props.activeShaders) {
      this.handleActiveShaders(JSON.parse(nextProps.activeShaders));
    }
  }

  onWindowResize(){
    const {camera, renderer, stereoCamera} = this.state;
    const canvasWidth = $(window).innerWidth();
    const canvasHeight = $(window).innerHeight();

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( canvasWidth, canvasHeight );
    this.setState( () => ({
      canvasWidth, canvasHeight,
      camera, renderer
    }));

  }

  getDeviceOrientation(e){
    console.log('orientation e', e);
    console.log('this.state.orientation', this.state.orientation);
    if (e.absolute) {
      const orientation = this.state.orientation;
      orientation.absolute = e.absolute;
      orientation.alpha    = e.alpha;
      orientation.beta     = e.beta;
      orientation.gamma    = e.gamma;
      this.setState( () => ({
        orientation
      }));
    }
  }

  handleZoomOut(zoomOut){
    const newZpos = zoomOut ? -5 : 0;
    const shape = this.state.shape;
    shape.position.z = newZpos;
    this.setState( () => { shape });
  };

  handleTileCount(tileCount){
    const texture = this.state.texture;
    texture.repeat.x = tileCount;
    texture.repeat.y = tileCount;
    this.setState( () => { texture });
  }

  handleSelectedObject(selectedObject){
    const shape = this.state.shape;
    const newGeometry = this.state.geometryContainer[selectedObject];
    shape.geometry = newGeometry;
    this.setState( () => { shape });
  }

  handleActiveShaders(shaders){
    const composer = Object.assign(this.state.composer);
    const allPasses = this.state.allShaderPasses;
    const currentPasses = this.state.composer.passes;
    const renderPass = currentPasses[0]; //save
    const copyPass = currentPasses[currentPasses.length-1]; //save
    const shaderPipeline = [renderPass];

    Object.keys(shaders).map( (shader) => {
      const newShader = shaders[shader]; //get active shader name
      const newPass = allPasses[shader]; //get pass from state
      shaderPipeline.push(newPass); //push pass to pipeline

      // Iterate through new pass uniforms and assign state vals
      Object.keys(newShader).map((uniform) => {
        newPass.uniforms[uniform].value = newShader[uniform];
      });
    });
    shaderPipeline.push(copyPass);
    composer.passes = shaderPipeline; //assign pipeline to composer
    this.setState(() => ({
      composer
    }));
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {

    animation({
      ...this.state,
      rotateTexture: this.props.rotateTexture,
      rotateTextureSpeed: this.props.rotateTextureSpeed
    });

    this.frameId = window.requestAnimationFrame(this.animate);
  }


  render() {
    return (
      <div
        style={{  width: this.state.canvasWidth,
                  height: this.state.canvasHeight  }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}


export default connect()(ThreeProject);
