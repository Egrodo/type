/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import '../css/Results.css';

const Results = (props) => {
  const {
    correctWords,
    incorrectWords,
    correctChars,
    incorrectChars,
  } = props.data;

  const finalScore = Math.round(correctChars / 5);
  const accuracy = ((correctWords / (correctWords + incorrectWords) * 100)).toFixed(2);
  // TODO: Calculate percentile from mean.
  return (
    <section className="Results">
      <h1 className="headliner">
        {finalScore}
        <span title="Words Per Minute (1 word = 5 characters)">
          WPM
          </span>
      </h1>
      <h4>Top X%</h4>
      <h4>{accuracy}% Accuracy</h4>
      <h4 className="subInfo">
        (<span>{correctWords}</span>
        +
          <span>{incorrectWords}</span>)
        </h4>
      <h1 className="headliner">
        {correctChars + incorrectChars}
        <span title="Characters Per Minute">
          CPM
          </span>
      </h1>
      <h4 className="subInfo">
        (<span>{correctChars}</span>
        +
          <span>{incorrectChars}</span>)
        </h4>
    </section>
  );
};

Results.propTypes = {
  data: PropTypes.objectOf(PropTypes.number),
};

Results.defaultProps = {
  data: null,
};

export default Results;
