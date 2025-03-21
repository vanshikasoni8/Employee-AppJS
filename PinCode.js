const pincode = "A400088";
const regex = /^[0-9]{6}$/;

if (regex.test(pincode)) {
  console.log("Valid Pincode");
} else {
  console.log("Invalid Pincode");
}