$(document).ready(function () {
  $('.removeArticle').on('submit', function (e) {
    e.preventDefault();

    const formAction = $(this).attr('action');

    $.ajax({
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      url: `http://localhost:8000/admin/${formAction}`,
      success: function (response) {
        if (response === 'deleted') {
          $('.result-alert').text('Article Removed');
          $('.result-alert').css('background-color', '#b40000');
          $('.result-alert').css('opacity', '1');

          setTimeout(() => {
            const targetBlogger = formAction.split('/');

            location.href = `http://localhost:8000/admin/${targetBlogger[1]}`;

            $('.result-alert').css('opacity', '0');
          }, 2000);
        } else console.log(response);
      }
    });
  });

  $('#articleRemove').on('submit', function (e) {
    e.preventDefault();

    const formAction = $('#articleRemove').attr('action');

    $.ajax({
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      url: `http://localhost:8000/admin/${formAction}`,
      success: function (response) {
        if (response === 'deleted') {
          const targetBlogger = formAction.split('/');

          location.href = `http://localhost:8000/admin/${targetBlogger[0]}`;
        } else console.log(response);
      }
    });
  });
});
