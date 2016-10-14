import React from 'react';
import { shallow } from 'enzyme';
import composeStub from '../plugin';

describe('composeStub', () => {
  describe('basic features', () => {
    it('should pass exisiting props to the child component', () => {
      const Comp = ({name}) => (
        <p>{name}</p>
      );
      const Container = composeStub(({ person }) => ({
        name: person.name,
      }))(Comp);

      const fixtures = {
        name: 'John',
      };
      const el = shallow(<Container person={fixtures} />);
      expect(el.html()).to.match(/John/);
    });
  });
});
