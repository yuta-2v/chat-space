$(function(){
  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
    $('#user-search-result').append(html);
    console.log("append");
  }

  function appendUser(user){
    var html = `<div class="chat-group-user__name">
                  ${user}
                </div>
    `;
    $('#user-search-result').append(html);
  }

  $('#user-search-field').keyup(function(){
    var input =$("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUsers(user);
        });
      } else {
        appendUser('一致するユーザーはいません');
      }
    })
  })
});
