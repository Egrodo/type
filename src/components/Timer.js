import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../css/Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.distract = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // TODO: Store a reference to the input in the Controller, pass it down to here and distract by focusing it.
    // On click, refresh everything with higher function.
    const { refresh } = this.props;
    refresh();

    // I am 
    this.distract.current.focus();
  }

  render() {
    return (
      <div className="Timer" >
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
        <input ref={this.distract} className="hidden" />
      </div>
    );
  }
}

Timer.propTypes = {
  refresh: PropTypes.func,
};

Timer.defaultProps = {
  refresh: (() => { throw new ReferenceError('refresh not passed in'); }),
};

export default Timer;
