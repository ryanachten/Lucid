import React from 'react';
import { connect } from 'react-redux';
import { setTileCount, toggleTextureRotation, setTextureRotation } from '../actions/settings';
import { Switch } from 'rmwc/Switch';
import '@material/switch/dist/mdc.switch.min.css';
import { Slider } from 'rmwc/Slider';
import '@material/slider/dist/mdc.slider.min.css';

class TextureSettings extends React.Component{
  constructor(props){
    super(props);
    this.onTileCountChange = this.onTileCountChange.bind(this);
    this.onRotateTexture = this.onRotateTexture.bind(this);
    this.onTexRotateSpeedChange = this.onTexRotateSpeedChange.bind(this);
  }

  onTileCountChange(e){
    this.props.dispatch(
      setTileCount(e.detail.value)
    );
  }

  onRotateTexture(e){
    const rotate = e.target.checked;
    this.props.dispatch(
      toggleTextureRotation(rotate)
    );
  }

  onTexRotateSpeedChange(e){
    const axis = e.detail.props['data-axis'];
    const speed = e.detail.value;
    this.props.dispatch(
      setTextureRotation({ axis, speed })
    );
  }

  render(){
    return(
      <div className="texture__container">
        <h2>Texture Settings</h2>
        <div className="texture__tileCountContainer">
          <span className="texture__tileCountLabel">Tile Repetitions</span>
          <Slider className="texture__tileCountSlider" type="range"
              min={1} max={20} step={1}
              value={this.props.tileCount}
              onInput={this.onTileCountChange} />
        </div>
        <div>
          <span>Rotate Texture</span>
          <Switch className="texture__rotateSwitch"
            onChange={this.onRotateTexture} />
        </div>
          { this.props.rotateTexture && (
            <div>
              <div className="texture__rotateItem">
                <span className="texture__rotateLabel">RotateX</span>
                <Slider className="texture__rotateSlider"
                  data-axis="x" value={this.props.rotateTextureX}
                  min={-0.1} max={0.1} step={0.01}
                  onInput={this.onTexRotateSpeedChange} />
              </div>
              <div className="texture__rotateItem">
                <span>RotateY</span>
                <Slider className="texture__rotateSlider"
                  data-axis="y" value={this.props.rotateTextureY}
                  min={-0.1} max={0.1} step={0.01}
                  onInput={this.onTexRotateSpeedChange} />
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default connect()(TextureSettings);
