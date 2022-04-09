"use strict";

import $ from "jquery";
import { html2md } from "./utils.js";

// This is the content script for leetcode-cn

console.log("CodePlus leetcode ok");

let from = "Leetcode";
let url = window.location.href;
let full_title = $("[data-cypress='QuestionTitle']").text().trim();
let title_regex = /(.+)\.(.*)/;
let id = full_title.match(title_regex)[1].trim();
let title = full_title.match(title_regex)[2].trim();
// let description = html2md($("div[class^='content']").html(), from);
let description = $("div[class^='content']").html();

// already get code in background.js
let code = document.body.getAttribute("data-fullcode");

let code_language = $("#lang-select").children("span").text().toLowerCase();
let tags = [];
$("[class^='topic-tags']")
  .children("a")
  .each(function () {
    tags.push($(this).text().trim());
  });
let difficulty = $("[data-degree]").text().trim();

let info = {
  from,
  url,
  id,
  title,
  full_title,
  difficulty,
  description,
  code,
  code_language,
  tags,
};

console.log("CodePlus grabbed info", info);

chrome.runtime.sendMessage({
  type: "info",
  data: info,
});
