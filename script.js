document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggling Functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
    }

    // Registration Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent page reload

            var usernameInput = document.querySelector('input[placeholder="Type Username"]');
            var emailInput = document.querySelector('input[placeholder="Type Email"]');
            if (!usernameInput || !emailInput) {
                console.error('Input selectors failed. Check placeholders in HTML.');
                alert('Form inputs not found. Please check the page source.');
                return;
            }

            var username = usernameInput.value.trim();
            var email = emailInput.value.trim();

            if (!username || !email) {
                alert('Please fill in both username and email.');
                return;
            }

            console.log('Submitting:', { username, email });

            var formData = new FormData();
            formData.append('username', username);
            formData.append('companyEmail', email);  

            var scriptURL = 'https://script.google.com/macros/s/AKfycbyq5rdPDhmQusvxf0l3iBWk4iDjbtkdqfLt6sUJK8N-UrAkZo-3S-sb6Z0MuMqEXg_L/exec';  // Replace if this is not your actual URL

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);  
                if (data.result === 'success') {
                    // Redirect to home page on success
                    window.location.href = 'home.html';
                } else {
                    alert('Something went wrong. Check the URL or try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Network error. Check if you are online and the script URL is correct.');
            });
        });
    }

    const orderButtons = document.querySelectorAll('.order-button');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = button.closest('.product-card');
            const productName = productCard.getAttribute('data-product');
            const productPrice = productCard.getAttribute('data-price');
            alert('Your order is booked.\n\nProduct: ' + productName + '\nPrice: $' + productPrice);
        });
    });
});