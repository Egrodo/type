/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import '../css/Results.css';

const Results = (props) => {
  // TODO: Color the WPM depending on the score.
  const {
    correctWords,
    incorrectWords,
    correctChars,
    incorrectChars,
  } = props.data;

  const finalScore = Math.round(correctChars / 5);
  return (
    <section className="Results">
      <h1 className="headliner">
        {finalScore}
        <span title="Words Per Minute">
          WPM
        </span>
      </h1>
      <h4>Top 0.45%</h4>
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
/*
      correctWords,
      incorrectWords,
      correctChars,
      incorrectChars,
*/
