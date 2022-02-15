'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type="range"]');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const inputCollect = document.getElementsByClassName('total-input');
const total = inputCollect[0];
const totalCount = inputCollect[1];
const totalCountOther = inputCollect[2];
const fullTotalCount = inputCollect[3];
const totalCountRollback = inputCollect[4];
let screens = document.querySelectorAll('.screen');

const appData = {
	title: '',
	adaptive: true,
	screens: [], // массив с экранами
	servicesPercent: {}, // объект с доп услугами %
	servicesNumber: {}, // объект с доп услугами цены
	screenPrice: 0, // стоимость всех экранов
	screenNumber: 0,
	servicePricesPercent: 0, // стоимость доп услуг %
	servicePricesNumber: 0, // стоимость доп услуг цена
	fullPrice: 0, // итоговая стоимость
	rollback: 0, // процент отката
	servicePercentPrice: 0, // стоимость с учетом отката

	// Инициализируем методы
	init: function () {
		this.addTitle(); // Запуск при загрузке страницы
		startBtn.addEventListener('click', this.checkAddScreens.bind(this)); // Запуск расчетов при нажатии на кнопку Рассчитать
		btnPlus.addEventListener('click', this.addScreenBlock); // Запуск при нажатии на кнопку +
		inputRange.addEventListener('input', this.getRollbackPercent.bind(this));
	},

	addTitle: () => document.title = title.textContent, // Заголовок страницы равен заголовку h1


	// запускаем методы рассчета стоимости верстки
	start: function () {
		this.addScreens(); // экраны
		this.addServices(); // услуги
		this.addPrices(); // расчеты
		this.showResult(); // результаты
		// this.logger();
	},

	// Итого
	showResult: function () {
		total.value = this.screenPrice; // сумма верстки экранов
		totalCount.value = this.screenNumber; // количество экранов
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber; // сумма доп услуг
		fullTotalCount.value = this.fullPrice; // сумма верстки + доп
		totalCountRollback.value = this.servicePercentPrice; // итог с учетом отката
	},
	// Результат проверки полей
	checkAddScreens: function () {
		if (this.addScreens() === true) { // если при проверке полей возвращается true
			this.start(); // запускаем расчеты
		} else {
			alert('Не заполнены поля'); // иначе алерт
		}
	},

	// добавляем в массив элементы с типом, количеством экранов и суммарной стоимостью
	addScreens: function () {
		this.screens = [];

		screens = document.querySelectorAll('.screen'); // переопределяем переменную screens
		screens.forEach((screen, index) => { // перебираем массив с
			const select = screen.querySelector('select'); // типы экранов
			const input = screen.querySelector('input'); // количество экранов
			const selectName = select.options[select.selectedIndex].textContent; // проверка на заполнение полей
			this.screens.push({ // закидываем в массив элементы и указываем их
				id: index, // индекс
				name: selectName, // имя выбранного экрана
				count: +input.value, // количество экранов
				price: +select.value * +input.value // произведение цены экрана на количество
			});
		});

		// проверка полей на заполнение
		if (this.screens.find(item => {
				return item.price == 0; // если найдется хоть одно значение price равное 0, а это будет значить что одно из полей не заполненно
			})) {
			return false; // позвращаем false
		} else {
			return true; //возвращаем true
		}
	},

	// добавляем новый блок с экранами
	addScreenBlock: function () {

		const cloneScreen = screens[0].cloneNode(true); // клонируем оригинал блока
		screens[screens.length - 1].after(cloneScreen); // вставляем клон после оригинала

	},

	// Добавляем дополнительные услуги
	addServices: function () {
		// перебираем коллекцию импутов с процентами
		otherItemsPercent.forEach(item => {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) { // проверка чекбокса
				this.servicesPercent[label.textContent] = +input.value; // передаем в объект servicesPercent значение инпутов  otherItemsPercent
			}
		});

		// перебираем коллекцию импутов с ценой/числами
		otherItemsNumber.forEach(item => {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) { // проверка чекбокса
				this.servicesNumber[label.textContent] = +input.value; //передаем в объект servicesNumber значение инпутов  otherItemsNumber
			}
		});
	},

	// Делаем расчеты

	// перебираем элементы в массиве с экранами
	addPrices: function () {
		for (let screen of this.screens) {
			this.screenPrice += +screen.price; // суммируем стоимость всех типов экранов
		}
		// перебираем элементы в массиве с экранами
		for (let screen of this.screens) {
			this.screenNumber += +screen.count; // суммируем количество всех экранов
		}

		// перебираем доп услуги с ценой
		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key]; // стоимость доп услуг с ценой
		}

		// перебираем доп услуги с процентами
		for (let key in this.servicePercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100); // стоимость доп услуг %
		}

		this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesNumber; // итоговая стоимость

		this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100)); // стоимость с учетом отката

	},

	// Значение бегунка заноситься в свойство rollback
	getRollbackPercent: function () {
		inputRangeValue.textContent = inputRange.value + "%";
		this.rollback = inputRange.value;

		totalCountRollback.value = Math.ceil(fullTotalCount.value - fullTotalCount.value * (this.rollback / 100)); // изменение стоимости с учетом отката при изменении процента
	},

	logger: function () {
		console.log(this.fullPrice);
		console.log(screens);
		console.log(this.servicePercentPrice);
	}
};

appData.init();