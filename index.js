// Declare generatedOTP variable to store generated OTP
let generatedOTP;

// Variable to store the countdown interval ID
let countdownIntervalId;

// Get reference to the OTP expiration display element
const otpExpireElement = document.getElementById("otp-expires-id");

function startOtpExpireCountdown() {
    let timeRemaining = 15; // 15 seconds

    // Start the countdown interval
    countdownIntervalId = setInterval(function() {
        otpExpireElement.innerText = `OTP will expire in ${timeRemaining} seconds`;
        timeRemaining -= 1;

        if (timeRemaining < 0) {
            clearInterval(countdownIntervalId);
            otpExpireElement.innerText = "OTP expired";
            generateOTP(); // Automatically generate a new OTP when the countdown ends
        }
    }, 1000);
}

function tackleOTPBoxes() {
    const boxes = document.getElementById("otp-box-list-id");
    boxes.addEventListener("input", function(e) {
        const target = e.target;
        const value = target.value;

        if (isNaN(value)) {
            target.value = "";
            alert("Please enter a number."); // Optional: User feedback for invalid input
            return;
        }

        const nextElement = target.nextElementSibling;

        if (nextElement) {
            nextElement.focus();
        }

        validateOTP();
    });
}

function generateOTP() {
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    const otpElement = document.getElementById("generated-otp-id");

    otpElement.innerText = `Your OTP: ${generatedOTP}`;

    // Call the function to start the countdown
    startOtpExpireCountdown();
}

function validateOTP() {
    let typedNumber = "";
    const boxListElement = document.getElementById("otp-box-list-id");

    // Collect all values from the input boxes
    [...boxListElement.children].forEach((elem) => {
        typedNumber += elem.value;
    });

    // Check if the generated OTP matches the typed OTP
    const isValid = (generatedOTP === parseInt(typedNumber, 10));
    const resultElem = document.getElementById("result-id");

    if (isValid) {
        resultElem.innerText = "OTP has been validated successfully";
        resultElem.classList.remove("fail");
        resultElem.classList.add("success");

        // Stop the countdown if the OTP is validated successfully
        clearInterval(countdownIntervalId);
        countdownIntervalId = null; // Ensure the interval ID is reset
    } else {
        resultElem.innerText = "OTP is invalid";
        resultElem.classList.remove("success");
        resultElem.classList.add("fail");
    }

    console.log(typedNumber);
}

function init() {
    console.log("Initializing OTP process...");
    tackleOTPBoxes();
    setTimeout(generateOTP, 2000); // Delay generating the OTP for 2 seconds
}

init();
