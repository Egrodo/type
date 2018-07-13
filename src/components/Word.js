import React from 'react';
import PropTypes from 'prop-types';
import '../css/Word.css';

const Word = (props) => {
  const { active, word } = props;
  console.log(`rendering ${word}`);
  let status;
  if (active === 0) {
    status = 'active';
  } else if (active === 1) {
    status = 'active correct';
  } else if (active === 2) {
    status = 'active incorrect';
  }
  return (
    <span className={`Word ${status}`}>
      {word}
    </span>
  );
};

Word.propTypes = {
  word: PropTypes.string,
  active: PropTypes.bool,
};

Word.defaultProps = {
  word: '',
  active: 3,
};

export default Word;
