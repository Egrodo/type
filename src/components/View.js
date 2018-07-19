import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Word from './Word';
import '../css/View.css';

class View extends Component {
  // Handle cursor and active here?
  constructor(props) {
    super(props);

    this.state = {
      cursor: 0,
      active: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { cursor, active } = nextProps;
    this.setState({ cursor, active });
    // Highlight cursor and if correct / incorrect display such.
  }

  render() {
    // TODO: Describe ternary to sort active word.
    const { wordList } = this.props;
    const { cursor, active } = this.state;
    return (
      <section className="View">
        <section className="row">
          {wordList[0].map(((word, i) => (cursor <= i ? (
            cursor === i ? (<Word word={word} key={`${i}_${word}`} active={active} />) : (
              <Word word={word} key={`${i}_${word}`} active={3} />
            )
          ) : <Word word={word} key={`${i}_${word}`} />)
          ))}
        </section>
        <section className="row">
          {wordList[1].map(((word, i) => <Word word={word} key={`${i + 12}_${word}`} />))}
        </section>
      </section>
    );
  }
}

View.propTypes = {
  wordList: PropTypes.arrayOf(PropTypes.array),
  cursor: PropTypes.number,
  active: PropTypes.number,
};

View.defaultProps = {
  wordList: [['ERROR'], ['WORDLIST NOT PASSED TO VIEW COMPONENT']],
  cursor: 0,
  active: 0,
};

export default View;
