document.addEventListener("DOMContentLoaded", function () {
	// Header background toggle
	function updateScroll() {
		const header = document.querySelector("header");
		if (window.innerHeight - 96 < window.scrollY && window.scrollY < document.body.scrollHeight - window.innerHeight - 48) {
			header.classList.add("-showbg");
		} else {
			header.classList.remove("-showbg");
		}
	}
	document.addEventListener("scroll", updateScroll);
	updateScroll();

	// Menu toggle
	const openMenuBtn = document.querySelector("header > .-openmenu");
	if (openMenuBtn) {
		openMenuBtn.addEventListener("click", function () {
			document.querySelector("header").classList.toggle("-opened");
		});
	}

	// Section 3 members
	membersData.forEach(function (el, i) {
		const crtButton = document.createElement("button");
		crtButton.dataset.member = i;
		crtButton.dataset.name = el.name.replace(/\(.+\)/g, "");
		crtButton.style.backgroundImage = `url(${el.thumbnailImage})`;
		document.querySelector("#section-3 > .-sub").appendChild(crtButton);
	});

	document.querySelectorAll("#section-3 > .-sub > button").forEach(el =>
		el.addEventListener("click", function () {
			if (section3IsOpenUser) section3ToggleUser();
			section3ToggleUser(this.dataset.member);
		})
	);

	document.querySelector("#section-3 .-close").addEventListener("click", function () {
		section3ToggleUser();
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && section3IsOpenUser) {
			section3ToggleUser();
		}
	});

	// Smooth anchor scroll
	document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(el =>
		el.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				window.scrollTo({
					top: target.offsetTop - 100,
					behavior: "smooth"
				});
			}
		})
	);

	// Initialize slideshow
	showSlides(slideIndex);

	// Initialize second slideshow
	showSlides2(slideIndex2);

	// Initialize video modal
	initVideoModal();
});

// Section 3 about user
let section3IsOpenUser = false;
let section3CurrentlyOpenedUser = 0;

function section3ToggleUser(member = 0) {
	const aboutSection = document.querySelector("#section-3 > .-about");
	const isMobile = window.innerWidth <= 768;

	section3IsOpenUser = !section3IsOpenUser;

	if (section3IsOpenUser) {
		if (member < 0 || member >= membersData.length) {
			section3ToggleUser();
		} else {
			section3CurrentlyOpenedUser = parseInt(member);
			const data = membersData[section3CurrentlyOpenedUser];

			const age = Math.floor((Date.now() - data.birth) / (1000 * 60 * 60 * 24 * 365.25));
			const classYear = 13 - (data.class - new Date().getFullYear());
			const className = "a " + ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][classYear] + "-a";

			// Fill fields
			aboutSection.querySelector("img").src = data.descriptionImage;
			aboutSection.querySelector("h2").textContent = data.name;
			aboutSection.querySelector(".-age").textContent = age + (age >= 20 ? " de" : "") + " ani";
			aboutSection.querySelector(".-class").textContent = className + " " + data.classIndex;
			aboutSection.querySelector(".-passion").textContent = data.passions;
			aboutSection.querySelector(".-descriere").textContent = data.description;

			aboutSection.querySelectorAll(".-roluri > li").forEach(el => {
				el.style.display = data.roles.includes(parseInt(el.dataset.id)) ? "inline-block" : "none";
			});

			// Mobile behavior
			aboutSection.querySelector("img").style.display = isMobile ? "none" : "block";

			aboutSection.style.opacity = 1;
			aboutSection.style.pointerEvents = "all";
		}
	} else {
		aboutSection.style.opacity = 0;
		aboutSection.style.pointerEvents = "none";
	}
}

// Navigation in about section
function navigateMember(direction) {
	let newIndex = section3CurrentlyOpenedUser + direction;
	if (newIndex < 0) newIndex = membersData.length - 1;
	if (newIndex >= membersData.length) newIndex = 0;

	section3ToggleUser(); // close current
	section3ToggleUser(newIndex); // open new
}

// Slideshow 1
let slideIndex = 1;
function showSlides(n) {
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("dot");

	if (n > slides.length) { slideIndex = 1; }
	if (n < 1) { slideIndex = slides.length; }

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active");
	}
	if(slides.length && dots.length){
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].classList.add("active");
	}
}

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

// Slideshow 2 (if needed)
let slideIndex2 = 1;
function showSlides2(n) {
	let slides = document.getElementsByClassName("mySlide");
	let dots = document.getElementsByClassName("dot");

	if (n > slides.length) { slideIndex2 = 1; }
	if (n < 1) { slideIndex2 = slides.length; }

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active");
	}
	if(slides.length && dots.length){
		slides[slideIndex2 - 1].style.display = "block";
		dots[slideIndex2 - 1].classList.add("active");
	}
}

function plusSlides2(n) {
	showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
	showSlides2(slideIndex2 = n);
}

// Video modal
function initVideoModal() {
	const modal = document.getElementById("video-modal");
	const btn = document.getElementById("open-video");
	const closeBtn = document.querySelector(".close");
	const video = modal ? modal.querySelector("video") : null;

	if (!modal || !btn || !closeBtn || !video) return;

	modal.style.display = "none";
	video.pause();
	video.currentTime = 0;
	video.muted = true;

	btn.addEventListener("click", function (event) {
		event.preventDefault();
		modal.style.display = "flex";
		video.muted = false;
		video.play();
	});

	function closeModal() {
		modal.style.display = "none";
		video.pause();
		video.currentTime = 0;
		video.muted = true;
	}

	closeBtn.addEventListener("click", closeModal);
	window.addEventListener("click", function (event) {
		if (event.target === modal) {
			closeModal();
		}
	});
}
