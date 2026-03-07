import React from 'react';
import '../scss/_style.scss';
import '../scss/_utilities.scss';

const Forms = ({entry, searchEntry, validate}) =>
{
    const submitHandler = (e) =>
    {
        e.preventDefault();

        if (e.target.id === 'form-add') // add
        {
            const formData =
            {
                date: e.target.elements['date-add'].value,
                category: e.target.elements['category-add'].value,
                name: e.target.elements['name-add'].value,
                amount: parseFloat(e.target.elements['amount-add'].value) || 0,
            }

            // parse form data at the parent component, ExpenseFlow.jsx
            entry(formData);
        }
        else if (e.target.id === 'form-search') // search
        {
            const amountValue = e.target.elements['amount-search'].value;

            const searchFormData =
            {
                date: e.target.elements['date-search'].value,
                category: e.target.elements['category-search'].value,
                name: e.target.elements['name-search'].value.trim(),
                amount: amountValue === "" ? "" : parseFloat(amountValue),
            }

            searchEntry(searchFormData);
        }      
    }

    const [form, setForm] = React.useState("add");
    const Navbar = () =>
    {
        const adjustWidth = () => 
        {
            if (window.matchMedia("(max-width: 599px)").matches) return "60%";
            else if (window.matchMedia("(min-width: 992px)").matches) return "40%";
            else return "20%";
        }
        const styles = 
        [
            {borderBottom: "1px solid white", display: "flex"}, // div (form-navbar)
            {borderRight: "1px solid white", width: adjustWidth()}, // buttons
        ];

        return (
            <div id="form-navbar" style={styles[0]}>
                <button style={styles[1]} className={form === "add" ? "active" : ""} onClick={() => setForm("add")}>Add</button>
                <button style={styles[1]} className={form === "search" ? "active" : ""} onClick={() => setForm("search")}>Search</button>
                <div style={{width: "60%", backgroundColor: "#26002e"}}></div>
            </div>
        );
    }

    return (
        <section id="form-section">
            <Navbar/>
            <ExpenseForm mode={form} data={submitHandler} validate={validate}/>
        </section>
    );
}

const ExpenseForm = ({mode, data, validate}) =>
{
    const isAdd = mode === "add";
    const id = (field) => `${field}-${mode}`;
    const categories =
    [
        {id: 1, value: "bills", label: "Bills"},
        {id: 2, value: "entertainment", label: "Entertainment"},
        {id: 3, value: "groceries", label: "Groceries"},
        {id: 4, value: "income", label: "Income"},
        {id: 5, value: "travel", label: "Travel"},
    ];
    const checkMode = (type) =>
    {
        switch (type)
        {
            case "h3":
            {
                if (mode === "add") return "add";
                else return "search";
                break;
            }
            case "h3-display":
            {
                if (mode === "add") return "Add";
                else return "Search";
                break;
            }
            case "button":
            {
                if (mode === "add") return "add";
                else return "search";
                break;
            }
            default: {return null; break;}
        }
    }
    const loadCategories = categories.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>));

    const setDisplay = () =>
    {
        if (validate) return 'none';
        else return 'block';
    }
    
    return (
        <div id="form-container">
            <h3 id={`${checkMode("h3")}-heading`}>{`${checkMode("h3-display")} Transaction`}</h3>
            <form id={`form-${mode}`} onSubmit={data}>
                <label htmlFor={id("date")} className="block">Date:</label>
                <input type="date" id={id("date")} name={id("date")} className="block"/>
                <label htmlFor={id("category")} className="block">Category:</label>
                <select name={id("category")} id={id("category")}>
                    <option value=""></option>
                    {loadCategories}
                </select>
                <label htmlFor={id("name")} className="block">Name:</label>
                <input type="text" id={id("name")} name={id("name")} className="block"/>
                <label htmlFor={id("amount")} className="block">Amount (£):</label>
                <input type="number" id={id("amount")} name={id("amount")} step="0.01" min="0" inputMode="decimal" className="block"/>
                <button type="submit" id={`${checkMode("button")}-button`}>
                    <i className={`fa-solid ${isAdd ? "fa-plus" : "fa-magnifying-glass"}`}></i> {""}
                    {isAdd ? "Add" : "Search"}
                </button>
                <p className={setDisplay()}>Error: Form is incomplete</p>
            </form>
        </div>
    );
}

export default Forms;