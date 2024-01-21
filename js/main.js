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
function validation(form) {
	function removeError(input) {
		const parent = input.parentNode;

		if (parent.classList.contains("error-box")) {
			parent.querySelector(".error-label").remove();
			parent.classList.remove("error-box");
		}
	}

	function createError(input, text) {
		const parent = input.parentNode;
		const errorLabel = document.createElement("label");

		parent.classList.add("error-box");
		parent.append(errorLabel);

		errorLabel.classList.add("error-label");
		errorLabel.textContent = text;
	}

	let result = true;
	const allInputs = form.querySelectorAll("input");

	for (const input of allInputs) {
		removeError(input);

		if (input.value === "") {
			result = false;
			createError(input, "*Поле обязательно для заполнения");
		}
	}
	return result;
}

document
	.querySelector(".app-form")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Для отмены перехода по умолчанию

		if (validation(this) === true) {
			alert("Форма проверена успешно!");
		}
	});
