import React from 'react';
import '../scss/_style.scss';
import '../scss/_utilities.scss';

const Transactions = ({entryArray, onDelete}) =>
{
    // fetch transactions array from ExpenseFlow.jsx
    const transactions = entryArray;

    if (transactions.length === 0)
    {
        return (
            <section id="transactions-section">
                <h3>Transactions</h3>
                <div id="transactions-container">
                    <p>No matching transactions found.</p>
                </div>
            </section>
        );
    }

    const mediaLg = React.useMemo(() => window.matchMedia("(min-width: 992px)"), []);
    const [isLarge, setIsLarge] = React.useState(mediaLg.matches);

    React.useEffect(() =>
    {
        // auto re-render on viewport resize
        const handler = (e) => setIsLarge(e.matches);
        mediaLg.addEventListener('change', handler);
        return () => mediaLg.removeEventListener('change', handler);
    }, [mediaLg]);

    const integer = (prop) => // add '+' or '-' next to figures
    {
        if (prop === 'Income') return '+';
        else return '-';
    }
    const formatInt = (prop) => // colour code figures
    {
        if (prop === 'Income') return '#007814';
        else return '#de0000';
    }
    const Table = () =>
    {
        if (isLarge)
        {
            return (
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>     
            );
        }
    }
    const Render = ({type}) =>
    {
        if (type === undefined) // render default
        {
            return transactions.map((tr) =>
            {
                if (isLarge) // render as table (if viewport is lg)
                {
                    return (
                        <tbody>
                            <tr>
                                <td>{tr.date}</td>
                                <td>{tr.category}</td>
                                <td>{tr.name}</td>
                                <td>{tr.amount}</td>
                                <td>
                                    <button className="action-btn" id={`del-${tr.id}`} onClick={() => onDelete(tr.id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                }
                else // render as flexbox (if viewport is xs/sm/md)
                {
                    return (
                        <section key={tr.id} className="tr-map-container">
                            <div className="entries">
                                <div className="grid-item">Date:</div>
                                <div className="grid-item">{tr.date}</div>
                                <div className="grid-item">Category:</div>
                                <div className="grid-item">{tr.category}</div>
                                <div className="grid-item">Name:</div>
                                <div className="grid-item">{tr.name}</div>
                                <div className="grid-item">Amount:</div>
                                <div className="grid-item">
                                    <span style={{color: `${formatInt(tr.category)}`}}>{integer(tr.category)}£{tr.amount.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="entries-btn-container">
                                <button className="action-btn" id={`del-${tr.id}`} onClick={() => onDelete(tr.id)}>Delete</button>
                            </div>
                        </section>
                    );
                }
            });
        }
        else if (type === "filter") // render filtered results
        {
            console.log("Message received");
        }
        else {return null;}
    }

    // take component <Render> out of parent element table (if viewport < large)
    const shiftElement = (location) =>
    {
        switch (location)
        {
            case 'table':
                if (isLarge) return (<Render/>);
                break;
            case 'div':
                if (!isLarge) return (<Render/>);
                break;
            default: return null; break;
        }
    }
    const loadTable = () =>
    {
        if (isLarge)
        {
            const x = transactions.map((tr) =>
            {
                return (
                    <tr key={tr.id}>
                        <td>{tr.date}</td>
                        <td>{tr.category}</td>
                        <td>{tr.name}</td>
                        <td><span style={{color: `${formatInt(tr.category)}`}}>{integer(tr.category)}£{tr.amount.toFixed(2)}</span></td>
                        <td><button className="action-btn" id={`del-${tr.id}`} onClick={() => onDelete(tr.id)}>Delete</button></td>
                    </tr>
                );
            });

            return x;
        }
    }
    
    return (
        <section id="transactions-section">
            <h3>Transactions</h3>
            <div id="transactions-container">
                <table id="transactions-tb">
                    <Table/>
                    <tbody>{loadTable()}</tbody>
                </table>
                {shiftElement('div')}
            </div>
        </section>
    );
}

export default Transactions;