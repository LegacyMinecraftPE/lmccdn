<?php
/*
__PocketMine Plugin__
name=tPlayerInteract
version=0.8.1
description=Plugin to turn off and on build, touch and destroy mode / Плагин для включения и выключения возможности писать в чат, ставить блоки, взаимодействовать с ними и разрушать их.
author=Tema1d
class=tPlayerInt
apiversion=12,12.1
*/


class tPlayerInt implements Plugin{
        private $api, $sessions, $path, $config, $userstate;
        public function __construct(ServerAPI $api, $server = false){
                $this->api = $api;
                $this->sessions = array();
        }

        public function init(){
		$defaults['plugin'] = [ "defaults" => [ "userstate" => "false" ], "messages" => [ "enabled" => "Ты получил права взаимодействий.", "disabled" => "Твои права взаимодействий были отобраны.", "cannotbuild" => "Ты не имеешь права писать в чат/строить/разрушать/использовать блоки.\n Подай заявку в дискорд сервере проекта для получения этих прав:\nhttps://discord.gg/eyuGNNyFKD" ] ];

                $this->config['plugin'] = new Config($this->api->plugin->configPath($this) . "config.json", CONFIG_JSON, $defaults['plugin']);
		$this->config['userstate'] = new Config($this->api->plugin->configPath($this) . "userstate.json", CONFIG_JSON); 

		$this->api->addHandler("player.block.break", array($this, "blockBreak"), 777);
		$this->api->addHandler("player.block.place", array($this, "blockPlace"), 777);
		$this->api->addHandler("player.block.touch", array($this, "blockTouch"), 777);
        $this->api->addHandler("player.chat", array($this, "playerChat"), 777);
		$this->api->addHandler("player.interact", array($this, "punchMob"), 777);
		

		$this->api->console->register("addint", "Изменить режим взаимодействий.", array($this, "addint"));
	}

        public function __destruct(){
        }
	
	public function punchMob($data, $event){
		switch($event){
			case "player.interact":
				$player = strtolower($this->api->entity->get($data['eid'])->player->username);
				if($this->config['userstate']->exists($player) && $this->config['userstate']->get($player) == 'false'){
					return false;
				}
		}
	}
	
	public function blockPlace($data) { return $this->blockAction($data); }
	public function blockBreak($data) { return $this->blockAction($data); }
	public function blockTouch($data) { return $this->blockAction($data); }
	public function playerChat($data) { return $this->blockAction($data); }
	

	public function blockAction($data) {
		$player = strtolower($data['player']->username);
		if($this->config['userstate']->exists($player)) {
			if($this->config['userstate']->get($player) == 'false') { 
				$data['player']->sendChat($this->config['plugin']->get('messages')['cannotbuild']); 
				return false;
			}
		}
		else { 
			$defaultmode = $this->config['plugin']->get('defaults')['userstate'];
			console("[tPlayerInt] Поменян режим взаимодействий на ".$defaultmode." для ".$player); 
			$this->config['userstate']->set($player,$defaultmode); 
			$this->config['userstate']->save(); 
			$data['player']->sendChat($this->config['plugin']->get('messages')['cannotbuild']); 
			return false;
		}
	}
	
	public function addint($cmd, $params, $issuer, $alias){
		$player = strtolower((string)$params[0]);
		if(empty($player)) { return "Ты должен указать никнейм - /addint <user> (on|off)"; return false; }

		if($params[1]=='on') { $action = "enable"; }
		elseif($params[1]=='off') { $action = "disable"; }
		elseif(empty($params[1])) { return "Режим взаимодействия из ".$params[0]." изменен сейчас на ".$this->config['userstate']->get($player); }
		else { return "Ты должен указать правильный аргумент (on|off) - /addint <user> (on|off)"; }

                if($action=='disable') { $this->config['userstate']->set($player,"false"); $output = "disabled";}
		else { $this->config['userstate']->set($player,'true'); $output = "enabled"; }
		$this->config['userstate']->save();
		
		console("[tPlayerInt] «".$issuer."» Режим взаимодействия ".$output." для игрока: ".$player);
                if($target = $this->api->player->get($player)) { $target->sendChat($this->config['plugin']->get("messages")[$output]); } 
		return " Режим взаимодействия ".$output." для игрока ".$player;
	}
}
