import $ from 'jquery';
import msgFactory from '../../helpers/data/messageData/msgFactory';

const printMessages = () => {
  let domString = ``
};

const getMessages = () => {
  msgFactory.msgGetter()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { getMessages };
