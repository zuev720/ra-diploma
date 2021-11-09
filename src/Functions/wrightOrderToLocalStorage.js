export function wrightOrderToLocalStorage(order) {
    let orders = localStorage.getItem('orders');
    if (!orders) {
        localStorage.setItem('orders', JSON.stringify([order]));
    } else {
        orders = JSON.parse(orders);
        const matchOrder = orders.findIndex((elem) => elem.id === order.id);
        if (matchOrder === -1) {
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
        } else {
            if (orders[matchOrder].size === order.size) {
                orders[matchOrder].quantity += order.quantity;
                orders[matchOrder].totalPrice += order.totalPrice;
                localStorage.setItem('orders', JSON.stringify(orders));
            } else {
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
            }
        }
    }
}