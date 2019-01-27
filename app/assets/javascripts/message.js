$(function(){
  function buildHTML(message){
    var addImage = (message.image.url !== null) ? `<img class = "image_size", src=${message.image.url}>` : ''
    var html = `<div class="chat-main-body__message">
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
});
