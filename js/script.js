'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// typed animation 
var typed = new Typed('.title', {
  strings: ['Cybersecurity Engineer', 'GRC Consultant', 'Front-End Developer', 'Back-End Developer', 'UX Designer'],
  loop: true,
  typeSpeed: 200,
  backSpeed: 100,
  startDelay: 50,
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    console.log("Clicked link:", navigationLinks[i].innerText); // Debug: check clicked link

    // Loop through all pages to show the matching page and hide others
    for (let j = 0; j < pages.length; j++) {
      // Check if the clicked link matches the data-page attribute
      if (navigationLinks[i].innerText.toLowerCase() === pages[j].dataset.page) {
        console.log("Showing page:", pages[j].dataset.page); // Debug: check page to be shown
        pages[j].classList.add("active"); // Show matching page
        navigationLinks[i].classList.add("active"); // Highlight clicked link
        window.scrollTo(0, 0); // Scroll to top of the page
      } else {
        pages[j].classList.remove("active"); // Hide non-matching pages
      }
    }

    // Remove 'active' class from all links except the clicked one
    navigationLinks.forEach((link, index) => {
      if (index !== i) {
        link.classList.remove("active");
      }
    });
  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // Correct spelling
const filterBtn = document.querySelectorAll("[data-filter-btn]");

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('[data-page="resume"]').classList.add("active");
});

// Only add the event listener if `select` exists
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Only loop if `selectItems` exist
if (selectItems.length) {
  // Add event to all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText; // Update selected value
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  if (filterItems.length) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
};

// Only proceed if `filterBtn` exists
if (filterBtn.length) {
  let lastClickedBtn = filterBtn[0]; // Set initial last clicked button

  // Add event to all filter button items for large screens
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active"); // Remove active from previous
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// Contact Form
const form = document.getElementById("my-form");

if (form) {
  async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("my-form-status");
    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Email Sent. Thanks!";
        status.classList.add("success");
        form.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! Email not sent!";
          }
          status.classList.add("error");
        });
      }
      setTimeout(() => {
        status.innerHTML = ""; // Clear message after 5 seconds
        status.classList.remove("success", "error");
      }, 5000); // 5000 milliseconds = 5 seconds
    }).catch(error => {
      status.innerHTML = "Oops! Email not sent";
      status.classList.add("error");

      setTimeout(() => {
        status.innerHTML = ""; // Clear message after 5 seconds
        status.classList.remove("success", "error");
      }, 5000);
    });
  }

  form.addEventListener("submit", handleSubmit);
}
