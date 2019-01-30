$(function(){
  var $search_result = $("#user-search-result");

  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
    $search_result.append(html);
  }

  function appendUser(user){
    var html = `<div class="chat-group-user__name">
                  ${user}
                </div>
    `;
    $search_result.append(html);
  }

  $('#user-search-field').keyup(function(){
    var input = $.trim($("#user-search-field").val());
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $search_result.empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUsers(user);
        });
      } else {
        appendUser('一致するユーザーはいません');
      }
    })
    .fail(function(){
      alert('ユーザ検索に失敗しました。');
    })
  })

    $("#user-search-result").on('click', ".chat-group-user__btn--add", function(){
  });
});
