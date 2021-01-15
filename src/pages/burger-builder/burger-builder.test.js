import React from 'react';
import { configure, shallow } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import { BurgerBuilder } from './burger-builder';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Spinner from '../../components/common/spinner/spinner';

configure({ adapter: new Adaptor() });

describe('BurgerBuilder page component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
    })
    it('Should render <BuildControls /> component when receiving ingredients', () => {
        wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    it('Should render <Spinner /> component when ingredients are not set', () => {
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});