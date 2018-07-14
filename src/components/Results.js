import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Results extends Component {
  render() {
    const { correct, incorrect, finalScore } = this.props.data;
    return (
      <div>
        WPM: {finalScore}
        Characters: {correct + incorrect}
      </div>
    );
  }
}

Results.propTypes = {
  data: PropTypes.objectOf(PropTypes.number),
};

Results.defaultProps = {
  data: { correct: null, incorrect: null, finalScore: null },
};

export default Results;
