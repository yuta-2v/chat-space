$(function(){
  function buildHTML(message){
    var html = `<div class="chat-main-body__message">
                  <div class="chat-main-body__user">
                    <div class="chat-main-body__name">
                      ${message.user.name}
                    <div class="chat-main-body__time">
                      ${message.created_at.strftime('%Y/%m/%d %H:%M')}
                  <div class="chat-main-body__message">
                    ${if message.message.present?}
                      <p class="chat-main-body__message">
                        ${message.message}
                    ${image_tag message.image.url, class: 'lower-message__image' if message.image.present?}`;
    return html;
  }
  $('#new_message').on('submit', function(e){
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
      $('.chat-main-footer__input').append(html);
      $('.chat-main-footer__input-field-textarea').val('');
      $('.sent-btn').prop('disabled', false);
    })
  })
});
