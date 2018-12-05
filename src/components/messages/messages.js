import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import authHelpers from '../../Helpers/authHelpers';
import msgFactory from '../../Helpers/data/messageData/msgFactory';
import './messages.scss';

const getCurrentUsername = () => firebase.auth().currentUser.displayName;

const arraySorter = (data) => {
  let newArr = [];
  $.each(data, (key, value) => {
    newArr.push(value.timestamp);
  });
  newArr = newArr.sort((a, b) => a - b);
  return newArr;
};

const deleteMsgEvent = () => {
  $('.delete-message').on('click', (e) => {
    const messageKey = e.target.dataset.deleteMessage;
    msgFactory.msgDeleter(messageKey)
      .then(() => {
        getMessages();
      });
  });
};

const printMessages = (returnedData) => {
  const msgObj = returnedData;
  const msgArr = [];
  const orderedTime = arraySorter(msgObj);
  orderedTime.forEach((time) => {
    $.each(msgObj, (key, value) => {
      if (value.timestamp === time) {
        msgArr.push(value);
      }
    });
  });
  let domString = '<div>';
  msgArr.forEach((msg) => {
    const convertTime = new Date(msg.timestamp);
    domString += `<div class="message-detail">
    <p>${msg.displayName ? `<strong>${msg.displayName}:</strong>` : ''} ${msg.message}</p>
      <p>${convertTime}</p>
      ${msg.userUid === authHelpers.getCurrentUid() ? `<button class="btn btn-danger delete-message" data-delete-message=${msg.id}>X</button>` : ''}
      ${msg.userUid === authHelpers.getCurrentUid() ? `<button class="btn btn-warning edit-message" data-edit-message=${msg.id}>Edit</button>` : ''}
    </div>`;
  });
  // const times
  domString += '</div>';
  $('#chatbox').append(domString);
  deleteMsgEvent();
};

const getMessages = () => {
  msgFactory.msgGetter()
    .then((data) => {
      $('#chatbox').html('');
      return data;
    })
    .then((data) => {
      printMessages(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const newMsg = () => {
  const msgObject = {
    userUid: authHelpers.getCurrentUid(),
    message: $('#msg-input').val(),
    timestamp: Date.now(),
    isEdited: false,
    displayName: getCurrentUsername(),
  };
  return msgObject;
};

const msgInput = () => {
  const domString = `<div id="chatbox"></div>
  <div>
    <input id="msg-input" type="text" placeholder="message..."/>
    <button id="submit-message">Submit</button>
  </div>`;
  $('#messages').append(domString);
  $('#submit-message').on('click', () => {
    msgFactory.msgPoster(newMsg())
      .then(() => {
        getMessages();
        $('#msg-input').val('');
      });
  });
};

const initMsgPage = () => {
  msgInput();
  getMessages();
};

export default { initMsgPage };
