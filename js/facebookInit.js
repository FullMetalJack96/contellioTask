var userID;
var userMail;

function login() {

  FB.login(function(response) {
    console.log('logowanie');
    checkLoginState();
  });
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function statusChangeCallback(response) {
  console.log(response);

  setCookie("access_token", response.authResponse.accessToken);
  if (response.status === 'connected') {
    testAPI();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1715603732024933',
    cookie: true,
    xfbml: true,
    version: 'v2.6'
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

function testAPI() {

  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', {
    fields: ['last_name', 'id', 'email', 'name']
  }, function(response) {
    console.log(response);
    userID = response.id;
    userMail = response.email;
    setCookie("mail", response.email);
    window.location.href = "/"
    console.log('Successful login for: ' + response.name);

  });

}
