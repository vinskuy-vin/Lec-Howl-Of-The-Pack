$('#signinForm').on('submit', function(e) {
    e.preventDefault();
    const email = $('#email').val()
    const password = $('#password').val()

    let isValid = true

    if (email === ''){
        showError("email", "email cannot be empty")
        isValid = false
    }

    if (!email.endsWith('gmail.com')) {
        showError("email", "Email has to end with gmail.com")
        isValid = false
    }
    if (password === ''){
        showError('password', 'Password cannot be empty')
        isValid = false
    }

    document.getElementById('email').addEventListener('input', () => clearError('email'));
    document.getElementById('password').addEventListener('input', () => clearError('password'));
})

function showError(field, message) {
    const errorElement = document.getElementById (`${field}Error`)

    if(errorElement){
        errorElement.textContent = message
        errorElement.style.display = 'block' // -> awalnya none
    }
}

function clearError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
}