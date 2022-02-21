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
	screens: [],
	servicesPercent: {},
	servicesNumber: {},
	screenPrice: 0,
	screenNumber: 0,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	rollback: 0,
	servicePercentPrice: 0,
	cmsBlock: [],
	cmsPercent: 0,

	init() {
		this.addTitle();
		startBtn.addEventListener('click', this.checkAddScreens.bind(this));
		resetBtn.addEventListener('click', this.reset.bind(this));
		btnPlus.addEventListener('click', this.addScreenBlock.bind(this));
		inputRange.addEventListener('input', this.getRollbackPercent.bind(this));
		inputCms.addEventListener('change', this.openCms);
		selectCms.addEventListener('change', this.chooseCms);
		otherInput.addEventListener('input', this.otherCmsPercent.bind(this));
	},

	addTitle: () => document.title = title.textContent,

	start() {
		this.addScreens();
		this.addServices();
		this.addPrices();
		this.showResult();
		this.disabled();
		this.changeButtons();
	},

	showResult() {
		total.value = this.screenPrice;
		totalCount.value = this.screenNumber;
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
		fullTotalCount.value = this.fullPrice;
		totalCountRollback.value = this.servicePercentPrice;
	},

	checkAddScreens() {
		if (this.addScreens() === true) {
			this.start();
		} else {
			alert('Не заполнены поля');
		}
	},


	addScreens() {
		this.screens = [];

		screens = document.querySelectorAll('.screen');
		screens.forEach((screen, index) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;
			this.screens.push({
				id: index,
				name: selectName,
				count: +input.value,
				price: +select.value * +input.value
			});

		});


		if (this.screens.find(item => {
				return item.price == 0;
			})) {
			return false;
		} else {
			return true;
		}
	},

	addScreenBlock() {
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},

	addServices() {
		otherItemsPercent.forEach(item => {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) {
				this.servicesPercent[label.textContent] = +input.value;
			}
		});

		otherItemsNumber.forEach(item => {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');
			if (check.checked) {
				this.servicesNumber[label.textContent] = +input.value;
			}
		});
	},

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

	addPrices() {
		for (let screen of this.screens) {
			this.screenPrice += +screen.price;
		}
		for (let screen of this.screens) {
			this.screenNumber += +screen.count;
		}

		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}

		for (let key in this.servicePercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}

		this.fullPrice = (+this.screenPrice + this.servicePricesNumber + this.servicePricesNumber);
		this.fullPrice += this.fullPrice * (this.cmsPercent / 100);
		this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
	},

	getRollbackPercent() {
		inputRangeValue.textContent = inputRange.value + "%";
		this.rollback = +inputRange.value;

		totalCountRollback.value = Math.ceil(fullTotalCount.value - fullTotalCount.value * (this.rollback / 100));
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