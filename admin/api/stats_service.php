<?php
require_once '_db.php';
require '../vendor/autoload.php';

header('Content-Type: application/json');

use Spatie\Analytics\Analytics;

$analytics = Analytics::create(
    'ga:182369508',
    '102692029194944352613.apps.googleusercontent.com',
    'dizajnnastenu@oneall-site-593681-2.iam.gserviceaccount.com',
    '../../google-privatekey.p12',
    $myCache,
    60 * 24 * 2,
    5
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Stats{}
    
    $s = new Stats();
    
    $result = $db->query('SELECT COUNT(*) as orders FROM orders');
    $row = $result->fetch_assoc();
    $s->orders = $row['orders'];
    
    $result = $db->query('SELECT COUNT(DISTINCT email) as customers FROM orders');
    $row = $result->fetch_assoc();
    $s->customers = $row['customers'];
    
    $result = $db->query('SELECT COUNT(*) as blogs FROM blog');
    $row = $result->fetch_assoc();
    $s->blogs = $row['blogs'];
    
    $result = $db->query('SELECT COUNT(*) as inspirations FROM inspiration');
    $row = $result->fetch_assoc();
    $s->inspirations = $row['inspirations'];
    
    $s->views = $analytics->getVisitorsAndPageViews(365,'yearMonth');
    $s->browsers = $analytics->getTopBrowsers();
    $s->pages = $analytics->getMostVisitedPages();
    
    echo json_encode($s);
}
?>