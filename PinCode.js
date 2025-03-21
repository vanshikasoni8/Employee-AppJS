const pinCode = "400088";
const pinCodePattern = /^\d{6}$/;

if (pinCode.match(pinCodePattern)) {
    console.log("Valid PIN Code");
} else {
    console.log("Invalid PIN Code");
}