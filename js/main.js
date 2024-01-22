"use strict";

// Scroll header button to form
(function () {
	// Функция для плавной прокрутки
	const smoothScroll = (targetEl, duration) => {
		// Получаем высоту заголовка (header)
		const headerElHeight = document.querySelector(".header").clientHeight;
		let target = document.querySelector(targetEl);
		// Получаем позицию целевого элемента относительно вьюпорта с учетом высоты заголовка
		let targetPosition = target.getBoundingClientRect().top - headerElHeight;
		let startPosition = window.pageYOffset;
		let startTime = null;

		// Функция для расчета плавности
		const ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		};

		// Функция анимации
		const animation = (currentTime) => {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};

		// Запуск анимации
		requestAnimationFrame(animation);
	};

	// Функция для обработки кликов по кнопке
	const scrollButtons = document.querySelectorAll(".js-scrollButton");
	scrollButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// Обозначим секцию к которой нужна прокрутка
			const currentTarget = ".app-form";
			smoothScroll(currentTarget, 1000);
		});
	});
})();

// Navigation in services
const toggleContent = (category, element) => {
	// Hide smile-img
	const smileImg = document.querySelector(".smile-img");
	smileImg.classList.add("hidden");

	// Show swiper
	const swiper = document.querySelector(".swiper");
	swiper.classList.remove("hidden");

	// Additional logic based on the category if needed
	if (category !== "architectural") {
		// Do something specific for other categories
		// For now, let's assume hiding swiper for other categories
		swiper.classList.add("hidden");
		// Show smile-img for other categories
		smileImg.classList.remove("hidden");
	}

	// Update active class in the navigation links
	const navLinks = document.querySelectorAll(".services__nav-link");
	navLinks.forEach((link) =>
		link.classList.remove("services__nav-link--active")
	);

	// Add active class to the clicked navigation link
	element.classList.add("services__nav-link--active");
};

// Swiper
const swiper = new Swiper(".image-slider", {
	// Optional parameters
	direction: "horizontal",
	loop: true,
	centeredSlides: true,
	slidesPerView: 1.8,
	speed: 500,

	// Coverflow effect
	effect: "coverflow",
	coverflowEffect: {
		rotate: 10,
		slideShadows: false,
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

// Form validation
// initialize the validation library
const validation = new window.JustValidate("#form", {
	errorFieldCssClass: "is-input-invalid",
	errorLabelCssClass: "is-label-invalid",

	successFieldCssClass: "just-validate-success-field",
	submitFormAutomatically: false,
	lockForm: true,
	successMessage: "Success Message",
});

validation
	.addField("#basic-name", [
		{
			rule: "required",
			errorMessage: "*Поле обязательно для заполнения",
		},
		{
			rule: "minLength",
			value: 3,
			errorMessage: "Минимальное количество символов - 3",
		},
		{
			rule: "maxLength",
			value: 15,
			errorMessage: "Минимальное количество символов - 15",
		},
	])
	.addField("#basic-phone-number", [
		{
			rule: "required",
			errorMessage: "*Поле обязательно для заполнения",
		},
		{
			rule: "number",
			errorMessage: "Неверный номер!",
		},
		{
			rule: "minLength",
			value: 11,
			errorMessage: "Минимальное количество цифр - 11",
		},
		{
			rule: "maxLength",
			value: 11,
			errorMessage: "Максимальное количество цифр - 11",
		},
	]);
