"use strict";

import $ from "jquery";
import { addPage } from "./notion.js";

$("#info").text("popup ok");

$("#send").on("click", () => {
  // retrieveDatabase();
  let info = JSON.parse($("#info").text());
  let status = $("input[name='status']:checked").val();
  if (status == "other") status = $("input[name='status-other']").val();
  info.status = status;
  console.log(info);
  addPage(info);
});

// receive info json
chrome.runtime.sendMessage(
  {
    type: "popup-ready",
  },
  (response) => {
    $("#info").text(JSON.stringify(response, null, 4));
  }
);
