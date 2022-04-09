"use strict";

import { config } from "./config.js";
import { createPage } from "./notion.js";

// TODO: set Notion config at first install
chrome.storage.local.set(config, () =>
  console.log("background: ready", config)
);

// chrome.runtime.onInstalled.addListener(() => {});

// inject content script when click the icon
chrome.action.onClicked.addListener((tab) => {
  // for acwing
  let acwing_pattern =
    /.*www.acwing.com\/problem\/content(\/description)?\/(\d+).*/;
  if (acwing_pattern.test(tab.url)) {
    console.log("background: inject to", tab);
    chrome.scripting.executeScript({
      files: ["acwing.js"],
      target: { tabId: tab.id },
    });
  }
  // for leetcode-cn
  let leetcodecn_pattern = /.*leetcode-cn.com\/problems\/[^\/]*\/$/;
  if (leetcodecn_pattern.test(tab.url)) {
    console.log("background: inject to", tab);
    // inject code to use monaco api
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        world: "MAIN",
        func: () => {
          let fullcode = monaco.editor.getModels()[0].getValue();
          document.body.setAttribute("data-fullcode", fullcode);
          // console.log("get code", fullcode);
        },
      },
      () => {
        chrome.scripting.executeScript({
          files: ["leetcode-cn.js"],
          target: { tabId: tab.id },
        });
      }
    );
  }
});

let latest_info = {};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("background recv message", request);
  if (request.type == "info") {
    latest_info = request.data;
    chrome.tabs.create({
      url: "popup.html",
    });
  } else if (request.type == "popup-ready") {
    sendResponse(latest_info);
  }
});
