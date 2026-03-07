import React from 'react';
import Layout from './components/Layout.jsx';
import Summary from './components/Summary.jsx';
import Forms from './components/Forms.jsx';
import Transactions from './components/Transactions.jsx';
import './scss/_style.scss';

const ExpenseFlow = () =>
{
    const [valid, setValid] = React.useState(true); // error handle incomplete form
    const [transactions, setTransactions] = React.useState // default transactions
    ([
        {id: 1, date: "10/02/2025", category: "Entertainment", name: "Cinema", amount: 50.00},
        {id: 2, date: "23/03/2025", category: "Groceries", name: "Food", amount: 20.50},
        {id: 3, date: "08/12/2024", category: "Bills", name: "Electricity Bill", amount: 120.20},
        {id: 4, date: "16/10/2024", category: "Income", name: "Salary", amount: 3200},
        {id: 5, date: "08/01/2026", category: "Travel", name: "Train Ticket", amount: 15.25},
        {id: 6, date: "14/02/2026", category: "Entertainment", name: "Netflix Subscription", amount: 10.99},
        {id: 7, date: "21/02/2026", category: "Groceries", name: "Supermarket Shop", amount: 34.75},
        {id: 8, date: "03/01/2026", category: "Bills", name: "Water Bill", amount: 45.60},
        {id: 9, date: "28/12/2025", category: "Travel", name: "Bus Pass", amount: 18.00},
        {id: 10, date: "05/11/2025", category: "Entertainment", name: "Concert Ticket", amount: 85.00},
        {id: 11, date: "12/10/2025", category: "Groceries", name: "Weekly Food Shop", amount: 42.30},
        {id: 12, date: "01/10/2025", category: "Bills", name: "Internet Bill", amount: 29.99},
        {id: 13, date: "25/09/2025", category: "Travel", name: "Uber Ride", amount: 12.80},
        {id: 14, date: "15/09/2025", category: "Income", name: "Freelance Payment", amount: 450.00},
        {id: 15, date: "30/08/2025", category: "Entertainment", name: "Video Game Purchase", amount: 59.99},
        {id: 16, date: "18/08/2025", category: "Groceries", name: "Local Market", amount: 23.45},
        {id: 17, date: "07/08/2025", category: "Bills", name: "Gas Bill", amount: 67.10},
        {id: 18, date: "22/07/2025", category: "Travel", name: "Flight Ticket", amount: 220.50},
        {id: 19, date: "10/07/2025", category: "Entertainment", name: "Bowling Night", amount: 27.00},
        {id: 20, date: "01/07/2025", category: "Income", name: "Investment Returns", amount: 800.00},
    ]);
    const [search, setSearch] = React.useState
    ({
        date: '',
        category: '',
        name: '',
        amount: '',
    });
    const formatDate = (dateString) =>
    {
        if (!dateString) return '';

        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }
    const formatCategory = (category) =>
    {
        if (!category) return '';
        return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    }

    // retrieve input values from the Form component
    const fetch = (formData) =>
    {
        if ((formData.amount === 0 || formData.amount === "") || formData.date === "" || formData.category === "" || formData.name === "")
        {
            setValid(false);
        }
        else
        {
            setValid(true);
            const formattedData =
            {
                ...formData,
                date: formatDate(formData.date),
                category: formatCategory(formData.category),
            };
            setTransactions(prev => 
            {
                const nextId = (prev.at(-1)?.id ?? 0) + 1;
                return [...prev, {id: nextId, ...formattedData}];
            });
        }
    }
    const fetchSearch = (searchFormData) =>
    {
        setSearch(
        {
            date: searchFormData.date ? formatDate(searchFormData.date) : "",
            category: searchFormData.category ? formatCategory(searchFormData.category) : "",
            name: searchFormData.name.trim(),
            amount: searchFormData.amount,
        });
    }
    const delTransaction = (id) => {setTransactions(prev => prev.filter(tr => tr.id !== id));}
    const getStatistic = (type) =>
    {
        switch (type)
        {
            case 'income':
            {
                const x = transactions.reduce((acc, bal) => 
                {
                    if (bal.category === 'Income') return (acc + bal.amount);
                    else return acc;
                }, 0);

                return x.toFixed(2);
                break;
            }
            case 'expenses':
            {
                const y = transactions.reduce((acc, bal) =>
                {
                    if (bal.category !== 'Income') return (acc + bal.amount);
                    else return acc;
                }, 0);

                return y.toFixed(2);
                break;
            }
            case 'balance':
            {
                const z = (getStatistic('income') - getStatistic('expenses'));
                return z.toFixed(2);
                break;
            }
            default: return null; break;
        }
    }
    const getExpenses = (category) =>
    {
        const stats = transactions.reduce((acc, bal) =>
        {
            if (bal.category.toLowerCase() === category) return (acc + bal.amount);
            else return acc;
        }, 0);

        return Number(stats.toFixed(2));
    }
    const getTopExpense = (value) =>
    {
        const categories =
        [
            {name: "Entertainment", amount: getExpenses("entertainment")},
            {name: "Groceries", amount: getExpenses("groceries")},
            {name: "Bills", amount: getExpenses("bills")},
            {name: "Travel", amount: getExpenses("travel")},
        ];
        const top = categories.reduce((max, current) =>
        {
            if (max.amount < current.amount) return current;
            else return max;
        }, categories[0]);

        if (value === 'category') return `${top.name}`;
        if (value === 'stats') return `${top.amount.toFixed(2)}`;
        else return `${top.name}: ${top.amount.toFixed(2)}`;
    }
    const filter = transactions.filter((tr) => 
    {
        const matchDate = search.date === "" || tr.date === search.date;
        const matchCategory = search.category === "" || tr.category === search.category;
        const matchName = search.name === "" || tr.name.toLowerCase().includes(search.name.toLowerCase());
        const matchAmount = search.amount === "" || Number(tr.amount) === Number(search.amount);

        return matchDate && matchCategory && matchName && matchAmount;
    });

    // data sets (to parse to other components)
    const dataSet =
    {
        summary:
        {
            statistics: [getStatistic('income'), getStatistic('expenses'), getStatistic('balance')],
            expense: [getExpenses('entertainment'), getExpenses('groceries'), getExpenses('bills'), getExpenses('income'), getExpenses('travel')],
            topExpense: [getTopExpense(), getTopExpense('category'), getTopExpense('stats')],
        },
    }

    return (
        <Layout component={<App array={filter} onAdd={fetch} onSearch={fetchSearch} onDelete={delTransaction} set={dataSet} validate={valid} />}/>
    );
}
const App = ({array, onAdd, onSearch, onDelete, set, validate}) =>
{
    // retrieve dataSet (parsed from <ExpenseFlow/> )
    const bal = set.summary.statistics[2];
    const income = set.summary.statistics[0];
    const expenses = set.summary.statistics[1];
    const topCategory = set.summary.topExpense;

    return (
        <section id="expense-document">
            <div id="expense-flexbox">
                <Summary balance={bal} income={income} expenses={expenses} category={topCategory}/>
                <Forms entry={onAdd} searchEntry={onSearch} validate={validate}/>
            </div>
            <Transactions entryArray={array} onDelete={onDelete}/>
        </section>
    );
}

export default ExpenseFlow;