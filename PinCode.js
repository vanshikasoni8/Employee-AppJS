const pincode = "400088B";
const regex = /^[0-9]{6}$/;

if (regex.test(pincode)) {
  console.log("Valid Pincode");
} else {
  console.log("Invalid Pincode");
}
