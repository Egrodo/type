import React, { Component } from 'react';
import { Container, Input, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../css/Input.css';

class UserInterface extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };

    this.inpRef = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    // We're keeping track of the word in two places:
    //   this UserInterface component so we can have simple controlled inputs
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

  onClick() {
    // When the button is clicked, refresh the view / reset score & focus / clear the input box.
    const { refresh } = this.props;
    refresh();
    this.inpRef.current.focus();
    this.setState({ input: '' });
  }

  render() {
    const { input } = this.state;
    return (
      <Container className="UserInterface">
        <div className="Input">
          <Input
            onChange={this.onChange}
            ref={this.inpRef}
            value={input}
            inverted
            autoFocus
            fluid
          />
        </div>
        <div className="Timer">
          <Button
            onClick={this.onClick}
            animated="vertical"
            color="blue"
            inverted
          >
            <Button.Content visible>
              !Timer
            </Button.Content>
            <Button.Content hidden>
              <Icon name="refresh" />
            </Button.Content>
          </Button>
        </div>
      </Container>
    );
  }
}

UserInterface.propTypes = {
  onType: PropTypes.func,
  refresh: PropTypes.func,
};

UserInterface.defaultProps = {
  onType: (() => { throw new ReferenceError('onChange not passed.'); }),
  refresh: (() => { throw new ReferenceError('refresh not passed in'); }),
};

export default UserInterface;
