import React from 'react';
import * as THREE from 'three';
import $ from 'jquery';

import initMedia from '../three/initMedia';
import initThree from '../three/initThree';
import animation from '../three/animation';
// import init from '../three/wholeThing';

class ThreeProject extends React.Component {
  constructor(props) {
    super(props)

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleTileCount = this.handleTileCount.bind(this);

    this.state = {};
  }

  componentDidMount() {
    initMedia().then( (video) => {
        initThree({mount: this.mount, video}).then( (assets) => {
          // Adds assets from three.js setup to state
          this.setState( () => ({ ...assets }) );
          window.addEventListener( 'resize', this.onWindowResize, false );
          // Then starts animation
          this.start();
        //   addEvents();
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
  }

  onWindowResize(){
    const {camera, renderer} = this.state;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.setState( () => ({
      camera, renderer
    }));
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
      ...this.state
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

export default ThreeProject;
