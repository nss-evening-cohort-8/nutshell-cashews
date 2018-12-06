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

const editMsgEvent = (key, isEdited) => {
  const keyProp = key;
  const editBool = isEdited;
  $('#submit-message').on('click', () => {
    const updatedMsg = $('#msg-input').val();
    $('#msg-input').val('').blur();
    msgFactory.msgEditer(keyProp, editBool)
      .then(() => {
        msgFactory.msgEditedMessage(keyProp, updatedMsg)
          .then(() => {
            getMessages();
            newMsgEvent();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const msgEditButton = () => {
  $('.message-detail').on('click', '.edit-message', (e) => {
    const messageKey = e.target.dataset.editMessage;
    const updatedInfo = true;
    const parentDiv = e.currentTarget.closest('.message-detail');
    const currentMsg = $(parentDiv).find('.msg-value').text();
    $('#msg-input').val(currentMsg);
    $('#submit-message').off();
    editMsgEvent(messageKey, updatedInfo);
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
    const convertTime = new Date(msg.timestamp).toLocaleTimeString();
    domString += `
    <div class="message-detail">
      <div>
        <p>${msg.displayName ? `<strong class="${msg.userUid === authHelpers.getCurrentUid() ? 'is-user' : 'other-user'}">${msg.displayName}:</strong>` : ''} ${msg.isEdited ? '(edited)' : ''} <span class="msg-value">${msg.message}</span></p>
        <p>${convertTime}</p>
      </div>
      <div class="msg-button-container">
        ${msg.userUid === authHelpers.getCurrentUid() ? `<button class="btn btn-warning edit-message" 1data-edit-message=${msg.id}>Edit</button>` : ''}
        ${msg.userUid === authHelpers.getCurrentUid() ? `<button class="btn btn-danger delete-message" data-delete-message=${msg.id}>X</button>` : ''}
      </div>
    </div>`;
  });
  domString += '</div>';
  $('#chatbox').append(domString);
  deleteMsgEvent();
  msgEditButton();
  const scrollLength = $('#chat-container').prop('scrollHeight');
  $('#chat-container').scrollTop(scrollLength);
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

const newMsgEvent = () => {
  $('#submit-message').off();
  $('#submit-message').on('click', () => {
    msgFactory.msgPoster(newMsg())
      .then(() => {
        getMessages();
        $('#msg-input').val('');
      });
  });
};

const msgInput = () => {
  const domString = `<input id="msg-input" type="text" placeholder="message..."/>
    <button id="submit-message">Submit</button>`;
  $('#msg-input-container').append(domString);
};

const buildMsgBase = () => {
  const domString = `<div id="chat-container"><div id="chatbox"></div></div>
    <div id="msg-input-container">
    </div>
  </div>`;
  $('#messages').html(domString);
};

const printMsgInput = () => {
  msgInput();
  newMsgEvent();
};

const initMsgPage = () => {
  buildMsgBase();
  printMsgInput();
  getMessages();
};

export default { initMsgPage };
