export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    text: message.text,
    class: message.class,
    icon: message.icon,
    source: message.source
  };
}
