const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("[generateButton]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#ccc")
handleSlider();

//set strength circle gray

//set passwordlength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min=inputSlider.min;
  const max=inputSlider.max;
  inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%100%"
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow=`0px 0px 12px 1px ${color}`
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
  return getRndInteger(0, 10); 
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbol() {
  const random = getRndInteger(0, symbols.length);
  return symbols.charAt(random);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copycontent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  // to make copy span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
  // Fisher Yates Mehtod
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    // swap(arr[i],arr[j]);
  }

  let str = "";
  array.forEach((el) => (str += el));
  return str;
}
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
copyBtn.addEventListener("click", (e) => {
  if (passwordDisplay.value) {
    copycontent();
  }
});
console.log("yaha tk aa gaye");
generateBtn.addEventListener("click", () => {
  if (checkCount == 0) return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  console.log("Start");
  password = "";

  let funcArr = [];
  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
  }
  if (symbolsCheck.checked) {
    funcArr.push(generateSymbol);
  }

  //cumpulsory edition
  console.log("cumpulsory done");
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  // remaining edition
  console.log("remaining edition done");
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("random number",randIndex);
    password += funcArr[randIndex]();
  }
  // shuffle the password
  password = shufflePassword(Array.from(password));
  passwordDisplay.value = password;
  calcStrength();
});
