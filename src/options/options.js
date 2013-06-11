// https://developer.chrome.com/extensions/options.html


// Saves options to localStorage.
function save_options() {
  var time_update = document.getElementById("time_update").value;
  localStorage["time_update"] = (time_update != '') ? time_update : 5;

  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores from localStorage.
function restore_options() {
  var time_update = localStorage["time_update"];
  if (!time_update) {
    return;
  }
  document.getElementById("time_update").value = time_update;
}


document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);