import React from 'react';
import ReactDOM from 'react-dom';
import App from '../hoc/App';
import { Root } from '../hoc/Root';
import { customMatcherRunner } from '../__tests-utils__/cutom-matchers';

jest.mock('react-dom', () => ({ render: jest.fn() }));

customMatcherRunner();

describe('Application root', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        div.id = 'root';
        document.body.appendChild(div);
        require('../index.tsx');
        expect(ReactDOM.render).toHaveBeenCalledWith(<Root>
            <App />
        </Root>, div);
    });
    it('try custom matchers', () => {

        expect(9).toBePowerOf(9, 6);
    })
    it('try custom matchers with message ', () => {
        expect(9).eq(9, '9 is not equal to 8');
    })
});
