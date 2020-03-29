$(document).ready(function () {
  $("#addToList").on('submit', function (event) {
    event.preventDefault();
    //disable button

    // POST with the input info
    // inside 200 ->
    var itemInput = $(this).children('[name=thingInput]').val();

    $('tbody').append("<tr>" +
    "<td><button class='btn-sm btn completed border'>Go Do It Now</button></td>" +
    "<td class='inputList'>" + itemInput + "</td>" +
    "<td><button class='btn-sm btn remove border'>remove</button></td>")

    this.reset();

    // completed enable to button
  });

  // removal button (checked)
  $("#itemList").on('click', '.remove', function (event) {
    $(this).closest('tr').remove();
  });

  toggleButton();
});

// complete/undone button toggle
var toggleButton = function () {
  $("#toggle").on('click', function (e) {
    var $btn = $(this)
    var id = $btn.data('id')
    if ($btn.data('completed')) {
      $btn.attr('disabled', true);

      $.ajax({
        method: "PUT",
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_active?api_key=110`,
        success: function () {
          $btn.text('Go Do It Now');
          $btn.removeClass('changeButton');
          $btn.data('completed', true)
        },
        error: function () {
          window.alert("Server Error, cannot save!")
        },
        complete: function () {
          $btn.attr('disabled', false);
        }
      })
    } else {
      $btn.attr('disabled', true);

      $.ajax({
        method: "PUT",
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_completed?api_key=110`,
        success: function () {
          $btn.text('Hell Yeah');
          $btn.addClass('changeButton')
          $btn.data('copmleted', false)
        },
        error: function () {
          window.alert("Server Error, cannot save!")
        },
        complete: function () {
          $btn.attr('disabled', false);
        }
      })
    }
  })
};

// We will keep our To Do List features at the bare minimum. Here is the criteria:
//
// Minimum requirement
// A list of tasks rendered in the DOM based on data from the ATDAPI server.
// Each task has a description, a remove button, and a mark complete/active button.
// An input element and a button that lets user add a new task.
//
// Bonus feature
// A toggle to show Active/Complete/All tasks only
