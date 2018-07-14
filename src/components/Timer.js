import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import '../css/Timer.css';

class Timer extends Component {
  render() {
    return (
      <div className="Timer">
        <Button animated inverted>
          <Button.Content visible>
            Timer
          </Button.Content>
          <Button.Content hidden>
            <Icon name="refresh" />
          </Button.Content>
        </Button>
      </div>
    );
  }
}

export default Timer;