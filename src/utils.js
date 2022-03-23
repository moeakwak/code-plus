import $ from "jquery";

import TurndownService from "turndown";

export function html2md(html, from) {
  let turndownService = new TurndownService();
  turndownService.keep(["del"]);

  if (from == "acwing") {
    // code block
    turndownService.addRule("pre", {
      filter: "pre",
      replacement: function (content, node) {
        let t = $(node).attr("class").split(/\s+/).slice(-1);
        if (t == "hljs") t = "";
        return "```" + t + "\n" + content.trim() + "\n```";
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
  }

  return turndownService.turndown(html);
}
