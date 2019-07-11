const user = {
  name: 'Ilya',
  surname: 'Suglobov',
  email: 'app.ilya.testing@gmail.com',
  password: '>!E4E2Mo'
};

const note = {
  title: 'Important Note',
  text: 'I need to buy a new laptop as soon as possible. ' +
    'I think it should be a Mac Book. As it is really fast and productive system.',
  color: 'background-color: rgb(180, 72, 174);'
};

const updatedNote = {
  title: 'Not Important Note',
  text: 'Nothing interesting',
  color: 'background-color: rgb(242, 139, 130);'
};

const tags = ['Important', 'Not important', 'For me Only'];

const colors = [
  {
    color: 'fff',
    style: 'background-color: rgb(255, 255, 255);',
  },
  {
    color: 'f28b82',
    style: 'background-color: rgb(242, 139, 130);',
  },
  {
    color: 'cbf0f8',
    style: 'background-color: rgb(203, 240, 248);',
  },
  {
    color: 'fff475',
    style: 'background-color: rgb(255, 244, 117);',
  },
  {
    color: 'ccff90',
    style: 'background-color: rgb(204, 255, 144);',
  },
  {
    color: 'e6c9a8',
    style: 'background-color: rgb(230, 201, 168);',
  },
  {
    color: 'e8eaed',
    style: 'background-color: rgb(232, 234, 237);',
  },
  {
    color: 'fbbc04',
    style: 'background-color: rgb(251, 188, 4);',
  },
  {
    color: '0076b4',
    style: 'background-color: rgb(0, 118, 180);',
  },
  {
    color: '0076b4',
    style: 'background-color: rgb(180, 72, 174);',
  }
];

export { tags, note, updatedNote, colors, user };
