// Алфавит
ALFABET = [
    'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц',
    'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']


// Функция для перевода текста в массив чисел
function textToNumbers (inputText) {
    const charArray = inputText.toLowerCase().split('')
    const numberArray = []

    charArray.forEach(char => {
        for (let i = 0; i < ALFABET.length; i++) {
            if (char === ALFABET[i]) {
                numberArray.push(i)
                break
            }
        }
    })

    return numberArray
}

// Функция для получения ключевого потока
function getStreamKey (key, numbersArr) {
    const keyStream = [key]

    for (let i = 0; i < numbersArr.length - 1; i++) {
        keyStream.push(numbersArr[i])
    }

    return keyStream
}


// Функция для шифрования текста
function cypher (inputText, key) {
    const numbersArray = textToNumbers(inputText)
    const keyStream = getStreamKey(Number(key), numbersArray)

    for (let i = 0; i < numbersArray.length; i++) {
        numbersArray[i] = (numbersArray[i] + keyStream[i]) % ALFABET.length
    }

    let outputText = ''

    numbersArray.forEach(num => {
        outputText += ALFABET[num]
    })

    return outputText
}

// Функция для расшифровки
function decypher (inputText, key) {
    const numbersArray = textToNumbers(inputText)

    numbersArray[0] = numbersArray[0] - key

    if (numbersArray[0] < 0) {
        numbersArray[0] += ALFABET.length
    }

    for (let i = 1; i < numbersArray.length; i++) {
        numbersArray[i] = numbersArray[i] - numbersArray[i - 1]

        if (numbersArray[i] < 0) {
            numbersArray[i] += ALFABET.length
        }
    }

    let outputText = ''

    numbersArray.forEach(num => {
        outputText += ALFABET[num]
    })

    return outputText
}

// Контроллер
const inputText = document.querySelector('#inputText')
const outputText = document.querySelector('#outputText')
const cypherKey = document.querySelector('#cypherKey')
const cypherBtn = document.querySelector('#CypherBtn')
const decypherBtn = document.querySelector('#DecypherBtn')

cypherBtn.addEventListener('click', () => {
    if(validation()) {
        outputText.value = cypher(inputText.value, cypherKey.value)
    }
})

decypherBtn.addEventListener('click', () => {
    if(validation()) {
        outputText.value = decypher(inputText.value, cypherKey.value)
    }
})

function validation () {
    if (!inputText.value || inputText.value.match(/[^а-яА-Я]/)) {
        alert('Текст может состоять только из русских букв!')
        return false
    }

    if (cypherKey.value % 1 != 0 || cypherKey.value < 1 || cypherKey.value > 32) {
        alert('Ключевой элемент должен быть числом от 1 до 32')
        return false
    }

    return true
}