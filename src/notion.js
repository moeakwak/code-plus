// import exp from "constants";
import $ from "jquery";

import { markdownToBlocks } from "../lib/martian";
// TODO: markdownToBlocks support inline math

async function getOption(key) {
  let result = await chrome.storage.local.get([key]);
  console.log("getOption", result);
  return result[key];
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
    console.log(response); // This contains useful information like Database properties
  });
}

/**
 * call notion api to create a new page
 * @param {Object} pageInfo grabbed info object
 * @param {String} content 
 */
export async function createPage(pageInfo, content, success_callback, error_callback) {
  const data = {
    parent: {
      type: "database_id",
      database_id: await getOption("notion_database_id"),
    },
    properties: {
      Link: {
        type: "url",
        url: pageInfo.url,
      },
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
      // ...markdownToBlocks("## 描述"),
      // ...markdownToBlocks(pageInfo.description),
      ...markdownToBlocks("## 代码"),
      ...markdownToBlocks(
        "```" + pageInfo.code_language + "\n" + pageInfo.code + "```"
      ),
      ...markdownToBlocks("## 思路"),
      ...markdownToBlocks(content || "TBD"),
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
    success: success_callback || ((response) => {console.log("added page", response);}),
    error: error_callback || ((error) => {console.log("error added page", error);}),
  };

  console.log("ready to add page", data, settings);

  $.ajax(settings);
}
