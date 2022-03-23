"use strict";

import $ from "jquery";
import { html2md } from "./utils.js";

// This is the content script for acwing.com

console.log("CodePlus acwing ok");

let from = "AcWing";
let url = window.location.href;
let title_regex = /(\d+)\.(.*)/;
let full_title = $("div[class='nice_font problem-content-title']")
  .text()
  .trim();
let id = full_title.match(title_regex)[1].trim();
let title = full_title.match(title_regex)[2].trim();
let description = html2md($("[data-tab='preview-tab-content']").html(), from);
let code = "";
$("#code_editor > div.ace_scroller > div > div.ace_layer.ace_text-layer")
  .children()
  .each(function () {
    code += $(this).text() + "\n";
  });
let code_language = $("select[name='language']").children(":selected").text().toLowerCase();
let tags = [];
$("div.problem-algorithm-tag-field")
  .children("a")
  .each(function () {
    tags.push($(this).text().trim());
  });
let difficulty = $(
  "#acwing_page > div > div > div > div > div.row > div.col-sm-3.hidden-xs > div > table > tbody > tr:nth-child(1) > td > span"
)
  .text()
  .trim();

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
