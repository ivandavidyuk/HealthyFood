// бургер меню
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})

//вставка съеденных продуктов через template
let eatenArray = JSON.parse(localStorage.getItem('eatenArrayStringified') || '[]')

eatenArray = eatenArray.filter(e => e)

let eatenList = document.querySelector('.eaten__list'),
    eatenTemplate = document.querySelector('.eaten__template'),
    eaten;

let eatenInsert = function (array) {
    for (let i = 0; i < array.length; i++) {
        eaten = eatenTemplate.content.cloneNode(true)
        eaten.querySelector('.name').textContent = array[i].name
        eaten.querySelector('.macros').textContent = array[i].pfc
        eaten.querySelector('.price').textContent = array[i].kcal + ' кКал'
        eaten.querySelector('.eaten__photo img').src = array[i].img

        eatenList.append(eaten)
    }
}

eatenInsert(eatenArray)

// употреблено за день

let kcalOutput = document.querySelector('.kcal');
let pfcOutput = document.querySelector('.PFC');

let caloriesSum = function (array) {
    let sumOfCalories = array.reduce((n, { kcal }) => n + Number(kcal), 0)
    kcalOutput.innerHTML = Math.round(sumOfCalories) + ' кКал'
};

let pfcSum = function (array) {
    let pSum = array.reduce((n, { protein }) => n + Number(protein), 0)
    let fSum = array.reduce((n, { fat }) => n + Number(fat), 0)
    let cSum = array.reduce((n, { carbohydrates }) => n + Number(carbohydrates), 0)

    pfcOutput.innerHTML = Math.round(pSum) + 'г белков, ' + Math.round(fSum) + 'г жиров, ' + Math.round(cSum) + 'г углеводов'
};

caloriesSum(eatenArray)
pfcSum(eatenArray)

// кнопка delete

let deleteButtons = document.querySelectorAll('.delete')
let refreshButton = document.querySelector('.refresh')

let isZero = function () {
    if (kcalOutput.innerHTML == '0 кКал') {
        refreshButton.style.display = 'none'
    }
}
// уменьшение числа продуктов в корзине
let cartCounterMinus = function () {
    let number = window.localStorage.getItem('numberOfProducts')
    number--
    window.localStorage.setItem('numberOfProducts', number)
}
//
deleteButtons.forEach(function (button, i) {
    button.addEventListener('click', function (e) {
        // уменьшение числа продуктов в корзине
        cartCounterMinus()
        //
        // прибавление ккал после удлаения из списка съеденных
        caloriesAmount = window.localStorage.getItem('caloriesAmount')
        calories = window.localStorage.getItem('calories')
        caloriesAmount = Number(caloriesAmount) + Number(eatenArray[i].kcal)
        calories = Math.round(caloriesAmount) + ' кКал'
        calories.textContent = caloriesAmount + ' кКал'
        window.localStorage.setItem('caloriesAmount', caloriesAmount)
        window.localStorage.setItem('calories', calories)
        //
        eatenArray.splice(i, 1, {}) // нужен?
        delete eatenArray[i]
        window.localStorage.setItem('eatenArrayStringified', JSON.stringify(eatenArray))
        console.log(eatenArray)
        e.target.parentElement.remove()

        caloriesSum(eatenArray)
        pfcSum(eatenArray)
        isZero()
    })
})

isZero()

let eatenItem = document.querySelector('.eaten__item')

refreshButton.addEventListener('click', function (e) {
    window.localStorage.removeItem('eatenArrayStringified')
    e.target.parentElement.remove()
    kcalOutput.innerHTML = 0 + ' кКал'
    pfcOutput.innerHTML = 0 + 'г белков, ' + 0 + 'г жиров, ' + 0 + 'г углеводов'
    //
    let initialAmount = window.localStorage.getItem('initialAmount')
    calories = initialAmount
    calories.textContent = initialAmount
    window.localStorage.setItem('calories', calories)

    let number = window.localStorage.getItem('numberOfProducts')
    number = 0;
    window.localStorage.setItem('numberOfProducts', number)
})

