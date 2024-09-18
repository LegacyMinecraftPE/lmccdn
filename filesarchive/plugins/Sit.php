<?php
/*
__PocketMine Plugin__
name=Sit
version=0.5
author=ArkQuark
class=SitMain
apiversion=12.1
*/

class SitMain implements Plugin{
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}

	public function init(){
		$this->api->addHandler("player.block.touch", [$this, "eventHandle"]);
		//$this->api->console->register("tapcmd", "Sets the tap cmd for the block you click", array($this, "command"));
		$this->config = new Config($this->api->plugin->configPath($this)."blocks.yml", CONFIG_YAML, ["ids" => [44, 53, 67, 108, 109, 114, 128, 134, 135, 156]]);
	}

	public function __destruct(){}
	
	/*public function command($cmd, $params, $issuer, $alias){ //taptodo thing
		if(!($issuer instanceof Player)) return "Please run command in game.";
		$cmd = implode(" ", $params);
		$this->state[$issuer->username] = true;
	}*/
	
	public function eventHandle($data, $event){
		foreach($this->config->get("ids") as $id){
			if($data["target"]->getID() === $id){
				//print("tryin' to sit");
				$p = $data["player"]->entity;
				if($p->isPlayer() && !$p->isRiding){
					$this->entity = $this->api->entity->add($p->level, 3, OBJECT_ARROW, [
						"x" => $data["target"]->x+.5,
						"y" => $data["target"]->y+.5,
						"z" => $data["target"]->z+.5
					]);
					$this->api->entity->spawnToAll($this->entity, $p->level);
					$this->entity->linkedEntity = $p;
					$p->isRiding = true;
					$this->entity->linkEntity($p, SetEntityLinkPacket::TYPE_RIDE);
					return true;
				}
				else{
					$p->isRiding = false;
					$this->entity->close();
					$data["player"]->teleport(new Vector3($data["target"]->x+.5, $data["target"]->y+.5, $data["target"]->z+.5));
					return true;
				}
			}
		}
	}
}