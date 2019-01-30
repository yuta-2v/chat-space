$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "image_size", src=${message.image}>` : ''
    var html = `<div class="chat-main-body__message" data-id=${message.id}>
                  <div class="chat-main-body__user">
                    <div class="chat-main-body__name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main-body__time">
                      ${message.time}
                    </div>
                  </div>
                  <div class="chat-main-body__message-message">
                      <p class="chat-main-body__message-message">
                        ${message.message}
                      </p>
                      <p class="chat-main-body__message-image">
                        ${addImage}
                      </p>
                  </div>
                </div>`;
    return html;
  }

  function scroll() {
    $('body,html').animate(
      {scrollTop: $('html')[0].scrollHeight});
  }

  $('#new_message').submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main-body').append(html);
      $('.chat-main-footer__input-field-textarea').val('');
      scroll()
    })
    .fail(function(data){
      alert('error');
    })
    .always(function(){
      $('#button').prop('disabled', false);
    })
  })

  $(function(){
    setInterval(update, 5000);
  });

  function update(){
    var $message_id = $('.chat-main-body__message:last').data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {id: $message_id },
      dataType: 'json'
    })
    .done(function(data){
      $.each(data, function(i, data){
        buildHTML(data);
      });
    })
  }
});
