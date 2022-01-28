let title = 'Интернет магазин';
let screens = 'Простые, Сложные, Интерактивные';
let screensPrice = 3000;
let rollback = 15;
let fullPrice = 99900;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screensPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

let screensLow = screens.toLowerCase().split(', ');
console.log(screensLow);

console.log(fullPrice * (rollback / 100));