"use strict";

import $ from "jquery";

// Saves options to chrome.storage
function save_options() {
  let config = {
    auto_jump_to_notion_page:
      $("input[name='auto_jump_to_notion_page']:checked").val() == "true",
    add_description_to_page:
      $("input[name='add_description_to_page']:checked").val() == "true",
    notion_database_id: $("#notion_database_id").val(),
    notion_secret: $("#notion_secret").val(),
  };
  chrome.storage.local.set(config, function () {
    $("#status").html(`<p style="color: green">Options saved</p>`);
    console.log("save options", config);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get(
    {
      auto_jump_to_notion_page: true,
      add_description_to_page: false,
      notion_database_id: "xxx",
      notion_secret: "secret_xxx",
    },
    function (items) {
      console.log(items);
      $("input[name='auto_jump_to_notion_page']")
        .filter("[value='" + items.auto_jump_to_notion_page + "']")
        .attr("checked", true);
      $("input[name='add_description_to_page']")
        .filter("[value='" + items.add_description_to_page + "']")
        .attr("checked", true);
      $("#notion_database_id").val(items.notion_database_id);
      $("#notion_secret").val(items.notion_secret);
    }
  );
}

$("#save").on("click", save_options);

document.addEventListener("DOMContentLoaded", restore_options);
