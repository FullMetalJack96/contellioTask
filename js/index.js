function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function statusChangeCallback(response) {
  FB.api('/me/picture?width=180&height=180', function(response) {
    if (response && !response.error) {
      var email = getCookie("mail").trim();
      var res = email.toLowerCase();
      var hash = md5(res);

      $.ajax({
        type: "GET",
        url: "../js/getGravatar.php?hash=" + hash,
        success: function(data) {
          $("#profilePicture").attr("src", "https://www.gravatar.com/avatar/" + hash);
          console.log('gravatar')
        },
        error: function(xhr, status, error) {
          console.log('fbprofile');
          $("#profilePicture").attr("src", response.data.url);
        }
      });
    }
  });
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1715603732024933',
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.6' // use graph api version 2.5
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$("#logout").on('click', function() {
  FB.logout(function(response) {
    setCookie("access_token", "logout", 1);
    //alert('logout')
    window.location.reload();
  });
})
