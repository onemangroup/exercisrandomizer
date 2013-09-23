<?php
/**
 * Created by IntelliJ IDEA.
 * User: onemangroup
 * Date: 23.09.13
 * Time: 02:25
 * To change this template use File | Settings | File Templates.
 */
require("dbconfig.php");

class DB {
	public $cn;
	public $db;
	
	public function __construct() {
		$this->connect();	
	}
	
	private function connect() {
		$this->cn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
		$this->db = mysql_select_db(DB_NAME, $this->cn);
	}
	
	public function execQuery($query) {
		$rs = mysql_query($query, $this->cn);
		if($rs){
			return true;
		}
		return false;
	}
	
	public function sendQuery($query, $returntype = 'array') {
		$rs = mysql_query($query, $this->cn);
		if($rs){
			if(mysql_num_rows($rs) > 0){
				if($returntype == 'array'){
					$ret = array();
					while($row = mysql_fetch_array($rs)){
						$ret[] = $row;
					}
					return $ret;
				}else if($returntype == 'object'){
					return mysql_fetch_object($rs);
				}
			}
		}
		return false;
	}
}