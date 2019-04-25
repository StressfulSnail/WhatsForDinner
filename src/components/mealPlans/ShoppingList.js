import React from 'react';
import ReactDOMServer from 'react-dom/server';

const ShoppingList = function ({ mealPlan, listItems }) {
    const List = (<div>
        <h3>Shopping List for {mealPlan.name}</h3>
        {listItems
            .sort((item1, item2) => item1.name.localeCompare(item2.name))
            .map(item => <p>
                <input type="checkbox"/> {item.measurement} {item.unit} - {item.name}
            </p>)}
    </div>);

    const html = ReactDOMServer.renderToString(List);

    const win = window.open(null, '_blank', 'resizable=yes, scrollbars=yes, titlebar=no, width=500, height=750, top=10, left=10');
    win.document.write(html);
};

export default ShoppingList;