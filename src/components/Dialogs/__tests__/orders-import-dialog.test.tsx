import {mount} from 'enzyme';

import React from 'react';
import {act, render} from '@testing-library/react';
import {PreferenceImportDialog} from '../preferences-import-dialog';
import {Provider} from 'react-redux';
import configureStore from '../../../__tests-utils__/redux-mock-store';
import {TextField} from '@mui/material';
import Mock = jest.Mock;


describe('Preferences import Dialog', () => {
    let fileDialog: any = null;
    let component: any = null;
    let _baseElement: any = null;
    let store: any;
    let onClose: Mock = jest.fn();
    beforeEach(async () => {
        onClose = jest.fn();

        const middlewares: any = []
        const mockStore = configureStore(middlewares);
        store = mockStore({});
        fileDialog = (<Provider store={store}><PreferenceImportDialog open={true} key={'1'} onClose={onClose}/> </Provider>);
        component = mount(fileDialog);

        const {baseElement} = render(fileDialog);
        _baseElement = baseElement

    })

    it('component renders', async () => {
        expect(component.children()).toHaveLength(2);
        expect(component).toBeTruthy();
        expect(_baseElement.innerHTML.toString()).toContain('MuiDialog');
    });
    it('renders one text-field', async () => {
        expect(component.find('#import-preferences-dialog-text-field').hostNodes().length).toBeGreaterThan(0);
    });
    it('closes dialog on press cancel', async () => {

        component.find('#preferences-import-cancel-button').hostNodes().first().simulate('click');
        expect(component.find('#preferences-import-cancel-button').hostNodes().length).toBeGreaterThan(0);
        expect(onClose).toHaveBeenCalledWith();


    });
    it('entering value and pressing approve triggers dispatch', async () => {

        act(() => {
            const textField = component.find(TextField);
            const input = component.find('textarea#import-preferences-dialog-text-field');
            input.instance().value = 'preferences as text'
            component.find('#preferences-import-approve-button').hostNodes().first().simulate('click');
            expect(component.find('#preferences-import-approve-button').hostNodes().length).toBeGreaterThan(0);
            expect(onClose).toHaveBeenCalledWith();
             
            expect(store.getActions()).toEqual([{
                    'payload': {'importedPreferences': 'preferences as text'},
                    'type': 'IMPORT_ORDERS_AS_TEXT'
                }]
            );
        })


    })


})



