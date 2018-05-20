import React, {Component} from 'react';
import {render} from 'react-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import $ from 'jquery';

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({value}) => {
  return (
    <li>
      <DragHandle />
      {value}
      <input type='checkbox' onClick={ (e) => {
        $(e.target).parent().toggleClass('active') }} />
    </li>
  );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  constructor(props){
    super(props);
    const keys = Object.keys(props.items);
    this.state = {
      items: keys,
    };
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true}/>;
  }
}

// export default SortableComponent;
export {SortableItem, SortableList};
