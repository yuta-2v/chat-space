$(function(){
  function appendUsers(user){
  }

  function appendUser(user){
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
        appendUser('nobody');
      }
    })
  })
});
