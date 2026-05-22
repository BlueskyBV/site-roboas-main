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
				const top = target.getBoundingClientRect().top + window.scrollY - 100;
				window.scrollTo({ top, behavior: "smooth" });
			}
		})
	);

	showSlides(slideIndex);
	showSlides2(slideIndex2);
	showSlides3(slideIndex3);
	initVideoModal();

// --- Donation Toast Logic ---
	const toast = document.getElementById("donation-toast");
	const closeToastBtn = document.getElementById("close-toast");
	const toastLink = document.querySelector(".toast-btn");

	if (toast && closeToastBtn) {
		// Close when clicking the X
		closeToastBtn.addEventListener("click", function () {
			toast.style.display = "none";
		});
	}

	if (toast && toastLink) {
		// Also close the toast if they actually click the link to go donate
		toastLink.addEventListener("click", function () {
			toast.style.display = "none";
		});
	}
	// --- Season Dropdown Logic ---
	const seasonToggleBtn = document.getElementById('btn-season-24-25');
	const seasonContent = document.getElementById('content-season-24-25');

	if (seasonToggleBtn && seasonContent) {
		seasonToggleBtn.addEventListener('click', function() {
			// Toggle the "active" class on the button (flips the arrow)
			this.classList.toggle('active');
			
			// Toggle the "show" class on the content (slides it down)
			seasonContent.classList.toggle('show');
		});
	}

	// --- Animations ---
	initScrollReveal();
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

/* ============================================================
   SCROLL REVEAL — uses IntersectionObserver
   Adds .reveal / .reveal--left / .reveal--right / .reveal--scale
   classes to key elements, then observes them.
   ============================================================ */
function initScrollReveal() {
	if (!("IntersectionObserver" in window)) {
		// Fallback: just show everything
		document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => {
			el.classList.add("is-visible");
		});
		return;
	}

	// Assign reveal classes to elements that don't already have them
	const sectionSelectors = [
		{ sel: "#section-2 .-left",   cls: "reveal reveal--left"  },
		{ sel: "#section-2 .-right",  cls: "reveal reveal--right" },
		{ sel: "#section-12 .-right", cls: "reveal reveal--right" },
		{ sel: "#section-7 .-left",   cls: "reveal reveal--left"  },
		{ sel: "#section-7 .-right",  cls: "reveal reveal--right" },
		{ sel: "#section-11 .-content", cls: "reveal"             },
		{ sel: "#section-9 .-left",   cls: "reveal reveal--left"  },
		{ sel: "#section-9 .-right",  cls: "reveal reveal--right" },
		{ sel: "#section-9 #robot-down", cls: "reveal"            },
		{ sel: "#section-9 #materials",  cls: "reveal"            },
		{ sel: "#section-5 .-realizari", cls: "reveal"            },
		{ sel: "#section-8",           cls: "reveal"              },
		{ sel: "#section-10",          cls: "reveal"              },
		{ sel: "#section-4 > p",       cls: "reveal"              },
		{ sel: "#section-5 > p",       cls: "reveal"              },
	];

	sectionSelectors.forEach(({ sel, cls }) => {
		document.querySelectorAll(sel).forEach(el => {
			cls.split(" ").forEach(c => el.classList.add(c));
		});
	});

	// Sponsor grid: staggered children
	const sponsorGrid = document.querySelector("#section-4 > .-sponsors");
	if (sponsorGrid) sponsorGrid.classList.add("reveal-stagger");

	// Achievements table rows: stagger
	const tableBody = document.querySelector("#section-5 > .-realizari > tbody");
	if (tableBody) tableBody.classList.add("reveal-stagger");

	// Observer
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target); // animate once
			}
		});
	}, { threshold: 0.12 });

	document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => {
		observer.observe(el);
	});
}


