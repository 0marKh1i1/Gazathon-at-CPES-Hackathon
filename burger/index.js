document.addEventListener('DOMContentLoaded', () => {
    const ingredientsContainer = document.getElementById('burger-ingredients');
    const orderButton = document.getElementById('order-btn');
    const receiptContainer = document.getElementById('receipt-container');
    const receiptText = document.getElementById('receipt');

    let selectedIngredients = [];
    let totalPrice = 0;

    document.querySelectorAll('.menu input').forEach(item => {
        item.addEventListener('change', (e) => {
            const ingredientName = e.target.getAttribute('data-item');
            const ingredientPrice = parseFloat(e.target.getAttribute('data-price'));

            if (e.target.checked) {
                const img = document.createElement('img');
                img.src = `${ingredientName.toLowerCase()}.png`;
                img.alt = ingredientName;
                img.classList.add('ingredient');
                ingredientsContainer.appendChild(img);

                selectedIngredients.push(ingredientName);
                totalPrice += ingredientPrice;
            } else {
                const ingredientImg = Array.from(ingredientsContainer.children).find(img => img.alt === ingredientName);
                ingredientsContainer.removeChild(ingredientImg);

                selectedIngredients = selectedIngredients.filter(item => item !== ingredientName);
                totalPrice -= ingredientPrice;
            }
        });
    });

    orderButton.addEventListener('click', () => {
        let receipt = "Your Order:\n";
        selectedIngredients.forEach(ingredient => {
            receipt += `- ${ingredient}\n`;
        });
        receipt += `\nTotal: ${totalPrice.toFixed(2)} KD`;
        receiptText.textContent = receipt;

        receiptContainer.classList.remove('hidden');
    });
});
document.getElementById('print-btn').addEventListener('click', function() {
    window.print();
});