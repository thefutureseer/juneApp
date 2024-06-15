import React from 'react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { render as rtlRender } from '@testing-library/react';

configure({ 
  throwSuggestions: true,
  asyncUtilTimeout: 4500,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const render = (ui, { initialState, store = createStore(rootReducer, initialState, applyMiddleware(thunk)), ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };