function showConfirmationPopup() {
    const confirmationPopup = document.getElementById("confirmationButton");
    confirmationPopup.style.display = "flex";
}

function hideConfirmationPopup() {
    const confirmationPopup = document.getElementById("confirmationButton");
    confirmationPopup.style.display = "none";
}

document.getElementById("cancelButton").addEventListener("click", hideConfirmationPopup);

function submitReport() {
    const form = document.querySelector("form");
    const selectedIcon = document.getElementById("selectedIcon").value;
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();
    const userName = document.getElementById("userName").value.trim();
    const email = document.getElementById("email").value.trim();
    const notificationChoice = document.querySelector('input[name="notifications"]:checked');

    const errors = [];

    if (!selectedIcon) errors.push("Please select an issue icon.");
    if (!location) errors.push("Please enter a location.");
    if (!description) errors.push("Please describe the problem.");
    if (!userName) errors.push("Please enter your name.");
    if (!email || !isValidEmail(email)) errors.push("Please enter a valid email address.");
    if (!notificationChoice) errors.push("Please select whether you want notification alerts.");

    if (errors.length > 0) {
        alert("Please fill in the following:\n\u2022 " + errors.join("\n\u2022 "));
        return false;
    }

    return true;
}

document.getElementById("confirmButton").addEventListener("click", function () {
    if (submitReport()) {
        alert("Report submitted successfully!");
        hideConfirmationPopup();

        document.getElementById("reportForm").reset();
        selectIcon(null);
        location.reload();
    }

});

document.getElementById("submitButton").addEventListener("click", function (event) {
    event.preventDefault();
    if (submitReport()) {
        showConfirmationPopup();
    }
});

function selectIcon(iconId) {
    const allIcons = document.querySelectorAll('.icon');
    allIcons.forEach(icon => {
        icon.classList.remove('selected');
    });

    const selectedIcon = document.getElementById('icon' + iconId);
    selectedIcon.classList.add('selected');

    document.getElementById('selectedIcon').value = iconId;
}

const severitySlider = document.getElementById('severity');
const severityValue = document.getElementById('severity-value');

const severityLevels = ["Low", "Moderate", "High", "Severe"];

function updateSliderBackground(slider) {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #47558d ${percent}%, #ddd ${percent}%), #ddd 100%`;
}

severityValue.textContent = severityLevels[severitySlider.value - 1];
updateSliderBackground(severitySlider);

severitySlider.addEventListener('input', function () {
    const value = severitySlider.value;
    severityValue.textContent = severityLevels[value - 1];
    updateSliderBackground(severitySlider);
});


function validateField(input, validatorFn, errorElement, message) {
    input.addEventListener('blur', () => {
        const isValid = validatorFn(input.value);
        if (!isValid) {
            input.classList.add("invalid");
            errorElement.textContent = message;
        } else {
            input.classList.remove("invalid");
            errorElement.textContent = "";
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNotEmpty(value) {
    return value.trim() !== "";
}

const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const nameInput = document.getElementById("userName");
const emailInput = document.getElementById("email");

validateField(locationInput, isNotEmpty, document.getElementById("locationError"), "Please enter a location.");
validateField(descriptionInput, isNotEmpty, document.getElementById("descriptionError"), "Please describe the problem.");
validateField(nameInput, isNotEmpty, document.getElementById("userNameError"), "Please enter your name.");
validateField(emailInput, isValidEmail, document.getElementById("emailError"), "Please enter a valid email address.");
