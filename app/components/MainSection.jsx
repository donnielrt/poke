import React from 'react';
import Immutable from 'immutable';
import TopicItem from 'components/TopicItem';

import styles from 'scss/components/_vote';

export default class MainSection extends React.Component {
    render() {
        var source = this.props.topics;
        const topics = source.toKeyedSeq().map((topic, key) => {
            return (<TopicItem id={key} key={key} text={topic.get('text')}/>);
        }).toArray();
        return (
            <div className={styles['main-section']}>
                <h3 className={styles['main-section__header']}>Vote for your favorite hack day idea</h3>
                <ul className={styles['main-section__list']}>{topics}</ul>
            </div>
        );
    }
}

MainSection.propTypes = {topics: React.PropTypes.instanceOf(Immutable.OrderedMap)};
