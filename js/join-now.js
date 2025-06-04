const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        // Inisialisi variabel dari element form
        // const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const confirmpassword = document.getElementById('confirmpassword').value
        const name = $('#name').val()
        const age = $('#age').val()

        console.log(`${name} ini name`)

        // array


        let isValid = true
        

        if (name === ""){
            showError("name", "name cannot be empty")
            isValid = false
        }

        if (name.length < 5) {
            showError("name",  "name has to be longer than five characters")
            isValid = false
        }

        if (!isAlphaNum(name) === false) {
            showError("name", "name has to contain alphanumeric")
            isValid = false
        }

        if (age === '') {
            showError('age', 'age cannot be empty')
            isValid = false
        }

        // Validasi email
        if(!email.endsWith('gmail.com')){
            showError("email", "Email has to end with gmail.com")
            isValid = false
        }

        if (!validateGender()) {
            isValid = false;
        }

        console.log(validateGender())

        
    // Fungsi buat validasi name
        function isAlphaNum(str){
            let isAlpha = false
            let isNum = false
            for(let i = 0; i < str.length; i++){
                if (isNaN (str[i])){
                    isAlpha =true
                }else{
                    isNum = true
                }
                if (isAlpha && isNum){
                    return true
                }
            }
            return false
        }

        function getSelectedGender() {
            const selected = document.querySelector('input[name="gender"]:checked');
            return selected ? selected.value : "";
        }

        function validateGender() {
            const genderValue = getSelectedGender().trim().toLowerCase();
            console.log(genderValue + " GENDER VALUE");
            console.log(`${genderValue.length === 0} CEK ADA`); 

            if (genderValue.length === 0) {
                showError("gender", "Gender cannot be empty");
                return false;
            }

            if (genderValue !== "male" && genderValue !== "female") {
                showError("gender", "Gender must be either 'male' or 'female'");
                return false;
            }

            return true;
        }

        function clearError(field) {
            const errorElement = document.getElementById(`${field}Error`);
            if (errorElement) {
                errorElement.textContent = "";
                errorElement.style.display = "none";
            }
        }

        document.getElementById('name').addEventListener('input', () => clearError('name'));
        document.getElementById('email').addEventListener('input', () => clearError('email'));

    });
    
    // Fungsi buat show error
    // showError(password,message) -> {$}Errror
    // nameError, passwordError
    function showError(field, message) {
        const errorElement = document.getElementById (`${field}Error`)

        if(errorElement){
            errorElement.textContent = message
            errorElement.style.display = 'block' // -> awalnya none
        }
    }

    

    
    // Fungsi buat show reset error
    function resetErrors() {
      const errorElement = document.querySelectorAll(".error")
        // seandainya ada 5 error, loop 5 kali
        errorElements.forEach(element=>{
                element.textContent=""
                errorElement.style.display = 'none'
            }
        )

    }