document.addEventListener("DOMContentLoaded", function () {

    // LOGIN

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const message = document.getElementById("loginMessage");

            if (name.length < 2) {
                message.innerText = "Please enter your name.";
                return;
            }

            if (password.length < 6) {
                message.innerText = "Password must contain 6 characters.";
                return;
            }

            localStorage.setItem("inklyUser", name);
            localStorage.setItem("inklyEmail", email);

            window.location.href = "index.html";
        });
    }


    // SEARCH

    const search = document.getElementById("exploreSearch");

    if (search) {

        search.addEventListener("input", function () {

            let value = search.value.toLowerCase();

            document.querySelectorAll(".explore-card").forEach(card => {

                let text = card.innerText.toLowerCase();

                card.style.display =
                    text.includes(value) ? "block" : "none";

            });
        });
    }


    // FILTER

    const filters = document.querySelectorAll(".filter");

    filters.forEach(button => {

        button.addEventListener("click", function () {

            filters.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            let category = button.dataset.category;

            document.querySelectorAll(".explore-card").forEach(card => {

                if (category === "all" ||
                    card.dataset.category === category) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }
            });
        });
    });


    // NEWSLETTER

    const newsletter = document.getElementById("newsletterForm");

    if (newsletter) {

        newsletter.addEventListener("submit", function (e) {

            e.preventDefault();

            const input = newsletter.querySelector("input");
            const button = newsletter.querySelector("button");

            button.innerText = "Subscribed ✓";
            input.value = "";

        });
    }


    // CONTACT FORM

    const contact = document.getElementById("contactForm");

    if (contact) {

        contact.addEventListener("submit", function (e) {

            e.preventDefault();

            document.getElementById("formMessage").innerText =
                "Message sent successfully ✓";

            contact.reset();

        });
    }

});


// GUEST LOGIN

function guestLogin() {

    localStorage.setItem("inklyUser", "Guest");

    window.location.href = "index.html";
}


// DARK / LIGHT MODE

function toggleTheme() {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}


// REMEMBER THEME

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}


// PREVENT HOME WITHOUT LOGIN

if (
    !window.location.pathname.endsWith("login.html") &&
    !localStorage.getItem("inklyUser")
) {
    window.location.href = "login.html";
} script.js