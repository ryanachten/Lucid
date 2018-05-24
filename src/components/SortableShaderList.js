import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle,
  arrayMove } from 'react-sortable-hoc';
import $ from 'jquery';
import { Icon } from 'rmwc/Icon';

import { updateAllShaderOrder, updateActiveShaderOrder } from '../actions/settings';

import ShaderItem from './ShaderItem';

const DragHandle = SortableHandle(
  () => <Icon className="shaderList__itemHandle" strategy="ligature" use="reorder" />
);

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
    <div className="shader__container">
      <div className="shaderList__message">
        <Icon className="shaderList__orderIcon" strategy="ligature" use="videocam" />
        <p>Move shaders up here to place them early in the render process</p>
      </div>
      <ul className="shaderList__container">
        {Object.keys(shaders).map((shader, index) => (
          <SortableItem key={`item-${index}`} index={index} shader={shader} uniforms={shaders[shader]}/>
        ))}
      </ul>
      <div className="shaderList__message">
        <Icon className="shaderList__orderIcon" strategy="ligature" use="visibility" />
        <p>Move shaders down here to place them late in the render process</p>
      </div>
    </div>
  );
});

class SortableShaderList extends Component {
  constructor(props){
    super(props);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    // Assigns reordered keys to new obj
    // and copys over existing uniform vals
    const shadersKeys = Object.keys(this.props.allShaders);
    const newShaderKeys = arrayMove(shadersKeys, oldIndex, newIndex);
    const newShaderOrder = {};
    newShaderKeys.map( (shader) => {
      newShaderOrder[shader] = this.props.allShaders[shader];
    });
    this.props.dispatch(
      updateAllShaderOrder(newShaderOrder)
    );

    // Checks if reorded keys are present in active shaders
    // if so, adds them to new reordered obj to send to store
    const newActiveShaders = {};
    newShaderKeys.map( (shader) => {
      if (this.props.activeShaders.hasOwnProperty(shader)) {
        newActiveShaders[shader] = this.props.activeShaders[shader]
      }
    });
    this.props.dispatch(
      updateActiveShaderOrder(newActiveShaders)
    );
  };

  render() {
    return <SortableList
            shaders={this.props.allShaders}
            onSortEnd={this.onSortEnd}
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
