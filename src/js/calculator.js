// Запрет ввода букв в input type='text'
let numberOnly = document.querySelectorAll('.number_only');
let prohibitedLetters = /[A-Za-zA-Яа-яЁё]/g;
for (let i = 0; i < numberOnly.length; i++) {
    numberOnly[i].oninput = function () {
        this.value = this.value.replace(prohibitedLetters, '');
    }
}

// Подсчет дневной нормы калорий //
// Запись значений в массив и подсчет калоража по формуле
let bmr;
let deficit;
let proficit;
let result = document.querySelector('.result')
let resetButton = document.querySelector('.reset')
let form = document.getElementById('form');
let labelLoss;
let labelMaintain;
let labelGain;
let selectedProgram;
let amount;
let continueButton = document.querySelector('.continue')

function serializeForm(formNode) {
    let { elements } = formNode //Деструктуризация объекта "Возьми свойство elements из объекта form"
    let data = Array.from(elements) // сделай массив из htmlcollection elements  
        .map(function (element) {
            let { name, value, checked } = element
            return { name, value, checked }
        }) // сделай из начального массива новый и возьми в него только свойства name, value и checked
        .filter((item) => !!item.name) //убери пустые элементы массива (пустые пары ключ-значение)
        .filter((item) => item.name === 'sex' ? item.checked : item)
// Попробовать другую формулу?
    function caloriesPerDay(sex, age, height, weight, activity) {
        if (sex == 'male') {
            bmr = Math.round((88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * activity);
        } else {
            bmr = Math.round((447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)) * activity);
        }
        return bmr
    }

    caloriesPerDay(data[0].value, data[1].value, data[2].value, data[3].value, data[4].value);
    
    deficit = Math.round(bmr * 0.85);
    proficit = Math.round(bmr * 1.15);
    
    labelLoss = document.querySelector('.loss');
    labelMaintain = document.querySelector('.maintain');
    labelGain = document.querySelector('.gain');
    
    labelLoss.textContent = 'Снижение ' + deficit + ' ккал';
    labelMaintain.textContent = 'Поддержание ' + bmr + ' ккал';
    labelGain.textContent = 'Набор ' + proficit + ' ккал';

    let program = document.querySelector('.program');
    program.addEventListener('change', function (e) {
        selectedProgram = document.querySelector(`[for="${e.target.id}"]`);
        //
        window.localStorage.setItem('calories', selectedProgram.textContent)
        window.localStorage.setItem('initialAmount', selectedProgram.textContent)
        amount = window.localStorage.getItem('calories');
        //
        window.localStorage.removeItem('eatenArrayStringified')
    })


    result.classList.remove('hidden')
    continueButton.classList.remove('hidden')
}

function handleFormSubmit(event) {
    event.preventDefault();
    serializeForm(form)
    
    let number = window.localStorage.getItem('numberOfProducts')
    number = 0;
    window.localStorage.setItem('numberOfProducts', number)
}

form.addEventListener('submit', handleFormSubmit);

resetButton.addEventListener('click', function () {
    result.classList.add('hidden')
    continueButton.classList.add('hidden')
})
