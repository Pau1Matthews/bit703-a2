document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shipping-form');
    const shippingBoxes = document.querySelectorAll('.shipping-box');
  

    shippingBoxes.forEach(box => {
        const checkbox = box.querySelector('input[type="checkbox"]');
        
        box.addEventListener('click', () => {
            updateShippingHighlight();
        });
    });

    function updateShippingHighlight() {
        shippingBoxes.forEach(box => {
            const checkbox = box.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                box.classList.add('label-active');
            } else {
                box.classList.remove('label-active');
            }
        });
    }

    const nextDayBox = document.getElementById('next-day-box');
        nextDayBox.addEventListener('click', () => {
        calculateTotal();
        });

    // Submit Logic 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            address: document.getElementById('address').value,
            address2: document.getElementById('address2').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            zipCode: document.getElementById('zip-code').value,
            phone: document.getElementById('phone').value,
            shippingMethod: document.querySelector('input[name="shipping-method"]:checked').value
        };

        console.log('Form Submitted successfully:', formData);
        alert('Proceeding to next step!');
    });

});

const subTotal = sessionStorage.getItem("subTotal");
if (subTotal !== null && subTotal !== undefined && subTotal !== "undefined"){
document.getElementById("sub-total").textContent = subTotal;
} else {
  document.getElementById("sub-total").textContent = "error";
}

const shippingTotal = sessionStorage.getItem("shippingTotal");
if (shippingTotal !== null && shippingTotal !== undefined && shippingTotal !== "undefined"){
document.getElementById("shipping-total").textContent = shippingTotal;
} else {
  document.getElementById("shipping-total").textContent = "error";
}


function updateShippingStatus() {
    const freeShippingBox = document.getElementById('free-shipping-box');
    const freeShippingRadio = document.getElementById('free-shipping-btn');

    if (shippingTotal > 0) {
        // Disable the radio input
        freeShippingRadio.disabled = true;
        
        // Add a class for visual styling (fading it out)
        freeShippingBox.classList.add('disabled-box');
        
        // Prevent all mouse interactions (clicks, hovers) on the entire box
        freeShippingBox.style.pointerEvents = 'none'; 
    } else {
        // Re-enable if shipping becomes zero later
        freeShippingRadio.disabled = false;
        freeShippingBox.classList.remove('disabled-box');
        freeShippingBox.style.pointerEvents = 'auto';
    }
}


function calculateTotal() {
    // 1. Fetch the HTML elements
    const shippingElement = document.getElementById('shipping-total');
    const subTotalElement = document.getElementById('sub-total'); // Assumed ID for subtotal
    const box = document.getElementById('next-day-box');
    const checkbox = box ? box.querySelector('input[type="checkbox"]') : null;
   

    // 2. Convert element text into actual numbers (default to 0 if element doesn't exist)
    const storedShipping = sessionStorage.getItem("shippingTotal");
    const shippingTotal = storedShipping ? parseFloat(storedShipping) || 0 : 0;
    const subTotal = subTotalElement ? parseFloat(subTotalElement.textContent) || 0 : 0;

    // 3. Initialize totals assuming the checkbox is NOT checked
    let taxTotal = 0;
    let grandTotal = subTotal + shippingTotal;
    const taxRate = 0.15; 

    // 4. Apply 15% tax ONLY if the checkbox is checked
    if (checkbox && checkbox.checked) { 
        const nextDayCharge = 20.00;
        const newShippingTotal = shippingTotal + nextDayCharge;

        // Update the shipping element DOM display with the added $20
        if (shippingElement) shippingElement.textContent = newShippingTotal.toFixed(2);

        taxTotal = (subTotal + newShippingTotal) * taxRate;
        grandTotal = subTotal + newShippingTotal + taxTotal;
    } else {

        // Reset the shipping element DOM display back to standard shipping if unchecked
        if (shippingElement) shippingElement.textContent = shippingTotal.toFixed(2);
        
        taxTotal = (subTotal + shippingTotal) * taxRate;
        grandTotal = subTotal + shippingTotal + taxTotal;
    }

    
    const taxDisplay = document.getElementById("tax-total");
    const grandDisplay = document.getElementById("grand-total");

    if (taxDisplay) taxDisplay.textContent = taxTotal.toFixed(2);
    if (grandDisplay) grandDisplay.textContent = grandTotal.toFixed(2);
}


// Run the function when the page loads or when the cart updates
updateShippingStatus();

calculateTotal();

