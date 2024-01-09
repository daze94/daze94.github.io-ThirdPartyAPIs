$(function () {
  // Display the current day using Day.js
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Function to update the time block colors
  function updateTimeBlockColors() {
    // Get current hour in 24-hour format
    var currentHour = dayjs().hour();

    // Iterate over each time-block
    $('.time-block').each(function () {
      // Extract hour number from the id of the time block
      var blockHour = parseInt($(this).attr('id').split('-')[1], 10);

      // Remove any old classes from the element
      $(this).removeClass('past present future');

      // Apply new class based on current time
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Initial call to set the correct color-coding
  updateTimeBlockColors();

  // Set an interval to keep updating the colors
  setInterval(updateTimeBlockColors, 60000);

  // Event listener for the save button
  $('.saveBtn').click(function () {
    var hourId = $(this).closest('.time-block').attr('id');
    var eventText = $(this).siblings('.description').val();
    // Save the text in local storage, using the hourId as the key
    localStorage.setItem(hourId, eventText);
  });

  // Load saved events from local storage
  function loadEvents() {
    $('.time-block').each(function () {
      var hourId = $(this).attr('id');
      var eventText = localStorage.getItem(hourId);
      if (eventText) {
        $(this).find('.description').val(eventText);
      }
    });
  }

  loadEvents();
});
