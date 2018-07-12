import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Word.css';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
    };

  }

  render() {
    return (
      <span className="Word">
        {this.props.word}
      </span>
    );
  }
}

Word.propTypes = {
  word: PropTypes.string,
};

Word.defaultProps = {
  word: '',
};

export default Word;
