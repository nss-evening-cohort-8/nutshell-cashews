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

const editMsgEvent = () => {
  $('.message-detail').on('click', '.edit-message', (e) => {
    const messageKey = e.target.dataset.editMessage;
    const updatedInfo = newMsg(true);
    console.log('messageKey:', messageKey);
    console.log('upadtedInfo:', updatedInfo);
    const parentDiv = e.currentTarget.closest('.message-detail');
    const currentMsg = $(parentDiv).find('.msg-value').text();
    $('#msg-input').val(currentMsg);
    // msgFactory.msgEditer(messageKey, updatedInfo)
    //   .then(() => {
    //     getMessages();
    //   });
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
    <p>${msg.displayName ? `<strong>${msg.displayName}:</strong>` : ''} <span class="msg-value">${msg.message}</span></p>
      <p>${convertTime}</p>
      ${msg.userUid === authHelpers.getCurrentUid() ? `<button class="btn btn-danger delete-message" data-delete-message=${msg.id}>X</button>` : ''}
      ${msg.userUid === authHelpers.getCurrentUid() ? `<button class="btn btn-warning edit-message" data-edit-message=${msg.id}>Edit</button>` : ''}
    </div>`;
  });
  // const times
  domString += '</div>';
  $('#chatbox').append(domString);
  deleteMsgEvent();
  editMsgEvent();
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

const newMsg = (editState) => {
  const msgObject = {
    userUid: authHelpers.getCurrentUid(),
    message: $('#msg-input').val(),
    timestamp: Date.now(),
    isEdited: editState,
    displayName: getCurrentUsername(),
  };
  return msgObject;
};

const newMsgEvent = () => {
  $('#submit-message').on('click', () => {
    msgFactory.msgPoster(newMsg(false))
      .then(() => {
        getMessages();
        $('#msg-input').val('');
      });
  });
};

const msgInput = () => {
  const domString = `<div id="chatbox"></div>
  <div id="msg-input-container">
    <input id="msg-input" type="text" placeholder="message..."/>
    <button id="submit-message">Submit</button>
  </div>`;
  $('#messages').append(domString);
};

const printMsgInput = () => {
  msgInput();
  newMsgEvent();
};

const initMsgPage = () => {
  printMsgInput();
  getMessages();
};

export default { initMsgPage };
