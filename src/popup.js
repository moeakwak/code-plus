"use strict";

// import "./popup.css";

import $ from "jquery";

$("#info").text("popup ok");

// receive info json
chrome.runtime.sendMessage({
  type: "popup-ready"
}, (response) => {
  $("#info").text(JSON.stringify(response));
});