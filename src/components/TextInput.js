import React, { Component } from 'react';
import { Container, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../css/Input.css';

class TextInput extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    // We're keeping track of the word in two places:
    //   this TextInput component so we can have simple controlled inputs
    //   and the Controller function so we can run compare and submit.
    e.preventDefault();
    const word = e.target.value;
    const { onType } = this.props;
    const { input } = this.state;

    if (word[word.length - 1] === ' ') {
      onType(input, true);
      this.setState({ input: '' });
    } else {
      this.setState({ input: word });
      onType(word, false);
    }
  }

  render() {
    const { input } = this.state;
    return (
      <Container className="Input">
        <Input
          onChange={this.onChange}
          value={input}
          inverted
          autoFocus
        />
      </Container>
    );
  }
}

TextInput.propTypes = {
  onType: PropTypes.func,
};

TextInput.defaultProps = {
  onType: (() => { throw new ReferenceError('onChange not passed.'); }),
};

export default TextInput;
