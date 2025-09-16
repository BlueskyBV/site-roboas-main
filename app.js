document.addEventListener("DOMContentLoaded", function () {
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

	const openMenuBtn = document.querySelector("header > .-openmenu");
	if (openMenuBtn) {
		openMenuBtn.addEventListener("click", function () {
			document.querySelector("header").classList.toggle("-opened");
		});
	}

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

	showSlides(slideIndex);
	showSlides2(slideIndex2);
	showSlides3(slideIndex3);
	initVideoModal();
});

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
	if (slides.length && dots.length) {
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].classList.add("active");
	}
}
function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

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
	if (slides.length && dots.length) {
		slides[slideIndex2 - 1].style.display = "block";
		dots[slideIndex2 - 1].classList.add("active");
	}
}
function plusSlides2(n) { showSlides2(slideIndex2 += n); }
function currentSlide2(n) { showSlides2(slideIndex2 = n); }

let slideIndex3 = 1;
function plusSlides3(n) { showSlides3(slideIndex3 += n); }
function currentSlide3(n) { showSlides3(slideIndex3 = n); }
function showSlides3(n) {
	let slides = document.getElementsByClassName("mySlides2");
	let dots = document.getElementsByClassName("dot2");
	if (n > slides.length) { slideIndex3 = 1 }
	if (n < 1) { slideIndex3 = slides.length }
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active");
	}
	if (slides.length && dots.length) {
		slides[slideIndex3 - 1].style.display = "block";
		dots[slideIndex3 - 1].classList.add("active");
	}
}

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
