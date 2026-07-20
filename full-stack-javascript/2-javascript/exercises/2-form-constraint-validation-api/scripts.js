// References to all field elements
const email = document.getElementById("email");
const country = document.getElementById("country");
const postal = document.getElementById("postal");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Form (Prevent default to avoid form submission against non-declared endpoint)
document.getElementById("main-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate each input field against JS validation
    validateEmail();
    validateCountry();
    validatePostal();
    validatePassword();
    validateConfirmPassword();

    const allValid = [email, country, postal, password, confirmPassword]
    .every((input) => input.validity.valid);

    const submitBtn = document.getElementById("submit-btn");

    if (!allValid) {
        submitBtn.textContent = "INVALID FIELDS...";
        submitBtn.style.backgroundColor = "red";
    } else if (allValid) {
        submitBtn.textContent = "HIGH FIVE! :D";
        submitBtn.style.backgroundColor = "green";
        email.style.border = "solid 2px green";
        country.style.border = "solid 2px green";
        postal.style.border = "solid 2px green";
        password.style.border = "solid 2px green";
        confirmPassword.style.border = "solid 2px green";
    };
});

// Email
email.addEventListener("input", () => {
    validateEmail();
});

function validateEmail() {
    email.setCustomValidity("");
    const errorMsg = document.querySelector("form div:nth-child(1) p");

    if (!email.validity.valid && !email.value.endsWith(".")) {
        email.setCustomValidity("Please enter a valid email");
        errorMsg.textContent = "Please enter a valid email";
        return;
    } else if (!email.value.endsWith(".com")) {
        email.setCustomValidity("Please enter an email, that ends with .com");
        errorMsg.textContent = "Please enter an email, that ends with .com";
        return;
    } else {
        email.setCustomValidity("");
        errorMsg.textContent = "";
        return;
    };
};

// Country
country.addEventListener("input", () => {
    validateCountry();
});

function validateCountry() {
    country.setCustomValidity("");
    const errorMsg = document.querySelector("form div:nth-child(2) p");

    if (!countryList.includes(country.value.toLowerCase())) {
        console.log(false)
        country.setCustomValidity(`Please enter a valid country`);
        errorMsg.textContent = `Please enter a valid country`;
        document.querySelector("svg").classList.add("visible");
        return;
    } else {
        console.log(true)
        country.setCustomValidity("");
        errorMsg.textContent = ``;
        document.querySelector("svg").classList.remove("visible");
        return;
    }
};

// Postal
postal.addEventListener("input", () => {
    validatePostal();
});

function validatePostal() {
    postal.setCustomValidity("");
    const errorMsg = document.querySelector("form div:nth-child(3) p");
    let isNum = /^\d+$/.test(postal.value)
    console.log(isNum);

    if (!isNum && postal.value !== "") {
        postal.setCustomValidity("Please enter a postal that contains just integers");
        errorMsg.textContent = "Please enter a postal that contains just integers";
        return;
    }
    else if (postal.value.length < 4) {
        postal.setCustomValidity("Please enter a postal that is at least 4 characters in length");
        errorMsg.textContent = "Please enter a postal that is at least 4 characters in length";
        return;
    } else {
        postal.setCustomValidity("");
        errorMsg.textContent = "";
        return;
    };
};

// Password
password.addEventListener("input", () => {
    validatePassword();
});

function validatePassword() {
    password.setCustomValidity(``);
    const errorMsg = document.querySelector("form div:nth-child(4) p");

    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};:'"<>,.?~\\/-]/;
    const spaceRegex = /\s/;    

    if (password.value.length < minLength) {
        password.setCustomValidity(`Password must be at least ${minLength} characters long`);
        errorMsg.textContent = `Password must be at least ${minLength} characters long`;
        return;
    } else if (!uppercaseRegex.test(password.value)) {
        password.setCustomValidity(`Password must contain at least one uppercase letter`);
        errorMsg.textContent = `Password must contain at least one uppercase letter`;
        return;
    } else if (!lowercaseRegex.test(password.value)) {
        password.setCustomValidity(`Password must contain at least one lowercase letter`);
        errorMsg.textContent = `Password must contain at least one lowercase letter`;
        return;
    } else if (!digitRegex.test(password.value)) {
        password.setCustomValidity(`Password must contain at least one digit`);
        errorMsg.textContent = `Password must contain at least one digit`;
        return;
    } else if (!specialCharRegex.test(password.value)) {
        password.setCustomValidity(`Password must contain at least one special character`);
        errorMsg.textContent = `Password must contain at least one special character`;
        return;
    } else if (spaceRegex.test(password.value)) {
        password.setCustomValidity(`Password cannot contain spaces`);
        errorMsg.textContent = `Password cannot contain spaces`;
        return;
    } else {
        password.setCustomValidity(``);
        errorMsg.textContent = "";
        return;
    };
};

// Confirm Password
confirmPassword.addEventListener("input", () => {
    validateConfirmPassword();
});


function validateConfirmPassword() {
    confirmPassword.setCustomValidity("");
    const errorMsg = document.querySelector("form div:nth-child(5) p");

    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        confirmPassword.setCustomValidity("Passwords do not match");
        errorMsg.textContent = "Passwords do not match";
        return;
    } else {
        confirmPassword.setCustomValidity("");
        errorMsg.textContent = "";
        return;
    };
};