// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const eyeIconConfirm = document.getElementById('eyeIconConfirm');

if (togglePassword && passwordInput && eyeIcon) {
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        if (type === 'password') {
            eyeIcon.classList.remove('bi-eye-slash');
            eyeIcon.classList.add('bi-eye');
        } else {
            eyeIcon.classList.remove('bi-eye');
            eyeIcon.classList.add('bi-eye-slash');
        }
    });
}

if (toggleConfirmPassword && confirmPasswordInput && eyeIconConfirm) {
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        if (type === 'password') {
            eyeIconConfirm.classList.remove('bi-eye-slash');
            eyeIconConfirm.classList.add('bi-eye');
        } else {
            eyeIconConfirm.classList.remove('bi-eye');
            eyeIconConfirm.classList.add('bi-eye-slash');
        }
    });
}

// Form validation
function validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumber;
}

function validatePhone(phone) {
    // Format: +[country code][number]
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}

// Bootstrap form validation
(function() {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Form submission handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const sponsorCode = document.getElementById('sponsorCode').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Clear previous errors
        clearErrors();
        
        let hasError = false;
    
    // Validate first name
    if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        hasError = true;
    }
    
    // Validate last name
    if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        hasError = true;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        hasError = true;
    }
    
    // Validate phone
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number with country code (e.g., +11935297960)');
        hasError = true;
    }
    
    // Validate sponsor code
    if (!sponsorCode || sponsorCode.length < 1) {
        showError('sponsorCode', 'Sponsor referral code is required');
        hasError = true;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        showError('password', 'Password must be at least 8 characters with uppercase, lowercase, and number');
        hasError = true;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    // If validation passes, proceed with registration
    console.log('Registration attempt:', {
        firstName,
        lastName,
        email,
        phone,
        sponsorCode,
        password: '***'
    });
    
    // Add your registration logic here
    // For now, just show a success message
    alert('Registration successful! (Functionality to be implemented)');
    
    // You can redirect to login page or dashboard after successful registration
    // window.location.href = '../login/login.html';
    }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.mb-3') || field.closest('.form-group');
    if (!formGroup) return;
    
    // Add error styling
    field.style.borderColor = '#ff4444';
    field.classList.add('is-invalid');
    
    // Remove existing error message if any
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message invalid-feedback d-block';
    errorElement.style.color = '#ff4444';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function clearErrors() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = '#2a2a2a';
        input.classList.remove('is-invalid');
    });
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

// Real-time validation feedback
const passwordField = document.getElementById('password');
if (passwordField) {
    passwordField.addEventListener('input', function() {
        const password = this.value;
        const formGroup = this.closest('.mb-3') || this.closest('.form-group');
        const helperText = formGroup ? formGroup.querySelector('.form-text') : null;
        
        if (password.length > 0) {
            if (validatePassword(password)) {
                this.style.borderColor = '#4CAF50';
                this.classList.remove('is-invalid');
                if (helperText) {
                    helperText.style.color = '#4CAF50';
                }
            } else {
                this.style.borderColor = '#2a2a2a';
                if (helperText) {
                    helperText.style.color = '#999999';
                }
            }
        } else {
            this.style.borderColor = '#2a2a2a';
            if (helperText) {
                helperText.style.color = '#999999';
            }
        }
    });
}

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

