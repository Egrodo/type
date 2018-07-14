import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 5,
    };

    this.timer = 0;
    this.perSec = this.perSec.bind(this);
  }

  componentDidMount() {
    // On mount of this component, start the timer.
    if (this.timer === 0) this.timer = setInterval(this.perSec, 1000);
  }

  perSec() {
    const { time } = this.state;
    const { end } = this.props;
    if (time > 0) {
      this.setState({ time: time - 1 });
    } else {
      // If the timer is over, clear it and call the cb.
      clearInterval(this.timer);
      end();
    }
  }

  render() {
    const { time } = this.state;
    return (
      <Fragment>
        {time}
      </Fragment>
    );
  }
}

Timer.propTypes = {
  end: PropTypes.func,
};

Timer.defaultProps = {
  end: (() => { throw new ReferenceError('end not passed'); }),
};

export default Timer;
