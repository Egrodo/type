import React, { Component } from 'react';
import { Container, Input, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import '../css/Input.css';

class UserInterface extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      disabled: false,
      started: false,
    };

    this.inpRef = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.timerEnd = this.timerEnd.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    // If the change was a backspace ignore it.
    const word = e.target.value;
    const { onType } = this.props;
    const { input, started } = this.state;
    // On change check if we've started a test yet. If we haven't, start the timer.
    if (!started) this.setState({ started: true });

    // Handle input and spacebar submits.
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
    this.setState({ input: '', started: false, disabled: false });
  }

  timerEnd() {
    const { finish } = this.props;
    this.setState({ started: false, disabled: true });
    finish();
  }

  render() {
    const { input, started, disabled } = this.state;
    return (
      <Container className="UserInterface">
        <div className="Input">
          <Input
            onChange={this.onChange}
            disabled={disabled}
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
              {started ? <Timer end={this.timerEnd} /> : '1:00'}
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
  finsish: PropTypes.func,
};

UserInterface.defaultProps = {
  onType: (() => { throw new ReferenceError('onChange not passed.'); }),
  refresh: (() => { throw new ReferenceError('refresh not passed in'); }),
  finish: (() => { throw new ReferenceError('finish not passed in'); }),
};

export default UserInterface;
