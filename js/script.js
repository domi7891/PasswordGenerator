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
const activate = document.querySelector('.actLabel input')

activate.addEventListener('change', function() {
    if (this.checked)
        arrow.forEach(el => el.style.display = "flex");
    else
        arrow.forEach(el => el.style.display = "none");
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

    if (length == 0 || length > 50) length = 15
    lengthElement.value = length

    if (!hasLower & !hasUpper & !hasNumber & !hasSymbol) hasLower = true
    lowerElement.checked = true

    const text = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol)

    if (length > 35)
        document.querySelector('.resultDiv').classList.add("tooLong")
    else
        document.querySelector('.resultDiv').classList.remove("tooLong")
    resultElement.innerHTML = text
})

function generatePassword(length, lower, upper, number, symbol) {
    let pass = ''

    let which = [{ lower }, { upper }, { number }, { symbol }].filter(obj => Object.values(obj)[0])

    if (which.length < 1)
        return ''

    for (let i = 0; i < length; i++) {
        let randNum = Math.floor(Math.random() * which.length)
        const funct = Object.keys(which[randNum])[0]
        pass += randomChar[funct]()
    }

    return pass;
}

function randomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function randomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function randomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomSymbol() {
    var symbols = ["!", "\"", "§", "$", "%", "&", "/", "(", ")", "=", "?", "*", "+", "~", "#", "{", "[", "]", "}"];
    return symbols[Math.floor(Math.random() * symbols.length)]
}