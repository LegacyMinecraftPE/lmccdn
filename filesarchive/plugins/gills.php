<?php

/*
__PocketMine Plugin__
name=Gills
description=Allow players to breath underwater
version=1.0
author=Falk
class=Gills
apiversion=10
*/

class Gills implements Plugin{
	private $api, $path, $config;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("entity.health.change", array($this, "eventHandler"));
		$this->api->console->register("gills", "Give a user gills", array($this, "command"));
}
	
	public function __destruct() {}
	public function command($cmd, $params, $issuer, $alias, $args, $issuer){
	if (isset($params[0])) {
	if (isset($this->gills[$params[0]])) {
	unset($this->gills[$params[0]]);
	$issuer->sendChat($params[0] . " no longer has gills.");
		
	}
	else {
$this->gills[$params[0]] = true;
$issuer->sendChat($params[0] . " now has gills.");
}

}
else {
	$issuer->sendChat("Usage: /gills <PLAYER NAME>");
}
	}

	public function eventHandler($data, $event) {
		if (!$data['entity']->class === ENTITY_PLAYER) {
			return true;
		}
		$player = $this->api->player->getByEID($data['entity']->eid);
		if ($data['cause'] == "water" && isset($this->gills[$player->username])) {
			return false;
		}
		else {
			return true;
		}
	}
	
}