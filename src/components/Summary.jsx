import React from 'react';
import '../scss/_style.scss';
import '../scss/_utilities.scss';

const Summary = ({balance, income, expenses, category}) =>
{
    return (
        <section id="summary-section">
            <h3>Summary</h3>
            <div id="summary-container">
                <div>
                    <h4>Balance</h4>
                    <h4>£ {balance}</h4>
                </div>
                <div>
                    <h4>Total Income</h4>
                    <h4>£ {income}</h4>
                </div>
                <div>
                    <h4>Total Expenses</h4>
                    <h4>£ {expenses}</h4>
                </div>
                <div>
                    <h4>Top Category</h4>
                    <h4>{category[1]}</h4>
                    <h4>£ {category[2]}</h4>
                </div>
            </div>
        </section>
    );
}

export default Summary;