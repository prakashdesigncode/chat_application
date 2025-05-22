import defalutImage from '../Assets/profile.png'

export const users = {
    1: {name:'Prakash',url:defalutImage},
    2: {name:'Karan',url:defalutImage},
    3: {name:'Sunil',url:defalutImage}
  };
  
export const preLoadedMessages = {
    1: {
      2: [
        { message: 'Hi Karan, how are you?', time: new Date(), id:'1' },
        { message: 'I am good, Prakash. How about you?', time: new Date(), id:'2' },
      ],
      3: [
        { message: 'Hello Sunil, are you coming to the meeting?', time: new Date(),id:'1'  },
        { message: 'Yes, I will be there.', time: new Date(),id:'3'  }
      ]
    },
    2: {
      1: [
        { message: 'Hey Prakash, did you finish the report?', time: new Date(), id:'2' },
        { message: 'Not yet, I am working on it.', time: new Date(), id:'1' }
      ],
      3: [
        { message: 'Sunil, can you review my code?', time: new Date(), id:'2'},
        { message: 'Sure, send me the link.', time: new Date(), id:'3' }
      ]
    },
    3: {
      1: [
        { message: 'Prakash, are we still on for lunch?', time: new Date(), id:'3' },
        { message: 'Yes, see you at 1 PM.', time: new Date(), id:'1' }
      ],
      2: [
        { message: 'Karan, the server is down.', time: new Date(),id:'3' },
        { message: 'I will check it right away.', time: new Date(), id:'2' }
      ]
    }
  };
  