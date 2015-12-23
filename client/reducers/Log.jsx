import { ADD_MESSAGE } from '../actions/LogActions.jsx';

const MAX_MESSAGES = 500;

export function messages(state = [], action) {
  if (action.type == ADD_MESSAGE) {
    let newState = [
      {
        id: state.reduce((maxId, message) => Math.max(message.id, maxId), -1) + 1,
        text: action.text,
        class: action.class,
        icon: action.icon,
        source: action.source
      },
      ...state
    ];

    if (newState.length > MAX_MESSAGES) newState.pop();

    return newState;
  }

  return state
}
