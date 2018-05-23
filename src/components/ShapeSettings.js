import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonIcon } from 'rmwc/Button';
import '@material/button/dist/mdc.button.min.css';
import { Select } from 'rmwc/Select';
import '@material/select/dist/mdc.select.min.css';

import { setZoomOut, setGeometryShape} from '../actions/settings';

class ShapeSettings extends React.Component{
  constructor(props){
    super(props);

    this.onZoomOutToggle = this.onZoomOutToggle.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
  }

  onZoomOutToggle(){
    this.props.dispatch(
      setZoomOut(!this.props.zoomOut)
    );
  }

  onObjectChange(e){
    this.props.dispatch(
      setGeometryShape(e.target.value)
    );
  }

  render(){
    return(
      <div className="shape__container">

        {this.props.zoomOut && (
          <Button
            className="shape__zoomOut"
            onClick={this.onZoomOutToggle}
            unelevated
            ><ButtonIcon
            use="zoom_in" /> World View
          </Button>
        )}
        {!this.props.zoomOut && (
          <Button
            className="shape__zoomOut"
            onClick={this.onZoomOutToggle}
            raised
            ><ButtonIcon
            use="zoom_out" /> Get Overview
          </Button>
        )}

        <Select className="shape__objectSelect"
          value={this.props.geometryShape}
          onChange={this.onObjectChange}
          label="Shape Geometry"
          options={{
            'box': 'Cube',
            'cone': 'Cone',
            'sphere': 'Sphere',
            'octa': 'Octahedron',
            'tetra': 'Tetrahedron',
            'icosa': 'Icosahedron',
            'dodeca': 'Dodecahedron',
          }}>
        </Select>
      </div>
    );
  }
}

export default connect()(ShapeSettings);
