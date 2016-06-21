function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

$(document).ready(function () {

    if(getCookie("access_token")=="logout" || getCookie("access_token") == ""){
        window.location.href = '/login';
    }else{
      $.ajax({url: "https://graph.facebook.com/me?access_token="+getCookie("access_token"), success: function(result){

        var email = getCookie("mail").trim();
        var res = email.toLowerCase();
        var hash = md5(res);
        console.log(hash);
        $("#title").html(result.name)
            $("#cardContent").append(getCookie("mail"));
            loadData();
        }});
    }

});

function loadData() {

  $.getJSON('../js/getData.php', function(data) {
    console.log(data);
  $("#dataDisplay").append("<h1>"+data.title+"</h1><div id='presentationDisplay'></div>");
    for(var i = 1; i < 10; i++){
        $("#presentationDisplay").append("<img class='img-responsive' src='"+data.cover_url+"?fm=jpg&page="+i+"&q=100' alt='page'"+i+"/>");
    }
  });
}
