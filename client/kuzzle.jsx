import Kuzzle from 'kuzzle-sdk';
import randomWords from 'random-words';
import { addMessage } from 'actions/LogActions.jsx';

const COLLECTION_NAME = 'paint';
const KUZZLE_URL = 'http://192.168.99.100:7512/';

let kuzzle = new Kuzzle(KUZZLE_URL);
window.kuzzle = kuzzle;

export default function doKuzzle(store) {
  kuzzle.dataCollectionFactory(COLLECTION_NAME).subscribe({}, (error, result) => (
    store.dispatch(
      addMessage(createMessage(result))
    )
  ));
}

function createMessage(notification) {
  var messageItem = {
    id:  notification._id,
    text: '',
    icon: 'file',
    class: '',
    source:  notification._source,
    expanded: false,
    canEdit: true
  };

  switch (notification.action) {
    case 'publish':
      messageItem.text = 'Received volatile message';
      messageItem.icon = 'send';
      messageItem.class = 'message-volatile';
      messageItem.canEdit = false;
    break;
    case 'create':
    case 'createOrUpdate':
      messageItem.icon = 'file';

      if (notification.state == 'done') {
        messageItem.text = 'Created new document';
        messageItem.class = 'message-created-updated-doc';
      } else if (notification.state == 'pending') {
        messageItem.text = 'Creating new document';
        messageItem.class = 'message-pending';
      }
    break;

    case 'update':
      messageItem.text = 'Updated document';
      messageItem.icon = 'file';
      messageItem.class = 'message-created-updated-doc';
    break;

    case 'delete':
      messageItem.icon = 'remove';
      messageItem.canEdit = false;
      if (notification.state == 'done') {
        messageItem.text = 'Deleted document';
        messageItem.class = 'message-deleted-doc';
      } else if (notification.state == 'pending') {
        messageItem.text = 'Deleting document';
        messageItem.class = 'message-pending';
      }
    break;

    case 'on':
      messageItem.text = 'A new user is listening to this room';
      messageItem.icon = 'user';
      messageItem.class = 'message-user';
      messageItem.canEdit = false;
      messageItem.source = notification.metadata;
    break;

    case 'off':
      messageItem.text = 'A user exited this room';
      messageItem.icon = 'user';
      messageItem.class = 'message-user';
      messageItem.source = notification.metadata;
      messageItem.canEdit = false;
    break;

    default:
      throw "Unknown notification";
  }

  return messageItem;
}
