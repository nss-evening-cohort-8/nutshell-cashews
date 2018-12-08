import $ from 'jquery';
import msgFactory from '../../Helpers/data/messageData/msgFactory';
import articlesData from '../../Helpers/data/articlesData';
import eventsData from '../Events/eventsData';
import authHelpers from '../../Helpers/authHelpers';


const arraySorter = (data) => {
  let newArr = [];
  $.each(data, (key, value) => {
    newArr.push(value.timestamp);
  });
  newArr = newArr.sort((a, b) => b - a);
  return newArr;
};

const firstMessage = () => new Promise((resolve, reject) => {
  msgFactory.msgGetter()
    .then((data) => {
      let newestMsg = '';
      const reverseMsg = arraySorter(data);
      $.each(data, (key, value) => {
        if (value.timestamp === reverseMsg[0]) {
          newestMsg = value;
        }
      });
      resolve(newestMsg);
    })
    .catch((error) => {
      reject(error);
    });
});

const singleArticle = () => new Promise((resolve, reject) => {
  articlesData.getAllArticles()
    .then((articledata) => {
      resolve(articledata);
    })
    .catch((error) => {
      reject(error);
    });
});

const singleEvent = () => new Promise((resolve, reject) => {
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then(data => resolve(data[0]))
    .catch((error) => {
      reject(error);
    });
});

export default { firstMessage, singleArticle, singleEvent };
