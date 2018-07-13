import React from 'react';
import ReactDOM from 'react-dom';
import Controller from './Controller';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';

ReactDOM.render(<Controller />, document.getElementById('root'));
registerServiceWorker();
