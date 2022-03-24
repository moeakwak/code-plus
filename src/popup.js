"use strict";

import $ from "jquery";
import { createPage, retrievePage } from "./notion";

$("#send").on("click", async () => {
  retrievePage();
  let info = JSON.parse($("#info").text());
  let idea = "";
  // let idea = $("#idea").val();
  let status = $("input[name='status']:checked").val();
  if (status == "other") status = $("input[name='status-other']").val();
  info.status = status;
  console.log("Codeplus info", info);
  $("#result").text("Please wait...");
  await createPage(
    info,
    idea,
    async (response) => {
      console.log("call createPage success", response);
      $("#result").html(`<div><p style="color:green">Success!</p>
        <p>id: ${response.id}</p>
        <p>url: <a href="${response.url}">${response.url}</a></p></div>`);
      if ((await chrome.storage.local.get(["auto_jump_to_notion_page"]))["auto_jump_to_notion_page"]) {
        window.location.href = response.url;
      }
    },
    (error) => {
      $("#result").html(`<p style="color:red">${error.info}</p>`);
    }
  );
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

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log("popup recv msg", request);
//   if (request.type = "notion-response") {

//   };
// })
