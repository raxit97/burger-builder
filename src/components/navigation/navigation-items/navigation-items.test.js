import React from 'react';
import { configure, shallow } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import NavigationItems from "./navigation-items";
import NavigationItem from './navigation-item/navigation-item';

configure({ adapter: new Adaptor() });

describe('NavigationItems component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('Should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('Should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('Should render Log Out <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
    });
});