document.addEventListener("DOMContentLoaded", function () {
	function updateScroll() {
		if(window.innerHeight - 96 < window.scrollY && window.scrollY < document.body.scrollHeight - window.innerHeight - 48) {
			document.querySelector("header").classList.add("-showbg");
		} else {
			document.querySelector("header").classList.remove("-showbg");
		}
	}

	document.addEventListener("scroll", updateScroll);
	updateScroll();

	document.querySelector("header > .-openmenu").addEventListener("click", function () {
		document.querySelector("header").classList.toggle("-opened");
	});

	membersData.forEach(function(el, i) {
		var crtButton = document.createElement("button");
		crtButton.dataset.member = i;
		crtButton.dataset.name = el.name.replace(/\(.+\)/g, "");
		crtButton.style.backgroundImage = "url(" + el.thumbnailImage + ")";
		document.querySelector("#section-3 > .-sub").appendChild(crtButton);
	});

	Array.from(document.querySelectorAll("#section-3 > .-sub > button")).forEach(el => el.addEventListener("click", function() {
		if(section3IsOpenUser) section3ToggleUser();
		section3ToggleUser(this.dataset.member);
	}));

	document.querySelector("#section-3 > .-about > div > .-content > .-close").addEventListener("click", function () {
		section3ToggleUser();
	});

	document.addEventListener("keydown", function(e) {
		if(e.key === "Escape" && section3IsOpenUser) {
			section3ToggleUser();
		}
	});

	Array.from(document.querySelectorAll("a[href^=\"#\"]:not([href=\"#\"])")).forEach(el => el.addEventListener("click", function () {
		event.preventDefault();
		$('html, body').animate({scrollTop: $(this.getAttribute("href")).offset().top - 100}, 750);
	}));
});

var section3IsOpenUser = false;
var section3CurrentlyOpenedUser = 0;

function section3ToggleUser(member = 0) {
	section3IsOpenUser = !section3IsOpenUser;
	if(section3IsOpenUser) {
		if(member < 0 || member >= membersData.length) {
			section3ToggleUser();
		} else {
			section3CurrentlyOpenedUser = member;
			var crtVarsta = Math.floor((new Date() * 1 - membersData[member].birth) / (1000 * 60 * 60 * 24 * 365.25));
			var crtClasa = "a " + ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][13 - (membersData[member].class - new Date().getFullYear())] + "-a";
			document.querySelector("#section-3 > .-about > div > img").src = membersData[member].descriptionImage;
			document.querySelector("#section-3 > .-about > div > .-content > h2").innerHTML = membersData[member].name;
			document.querySelector("#section-3 > .-about > div > .-content .-age").innerHTML = crtVarsta + (crtVarsta >= 20 ? " de" : "") + " ani";
			document.querySelector("#section-3 > .-about > div > .-content .-class").innerHTML = crtClasa + " " + membersData[member].classIndex;
			document.querySelector("#section-3 > .-about > div > .-content .-passion").innerHTML = membersData[member].passions;
			Array.from(document.querySelectorAll("#section-3 > .-about > div > .-content > .-roluri > *")).forEach(el => el.style.display = (membersData[member].roles.includes(parseInt(el.dataset.id)) ? "inline-block" : "none"));
			document.querySelector("#section-3 > .-about > div > .-content .-descriere").innerHTML = membersData[member].description;
			document.querySelector("#section-3 > .-about").style.opacity = 1;
			document.querySelector("#section-3 > .-about").style.pointerEvents = "all";
		}
	} else {
		document.querySelector("#section-3 > .-about").style.opacity = 0;
		document.querySelector("#section-3 > .-about").style.pointerEvents = "none";
	}
}

document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("video-modal");
    var btn = document.getElementById("open-video");
    var closeBtn = document.querySelector(".close");
    var video = modal.querySelector("video"); // Select the video inside the modal

    // Initially, ensure the modal is hidden
    modal.style.display = "none";

    // Show modal when button is clicked
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "flex"; // Display modal
    });

    // Close modal and reset video
    function closeModal() {
        modal.style.display = "none"; // Hide modal
        if (video) {
            video.pause(); // Pause the video
            video.currentTime = 0; // Reset video to the beginning
        }
    }

    // Close modal when close button is clicked
    closeBtn.addEventListener("click", closeModal);

    // Close modal if clicked outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});










