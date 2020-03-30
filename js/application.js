$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=113',
    success: function (resp) {
      resp.tasks.forEach(function (task) {
        var id = task.id;
        var content = task.content;
        var completed = task.completed;
        var buttonText = completed ? "Hell Yeah" : "Go Do It Now"
        var buttonClass = completed ? "changeButton" : " "

        $('tbody').append(`<tr data-id=${id} data-completed=${completed}>` +
          `<td><button class='btn-sm btn completed border ${buttonClass}'>${buttonText}</button></td>` +
          "<td class='inputList'>" + content + "</td>" +
          "<td><button class='btn-sm btn remove border'>remove</button></td>")
      })
    },
    error: function () {
      window.alert("cannot GET data");
    }
  });
  // add Item
  addItem();
  // removal button
  removeButton();
  // toggle button
  toggleButton();

  showToDo();
});

// complete/undone button toggle
var toggleButton = function () {
  $("#itemList").on('click', '.completed', function () {
    var $completedBTN = $(this);
    var id = $(this).parent().parent().data("id");
    var $deleteBTN = $(this).closest("tr").find(".remove");
    var completedStatus = $completedBTN.parent().parent().data('completed');

    $deleteBTN.attr("disabled", true);
    $completedBTN.attr("disabled", true);
    // console.log($completedBTN.parent().parent().data("completed"))
    if (completedStatus) {
      $.ajax({
        method: "PUT",
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_active?api_key=113`,
        success: function () {
          $completedBTN.text('Go Do It Now');
          $completedBTN.removeClass('changeButton');
          $completedBTN.parent().parent().data('completed', false);
        },
        error: function () {
          window.alert("Server Error, cannot save!")
        },
        complete: function () {
          $deleteBTN.attr("disabled", false);
          $completedBTN.attr("disabled", false);
        }
      })
    } else {
      $.ajax({
        method: "PUT",
        url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_complete?api_key=113`,
        success: function () {
          $completedBTN.text('Hell Yeah');
          $completedBTN.addClass('changeButton')
          $completedBTN.parent().parent().data('completed', true)
        },
        error: function () {
          window.alert("Server Error, cannot save!")
        },
        complete: function () {
          $deleteBTN.attr("disabled", false);
          $completedBTN.attr("disabled", false);
        }
      })
    }
  })
};

// add item
var addItem = function () {
  $("#addToList").on('submit', function (event) {
    event.preventDefault();

    var form = this;
    var $button = $(form).find("button");

    $button.attr("disabled", true);

    // POST with the input info
    $.ajax({
      type: "POST",
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=113',
      data: {
        task: {
          content: $('#addToList input').val()
        }
      },
      success: function (resp) {
        var id = resp.task.id;
        var content = resp.task.content;
        var completed = resp.task.completed;

        $('tbody').append(`<tr data-id=${id} data-completed=${completed}>` +
        "<td><button class='btn-sm btn completed border'>Go Do It Now</button></td>" +
        "<td class='inputList'>" + content + "</td>" +
        "<td><button class='btn-sm btn remove border'>remove</button></td>")
      },
      error: function () {
        window.alert("can't successfully POST")
      },
      complete: function () {
        $button.attr("disabled", false);
        form.reset();
      }
    });
  });
}

// removal button
var removeButton = function () {
  $("#itemList").on('click', '.remove', function (event) {
    var $deleteBTN = $(this);
    var id = $(this).parent().parent().data("id");
    var $completedBTN = $(this).closest("tr").find(".completed");

    $deleteBTN.attr("disabled", true);
    $completedBTN.attr("disabled", true);

    $.ajax({
      type: "DELETE",
      url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=113`,
      success: function () {
        $deleteBTN.closest('tr').remove();
      },
      error: function () {
        window.alert('cannot be deleted');
      },
      complete: function () {
        $deleteBTN.attr("disabled", false);
        $completedBTN.attr("disabled", false);
      }
    });
  });
}

// Bonus
// show all active tasks - completed = false
var showToDo = function () {
  $(".btn.showToDo").click(function () {
    //var itemCompleted = $('#itemList.completed');
    $("tr").each(function (element) {
      console.log($("element").data("completed"))
      //if (index.completed === true) {
        //$(this).closest('tr').toggle();
        // this.attr("disabled", false);
        // completeButton.attr('disabled', true);
      //}
    })
  });
};
// // show all completed tasks - completed = true
// function showDone () {
//   $(".btn.showCompleted").click(function () {
//     var toDobutton = $('.btn.showActive');
//     var itemCompleted = $('#itemList').children().children().data("completed");
//     console.log(itemCompleted);
//
//     if (itemCompleted === false) {
//       $('#itemList').toggle("slow");
//       this.attr("disabled", false);
//       toDobutton.attr("disabled", true);
//     }
//   });
//
// // show all tasks
// function showAll () {
//   $(".btn.showAll").click(function () {
//
//   })
// }
