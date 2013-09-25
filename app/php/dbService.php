<?php
error_reporting(E_ALL);
/**
 * Created by IntelliJ IDEA.
 * User: onemangroup
 * Date: 23.09.13
 * Time: 02:25
 * To change this template use File | Settings | File Templates.
 */

require_once("DB.class.php");
require_once("dbconfig.php");
if(isset($_REQUEST['action']) && $_REQUEST['action'] == 'save')
{
    $db = new DB();
    $result = $db->sendQuery("SELECT * FROM " . TABLE_WORKOUTS . " WHERE userid = " . $_REQUEST['userid'], "array");
    $json_string = mysql_real_escape_string($_REQUEST['json']);

//    if($result && sizeof($result) >= 1)
//    {
//        $query = "UPDATE " . TABLE_WORKOUTS . " SET data = '" . $json_string . "' WHERE userid = " . $_REQUEST['userid'];
//    }else{

        $query = "INSERT INTO " . TABLE_WORKOUTS . " (userid, username, data) VALUES (" . $_REQUEST['userid'] . ", '" . $_REQUEST['name'] . "', '" . $json_string . "')";
//    }

    if($db->execQuery($query))
    {
        echo mysql_insert_id();
    }else{
        echo 0;
    }
}

if(isset($_REQUEST['action']) && $_REQUEST['action'] == 'get')
{
    $db = new DB();
    $result = $db->sendQuery("SELECT * FROM " . TABLE_WORKOUTS . " WHERE id = " . $_REQUEST['id'], "object");

    echo $result->data;
}