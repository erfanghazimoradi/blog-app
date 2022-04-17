$(document).ready(function () {
  $('#createComment').on('submit', function (e) {
    e.preventDefault();

    const data = {
      article: $('#articleID').val(),
      content: $('#commentContent').val(),
      bloggerAvatar: $('#bloggerAvatar').val()
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/account/comment',
      data: data,
      success: function (response) {
        if (response === 'commented') {
          $('#modal-container').addClass('out');
          $('body').removeClass('modal-active');

          $(`.comment-result`).text('Comment Send');
          $(`.comment-result`).css('background-color', 'green');
          $(`.comment-result`).css('opacity', '1');

          setTimeout(function () {
            location.reload();
            $(`.comment-result`).css('opacity', '0');
          }, 1000);
        }
      }
    });
  });

  $('.removeComment').on('submit', function (e) {
    e.preventDefault();

    const targetUrl = $(this).attr('action');

    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:8000' + targetUrl,
      success: function (response) {
        if (response === 'removed') {
          $('#modal-container').addClass('out');
          $('body').removeClass('modal-active');

          $(`.comment-result`).text('Comment Removed');
          $(`.comment-result`).css('background-color', '#b30000');
          $(`.comment-result`).css('opacity', '1');

          setTimeout(function () {
            location.reload();
            $(`.comment-result`).css('opacity', '0');
          }, 1000);
        }
      }
    });
  });
});
