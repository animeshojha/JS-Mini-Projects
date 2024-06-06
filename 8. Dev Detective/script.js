const input = document.querySelector("#input");
const error = document.querySelector("#no-results");
const submitbtn = document.querySelector("#submit");
const avatar = document.querySelector(".profile-image");
const name = document.querySelector(".name");
const username = document.querySelector(".username");
const bio = document.querySelector(".bio");
const Repos = document.querySelector(".Repos-class");
const followers = document.querySelector(".followers-class");
const following = document.querySelector(".following-class");
const locationName = document.querySelector("#location-class");
const websiteName = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const date = document.querySelector(".Date");
const mode = document.querySelector(".mode"); // Mode icon element
const modetext = document.querySelector(".modeText"); // Mode text element
const modeicon = document.querySelector("#mode-icon"); // Mode icon image element
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let darkmode = false;

input.addEventListener("click", () => {
  error.style.display = "none";
});

submitbtn.addEventListener("click", () => {
  const gitusername = input.value.trim(); // Retrieve current input value
  if (gitusername !== "") {
    getUserData(gitusername);
  } else {
    error.style.display = "block";
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const gitusername = input.value.trim();
    if (gitusername !== "") {
      getUserData(gitusername);
    } else {
      //error.style.display = "block";
    }
  }
});

async function getUserData(gitusername) {
  try {
    const response = await fetch(`https://api.github.com/users/${gitusername}`);
    if (!response.ok) {
      //throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    updateProfile(data);
  } catch (error) {
    throw error;
  }
}

function updateProfile(data) {
  if (data.message !== "Not Found") {
    error.style.display = "none";

    // Render to UI
    avatar.src = data.avatar_url;
    name.innerHTML = data.name;
    bio.innerHTML = data.bio == null ? "This profile has no bio" : data.bio;
    date.innerHTML = data.created_at;
    username.innerText = `@${data.login}`;
    username.href = `${data.html_url}`;
    Repos.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;
    const datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;

    locationName.innerHTML =
      data.location == null ? "Not Available" : data.location;
    if (data.blog) {
      websiteName.href = data.blog.startsWith("http")
        ? data.blog
        : "https://" + data.blog;
      websiteName.innerText = data.blog;
    } else {
      websiteName.href = "#";
      websiteName.innerText = "Not Available";
    }

    if (data.twitter_username) {
      twitter.href = data.twitter_username.startsWith("http")
        ? data.twitter_username
        : "https://twitter.com/" + data.twitter_username;
      twitter.innerText = data.twitter_username;
    } else {
      twitter.href = "#";
      twitter.innerText = "Not Available";
    }

    company.innerHTML = data.company == null ? "Not Available" : data.company;
  } else {
    console.log("user not found");
    error.style.display = "block";
  }
}

getUserData("animeshojha");

mode.addEventListener("click", () => {
  if (darkmode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Switch to dark mode
function darkModeProperties() {
  document.body.style.backgroundColor = "#141D2F";
  document.body.style.color = "white";
  document.querySelector(".profile-container").style.backgroundColor =
    "#1E2A47";
  document.querySelector(".form").style.backgroundColor = "#1E2A47";
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  name.style.color = "white";
  username.style.color = "blue";
  document.querySelector(".repos").style.backgroundColor = "black";
  input.style.backgroundColor = "#1E2A47";
  //input.placeholder.style.color = "white"
  input.style.color = "white";
  input.style.setProperty("--placeholder-color", "white");
  Repos.style.color = "white";
  followers.style.color = "white";
  following.style.color = "white";
  darkmode = true;
  console.log("darkmode changed to " + darkmode);
  localStorage.setItem("darkmode", true);
  console.log("setting dark mode to true");
}

function lightModeProperties() {
  document.body.style.backgroundColor = "#F6F8FF";
  document.body.style.color = "#4B6A9B";
  document.querySelector(".profile-container").style.backgroundColor =
    "#FEFEFE";
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  input.style.backgroundColor = "white";
  document.querySelector(".form").style.backgroundColor = "white";
  document.querySelector(".repos").style.backgroundColor = "#f6f8ff";
  input.style.color = "black";
  input.style.setProperty("--placeholder-color", "#4b6a9b");
  Repos.style.color = "black";
  followers.style.color = "black";
  following.style.color = "black";
  name.style.color = "black";
  darkmode = false;
  console.log("darkmode changed to " + darkmode);
  localStorage.setItem("darkmode", false);
  console.log("setting dark mode to false");
}

function init() {
  const darkmode = localStorage.getItem("dark-mode") === "true";

  if (darkmode) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
}

init();

// init()