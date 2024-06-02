import React, {useEffect, useState} from 'react';
import renderChart from "../Components/Chart";
import NavBar from "../Components/Nav";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../Components/Nav";

const Budget = () => {

    const [budgetCategorySpecifics, setBudgetCategorySpecifics] = useState([])

    useEffect(() => {
        const ynab = require("ynab");
        const accessToken = "Kyxy71SBTob25jlPHPvnZ_l-ScNjhDCUkzUoQvp8SSw";
        const ynabAPI = new ynab.API(accessToken);

        const getBudget = async () => {
            const budgetsResponse = await ynabAPI.budgets.getBudgets();
            const budgets = budgetsResponse.data.budgets;
            const budgetId = budgets[0].id

            const budgetResponse = await ynabAPI.budgets.getBudgetById(budgetId);
            const budget = budgetResponse.data;
            const budgetCats = budget.budget.categories

            // Collecting category details in an array
            const categoryDetails = await Promise.all(
                budgetCats.map(async (cat) => {
                    const categoriesResponse = await ynabAPI.categories.getCategoryById(budgetId, cat.id);
                    return categoriesResponse.data.category;
                })
            );

            // Updating state once with all category details
            setBudgetCategorySpecifics(categoryDetails);
            console.log(budgetCategorySpecifics)
        }
        getBudget()
    }, []);

    return (
        <>
            <NavBar/>
            {/*{budgetCategories.map((category) => (*/}
            {/*    <Card key={category.id}>*/}
            {/*        <Card.Title>{category.name}</Card.Title>*/}
            {/*    </Card>*/}
            {/*    ))}*/}
        </>
    )
}

export default Budget