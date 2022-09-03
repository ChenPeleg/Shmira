import React from 'react';
import '../../../setupTests'
import { shallow } from 'enzyme';
import { AddButton, AddButtonProps } from '../../Icons/add-button';
import { translations } from '../../../services/translations';
import {render, screen} from "@testing-library/react";


const clickMock = jest.fn()
const props: AddButtonProps = {
    sx: null,
    addClickHandler: clickMock
}
const addButton = shallow(<AddButton addClickHandler={props.addClickHandler} />);
describe('Add Button', () => {


    it('only one button last', () => {
        render(<AddButton addClickHandler={props.addClickHandler} />)
        expect(screen.getAllByRole('button') ).toHaveLength(1);
    });
    it('only have text  AddPreference', () => {
        render(<AddButton addClickHandler={props.addClickHandler} />)
        expect(screen .getAllByRole('button')[0].textContent  ).toContain(translations.AddPreference  );
    });
    it('click triggers click handler', () => {

        addButton.find('#add-preference-button').simulate('click');
        expect(clickMock).toHaveBeenCalled()
    });

})



