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
      <p><strong>${getCurrentUsername()}:</strong> ${msg.message}</p>
      <p>${convertTime}</p>
    </div>`;
  });
  // const times
  domString += '</div>';
  $('#chatbox').append(domString);
};

const getMessages = () => {
  msgFactory.msgGetter()
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
    msgFactory.msgPoster(newMsg());
    $('#chatbox').html('');
    getMessages();
  });
};

const initMsgPage = () => {
  msgInput();
  getMessages();
};

export default { initMsgPage };
