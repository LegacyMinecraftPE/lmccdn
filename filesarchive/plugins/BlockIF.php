<?php

/*
__PocketMine Plugin__
name=BlockChangeInformation
description=ShowBlockChangeInformation
version=0.0.1
author=kgdwhsk
class=BlockCIF
apiversion=9,10,11
*/

/*
我是kgdwhsk莫多=。=来自中国
*/


class BlockCIF implements Plugin{
	private $api, $button;
	public function __construct(ServerAPI $api, $server = false)
	{
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.equipment.change", array($this, "handle"));
		$this->api->addHandler("player.block.place", array($this, "handle"));
		$this->api->addHandler("player.block.break", array($this, "handle"));
		$this->api->addHandler("player.block.touch", array($this, "handle"));
        $this->api->addHandler("player.quit",array($this, "quit"));
		//$this->api->addHandler("player.connect", array($this, "join"));
		$this->api->console->register("BCF", "Enabled/Disabled Show Block-Change-Information", array($this, "commandHandler"));
		$this->api->ban->cmdWhitelist("BCF");
        $this->button = array();
	}
	
	public function __destruct(){}
	
	public function handle(&$data, $event)
	{
		if(isset($this->button[$data["player"]->username]))
		{
			switch($event)
			{
				case "player.equipment.change":
					$blockID = $data["block"];
					$blockMeta = $data["meta"];
			  $blockName = BlockAPI::get($data["block"]);
					$data["player"]->sendChat("[BCF]Shortcut bar change to ".$blockName->getName()."(".$blockID." :".$blockMeta." ) !");
					break;
				case "player.block.place":
					$target = $data["block"];
					$block = $data["item"];
					$level = $data["player"]->entity->level->getName();
					$x = $target->x;
					$y = $target->y;
					$z = $target->z;
					$data["player"]->sendChat("[BCF]Place block ".$block->getName()."(".$block->getID()." :".$block->getMetadata()." ) on world : ".$level." X : ".$x." Y : ".$y." Z : ".$z."!");
					break;
				case "player.block.break":
					$level =$data["player"]->entity->level->getName();
					$target = $data["target"];
					$block = $data["target"];
					$x = $target->x;
					$y = $target->y;
					$z = $target->z;
					$data["player"]->sendChat("[BCF]Break block ".$block->getName()."(".$block->getID()." :".$block->getMetadata()." ) on world : ".$level."X : ".$x." Y : ".$y." Z : ".$z."!");
					break;
				case "player.block.touch":
					$level = $data["player"]->entity->level->getName();
					$target = $data["target"];
					$block = $data["target"];
					$x = $target->x;
					$y = $target->y;
					$z = $target->z;
					$data["player"]->sendChat("[BCF]Touch block ".$block->getName()."(".$block->getID()." :".$block->getMetadata()." ) on world : ".$level."X : ".$x." Y : ".$y." Z : ".$z."!");
					break;
				default:
			}
		}
		else
		{
			return true;
		}
	}
	function quit($data, $event)
	{
		if(isset($this->button[$data->username]))
		{
			unset($this->button[$data->username]);
		}
		return true;
	}
	/*function join($data, $event)
	{
		$this->button[$data->username] = false;
		console("[CB] ".$data->username." 使用CB !");
	}
	*/
	function commandHandler($cmd, $args, $issuer, $alias)
	{
	$output = "";
		if($issuer instanceof Player) 
		{
			$player = $issuer;
			if(!isset($this->button[$player->username]))
			{
				$this->button[$player->username] = true;
				$output = "[BCF]Enabled.";
			}
			else
			{
				unset($this->button[$player->username]);
				$output = "[BCF]Disabled.";
			}
		}
		else{
			$output = "[BCF]Please run this command in-game.";
		}
		return $output;
	}
}