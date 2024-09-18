<?php

/*
__PocketMine Plugin__
name=tChat
description=Плагин на разнообразный чат
version=0.8.1
author=tema1d
class=tChat
apiversion=11,12,12.1
*/


class tChat implements Plugin{
	private $api, $prefix, $path, $user;
	public static $INSTANCE;
	public function __construct(ServerAPI $api, $server = false){
		tChat::$INSTANCE = $this;
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.join", array($this, "handler"), 5);
		$this->api->addHandler("player.chat", array($this, "handler"), 5);
		$this->api->addHandler("console.command", array($this, "handler"), 5);
		$this->readConfig();
		$this->api->console->register("setprefix", "Поменять юзеру префикс.", array($this, "Pref"));
		$this->api->console->register("defprefix", "Поставить дефолт префикс.", array($this, "Pref"));
		$this->api->console->register("delprefix", "Удалить префикс.", array($this, "Pref"));
		$this->api->console->register("setnick", "Поставить юзеру никнейм", array($this, "Pref"));
		$this->api->console->register("delnick", "Удалить юзеру никнейм.", array($this, "Pref"));
		$this->api->console->register("mute", "Замутить игрока.", array($this, "Pref"));
		$this->api->console->register("unmute", "Размутить игрока.", array($this, "Pref"));
		$this->api->console->register("enablechat", "Включить чат.", array($this, "Pref"));
		$this->api->console->register("disablechat", "Выключить чат.", array($this, "Pref"));
		//console(FORMAT_GREEN."[tChat] Плагин загружен.");

	}
	
	public function __destruct(){
	}
	
	public function readConfig(){
		$this->path = $this->api->plugin->createConfig($this, array(
			"chat-format" => "[{WORLDNAME}] [{prefix}] <{DISPLAYNAME}> {MESSAGE}",
			"default" => "Player",
			"chat" => "enable",
		));
		$this->config = $this->api->plugin->readYAML($this->path."config.yml");
	}

	
	public function Pref($cmd, $args){
		switch($cmd){
			
			case "setprefix":
			  $player = strtolower((string)$args[0]);
			  $pref = $args[1];
			  
			  $this->config['player'][$player]['pref'] =$pref;
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			  if(empty($player)) { return "[tChat] Ты должен указать никнейм - /setprefix <nick> <prefix>"; return false; }
			  if(empty($pref)) { return "[tChat] Ты должен указать префикс - /setprefix <nick> <prefix>"; return false; }
			  $output .= "[tChat] Выдан кастом префикс «".$pref."» игроку ".$player.".\n";
			  console(FORMAT_GREEN."[tChat] Выдан кастом префикс «".$pref."» игроку ".$player.".");
			  $this->api->chat->sendTo(false, "[tChat] Твой префикс теперь: «".$pref."»", $player);
		  break;
			case "defprefix":
			  $def = $args[0];
			   
			  $this->config['default']=$def;
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			  if(empty($def)) { return "[tChat] Ты должен указать дефолт префикс - /defprefix <prefix>"; return false; }
			  
			  $output .= "[tChat] Стандартный префикс теперь: ".$def.".\n";
			  console(FORMAT_GREEN."[tChat] Стандартный префикс теперь: ".$def.".\n");
			break;
			case "delprefix":
			  $player = strtolower((string)$args[0]);
			   
			  unset($this->config['player'][$player]['pref']);
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			   if(empty($player)) { return "[tChat] Ты должен указать никнейм - /delprefix <nick>"; return false; }
			  $output .= "[tChat] Удален префикс игрока ".$player.".\n";
			  console(FORMAT_GREEN."[tChat] Удален префикс игрока ".$player.".\n");
			  $this->api->chat->sendTo(false, "[tChat] Твой префикс теперь дефолтный: ".$def." !", $player);
			break;
			case "setnick":
			  $player = strtolower((string)$args[0]);
			  $nick = $args[1];
			  
			  $this->config['player'][$player]['nick'] = "".$nick;
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			  if(empty($player)) { return "[tChat] Ты должен указать никнейм - /setnick <real_nick> <custom_nick>"; return false; }
			  if(empty($nick)) { return "[tChat] Ты должен указать никнейм - /setnick <real_nick> <custom_nick>"; return false; }
			  $output .= "[tChat] Выдан кастом ник «".$nick."» игроку ".$player.".\n";
			  console(FORMAT_GREEN."[tChat] Выдан кастом ник «".$nick."» игроку ".$player.".");
			  $this->api->chat->sendTo(false, "[tChat] Твой кастом ник: «".$nick."» !", $player);
		  break;
		  case "delnick":
			  $player = strtolower((string)$args[0]);
			  
			  unset($this->config['player'][$player]['nick']);
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			  if(empty($player)) { return "[tChat] Ты должен указать никнейм - /delnick <nick>"; return false; }
			  $output .= "[tChat] Установлен реальный ник игроку ".$player.".\n";
			  console(FORMAT_GREEN."[tChat] Установлен реальный ник игроку ".$player.".\n");
			  $this->api->chat->sendTo(false, "[tChat] Установлен твой реальный ник!", $player);
		  break;
		  case "mute":
			  $player = strtolower((string)$args[0]);
			  
			  $this->config['player'][$player]['mute'] = true;
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			  if(empty($player)) { return "[tChat] Ты должен указать никнейм - /mute <nick>"; return false; }
			  $output .= "[tChat] ".$player." замьючен в игровом чате.\n";
			  console(FORMAT_GREEN."[tChat] ".$player." замьючен в игровом чате.\n");
			  $this->api->chat->sendTo(false, "[tChat] Ты получил мут игрового чата!", $player);
		  break;
		  case "unmute":
			  $player = strtolower((string)$args[0]);
			  
			  unset($this->config['player'][$player]['mute']);
			  $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
			  if(empty($player)) { return "[tChat] Ты должен указать никнейм - /unmute <nick>"; return false; }
			  $output .= "[tChat] ".$player." размьючен в игровом чате.\n";
			  console(FORMAT_GREEN."[tChat] ".$player." размьючен в игровом чате.\n");
			  $this->api->chat->sendTo(false, "[tChat] Ты получил размут игрового чата!", $player);
		  break;
		  case "enablechat":
			  $this->config['chat']="enable";
			  $output .= "[tChat] Чат включен.\n";
		  break;
		  case "disablechat":
			  $this->config['chat']="disable";
			  $output .= "[tChat] Чат выключен.\n";
		  break;
		  default:		
			$output .= '[tChat] tChat by Tema1d.';
		  break;
		  }
	  return $output;
	  }
	  
	public function handler(&$data, $event){
		switch($event){
			case "console.command":
				$command = $data["cmd"];
				if($data["issuer"] === "console"){
					break;
				}
				$player = strtolower($data["issuer"]->username);
				if(isset($this->config['player'][$player]['mute']) && $command === "tell" | $command === "me")
				{
					$this->api->chat->sendTo(false, "[tChat] Ты замьючен в игровом чате!", $player);
					return false;
				}
				break;
			case "player.chat":
				$player = strtolower($data["player"]->username);
				if(!isset($this->config['player'][$player]['mute']) && $this->config['chat']=="enable")
				{
					if(!isset($this->config['player'][$player]['pref'])){
						$prefix = $this->config['default'];
					}
					else{
						$prefix = $this->config['player'][$player]['pref'];
					}
					if(!isset($this->config['player'][$player]['nick'])){
						$nickname = $data["player"]->username;
					}
					else{
						$nickname = $this->config['player'][$player]['nick'];
					}
					$dsicordmsg = str_replace(array("{DISPLAYNAME}", "{MESSAGE}", "{WORLDNAME}", "{prefix}"), array("**" . $nickname . "**", $data["message"], $data["player"]->level->getName(), $prefix), $this->config["chat-format"]);
					$data = array("player" => $data["player"], "message" => str_replace(array("{DISPLAYNAME}", "{MESSAGE}", "{WORLDNAME}", "{prefix}"), array($nickname, $data["message"], $data["player"]->level->getName(), $prefix), $this->config["chat-format"]));
				
					if($this->api->handle("tChat.".$event, $data) !== false){
						$this->api->chat->send(false, $data['message']);//
						ServerAPI::request()->send2Discord($dsicordmsg);
					}
					return false;
				}
				elseif(isset($this->config['player'][$player]['mute']))
				{
					$this->api->chat->sendTo(false, "[tChat] Ты замьючен в игровом чате!", $player);
					return false;
				}
				else
				{
					$this->api->chat->sendTo(false, "[tChat] Чат выключен!", $player);
					return false;
				}
				break;
		}
	}	
}
