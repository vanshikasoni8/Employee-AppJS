const pincode = "400 088";
const regex = /^\d{3}\s?\d{3}$/;

if (regex.test(pincode)) {
  console.log("Valid Pincode");
} else {
  console.log("Invalid Pincode");
}
