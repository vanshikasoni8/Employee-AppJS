const email = "abc.xyz@bridgelabz.co.in";
const regex = /^abc@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (regex.test(email)) {
  console.log("Valid Email");
} else {
  console.log("Invalid Email");
}
