import React from 'react';

import appLogo from '../../../src/expenseTracker.jpg';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={appLogo} alt="Expense Tracker" />
    </div>
);

export default logo;