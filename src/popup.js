"use strict";

import $ from "jquery";
import { createPage, retrievePage } from "./notion";

chrome.storage.local.get(
  [
    "auto_jump_to_notion_page",
    "add_description_to_page",
    "notion_database_id",
    "notion_secret",
  ],
  (items) => {
    $("#options").text(
      "设置选项：\n" +
        JSON.stringify(items, null, 2) +
        "\n若有误，请去插件设置页面修改"
    );
  }
);

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
      if (
        (await chrome.storage.local.get(["auto_jump_to_notion_page"]))[
          "auto_jump_to_notion_page"
        ]
      ) {
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
