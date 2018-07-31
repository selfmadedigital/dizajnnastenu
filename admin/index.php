<?php
    require __DIR__ . '/vendor/autoload.php';

    $db = new \PDO('mysql:dbname=dizajnnastenu;host=mariadb101.websupport.sk;port=3312;charset=utf8mb4', 'dizajnnastenu', 'VGw04sSxwc');
    $auth = new \Delight\Auth\Auth($db);

    if (!$auth->isLoggedIn()) {
        header('Location: /admin/login.php');
        die();
    }
?>

<!DOCTYPE html>

<html>
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="/admin/assets/css/froala_editor.min.css" rel="stylesheet" />
    <link href="/admin/assets/css/froala_editor.pkgd.min.css" rel="stylesheet" />
    <link href="/admin/assets/css/bootstrap-colorpicker.min.css" rel="stylesheet" />
    <link href="/admin/assets/css/demo.css" rel="stylesheet" />
    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
    <!-- Polyfill for older browsers -->
	<!-- <script src="https://code.angularjs.org/tools/system.js"></script> -->

    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="node_modules/jquery/dist/jquery.js" type="text/javascript"></script>
    <!-- 2. Configure SystemJS -->
    <script src="./systemjs.config.js"></script>
    <script>
    	System.import('app').catch(function(err){ console.error(err); });
    </script>

</head>
<!-- 3. Display the application -->
<body>
    <base href='/admin/'>
	<my-app>
		<div class="loader">
			<svg class="circular" viewBox="25 25 50 50">
				<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
			</svg>
		</div>
	</my-app>
</body>

<!--   Core JS Files   -->
<script src="/admin/assets/js/core/jquery-3.1.1.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/jquery-ui.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/bootstrap.min.js" type="text/javascript"></script>
<script src="/admin/assets/js/core/arrive.js" type="text/javascript"></script>
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
<!--	Plugin for Fileupload  -->
<script src="/admin/assets/js/plugins/jasny-bootstrap.min.js"></script>
<!--  Full Calendar Plugin    -->
<script src="/admin/assets/js/plugins/fullcalendar.min.js"></script>
<script src="/admin/assets/js/plugins/typehead.js"></script>
<!-- TagsInput Plugin -->
<script src="/admin/assets/js/plugins/jquery.tagsinput.js"></script>
<!-- Material Dashboard javascript methods -->
<script src="/admin/assets/js/material-dashboard-angular.js"></script>
<!-- Material Dashboard DEMO methods, don't include it in your project! -->
<script src="/admin/assets/js/demo.js"></script>

</html>