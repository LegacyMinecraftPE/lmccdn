<?php

/*
__PocketMine Plugin__
name=No Block Drop
description=Switches block with a similar type (flower to another flower)
version=1.0
author=Junyi00
class=NoBlockDrop
apiversion=10
*/

class NoBlockDrop implements Plugin{
	private $api, $path, $config;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.block.break", array($this, "handler") 15);
	}
	
	public function __destruct() {}
	
	public function handler($data, $event) {
		$block = $data['target'];
		$level = $data['player']->level;
		$level->setBlock(new Vector3($block->x, $block->y, $block->z), new AirBlock());
		return false;
	}

}