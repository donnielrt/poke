import React from 'react';

import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';

import styles from 'scss/components/_task';

export default class Task extends React.Component {

    render() {
        return (
            <div className={styles.task}>
                <EntryBox task={this.props.TaskStore.newTask}/>
                <MainSection topics={this.props.TaskStore.tasks}/>
                <Scoreboard tasks={this.props.TaskStore.tasks}/>
            </div>
        );
    }
}

Task.propTypes = {
    TaskStore: React.PropTypes.object
};
