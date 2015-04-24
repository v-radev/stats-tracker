<?php

//AJAX request
if ( !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' )
{
    //TODO validate data

    usleep(350000);
    echo json_encode([]);
    return;
}
