import {Profile} from "../models/profile";

async function getProfileInfo(): Promise<Profile> {
  const fullName = document.querySelectorAll(".pv-top-card--list li")[0];
  const title = document.querySelectorAll(".pv-top-card h2.mt1")[0];

  return {
    fullName: fullName.textContent.replace(/\n/, "").trim(),
    title: title.textContent.replace(/\n/, "").trim(),
    country: "France",
    imageUrl :"https://www.influencia.net/data/classes/actualite/actu_7920_image2012rectangle_petite.jpg"
  };
}

let profile: Profile = null;
setTimeout(() => {
  getProfileInfo().then(result => {
    profile = result || profile;
  });
}, 5000);

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getFullName") {
    response(profile);
  }

  return true;
});
