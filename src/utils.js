import $ from "jquery";

import TurndownService from "turndown";

export function html2md(html, from) {
  // console.log("html2md", html, from);
  if (from == "AcWing") return acwing_html2md(html);
  else if (from == "Leetcode") return leetcode_html2md(html);
  else return naive_html2md(html);
}

function acwing_html2md(html) {
  let turndownService = new TurndownService();
  turndownService.keep(["del"]);
  // code block
  turndownService.addRule("pre", {
    filter: "pre",
    replacement: function (content, node) {
      let t = null;
      if ($(node).attr("class")) {
        t = $(node).attr("class").split(/\s+/).slice(-1);
        if (t == "hljs") t = "";
      }
      return "```" + (t || "") + "\n" + content.trim() + "\n```";
    },
  });

  // remove <script> math
  turndownService.addRule("remove-script", {
    filter: function (node, options) {
      return (
        node.tagName.toLowerCase() == "script" &&
        node.type.startsWith("math/tex")
      );
    },
    replacement: function (content, node) {
      return "";
    },
  });

  // inline math
  turndownService.addRule("inline-math", {
    filter: function (node, options) {
      return (
        node.tagName.toLowerCase() == "span" && node.className == "MathJax"
      );
    },
    replacement: function (content, node) {
      return "$ " + $(node).next().text() + " $";
    },
  });

  // block math
  turndownService.addRule("block-math", {
    filter: function (node, options) {
      return (
        node.tagName.toLowerCase() == "div" &&
        node.className == "MathJax_Display"
      );
    },
    replacement: function (content, node) {
      return "\n$$\n" + $(node).next().text() + "\n$$\n";
    },
  });
  return turndownService.turndown(html);
}

function leetcode_html2md(html) {
  let turndownService = new TurndownService();
  turndownService.keep(["del"]);
  // code block
  turndownService.addRule("pre", {
    filter: "pre",
    replacement: function (content, node) {
      return "```\n" + $(node).text().trim() + "\n```";
    },
  });
  return turndownService.turndown(html);
}

function naive_html2md(html) {
  let turndownService = new TurndownService();
  turndownService.keep(["del"]);
  return turndownService.turndown(html);
}
