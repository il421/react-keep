import Enzyme from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

Enzyme.configure({
  adapter: new Adaptor()
});

DotEnv.config({
  path: '.env.test'
});