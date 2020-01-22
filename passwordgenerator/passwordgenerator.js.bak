var length;
var specials = '!"#$%&()*+,-./:;<=>?@[\]^_`{|~';
var numbers = '1234567890';
var lowers = 'abcdefghijklmnopqrstuvwxyz';
var uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var passBox = document.getElementById("password");
var rPassword = '';

const MIN = 8;
const MAX = 128;

function generatePassword() {
    rPassword = "";
    // const pwLength = parseInt(length.value);    
    while (length !== null) {
        length = prompt("Choose a password length between " + MIN + " and " + MAX);
        if (isNaN(length)) {
            alertThis("That is not a number. Please enter a number between " + MIN + " and " + MAX);
        } 
        else if (length < MIN || length > MAX) {
            alertThis("Please choose a number between " + MIN + " and " + MAX);
        } 
        else if (length === "") {
            alertThis("Please choose a number between " + MIN + " and " + MAX);
        }
        else {
            break;
        }
    }

    alertThis("Please choose at least 1 Character type.")
    var special = confirm("Would you like Special characters (!#$%&'()*+,-./:;<=>?@[\]^_`{|}~) in your random password?");
    var number = confirm("Would you like Numeric Characters (0123456789) in your random password?");
    var lower = confirm("Would you like Lowercase Characters (abcdefghijklmnopqrstuvwxyz) in your random password?");
    var upper = confirm("Would you like Uppercase Characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ) in your random password?");

    if (special === false && number === false && lower === false && upper === false) {
        alert("You must choose at least 1 Character type.");
    } 
    if (special === true) {
        // add special to password
        rPassword += specials;
    } 
    if (number === true) {
        // add number to password
        rPassword += numbers;
    } 
    if (lower === true) {
        // add lower to password
        rPassword += lowers;
    } 
    if (upper === true) {
        // add upper to password
        rPassword += uppers;
    }

    var randomP = "";

    for (var i = 0; i < length; i++) {
        randomP += rPassword.charAt(Math.floor(Math.random() * Math.floor(rPassword.length - 1)));
    }
    
    passBox.innerHTML = randomP;
}

function alertThis(message) {
    alert(message);
}


// Copy text from password field to clipboard
function copyToClip() {
	var value = document.getElementById("password").innerHTML;
	var input_temp = document.createElement("input");
	input_temp.value = value;
	document.body.appendChild(input_temp);
	input_temp.select();
	document.execCommand("copy");
	document.body.removeChild(input_temp);

	alert("Password copied!");
}