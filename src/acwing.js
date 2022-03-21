'use strict';

import $ from "jquery";
import { html2md } from "./utils.js";

// This is the content script for acwing.com

console.log("CodePlus acwing ok");

let from = "acwing";
let title_regex = /(\d+)\.(.*)/;
let title_text = $("div[class='nice_font problem-content-title']").text().trim();
let id = title_text.match(title_regex)[1].trim();
let title = title_text.match(title_regex)[2].trim();
let description = html2md($("[data-tab='preview-tab-content']").html(), from);
let code = "";
$("div[class='ace_layer ace_text-layer']").children().each(function() {code += $(this).text() + '\n'});
let tags = [];
$("div.problem-algorithm-tag-field").children("a").each(function() {tags.push($(this).text().trim())});
let difficulty = $("#acwing_page > div > div > div > div > div.row > div.col-sm-3.hidden-xs > div > table > tbody > tr:nth-child(1) > td > span").text().trim();

let data = {
  from,
  id ,
  title,
  description,
  code,
  difficulty
};

console.log("CodePlus grabbed", data);

chrome.runtime.sendMessage({
  type: "info",
  data
});

