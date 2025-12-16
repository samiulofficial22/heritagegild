// Form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    console.log('Login attempt:', { email, password, remember });
    
    // Add your login logic here
    // For now, just show an alert
    alert('Login functionality to be implemented');
});

// Add smooth focus transitions
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Social button click handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const label = this.getAttribute('aria-label');
        console.log(`Social login: ${label}`);
        // Add your social login logic here
    });
});

