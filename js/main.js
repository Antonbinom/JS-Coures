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
	servicePricesPercent: 0, // стоимость доп услуг %
	servicePricesNumber: 0, // стоимость доп услуг цена
	fullPrice: 0, // итоговая стоимость
	rollback: 0, // процент отката
	servicePercentPrice: 0, // стоимость с учетом отката

	// Инициализируем методы
	init: function () {
		appData.addTitle(); // Запуск при загрузке страницы
		startBtn.addEventListener('click', appData.start); // Запуск расчетов при нажатии на кнопку Рассчитать
		btnPlus.addEventListener('click', appData.addScreenBlock); // Запуск при нажатии на кнопку +
		inputRange.addEventListener('input', appData.getRollbackPercent);
	},

	addTitle: function () {
		document.title = title.textContent; // Заголовок страницы равен заголовку h1
	},

	start: function () {
		// запускаем методы рассчета стоимости верстки
		appData.addScreens(); // экраны
		appData.addServices(); // услуги
		appData.addPrices(); //
		appData.showResult();
		// appData.logger();
	},

	showResult: function () {
		total.value = appData.screenPrice; //
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
	},
	// добавляем в массив элементы с типом, количеством экранов и суммарной ценой
	addScreens: function () {
		screens = document.querySelectorAll('.screen'); // переопределяем переменную screens
		screens.forEach(function (screen, index) { // перебираем массив с
			const select = screen.querySelector('select'); // типы экранов
			const input = screen.querySelector('input'); // количество экранов
			const selectName = select.options[select.selectedIndex].textContent; // проверка на заполнение полей
			if (selectName !== 'Тип экранов' &&
				input.value != 0) {
				appData.screens.push({ // закидываем в массив элементы и указываем их
					id: index, // индекс
					name: selectName, // имя выбранного экрана
					price: +select.value * +input.value // произведение цены экрана на количество
				});
				console.dir(input);
				console.dir(appData.screens);

			}
		});
	},

	// добавляем новый блок с экранами
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true); // клонируем оригинал блока
		screens[screens.length - 1].after(cloneScreen); // вставляем клон после оригинала
	},

	// добавляем дополнительные услуги
	addServices: function () {
		// перебираем коллекцию импутов с процентами
		otherItemsPercent.forEach(function (item) {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) { // проверка чекбокса
				appData.servicesPercent[label.textContent] = +input.value; // передаем в объект servicesPercent значение инпутов  otherItemsPercent
			}
		});
		// перебираем коллекцию импутов с ценой/числами
		otherItemsNumber.forEach(function (item) {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) { // проверка чекбокса
				appData.servicesNumber[label.textContent] = +input.value; //передаем в объект servicesNumber значение инпутов  otherItemsNumber
			}
		});
		// console.log(appData)
	},
	// делаем расчеты
	addPrices: function () {
		for (let screen of appData.screens) { // перебираем элементы в массиве с экранами
			appData.screenPrice += +screen.price; // и суммируем стоимость всех типов экранов
		}

		for (let key in appData.servicesNumber) { // перебираем доп услуги с ценой
			appData.servicePricesNumber += appData.servicesNumber[key]; // стоимость доп услуг с ценой
		}

		for (let key in appData.servicePercent) { // перебираем доп услуги с процентами
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100); // стоимость доп услуг %
		}

		appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesNumber; // итоговая стоимость

		appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100)); // стоимость с учетом отката

		totalCountRollback.value = appData.servicePercentPrice; // вывод в input

	},

	// В нашем объекте присутствует метод getServicePercentPrice. Данный метод рассчитывает доход с учетом отката посреднику. Перенести его логику в метод addPrices и выводить в поле с подписью "Стоимость с учетом отката"

	// Значение бегунка заноситься в свойство rollback
	getRollbackPercent: function () {
		inputRangeValue.textContent = inputRange.value + "%";
		appData.rollback = inputRange.value;
	},

	// скидка клиента
	getRollbackMessage: function (price) {
		if (price >= 30000) {
			return 'Даем скидку в 10 %';
		} else if (price >= 15000 && price < 30000) {
			return 'Даем скидку в 5%';
		} else if (price >= 0 && price < 15000) {
			return 'Скидка не предусмотрена';
		} else {
			return 'Что то пошло не так';
		}
	},

	logger: function () {
		console.log(appData.fullPrice);
		console.log(screens);
		console.log(appData.servicePercentPrice);
	}
};

appData.init();