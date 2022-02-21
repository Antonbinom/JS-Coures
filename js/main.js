'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type="range"]');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const mainControlsInputs = document.querySelectorAll('.main-controls .custom-checkbox, select, .screen-btn, input:not([disabled], [type="range"])');
const checkboxes = document.querySelectorAll('.custom-checkbox');

const cmsBlock = document.querySelector('.hidden-cms-variants');
const otherBlock = cmsBlock.querySelector('.main-controls__input');

const selectCms = document.querySelector('#cms-select');
const inputCms = document.querySelector('#cms-open');
const otherInput = cmsBlock.querySelector('#cms-other-input');

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
	cmsBlock: [],
	cmsPercent: 0,

	// Инициализируем методы
	init() {
		this.addTitle(); // Запуск при загрузке страницы
		startBtn.addEventListener('click', this.checkAddScreens.bind(this)); // Запуск расчетов при нажатии на кнопку Рассчитать
		resetBtn.addEventListener('click', this.reset.bind(this)); // Запуск расчетов при нажатии на кнопку Рассчитать
		btnPlus.addEventListener('click', this.addScreenBlock.bind(this)); // Запуск при нажатии на кнопку +
		inputRange.addEventListener('input', this.getRollbackPercent.bind(this));
		inputCms.addEventListener('change', this.openCms);
		selectCms.addEventListener('change', this.chooseCms);
		otherInput.addEventListener('input', this.otherCmsPercent.bind(this));
	},

	addTitle: () => document.title = title.textContent, // Заголовок страницы равен заголовку h1

	// запускаем методы рассчета стоимости верстки
	start() {
		this.addScreens(); // экраны
		this.addServices(); // услуги
		this.addPrices(); // расчеты
		this.showResult(); // результаты
		// this.logger();
		this.disabled();
		this.changeButtons();
	},

	// Итого
	showResult() {
		total.value = this.screenPrice; // сумма верстки экранов
		totalCount.value = this.screenNumber; // количество экранов
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber; // сумма доп услуг
		fullTotalCount.value = this.fullPrice; // сумма верстки + доп
		totalCountRollback.value = this.servicePercentPrice; // итог с учетом отката
	},
	// Результат проверки полей
	checkAddScreens() {
		if (this.addScreens() === true) { // если при проверке полей возвращается true
			this.start(); // запускаем расчеты
		} else {
			alert('Не заполнены поля'); // иначе алерт
		}
	},

	// добавляем в массив элементы с типом, количеством экранов и суммарной стоимостью
	addScreens() {
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
	addScreenBlock() {
		const cloneScreen = screens[0].cloneNode(true); // клонируем оригинал блока
		screens[screens.length - 1].after(cloneScreen); // вставляем клон после оригинала

	},

	// Добавляем дополнительные услуги
	addServices() {
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

	// Показываем/скрываем select с CMS
	openCms() {
		otherBlock.style.display = "none";
		selectCms.selectedIndex = 0;
		if (this.checked) {
			cmsBlock.style.display = "flex";
		} else {
			cmsBlock.style.display = "none";
		}
	},

	chooseCms() {
		const selectName = this.options[this.selectedIndex].value;
		if (selectName == "other") {
			otherBlock.style.display = "flex";
		} else if (selectName == "50") {
			appData.cmsPercent = +this.value;
			otherBlock.style.display = "none";
		} else {
			otherBlock.style.display = "none";
		}
	},

	otherCmsPercent() {
		this.cmsPercent = +otherInput.value;
	},
	// перебираем элементы в массиве с экранами
	addPrices() {
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

		this.fullPrice = (+this.screenPrice + this.servicePricesNumber + this.servicePricesNumber) // итоговая стоимость
		this.fullPrice += this.fullPrice * (this.cmsPercent / 100);
		this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100)); // стоимость с учетом отката
	},

	// Значение бегунка заноситься в свойство rollback
	getRollbackPercent() {
		inputRangeValue.textContent = inputRange.value + "%";
		this.rollback = +inputRange.value;

		totalCountRollback.value = Math.ceil(fullTotalCount.value - fullTotalCount.value * (this.rollback / 100)); // изменение стоимости с учетом отката при изменении процента
	},

	disabled() {
		const mainControlsInputs = document.querySelectorAll('.main-controls .custom-checkbox, select, .screen-btn, input:not([disabled], [type="range"])');
		mainControlsInputs.forEach(item => {
			item.setAttribute("disabled", true);
		});
	},

	changeButtons() {
		startBtn.style.display = "none";
		resetBtn.style.display = "flex";
	},

	reset() {
		this.objectPropertiesReset();
		this.screensReset();
		this.disabledAttributeReset();
		this.cmsCheckboxReset();
		this.buttonsReset();
		this.inputRangeReset();
		this.addPrices();
		this.addServices();
		this.showResult();
	},

	objectPropertiesReset() {
		this.screenPrice = 0;
		this.screenNumber = 0;
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
		this.fullPrice = 0;
		this.servicePercentPrice = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
		this.screens = [];
		this.rollback = 0;
		this.cmsPercent = 0;
	},

	screensReset() {
		screens.forEach((item, index) => {
			if (index > 0) {
				item.remove();
			}
		});
		const screenSelect = document.querySelector('select');
		let input = document.querySelector('input');
		let select = document.querySelectorAll('select');
		screenSelect.selectedIndex = 0;
		input.value = '';
		select.value = 0;
	},

	disabledAttributeReset() {
		mainControlsInputs.forEach(item => {
			item.removeAttribute("disabled");
		});

		checkboxes.forEach(item => item.checked = false);
	},
	cmsCheckboxReset() {
		inputCms.checked = false;
		cmsBlock.style.display = "none";
		otherInput.value = '';
	},
	inputRangeReset() {
		inputRange.value = 0;
		inputRangeValue.textContent = inputRange.value + "%";
	},
	buttonsReset() {
		startBtn.style.display = "flex";
		resetBtn.style.display = "none";
	},
	logger() {
		console.log(this.fullPrice);
		console.log(screens);
		console.log(this.servicePercentPrice);
	}
};

appData.init();