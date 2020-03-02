const resultElement = document.querySelector('.result');
const clipboardElement = document.querySelector('.copy');
const lengthElement = document.querySelector('#length');
const lowerElement = document.querySelector('#lowerCase');
const upperElement = document.querySelector('#upperCase');
const numberElement = document.querySelector('#numbers');
const symbolElement = document.querySelector('#symbols');
const genBtn = document.querySelector('#generate')
const theme = document.querySelector('.theme')
const arrow = document.querySelectorAll('.arrow')
const extended = document.querySelectorAll('.extended')
const checkboxes = document.querySelectorAll('.hasCheck')
const activate = document.querySelector('.actLabel input')
const customUpper = document.querySelector('#custUpp')
const customLower = document.querySelector('#custLow')
const customNumbers = document.querySelector('#custNumb')
const customSymbols = document.querySelector('#custSymb')
const symbols = ["!", "#", "$", "$", "%", "&", "*", "=", "?", "@", "~"]

activate.addEventListener('change', function() {
    if (this.checked)
        arrow.forEach(el => el.style.display = "flex");
    else {
        arrow.forEach(el => {
            el.style.display = "none";
            el.classList.remove("arrow-active")
        });
        extended.forEach(el => {
            el.classList.remove("extended-active")
            el.children[0].value = ""
        })
    }
})

customUpper.addEventListener('keyup', function(e) {
    this.value = this.value.toUpperCase()
    let isValid = this.checkValidity();

    if (!isValid || this.value.includes(e.key.toUpperCase(), this.value.indexOf(e.key.toUpperCase()) + 1)) {
        this.value = this.value.substr(0, this.value.length - 1);
    }
})

customLower.addEventListener('keyup', function(e) {
    let isValid = this.checkValidity();

    if (!isValid || this.value.includes(e.key.toLowerCase(), this.value.indexOf(e.key.toLowerCase()) + 1)) {
        this.value = this.value.substr(0, this.value.length - 1);
    }
})

customNumbers.addEventListener('keyup', function(e) {
    let isValid = this.checkValidity();

    if (!isValid || this.value.includes(e.key, this.value.indexOf(e.key) + 1)) {
        this.value = this.value.substr(0, this.value.length - 1);
    }
})

customSymbols.addEventListener('keyup', function(e) {
    let isValid = this.checkValidity();

    if (!isValid || this.value.includes(e.key, this.value.indexOf(e.key) + 1)) {
        this.value = this.value.substr(0, this.value.length - 1);
    }
})

checkboxes.forEach(el => {
    el.addEventListener('change', function() {
        if (!this.checked) {
            this.parentNode.parentNode.parentNode.children[1].classList.remove("extended-active")
            this.parentNode.parentNode.children[2].classList.remove("arrow-active")
            this.parentNode.parentNode.parentNode.children[1].children[0].value = ""
        }
    })
})

arrow.forEach(el => {
    el.addEventListener('click', function() {
        this.classList.toggle("arrow-active")
        this.parentNode.children[1].children[0].checked = true
        let exp = this.parentNode.parentNode.children[1];
        exp.classList.toggle('extended-active')
    })
})


let trans = () => {
    document.documentElement.classList.add('transition')
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

theme.addEventListener('change', function() {
    if (this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }


})

resultElement.addEventListener('click', (e) => {
    var textArea = document.createElement("textarea");
    textArea.value = resultElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert("Copied the text: " + resultElement.innerHTML);
})

const randomChar = {
    lower: randomLowercase,
    upper: randomUppercase,
    number: randomNumber,
    symbol: randomSymbol
}

genBtn.addEventListener('click', (e) => {

    let length = +lengthElement.value
    let hasLower = lowerElement.checked
    const hasUpper = upperElement.checked
    const hasNumber = numberElement.checked
    const hasSymbol = symbolElement.checked

    if (length < 4 || length > 50) length = 8
    lengthElement.value = length

    if (!hasLower & !hasUpper & !hasNumber & !hasSymbol) {
        hasLower = true
        lowerElement.checked = true
    }

    const text = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol)

    if (length > 35)
        document.querySelector('.resultDiv').classList.add("tooLong")
    else
        document.querySelector('.resultDiv').classList.remove("tooLong")
    resultElement.innerHTML = text
})

function generatePassword(length, lower, upper, number, symbol) {
    let pass = ''
    let symbols = 0;
    let beSymbol = true;
    let howManySymbols = length > 40 ? 15 : length > 30 ? 12 : length > 20 ? 10 : length > 10 ? 8 : length > 5 ? 4 : length > 2 ? 2 : 1;

    let which = [{ lower }, { upper }, { number }, { symbol }].filter(obj => Object.values(obj)[0])

    for (let i = 0; i < length; i++) {
        let ran = Math.abs(Math.random() - 0.1)
        let randNum = Math.floor(ran * which.length)
        const funct = Object.keys(which[randNum])[0]
        let char = randomChar[funct]()
        pass += char;
    }

    return pass;
}

function randomLowercase() {
    if (activate.checked && customLower.value.length > 0)
        return customLower.value[Math.floor(Math.random() * customLower.value.length)]
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function randomUppercase() {
    if (activate.checked && customUpper.value.length > 0)
        return customUpper.value[Math.floor(Math.random() * customUpper.value.length)]
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function randomNumber() {
    if (activate.checked && customNumbers.value.length > 0)
        return customNumbers.value[Math.floor(Math.random() * customNumbers.value.length)]
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomSymbol() {

    if (activate.checked && customSymbols.value.length > 0)
        return customSymbols.value[Math.floor(Math.random() * customSymbols.value.length)]
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function check() {
    const key = event.key.toLowerCase();

    if (key.length !== 1) {
        return;
    }
    const isLetter = (key >= "a" && key <= "z");
    const isNumber = (key >= "0" && key <= "9");
    const isSpace = (key == " ")
    if (isLetter || isNumber || isSpace) {
        return true
    }
    return false;
}