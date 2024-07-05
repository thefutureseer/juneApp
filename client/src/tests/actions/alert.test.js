import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as alertActions from '../../actions/alert';
import { SET_ALERT, REMOVE_ALERT } from '../../actions/types';

// Create a mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Jest mock function to replace the uuid function
jest.mock('uuid', () => ({
  v4: jest.fn(() => '12345')
}));

describe('Alert Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch SET_ALERT and REMOVE_ALERT actions', async () => {
    const expectedActions = [
      {
        type: SET_ALERT,
        payload: {
          msg: 'Test message',
          alertType: 'success',
          id: '12345'
        }
      },
      {
        type: REMOVE_ALERT,
        payload: '12345'
      }
    ];

    // Dispatch the action
    await store.dispatch(alertActions.setAlert('Test message', 'success', 1000));

    // Check that the expected actions were dispatched
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
    
    // Wait for the timeout and check for REMOVE_ALERT
    setTimeout(() => {
      const actionsAfterTimeout = store.getActions();
      expect(actionsAfterTimeout[1]).toEqual(expectedActions[1]);
    }, 1000);
  });
});