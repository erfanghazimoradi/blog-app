$(document).ready(function () {
  // edit blogger profile
  $('#resetPassword').submit(function (e) {
    e.preventDefault();

    // edited blogger info
    const data = {
      username: $('#username').val(),
      phoneNumber: $('#phoneNumber').val(),
      password: $('#password').val()
    };

    $.ajax({
      type: 'POST',
      url: $('resetPassword').attr('action'),
      data,
      success: function (response) {
        if (response === 'reset') {
          $(`.reset-alert`).text('Password Reset Successfully');
          $(`.reset-alert`).css('background-color', 'green');
          $(`.reset-alert`).css('opacity', '1');

          setTimeout(function () {
            $(`.reset-alert`).css('opacity', '0');
            location.href = 'http://localhost:8000/authentication/logout';
          }, 2000);
        } else if (response === 'not-match') {
          $(`.reset-alert`).text("Phone number and Username dosen't Match");
          $(`.reset-alert`).css('background-color', '#b30000');
          $(`.reset-alert`).css('opacity', '1');

          setTimeout(function () {
            $(`.reset-alert`).css('opacity', '0');
            location.reload();
          }, 2000);
        } else resetAlertHandler(response);
      }
    });
  });
});

function resetAlertHandler(alert) {
  // reset errors
  $('.reset-error').css('opacity', '0');

  alert.forEach(err => {
    if (err.includes('username')) displayAlert('username', err);
    if (err.includes('phoneNumber')) displayAlert('phoneNumber', err);
    if (err.includes('password')) displayAlert('password', err);
  });
}
