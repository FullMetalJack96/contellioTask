<?php
$f3=require('lib/base.php');
$f3->config('config.ini');



$f3->route('GET /',
	function($f3) {

         $f3->set('content','welcome.htm');
         echo View::instance()->render('layout.htm');
	}
);

$f3->route('GET /login',
	function($f3) {
		$f3->set('content','login.htm');
		echo View::instance()->render('layout.htm');
	}
);

$f3->run();
