import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './hoc/App';
import reportWebVitals from './reportWebVitals';
import {Root} from './hoc/Root';


ReactDOM.render(
    <Root>
        <App/>
    </Root>,
    document.getElementById('root')
);

// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
// root.render(
//     <React.StrictMode>
//         <Root>
//             <App />
//         </Root>,
//
//     </React.StrictMode>
// );

reportWebVitals();
