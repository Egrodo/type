import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Word from './Word';
import '../css/View.css';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: 0,
      active: 0,
    };

  }

  componentWillReceiveProps(nextProps) {
    const { cursor, active } = nextProps;
    this.setState({ cursor, active });
    // Highlight cursor and if correct / incorrect display such.
  }

  render() {
    // TODO: Describe ternary to sort active word.
    const { wordList, loadMore } = this.props;
    const { cursor, active } = this.state;
    return (
      <Container className="View" onClick={loadMore}>
        <section className="row">
          {wordList[0].map(((word, i) => (cursor >= i ? (
            cursor === i ? (<Word word={word} key={`${i}_${word}`} active={active} />) : (
              <Word word={word} key={`${i}_${word}`} />
            )
          ) : <Word word={word} index={i} key={`${i}_${word}`} />)
          ))}
        </section>
        <section className="row">
          {wordList[1].map(((word, i) => <Word word={word} key={`${i + 12}_${word}`} />))}
        </section>
      </Container>
    );
  }
}


// TODO: Loadmore is temporarily here.
View.propTypes = {
  wordList: PropTypes.arrayOf(PropTypes.array),
  loadMore: PropTypes.func,
  cursor: PropTypes.number,
  active: PropTypes.number,
};

View.defaultProps = {
  wordList: [['ERROR'], ['WORDLIST NOT PASSED TO VIEW COMPONENT']],
  loadMore: (() => { throw new ReferenceError('loadMore not passed.'); }),
  cursor: 0,
  active: 0,
};

export default View;
