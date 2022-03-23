"use strict";

import $ from "jquery";
import { createPage } from "./notion.js";

$("#send").on("click", async () => {
  // retrieveDatabase();
  let info = JSON.parse($("#info").text());
  let status = $("input[name='status']:checked").val();
  if (status == "other") status = $("input[name='status-other']").val();
  info.status = status;
  console.log("Codeplus info", info);
  $("#result").text("Please wait...");
  await createPage(
    info,
    "TBD",
    (response) => {
      console.log("call createPage success", response);
      $("#result").html(`<div>Success!
        <p>id: ${response.id}</p>
        <p>url: <a href="${response.url}">${response.url}</a></p></div>`);
    },
    (error) => {
      console.log(error);
      $("#result").text("call createPage error!");
    }
  );
  // chrome.runtime.sendMessage(
  //   {
  //     type: "add-page",
  //     info,
  //   },
  //   (response) => {
  //     console.log("popup output result", response);
  //     if (response.type == "error") {
  //       $("#result").text("error occured: " + response.error.statusText);
  //     } else {
  //       $("#result").html(`<div>Success!
  //       <p>id: ${response.page.id}</p>
  //       <p>url: <a href="${response.page.url}">${response.page.url}</a></p></div>`);
  //     }
  //   }
  // );
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
