<?php

/*
__PocketMine Plugin__
name=RussianRoll
description=Simulate a game of Russian Roulette
version=0.3
author=Nairolf
class=RussianRoll
apiversion=12
*/

class RussianRoll implements Plugin {
    private $api;

    public function __construct( ServerAPI $api , $server = false ) {
        $this->api = $api;
    }

    public function init( ) {
        $this->api->console->register( "bang" , "Simulate a game of Russian Roulette" , array( $this , "commandHandler" ) );
        $this->api->ban->cmdwhitelist( "bang" );
    }

    public function commandHandler( $cmd , $params , $issuer , $alias ) {
        if ( rand( 1 , 6 ) == 1 ) {
            $this->api->chat->broadcast( $issuer . " had no luck with this bullet.\n" );
            $issuer->entity->harm( 1000 , " console ", false );
            
        }
        else {
            $msg = "[Bang] ";
            switch ( rand ( 1 , 4 ) ) {
                case 1:
                $msg .= "This is beginner's luck";
                break;
                case 2:
                $msg .= "You want to restart?";
                break;
                case 3:
                $msg .= "I've never seen it!";
                break;
                case 4:
                $msg .= "You've been lucky, boy!";
                break;
            }
            $this->api->chat->sendTo( false , $msg , $issuer->username );
        }
    }
    public function __destruct(){
    }
}
