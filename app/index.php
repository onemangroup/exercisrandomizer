<!doctype html>
<html lang="en" ng-app="radomizerApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Street Workout NRW - Workout Routine Generator v0.1</title>
    <link href="css/app.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" media="screen" />
    <link href="css/social-buttons.css" rel="stylesheet" media="screen" />
    <link href="css/font-awesome.css"rel="stylesheet" media="screen" />
</head>
<body>
 <script type="text/javascript">
    // You probably don't want to use globals, but this is just example code
    var fbAppId = '691726554190169';
    var objectToLike = 'https://apps.facebook.com/workoutgenerator/';

    // This check is just here to make sure you set your app ID. You don't
    // need to use it in production.
    if (fbAppId === 'replace me') {
        alert('Please set the fbAppId in the sample.');
    }

    // This is boilerplate code that is used to initialize the Facebook
    // JS SDK.  You would normally set your App ID in this code.

    // Additional JS functions here
    window.fbAsyncInit = function() {
        FB.init({
            appId      : fbAppId,        // App ID
            channelUrl : '//www.grenz-schutz.de/index.html',
            status     : true,           // check login status
            cookie     : true,           // enable cookies to allow the server to access the session
            xfbml      : true            // parse page for xfbml or html5 social plugins like login button below
        });
    };


    // Load the SDK Asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));



    //window.location.href = 'https://ssl.webpack.de/grenz-schutz.de/#/show/' + i;
</script>

    <div class="container">
        <div class="row">
            <image class="col-md-4 col-xs-4" src="img/logo.jpg" />
            <div>
                <div><h3>Support Us!</h3></div>
                <div class="btn-group col-lg-8">
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <a href="http://street-workout-nrw.spreadshirt.de/" target="_blank"><img src="http://cache.spreadshirt.net/Public/Common/images/logo_landscape.png" /></a>
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="hosted_button_id" value="2CHTK9X8FM6F2">
                        <input type="image" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.">
                        <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div ng-view></div>

    <div ng-controller="AppCtrl">
        <script type="text/javascript">
            <?php
            if(isset($_GET['sk']))
            {
                $v = explode('/', $_GET['sk']);
                echo 'var i =' . $v[1] . ";";
            }
            ?>
        </script>
    </div>

    <!-- In production use:
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    -->
    <script src="lib/angular/angular.js"></script>
    <script src="js/app.js"></script>
    <script src="js/services.js"></script>
    <script src="js/AppCtrl.js"></script>
    <script src="js/ExerciseCtrl.js"></script>
    <script src="js/ExerciseDetailCtrl.js"></script>
    <script src="js/filters.js"></script>
    <script src="js/directives.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/facebook.js"></script>
 <script>
     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
         (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
         m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

     ga('create', 'UA-44326228-1', 'webpack.de');
     ga('send', 'pageview');

 </script>
</body>
</html>
