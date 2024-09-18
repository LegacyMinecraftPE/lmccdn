<?php

/*
 __PocketMine Plugin__
name=RespawnWithoutDrop
description=Respawn Without Droping Any Item(Back to target world)
version=1.0
author=RapDoodle
class=RespawnWithoutDrop
apiversion=12
*/

class RespawnWithoutDrop implements Plugin{ 
    private $api;
    
    public function __construct(ServerAPI $api, $server =false){ 
        $this->api = $api;
        $this->server = ServerAPI::request();
    }
    
    public function init(){ 
        $this->api->addHandler("entity.health.change", array($this, "event"), 50);
    }
    public function event($data, $event){
        $player = $data["entity"]->player;
        if($player === false){
        
        }else{
            $hp = $data["health"];
            if($hp <= 0){
                $player = $data["entity"]->player;
                $player->entity->setHealth(20, "respawn", true);
                $data = array("player" => $player, "cause" => $data["cause"]);
                $world = $player->level->getName();
                $player->teleport($this->api->level->get($world)->getSafeSpawn());
                $ms = "<server> ".$player." dead.";
                $this->api->chat->broadcast($ms);
                return false;
            }//return false;
        }
    }

    //это то что я добавил 
        public function KillCommand($cmd, $issuer, $alias){
        if($cmd = "kill")
        {
    
            $player = $data["entity"]->player;
            $player->entity->setHealth(20, "respawn", true);
            $data = array("player" => $player, "cause" => $data["cause"]);
            $world = $player->level->getName();
            $player->teleport($this->api->level->get($world)->getSafeSpawn());
            $ms = "<server> ".$player." сломался";
            $this->api->chat->broadcast($ms);
            return false;
        }
    //тут оно кончается...
    }
    
    
    public function __destruct(){ 
        
    }
}