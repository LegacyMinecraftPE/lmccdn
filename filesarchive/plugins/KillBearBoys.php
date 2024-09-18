<?php class KillBearBoys implements Plugin
{
    private $api, $wands, $path;
    public function __construct(ServerAPI $api, $server = false)
    {
        $this->api = $api;
    }
    public function init()
    {
        date_default_timezone_set("Asia/Hong_Kong");
        $this->api->addHandler("player.block.break", [$this, "eventHandler"]);
        $this->api->addHandler("player.block.place", [$this, "eventHandler"]);
        $this->api->addHandler("player.block.touch", [$this, "eventHandler"]);
        $this->api->addHandler("player.quit", [$this, "eventHandler"]);
        $this->api->console->register("co", "Enabled or Disabled", [
            $this,
            "commandHandler",
        ]);
        @mkdir(DATA_PATH . "plugins/");
        @mkdir(DATA_PATH . "plugins/KillBearBoys/");
        @mkdir(DATA_PATH . "plugins/KillBearBoys/data/");
        $this->path = DATA_PATH . "plugins/KillBearBoys/data";
        $this->wands = [];
    }
    public function __destruct()
    {
    }
    public function eventHandler($data, $event)
    {
        if ($event == "player.quit") {
            if (isset($this->wands[$data->username])) {
                unset($this->wands[$data->username]);
            }
            return true;
        }
        switch ($event) {
            case "player.block.place":
                $target = $data["block"];
                $block = $data["item"];
                break;
            case "player.block.break":
            case "player.block.touch":
                $target = $data["target"];
                $block = $data["target"];
                break;
        }
        $level = $data["player"]->entity->level->getName();
        $x = $target->x;
        $y = $target->y;
        $z = $target->z;
        $logs = new logs($x, $y, $z, $level, $this->path);
        if (!isset($this->wands[$data["player"]->username])) {
            $action = substr($event, 13);
            $log = [
                "name" => $data["player"]->username,
                "action" => $action,
                "time" => date("Y/m/d-H:i:s", time()),
                "BlockName" => $block->getName(),
                "BlockID" => (string) $block->getID(),
                "Blockmeta" => (string) $block->getMetadata(),
            ];
            $logs->addLog($log);
            unset($logs);
            return true;
        }
        if ($this->wands[$data["player"]->username] instanceof logs) {
            if (logs::equals($this->wands[$data["player"]->username], $logs)) {
                $data["player"]->sendChat(
                    $this->wands[$data["player"]->username]->getLog()
                );
            } else {
                $data["player"]->sendChat($logs->getLog());
                $this->wands[$data["player"]->username] = $logs;
            }
        } else {
            $data["player"]->sendChat($logs->getLog());
            $this->wands[$data["player"]->username] = $logs;
        }
        unset($logs);
        return false;
    }
    public function commandHandler($cmd, $args, $issuer, $alias)
    {
        $output = "";
        if ($issuer instanceof Player) {
            $player = $issuer;
            if (!isset($this->wands[$player->username])) {
                $this->wands[$player->username] = true;
                $output = "[KillBearBoys]Enabled.";
            } else {
                unset($this->wands[$player->username]);
                $output = "[KillBearBoys]Disabled.";
            }
        } else {
            $output = "[KillBearBoys]Please run this command in-game.";
        }
        return $output;
    }
}
class logs
{
    public $x, $y, $z, $level, $num, $now, $path;
    public function __construct($x, $y, $z, $level, $path)
    {
        $this->x = $x;
        $this->y = $y;
        $this->z = $z;
        $this->level = $level;
        @mkdir("$path/$level/");
        @mkdir("$path/$level/$x/");
        @mkdir("$path/$level/$x/$y/");
        @mkdir("$path/$level/$x/$y/$z/");
        $this->path = "$path/$level/$x/$y/$z";
        if (!file_exists($this->path . "/num.dat")) {
            touch($this->path . "/num.dat");
            file_put_contents($this->path . "/num.dat", 0);
        }
        $this->getNum();
        $this->now = 0;
    }
    public function getNum()
    {
        $path = $this->path . "/num.dat";
        $data = file_get_contents($path);
        $num = (int) $data;
        $this->num = $num;
        return $num;
    }
    public function getLog()
    {
        if ($this->num < 1) {
            return "[Logs]No logs here.";
        }
        if ($this->now < 1) {
            $this->now = $this->num;
        }
        $path = $this->path . "/" . $this->now . ".dat";
        $data = file_get_contents($path);
        $log = json_decode($data, true);
        $text =
            "[Logs][" .
            $this->now .
            "/" .
            $this->num .
            "]
";
        foreach ($log as $key => $val) {
            $text .= "[$key][$val]
";
        }
        $this->now--;
        return $text;
    }
    public function move($position)
    {
        if ($position < 1 || $position > $this->num) {
            return false;
        }
        $this->now = $position;
        return true;
    }
    public static function equals(logs $a, logs $b)
    {
        if (
            $a->level == $b->level &&
            $a->x == $b->x &&
            $a->y == $b->y &&
            $a->z == $b->z
        ) {
            return true;
        }
        return false;
    }
    public function addLog($log)
    {
        $data = json_encode($log);
        $this->num++;
        $path = $this->path . "/" . $this->num . ".dat";
        file_put_contents($path, $data);
        $path = $this->path . "/num.dat";
        file_put_contents($path, $this->num);
        return true;
    }
}
