import React from 'react';
import '../../../setupTests'
import {shallow} from 'enzyme';
import {AddButton, AddButtonProps} from '../../Icons/add-button';
import {translations} from '../../../services/translations';


const clickMock = jest.fn()
const props: AddButtonProps = {
    sx: null,
    addClickHandler: clickMock
}
const addButton = shallow(<AddButton addClickHandler={props.addClickHandler}/>);
describe('Add Button last', () => {


    it('only one button', () => {
        expect(addButton.children()).toHaveLength(1);
    });
    it('only have text  AddPreference', () => {
        // expect(addButton.children()).toHaveLength(1);
        expect(addButton.text().includes(translations.AddPreference)).toBe(true);
    });
    it('click triggers click handler', () => {

        addButton.find('#add-preference-button').simulate('click');
        expect(clickMock).toHaveBeenCalled()
    });

})



