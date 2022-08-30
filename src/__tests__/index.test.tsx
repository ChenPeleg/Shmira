import React from 'react';
import ReactDOM from 'react-dom';
import App from '../hoc/App';
import { Root } from '../hoc/Root';
import * as SetUp from "../jest.setup";
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
    it('try custom matchers last', () => {
        console.log('expect toBePowerOf:');
        console.log(expect(9).toBePowerOf);
        expect(9).toBePowerOf(9, 6);
    })
});
