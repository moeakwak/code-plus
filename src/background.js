"use strict";

console.log("bg ok");

chrome.runtime.onInstalled.addListener(() => {
  // TODO: set Notion config
});

// inject content script when click the icon
chrome.action.onClicked.addListener((tab) => {
  console.log("click", tab);

  // for acwing
  let acwing_pattern = /.*www.acwing.com\/problem\/content\/description\/(\d+).*/;
  if (acwing_pattern.test(tab.url)) {
    console.log("inject to", tab.url);
    chrome.scripting.executeScript({
      files: ["acwing.js"],
      target: { tabId: tab.id },
    });
  }
})

let latest_info = {};

// open page after getting info
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type == "info") {
    latest_info = request.data;
    chrome.tabs.create({
      url: "popup.html"
    });
  } else if (request.type == "popup-ready") {
    sendResponse(latest_info);
  }
});
