import React from 'react';
import ReactDOM from 'react-dom';
import {LoadComponent} from './components/load-component';

ReactDOM.render(<LoadComponent loader={() => import('./app')} name='App'/>, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
