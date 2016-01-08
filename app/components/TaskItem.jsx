import React from 'react';
import TaskActions from 'actions/TaskActions';

import styles from 'scss/components/_task';

export default class TaskItem extends React.Component {
  //_onIncrement = () => {
  //  TaskActions.increment(this.props.id);
  //};

  //_onDecrement = () => {
  //  TaskActions.decrement(this.props.id);
  //}

  _onDestroyClick = () => {
    TaskActions.destroy(this.props.id);
  };

  render() {
    return (
      <li className={styles['task-item']} key={this.props.id}>
        <span className={styles['task-item__title']}>{this.props.title}</span>
        <p className={styles['task-item__description']}>{this.props.description}</p>
        <button className={styles['task-item__button'] + ' ' + styles['task-item__button--destroy']} onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

TaskItem.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string
};
