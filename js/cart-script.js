
        // Select all quantity inputs
        const quantityInputs = document.querySelectorAll('.quantity');
        const subTotalElement = document.getElementById('sub-total');
        const shippingElement = document.getElementById('shipping-total');
        const taxElement = document.getElementById('tax-total');
        const grandTotalElement = document.getElementById('grand-total');

        // Function to calculate and update totals
        function updateTotals() {
            let subTotal = 0;
            let shippingTotal =50;

            quantityInputs.forEach(input => {
                // Get the current quantity and the price hidden in the data attribute
                const quantity = parseInt(input.value) || 0;
                const price = parseFloat(input.getAttribute('data-price'));
                
                // Calculate line total
                const itemTotal = quantity * price;
                
                // Find the nearest subtotal span for this specific item and update it
                const itemTotalElement = input.closest('.cart-item').querySelector('.item-total');
                itemTotalElement.textContent = itemTotal.toFixed(2);

                // Add to the running grand total
                subTotal += itemTotal;

            });

              //Calculate shipping
              shippingTotal = subTotal > 600 ? 0 : 50;

              // Calculate tax 
              const taxRate = 0.15; 
              const taxTotal = (subTotal + shippingTotal) * taxRate;

              // Calculate Grand Total
              const grandTotal = subTotal + shippingTotal + taxTotal;

            // Update the grand total display
            subTotalElement.textContent = subTotal.toFixed(2);
            shippingElement.textContent = shippingTotal;
            taxElement.textContent = taxTotal;
            grandTotalElement.textContent = grandTotal;
        }

        // Add 'input' event listener to all quantity fields for real-time tracking
        quantityInputs.forEach(input => {
            input.addEventListener('input', updateTotals);
        });

        updateTotals();
    