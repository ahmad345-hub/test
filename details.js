const sitename=document.querySelector(".site name");
const params = new URLSearchParams(location.search);
const id = params.get("id");


const sites = JSON.parse(localStorage.getItem("sites"));


document.querySelector(".siteName").textContent = sites[id].name;
document.querySelector(".siteUrl").textContent = sites[id].url;
document.querySelector(".siteUserEmail").textContent = sites[id].email;
document.querySelector(".siteUserPassword").textContent = sites[id].password;
