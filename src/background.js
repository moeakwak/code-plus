"use strict";

// set Notion config at first install
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});

// chrome.storage.local.set(config, () =>
//   console.log("background: ready", config)
// );

// inject content script when click the icon
chrome.action.onClicked.addListener((tab) => {
  let acwing_pattern =
    /.*www.acwing.com\/problem\/content(\/description)?\/(\d+).*/;
  let leetcodecn_pattern = /.*leetcode-cn.com\/problems\/[^\/]*\/$/;
  let matiji_pattern = /.*matiji.net\/.*\/$/;

  if (acwing_pattern.test(tab.url)) {
    // for acwing
    console.log("background: acwing inject to", tab);
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        world: "MAIN", // inject code to use monaco api
        func: () => {
          let fullcode = ace
            .edit(document.getElementById("code_editor"))
            .getValue();
          document.body.setAttribute("data-fullcode", fullcode);
        },
      },
      () => {
        chrome.scripting.executeScript({
          files: ["acwing.js"],
          target: { tabId: tab.id },
        });
      }
    );
  } else if (leetcodecn_pattern.test(tab.url)) {
    // for leetcode-cn
    console.log("background: leetcode inject to", tab);
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        world: "MAIN", // inject code to use monaco api
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
  } else if (tab.url.indexOf("matiji.net") != -1) {
    // for matiji
    console.log("background: matiji inject to", tab);
    chrome.scripting.executeScript({
      files: ["matiji.js"],
      target: { tabId: tab.id },
    });
  } else {
    console.warn("CodePlus 不支持当前页面");
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
