import React from 'react';
import { connect } from 'react-redux';
import { IconToggle } from 'rmwc/IconToggle';
import '@material/icon-toggle/dist/mdc.icon-toggle.min.css';
import { Select } from 'rmwc/Select';
import '@material/select/dist/mdc.select.min.css';

import { setZoomOut, setGeometryShape} from '../actions/settings';

class ShapeSettings extends React.Component{
  constructor(props){
    super(props);

    this.onZoomOutToggle = this.onZoomOutToggle.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
  }

  onZoomOutToggle(e){
    const zoomOut = e.detail.isOn;
    this.props.dispatch(
      setZoomOut(zoomOut)
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
        <h2>Shape Settings</h2>
        <IconToggle className="shape__zoomOut"
          on={{label: 'Exit overview', content: 'zoom_in'}}
          off={{label: 'Enter overview', content: 'zoom_out'}}
          onChange={this.onZoomOutToggle} />
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
