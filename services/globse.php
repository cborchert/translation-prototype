<?php

$params = array(    'from' => $_GET['from'],
                    'dest' => $_GET['dest'],
                    'phrase' => $_GET['phrase'],
                    'format' => 'json',
                    'pretty' => 'true',
                    'tm' => 'true' );

$url = "https://glosbe.com/gapi/translate?" . http_build_query( $params );

$ch  = curl_init($url); 

curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

$json = curl_exec($ch); 
curl_close($ch);

echo $json;

?>