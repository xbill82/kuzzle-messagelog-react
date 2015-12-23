import React from 'react';
import Message from './Message.jsx';

export default class MessageLog extends React.Component {
  render() {
    // console.log(this.props.messages);
    return (
      <div style={
          {height: '100%',
          overflowY: 'auto'}
        } className="message-log">
        <ul className="message-list">
          {this.props.messages.map( message =>
            (<Message message={message} key={message.id} />)
          )}
        </ul>
      </div>
    )
  }
}

MessageLog.propTypes = {
  messages: React.PropTypes.array.isRequired
};
