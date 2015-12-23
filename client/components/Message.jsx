import React from 'react';
import classNames from 'classnames';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.onExpandClick = this.onExpandClick.bind(this);
    this.isExpanded = this.props.message.expanded;
  }
  render() {
    let message = this.props.message;
    return (
      <li className="message-item" >
        <span className={message.class}>
          <span className={classNames("glyphicon", "glyphicon-" + message.icon)} ></span>&nbsp;
          {message.text}
        </span>&nbsp;
        {(message.id) ? <code onClick={this.onExpandClick} className="document-id">{message.id}</code> : null}
        {(message.source) ? <button type="button" className="btn btn-default btn-xs" title="Details..." onClick={this.onExpandClick}><span className="glyphicon glyphicon-option-horizontal"></span></button> : null}
        {(message.id) ? <a href ><span className="edit-document edit glyphicon glyphicon-eye-open" title="Edit document..."></span></a> : null}
        {(message.source) ? <pre>{JSON.stringify(message.source, null, 4)}</pre> : null}
      </li>
    );
  }

  onExpandClick(event) {
    this.isExpanded = !this.isExpanded;
  }
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired
};
