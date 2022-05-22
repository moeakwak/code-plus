"use strict";

import $ from "jquery";
import { html2md } from "./utils.js";

// This is the content script for Matiji

console.log("CodePlus Matiji ok");

let from = "码题集";
let url = window.location.href;
let full_title = $(".q-name").text().trim();
let id = "";
let description = html2md($("div.markdown-body").html(), from);
let code = "\n";
let code_language = $("input[placeholder='请选择语言']").val();
let tags = [];
const difficulty_convert = (d) => {
  if (d == "青铜" || d == "白银") return "简单";
  else if (d == "黄金" || d == "钻石") return "中等";
  else if (d == "星耀" || d == "王者") return "困难";
  else return null;
};
let difficulty = difficulty_convert($('#app > div.router-view > div > div.container > main > div > div.question-wrap > div.qs-main.is-oj > div.question-left > div.question-container > div.oj-container > div > div.s_t > div.left > div:nth-child(1) > span').text().trim());

let info = {
  from,
  url,
  id,
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
