<?php
    require __DIR__ . '/vendor/autoload.php';

    $db = new \PDO('mysql:dbname=dizajnnastenu;host=mariadb101.websupport.sk;port=3312;charset=utf8mb4', 'dizajnnastenu', 'VGw04sSxwc');
    $auth = new \Delight\Auth\Auth($db);
    
    if ($auth->isLoggedIn()) {
        header('Location: /admin');
        die();
    }
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        try {
            $auth->login($_POST['email'], $_POST['password'],(int) (60 * 60 * 24));
            header('Location: /admin');
        }
        catch (\Delight\Auth\InvalidEmailException $e) {
            echo "un";
        }
        catch (\Delight\Auth\InvalidPasswordException $e) {
            echo "pass";
        }
        catch (\Delight\Auth\EmailNotVerifiedException $e) {
            echo "nv";
        }
        catch (\Delight\Auth\TooManyRequestsException $e) {
            echo "tmr";
        }
    }
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="/admin/assets/img/apple-icon.png" />
    <link rel="icon" type="image/png" href="/admin/assets/img/favicon.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Dizajnnastenu.sk</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />

    <!-- Bootstrap core CSS     -->
    <link href="/admin/assets/css/bootstrap.min.css" rel="stylesheet" />
    <!--  Material Dashboard CSS    -->
    <link href="/admin/assets/css/material-dashboard.css" rel="stylesheet" />
    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="/admin/assets/css/demo.css" rel="stylesheet" />
    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
</head>

<body>
    <nav class="navbar navbar-primary navbar-transparent navbar-absolute">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/#/dashboard">Dizajnnastenu.sk</a>
            </div>
        </div>
    </nav>
    <div class="wrapper wrapper-full-page">
        <div class="full-page login-page" filter-color="black" data-color="rose" data-image="/admin/assets/img/background.jpg">
            <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                            <form method="POST" action="login.php">
                                <div class="card card-login card-hidden">
                                    <div class="card-header text-center" data-background-color="rose">
                                        <h4 class="card-title">Prihlásenie</h4>
                                    </div>
                                    <div class="card-content">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Email</label>
                                                <input type="email" name="email" class="form-control">
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Heslo</label>
                                                <input type="password" name="password" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="footer text-center">
                                        <button type="submit" class="btn btn-rose btn-simple btn-wd btn-lg">Prihlásiť</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container">
                    <p class="copyright pull-right">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>
                        <a href="https://www.selfmade.sk">selfmade.sk</a>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</body>
<!--   Core JS Files   -->
<script src="/admin/assets/js/core/jquery-3.1.1.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/jquery-ui.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/bootstrap.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/material.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/perfect-scrollbar.jquery.min.js" type="text/javascript"></script>
<!-- Forms Validations Plugin -->
<script src="/admin/assets/js/core/jquery.validate.min.js"></script>
<!--  Plugin for Date Time Picker and Full Calendar Plugin-->
<script src="/admin/assets/js/plugins/moment.min.js"></script>
<!--  Charts Plugin -->
<script src="/admin/assets/js/plugins/chartist.min.js"></script>
<!--  Plugin for the Wizard -->
<script src="/admin/assets/js/plugins/jquery.bootstrap-wizard.js"></script>
<!--  Notifications Plugin    -->
<script src="/admin/assets/js/plugins/bootstrap-notify.js"></script>
<!-- DateTimePicker Plugin -->
<script src="/admin/assets/js/plugins/bootstrap-datetimepicker.js"></script>
<!-- Vector Map plugin -->
<script src="/admin/assets/js/plugins/jquery-jvectormap.js"></script>
<!-- Sliders Plugin -->
<script src="/admin/assets/js/plugins/nouislider.min.js"></script>
<!--  Google Maps Plugin    -->
<script src="https://maps.googleapis.com/maps/api/js"></script>
<!-- Select Plugin -->
<script src="/admin/assets/js/plugins/jquery.select-bootstrap.js"></script>
<!--  DataTables.net Plugin    -->
<script src="/admin/assets/js/plugins/jquery.datatables.js"></script>
<!-- Sweet Alert 2 plugin -->
<script src="/admin/assets/js/plugins/sweetalert2.min.js"></script>
<!--	Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
<script src="/admin/assets/js/plugins/jasny-bootstrap.min.js"></script>
<!--  Full Calendar Plugin    -->
<script src="/admin/assets/js/plugins/fullcalendar.min.js"></script>
<!-- TagsInput Plugin -->
<script src="/admin/assets/js/plugins/jquery.tagsinput.js"></script>
<!-- Material Dashboard javascript methods -->
<script src="/admin/assets/js/material-dashboard-angular.js"></script>
<!-- Material Dashboard Init Off Canvas Menu -->
<script src="/admin/assets/js/init/initMenu.js"></script>
<!-- Material Dashboard DEMO methods, don't include it in your project! -->
<script src="/admin/assets/js/demo.js"></script>
<script type="text/javascript">
    $().ready(function() {
        demo.checkFullPageBackgroundImage();

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    });
</script>

</html>
