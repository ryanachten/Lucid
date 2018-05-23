import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle,
  arrayMove } from 'react-sortable-hoc';
import $ from 'jquery';
import { Icon } from 'rmwc/Icon';

import { updateShaderOrder } from '../actions/settings';

import ShaderItem from './ShaderItem';

const DragHandle = SortableHandle(() => <Icon strategy="ligature" use="reorder" />);

const SortableItem = SortableElement(({shader, uniforms}) => {
  return (
    <li className="shaderList__item">
      <DragHandle />
      <ShaderItem key={shader}
          shader={shader}
          uniforms={uniforms}
        />
    </li>
  );
});

const SortableList = SortableContainer(({shaders}) => {
  return (
    <div>
      <h2>Shader Settings</h2>
      <ul className="shaderList__container">
        {Object.keys(shaders).map((shader, index) => (
          <SortableItem key={`item-${index}`} index={index} shader={shader} uniforms={shaders[shader]}/>
        ))}
      </ul>
    </div>
  );
});

class SortableShaderList extends Component {
  constructor(props){
    super(props);
    this.state = {
      shaders: this.props.shaders,
    };
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    // Assigns reordered keys to new obj
    // and copys over existing uniform vals
    const shadersKeys = Object.keys(this.state.shaders);
    const newShaderKeys = arrayMove(shadersKeys, oldIndex, newIndex);
    const newShaderOrder = {};
    newShaderKeys.map( (shader) => {
      newShaderOrder[shader] = this.state.shaders[shader];
    });
    this.setState({
      shaders: newShaderOrder,
    });

    // Checks if reorded keys are present in active shaders
    // if so, adds them to new reordered obj to send to store
    const newActiveShaders = {};
    newShaderKeys.map( (shader) => {
      if (this.props.activeShaders.hasOwnProperty(shader)) {
        newActiveShaders[shader] = this.props.activeShaders[shader]
      }
    });
    this.props.dispatch(
      updateShaderOrder(newActiveShaders)
    );
  };

  render() {
    return <SortableList shaders={this.state.shaders} onSortEnd={this.onSortEnd}
            useDragHandle={true}/>;
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
}

export default connect(mapStateToProps)(SortableShaderList);
