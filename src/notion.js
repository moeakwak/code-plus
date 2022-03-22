// import exp from "constants";
import $ from "jquery";
// import { markdownToBlocks } from "@instantish/martian";

import { markdownToBlocks } from "../lib/martian"

async function getOption(key) {
  let result = await chrome.storage.local.get([key]);
  console.log("getOption", result);
  return result[key];
}

function makeBlock(type, content, args = {}) {
  let block = {};
  if (type == "h2") {
    block = {
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            type: "text",
            text: {
              content: content,
              link: null,
            },
          },
        ],
        color: args.color || "default",
      },
    };
  } else if (type == "code") {
    block = {
      type: "code",
      code: {
        rich_text: [
          {
            type: "text",
            text: {
              content: content,
            },
          },
        ],
        language: args.language || "plain text",
      },
    };
  } else if (type == "p") {
    block = {
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: content,
              link: null,
            },
          },
        ],
        color: args.color || "default",
      },
    };
  }
  return block;
}

export async function retrieveDatabase() {
  const settings = {
    async: true,
    crossDomain: true,
    url:
      (await getOption("cors_proxy")) +
      "https://api.notion.com/v1/databases/" +
      (await getOption("notion_database_id")),
    method: "GET",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-02-22",
      Authorization: "Bearer " + (await getOption("notion_secret")),
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

export async function addPage(pageInfo, content) {
  const data = {
    parent: {
      type: "database_id",
      database_id: await getOption("notion_database_id"),
    },
    properties: {
      From: {
        type: "select",
        select: { name: pageInfo.from },
      },
      Title: {
        type: "title",
        title: [{ type: "text", text: { content: pageInfo.full_title } }],
      },
      Tags: {
        type: "multi_select",
        multi_select: pageInfo.tags.map((tagName) => {
          return { name: tagName };
        }),
      },
      Difficulty: {
        type: "select",
        select: { name: pageInfo.difficulty },
      },
      Status: {
        type: "select",
        select: { name: pageInfo.status },
      },
      Date: {
        type: "date",
        // use UTC time + 8 hours
        date: {
          start: new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString(),
          time_zone: "Asia/Shanghai",
        },
      },
    },
    children: [
      makeBlock("h2", "描述"),
      ...markdownToBlocks(pageInfo.description),
      makeBlock("h2", "代码"),
      makeBlock("code", pageInfo.code, { language: pageInfo.code_language }),
      makeBlock("h2", "思路"),
      makeBlock("p", content || "TBD"),
    ],
  };

  const settings = {
    async: true,
    crossDomain: true,
    url: (await getOption("cors_proxy")) + "https://api.notion.com/v1/pages",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-02-22",
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getOption("notion_secret")),
    },
    processData: false,
    data: JSON.stringify(data),
  };

  console.log(data, settings);

  $.ajax(settings).done(function (response) {
    console.log("notion add page", response);
  });
}
