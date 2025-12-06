const inputs = document.querySelectorAll(".form-control");
const BookMarkForm = document.querySelector(".BookMarkForm");
const sitesData = document.querySelector(".sitesData");
const searchInput = document.querySelector(".searchInput");

let sites = JSON.parse(localStorage.getItem("sites")) || [];
let editIndex = null;

function validateName(name) {
    return name.trim() !== "";
}

function validateURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
    return pattern.test(url);
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validatePassword(pass) {
    return pass.length >= 6;
}

function showError(input, msg) {
    input.classList.add("is-invalid");

    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("invalid-feedback")) {
        input.insertAdjacentHTML(
            "afterend",
            `<div class="invalid-feedback">${msg}</div>`
        );
    }
}

function clearError(input) {
    input.classList.remove("is-invalid");
    if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
        input.nextElementSibling.remove();
    }
}

BookMarkForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = inputs[0].value;
    const url = inputs[1].value;
    const email = inputs[2].value;
    const password = inputs[3].value;

    let isValid = true;

    if (!validateName(name)) {
        showError(inputs[0], "Name cannot be empty");
        isValid = false;
    } else {
        clearError(inputs[0]);
    }

    if (!validateURL(url)) {
        showError(inputs[1], "Enter a valid URL (example: https://example.com)");
        isValid = false;
    } else {
        clearError(inputs[1]);
    }

    if (!validateEmail(email)) {
        showError(inputs[2], "Enter a valid email");
        isValid = false;
    } else {
        clearError(inputs[2]);
    }

    if (!validatePassword(password)) {
        showError(inputs[3], "Password must be at least 6 characters");
        isValid = false;
    } else {
        clearError(inputs[3]);
    }

    if (!isValid) return;

    const site = { name, url, email, password };

    if (editIndex !== null) {
        sites[editIndex] = site;
        editIndex = null;
    } else {
        sites.push(site);
    }

    localStorage.setItem("sites", JSON.stringify(sites));
    BookMarkForm.reset();
    diplaysites();

    document.querySelector(".btn-outline-success").textContent = "Save";
});

const diplaysites = () => {
    sitesData.innerHTML = sites
        .map(
            (site, index) => `
        <tr>
          <td>${index}</td>
            <td>${site.name}</td>
            <td>${site.url}</td>
            <td><a href='details.html?id=${index}'>details</a></td>
            <td><button class="btn btn-warning" onclick='editSite(${index})'>Edit</button></td>
            <td><button class="btn btn-outline-danger" onclick='deletesite(${index})'>Delete</button></td>
        </tr>`
        )
        .join("");
};

diplaysites();

const deletesite = (index) => {
    sites.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    diplaysites();
};

function editSite(index) {
    editIndex = index;

    const site = sites[index];

    inputs[0].value = site.name;
    inputs[1].value = site.url;
    inputs[2].value = site.email;
    inputs[3].value = site.password;

    document.querySelector(".btn-outline-success").textContent = "Update";
}

searchInput.addEventListener("input", () => {
    const filterText = searchInput.value.toLowerCase();

    const filtedsites = sites.filter((site) =>
        site.name.toLowerCase().includes(filterText)
    );

    const result = filtedsites
        .map(
            (site, index) => `
        <tr>
            <td>${index}</td>
            <td>${site.name}</td>
            <td>${site.url}</td>
            <td><a href="./details.html?id=${index}">details</a></td>
            <td><button class="btn btn-warning" onclick='editSite(${index})'>Edit</button></td>
            <td><button class='btn btn-outline-danger' onclick='deletesite(${index})'>Delete</button></td>
        </tr>`
        )
        .join("");

    sitesData.innerHTML = result;
});
