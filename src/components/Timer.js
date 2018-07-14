import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../css/Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // On click, refresh everything with higher function.
    this.props.refresh();
  }

  render() {
    return (
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
