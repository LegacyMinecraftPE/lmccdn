<?php

/*
 __PocketMine Plugin__
name=KillBearBoys
description=KillBearBoys
version=3.0beta6p1
author=ljy\Tema1d\GameHerobrine
class=KillBearBoys
apiversion=12,12.1
*/

/*
	2014/6/2 17:20 Test
*/

const KBB = '[KillBearBoys] ';
const BLOCK_PLACE = 0;
const BLOCK_BREAK = 1;
const BLOCK_TOUCH = 2;

class KillBearBoys implements Plugin{
	public $api;
	public $database;
	public $user;
	public $temp;
	public $fetch;
	public $num;
	public $position;
	public $queue;
	public $runnable;
	public $lock;
	public static $act = array(
		0 => 'place',
		1 => 'break',
		2 => 'touch'
	);
	public $caughtWarn = false;
	private $executeGCEvery = 20;
	private $executed = 0;
	public function __construct(ServerAPI $api, $server = false){ 
		$this->api = $api;
	}
	
	public function init(){
      date_default_timezone_set("Europe/Kiev");
		$this->user = "";
		$this->temp = array();
		$this->queue = array();
		$this->fetch = false;
		$this->lock = false;
		$this->position = array();
		//获取插件所在的路径 /*<--- mars runes*/
		$path = $this->api->plugin->configPath($this)."DateBase.db";
		$path = str_replace("\\", "/", $path);
		//检查数据库是否存在，若否，则新建并初始化
		console(KBB.$path);
		if(!file_exists($path)){
			$this->database = new SQLite3($path);
			$this->query("CREATE TABLE logs (
				id INTEGER PRIMARY KEY, 
				name TEXT, 
				action NUMERIC, 
				blockname TEXT, 
				blockId NUMERIC, 
				meta NUMERIC, 
				level TEXT, 
				x NUMERIC, 
				y NUMERIC, 
				z NUMERIC, 
				time TEXT);");
		}
		else{
			$this->database = new SQLite3($path);
		}
		$this->query("PRAGMA journal_mode = OFF;");
		$this->query("PRAGMA synchronous = OFF;");
		//注册命令
		/*$this->api->console->register("q", "DataBase commands", array($this, "handleCommand"));*/
		$this->api->console->register("co", "get logs", array($this, "handleCommand"));
		/*$this->api->console->register("test", "", array($this, "handleCommand"));*/
		//添加事件句柄
		$this->api->addHandler("player.block.break", array($this, "blockactionHandler"), 15); 
		$this->api->addHandler("player.block.place", array($this, "blockactionHandler"), 15); 
		$this->api->addHandler("player.block.touch", array($this, "blockactionHandler"), 15);
		$this->api->addHandler("player.quit", array($this, "eventHandler"), 15);
		$this->api->addHandler("player.join", array($this, "eventHandler"), 15);
		$this->api->addHandler("console.command.stop", array($this, "save"));
		$this->runnable = false;
		$this->api->schedule(1, array($this, "queueSchedule"), NULL, true);
	}
	
	public function eventHandler($data, $event){
		switch($event){
			case "player.quit":
			case "player.join":
				if($data->iusername == strtolower($this->user)){
					$this->user = -1;
				}
				break;
		}
	}
	public function queueSchedule(){
		if($this->lock) return;
		if($this->runnable){
			return;
		}
		else{
			$this->runnable = true;
		}
		if(count($this->queue) > 0){
			$q = array_shift($this->queue);
			if($q[1]){
				$data = $this->query($q[0]);
				while(($dat = $data->fetchArray(SQLITE3_ASSOC)) !== false){
					$this->fetch[] = $this->arr2str($dat);
				}
			}
			else{
				$this->query($q[0]);
			}
		}
		$this->runnable = false;
	}
	
	public function addQueue($sql, $fetch = false){
		$this->queue[] = array($sql, $fetch);
	}
	
	public function lockQueue(){
		$this->lock = true;
	}
	
	public function unlockQueue(){
		$this->lock = false;
	}
	
	public function blockactionHandler($data, $event){
		if($data["player"]->username == $this->user){
			$this->getLog($data, $event, false);
			return false;
		}
		else{
			$this->addLog($data, $event);
		}
	}
	
	public function getLog($data, $event, $output = true){
		switch($event){
			case "player.block.place":
				$target = $data["block"];
				break;
			case "player.block.break":
			case "player.block.touch":
				$target = $data["target"];
				break;
		}
		$level = $data['player']->entity->level->getName();
		$x = $target->x;
		$y = $target->y;
		$z = $target->z;
		$position = array($level, $x, $y, $z);
		$this->lockQueue();
		$query = "SELECT * FROM logs WHERE level='".$level."' AND x='".$x."' AND y='".$y."' AND z='".$z."' ORDER BY id DESC";
		
		if($output){
			$this->outputQuery($query);
			$this->unlockQueue();
			return;
		}
		
		$count = count($this->temp);
		if($this->position == $position){
			if($this->num >= ($count - 1)){
				$this->num = 0;
			}
			else{
				$this->num++;
			}
		}
		else{
			$this->position = $position;
			$this->temp = array();
			$this->num = 0;
			$fetch = $this->query($query);
			if(!($fetch instanceof SQLite3Result)){
				$result = KBB.'No logs here or server is too busy.';
				$data["player"]->sendChat($result);
				$this->unlockQueue();
				return;
			}
			while(($dat = $fetch->fetchArray(SQLITE3_ASSOC)) !== false){
				$this->temp[] = $dat;
			}
			$fetch->finalize();
			$count = count($this->temp);
		}
		
		if($count == 0){
			$result = KBB.'No logs here or server is too busy.';
		}
		else{
			$result = KBB.'['.($count - $this->num).'/'.$count.'] [x:'.$x.'][y:'.$y.'][z:'.$z."]\n";
			$result = $result.$this->arr2str($this->temp[$this->num]);
		}
		
		$data["player"]->sendChat($result);
		$this->unlockQueue();
	}
	
	public function addLog($data, $event){
		$needsLog = true;
		switch($event){
			case "player.block.place":
				$target = $data["block"];
				$block = $data["item"];
				$action = BLOCK_PLACE;
				break;
			case "player.block.break":
				$target = $data["target"];
				$block = $data["target"];
				$action = BLOCK_BREAK;
				break;
		    case "player.block.touch":
				$target = $data["target"];
				$block = $data["target"];
				$action = BLOCK_TOUCH;
				//console("touched". $block->getID());
				if($block->getID() != CHEST && $block->getID() != FURNACE){
					//console("no =<");
					$needsLog = false;
				}
				break;
			/*if($data["target"]->getID() === CHEST || $data["target"]->getID() === FURNACE){*/
		}
		if($needsLog){
			$name = $data["player"]->iusername;
			$blockname = $block->getName();
			$blockId = $block->getID();
			$meta = $block->getMetadata();
			$level = $data["player"]->entity->level->getName();
			$x = $target->x;
			$y = $target->y;
			$z = $target->z;
			$query = "INSERT INTO logs VALUES (NULL, '".$name."', ".$action.", \"".$blockname."\", ".$blockId.", ".$meta.", '".$level."', ".$x.", ".$y.", ".$z.", ".time().");";

			//console($action);
			$this->addQueue($query);
		}
		$this->executed++;
		if($this->executed >= $this->executeGCEvery){
			gc_collect_cycles();
			$this->executed = 0;
		}
		$this->save();
	}
	
	public function handleCommand($cmd, $arg, $issuer, $alias){ 
		switch($cmd){
			/*case "q":
				if(count($arg) == 0) console("error");
				$query = "";
				foreach($arg as $text){
					$query = $query.$text." ";
				}
				$this->outputQuery($query);
				break;*/
			case "co":
				if($this->user == $issuer->username){
					$this->user = -1;
					$issuer->sendChat(KBB.'Disabled.');
				}
				else{
					$this->user = $issuer->username;
					$issuer->sendChat(KBB.'Enabled.');
				}
				break;
			/*case "test":
				$this->test();
				break;*/
		}
	}
	
	public function arr2str($arr){

		//console(json_encode($arr));
	    $date = date("Y/m/d-H:i:s", $arr["time"]);
		$str = KBB."BlockID: ".$arr["blockId"].":".$arr["meta"].  " (".$arr["blockname"].")"."\n";
		$str = $str.KBB."The player who ".self::$act[$arr["action"]]." this block: ".$arr["name"]."\n";
		$interval = round((time() - $arr["time"]) / 3600, 2);
		$str = $str.KBB."Time: ".$interval." hour(s) ago, " .$date;
		return $str;
	}
	
	public function act2str($action){
		return $this->act[$action];
	}
	
	public function pos2str(Position $pos){
		return "Position(level=".$pos->level->getName().",x=".ceil($pos->x).",y=".ceil($pos->y).",z=".ceil($pos->z).")";
	}
	
	public function outputQuery($query){
		$data = $this->query($query);
		
		while(($dat = $data->fetchArray(SQLITE3_ASSOC)) !== false){
			console($this->arr2str($dat));
		}
		console(KBB.'NULL');
		$data->finalize();
	}
	
	public function test(){
		// $num = $this->query('SELECT count(id) as id FROM logs', true);
		// var_dump($num);
		// return;
		$this->lockQueue();
		for($i = 1; $i <= 1000; $i++){
			$this->addQueue("INSERT INTO logs VALUES (NULL, 'ljy', ".BLOCK_BREAK.", 'Stone', 1, 0, 'world', 100, 100, 100, ".time().");");
		}
		console(KBB.'1000条记录已增加到队列，准备打开队列锁');
		$this->unlockQueue();
		console(KBB.'队列锁已打开');
	}
	public function reinit(){
		$path = $this->api->plugin->configPath($this)."DateBase.db";
		$path = str_replace("\\", "/", $path);
		$this->database = new SQLite3($path);
		$this->caughtWarn = true;
	}
	public function query($sql, $fetch = false){
		set_error_handler(array($this, "reinit"), E_WARNING);
		$result = $this->database->query($sql);
		restore_error_handler();
		if($this->caughtWarn){
			$this->caughtWarn = false;
			$result = $this->database->query($sql)  or console("[ERROR] [SQL Error] ".$this->database->lastErrorMsg().". Query: ".$sql, true, true, 0);
		}
		if($fetch === true and ($result instanceof SQLite3Result)){
			$result = $result->fetchArray(SQLITE3_ASSOC);
		}
		return $result;
	}
	
	public function save(){
		$this->database->close();
	}
	
	public function __destruct(){
		
	}
}