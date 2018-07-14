import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Word.css';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: props.word,
      status: '',
    };
  }

  componentDidMount() {
    const { active } = this.props;
    if (active === 0) {
      this.setState({ status: 'active' });
    } else if (active === 1) {
      this.setState({ status: 'active correct' });
    } else if (active === 2) {
      this.setState({ status: 'active incorrect' });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;
    if (active === 0) {
      this.setState({ status: 'active' });
    } else if (active === 1) {
      this.setState({ status: 'active correct' });
    } else if (active === 2) {
      this.setState({ status: 'active incorrect' });
    }
  }

  render() {
    const { status, word } = this.state;
    return (
      <span className={`Word ${status}`}>
        {word}
      </span>
    );
  }
}

Word.propTypes = {
  word: PropTypes.string,
  active: PropTypes.number,
};

Word.defaultProps = {
  word: '',
  active: 3,
};

export default Word;
