//    Dunge0neratoR v2.2    ( a.k.a Spawner I&B )
//    by RusJJ    #4pda.ru

 

/*     - - Настройки Генератора - -     */

var dungeonsGenAccept = 1;    //Разрешить генерацию сокровищниц
var well_clearGenAccept = 1;    //Разрешить генерацию пустынных колодцев
var tall_grassGenAccept = 1;    //Разрешить генерацию высокой травы

var dungheightMin = 8;     // Мин.Высота сокровищниц (не рекомендуется меньше 3)
var dungheightMax = 85;     //Макс.Высота сокровищниц
var MaxDungeons = 12;     //Кол-во сокровищниц
var MaxWellClear = 2;    //Кол-во пустынных колодцев
var inAirGeneration_Dung = 0;    //Разрешить генерацию сокровищниц в воздухе

/*     - - Настройки Генератора - -     */



var SpawnerID = 52;
var createdDungeonS = 0;
var createdWellClearS = 0;
var modTickSpawn = rand(600,3600);
var spawnerX = [MaxDungeons+1];
var spawnerY = [MaxDungeons+1];
var spawnerZ = [MaxDungeons+1];
var spawnerMobType = [MaxDungeons+1];



ModPE.setItem(420, 9, 9, "Spider Spawn Egg");
ModPE.setItem(421, 9, 9, "Skeleton Spawn Egg");
ModPE.setItem(422, 9, 9, "PigZombie Spawn Egg");
ModPE.setItem(423, 9, 9, "Creeper Spawn Egg");
ModPE.setItem(424, 9, 9, "Zombie Spawn Egg");



function newLevel() 
{
    if(dungeonsGenAccept == 1)
    {
        var i = 1;
        createdDungeonS = ModPE.readData("Dungeons in Map '" + Level.getWorldDir() + "' : ");
        Block.defineBlock(SpawnerID , "Mob Spawner" , [["mob_spawner", 0], ["mob_spawner", 0], ["mob_spawner", 0], ["mob_spawner", 0], ["mob_spawner", 0], ["mob_spawner", 0]], 0, true, 0);
        Block.setDestroyTime(SpawnerID, 8);
        for(i; i <= MaxDungeons; i++)
        {
            if(createdDungeonS < MaxDungeons) 
            {
                var x1 = rand(32,224);
                var y1 = rand(dungheightMin,dungheightMax);
                var z1 = rand(32,224);
                if(getTile(x1, y1, z1) > 0 || inAirGeneration_Dung == 1)
                {
                    var spawnerType = rand(0,3);
                    createDungeon(x1, y1, z1); 
                    print("Dungeons: " + i + "/" + MaxDungeons);
                    ModPE.saveData("Dungeons in Map '" + Level.getWorldDir() + "' : ", createdDungeonS);
                    ModPE.saveData("SpawnerX '" + Level.getWorldDir() + "' " + createdDungeonS, x1);
                    ModPE.saveData("SpawnerY '" + Level.getWorldDir() + "' " + createdDungeonS, y1);
                    ModPE.saveData("SpawnerZ '" + Level.getWorldDir() + "' " + createdDungeonS, z1);
                    ModPE.saveData("SpawnerType '" + Level.getWorldDir() + "' " + createdDungeonS, spawnerType);
                }
                else
                { 
                    i--; 
                }
            }
        } 
    }
    if(well_clearGenAccept == 1 && ModPE.readData("WellClears in Map '" + Level.getWorldDir() + "' : ") < MaxWellClear)
    {
        for(var x1 = 10; x1 < 246; x1++)
        {
            for(var y1 = 40; y1 < 93; y1++)
            {
                for(var z1 = 10; z1 < 246; z1++)
                {
                    if(getTile(x1, y1, z1) == 12 && getTile(x1, y1 + 1, z1) == 0 && ModPE.readData("WellClears in Map '" + Level.getWorldDir() + "' : ") < MaxWellClear)
                    {
                        if(rand(0, 230) > 229)
                        {
                            createWellClear(x1, y1, z1); x1=x1+20; z1=z1+20;
                        }
                    }
                    else if(ModPE.readData("WellClears in Map '" + Level.getWorldDir() + "' : ") >= MaxWellClear) { x1 = 246; y1 = 93; z1 = 246; }
                }
            }
        }
    }
    if(tall_grassGenAccept == 1 && ModPE.readData("Tallgrass in Map '" + Level.getWorldDir() + "' : ") == 0)
    {
        for(var x1 = 1; x1 < 256; x1++)
        {
            for(var y1 = 40; y1 < 128; y1++)
            {
                for(var z1 = 1; z1 < 256; z1++)
                {
                    if((getTile(x1, y1, z1) == 2 || getTile(x1, y1, z1) == 3) && getTile(x1, y1 + 1, z1) == 0)
                    {
                        if(rand(0, 3) > 2)
                        {
                            setTile(x1, y1 + 1, z1, 31, 1);
                        }
                    }
                }
            }
        }
        ModPE.saveData("Tallgrass in Map '" + Level.getWorldDir() + "' : ", 1)
        print("Tall grass has been generated!");
    }
}

function createDungeon(x, y, z)
{
    {
        setCube(0, x-3, y, z-2, x+3, y+3, z+2);
        createFloor(x, y-1, z);
        createWallX(x, y, z+3);
        createWallX(x, y, z-3);
        createWallZ(x+4, y, z);
        createWallZ(x-4, y, z);
        setTile(x, y, z, SpawnerID);
        setTile(x-3, y, z, 54, 5);
        setTile(x, y, z+2, 54, 2);
        createdDungeonS++;

        for(var i=1; i <= MaxDungeons; i++)
        {
            var chestSlots1 = rand(1,27);
            var chestSlots2 = rand(1,27);
            var itemRand1 = parseInt(rand(0,7));
            var itemRand2 = parseInt(rand(0,7));
            var int1;
            var int2;
            var item1 = 1;
            var item2 = 1;
            if(itemRand1 >= 0 && itemRand1 < 1 )
            {
                int1 = 265;
                item1 = parseInt(rand(1,4));
            } 
            else if(itemRand1 >= 1 && itemRand1 < 2)
            {
                int1 = 297;
            } 
            else if(itemRand1 >= 2 && itemRand1 < 3 )
            {
                int1 = 296;
                item1 = parseInt(rand(1,4));
            } 
            else if(itemRand1 >= 3 && itemRand1 < 4 )
            {
                int1 = 289;
                item1 = parseInt(rand(1,4));
            } 
            else if(itemRand1 >= 4 && itemRand1 < 5 )
            {
                int1 = 287;
                item1 = parseInt(rand(1,4));
            } 
            else if(itemRand1 >= 5 && itemRand1 < 6 )
            {
                int1 = 325;
            } 
            else if(itemRand1 >= 6 && itemRand1 < 7 )
            {
                int1 = 331;
                item1 = parseInt(rand(1,4));
            } 
            if(itemRand2 >= 0 && itemRand2 < 1)
            {
                int2 = 265;
                item2 = parseInt(rand(1,4));
            } 
            else if(itemRand2 >= 1 && itemRand2 < 2 )
            {
                int2 = 297;
            } 
            else if(itemRand2 >= 2 && itemRand2 < 3 )
            {
                int2 = 296;
                item2 = parseInt(rand(1,4));
            } 
            else if(itemRand2 >= 3 && itemRand2 < 4 )
            {
                int2 = 289;
                item2 = parseInt(rand(1,4));
            } 
            else if(itemRand2 >= 4 && itemRand2 < 5 )
            {
                int2 = 287;
                item2 = parseInt(rand(1,4));
            } 
            else if(itemRand2 >= 5 && itemRand2 < 6 )
            {
                int2 = 325;
            } 
            else if(itemRand2 >= 6 && itemRand2 < 7 )
            {
                int2 = 331;
                item2 = parseInt(rand(1,4));
            } 
            Level.setChestSlot(x-3 ,y,z, parseInt(chestSlots1), int1, 0,item1);
            Level.setChestSlot(x,y ,z+2 , parseInt(chestSlots2) , int2,0,item2);
        } 
    }
} 

function createWellClear(x, y, z)
{
    setCube(0, x-2, y-2, z-2, x+2, y+3, z+2);
    setCube(24, x-2, y-2, z-2, x+2, y-1, z+2);
    setTile(x+2, y, z, 44, 1);
    setTile(x-2, y, z, 44, 1);
    setTile(x, y, z+2, 44, 1);
    setTile(x, y, z-2, 44, 1);
    setTile(x-2, y, z-2, 24);
    setTile(x-1, y, z-2, 24);
    setTile(x-2, y, z-1, 24);
    setTile(x-2, y, z+2, 24);
    setTile(x-1, y, z+2, 24);
    setTile(x-2, y, z+1, 24);
    setTile(x+2, y, z-2, 24);
    setTile(x+1, y, z-2, 24);
    setTile(x+2, y, z-1, 24);
    setTile(x+2, y, z+2, 24);
    setTile(x+1, y, z+2, 24);
    setTile(x+2, y, z+1, 24);
    setTile(x, y-1, z, 9);
    setTile(x+1, y-1, z, 9);
    setTile(x-1, y-1, z, 9);
    setTile(x, y-1, z-1, 9);
    setTile(x, y-1, z+1, 9);
    setTile(x, y+3, z, 24);
    setTile(x-1, y, z-1, 24);
    setTile(x-1, y+1, z-1, 24);
    setTile(x-1, y+2, z-1, 24);
    setTile(x-1, y, z+1, 24);
    setTile(x-1, y+1, z+1, 24);
    setTile(x-1, y+2, z+1, 24);
    setTile(x+1, y, z-1, 24);
    setTile(x+1, y+1, z-1, 24);
    setTile(x+1, y+2, z-1, 24);
    setTile(x+1, y, z+1, 24);
    setTile(x+1, y+1, z+1, 24);
    setTile(x+1, y+2, z+1, 24);
    setTile(x+1, y+3, z+1, 44, 1);
    setTile(x+1, y+3, z, 44, 1);
    setTile(x+1, y+3, z-1, 44, 1);
    setTile(x, y+3, z+1, 44, 1);
    setTile(x-1, y+3, z+1, 44, 1);
    setTile(x-1, y+3, z-1, 44, 1);
    setTile(x, y+3, z-1, 44, 1);
    setTile(x-1, y+3, z, 44, 1);
    print("One wellclear has been created!");
    createdWellClearS++;
    ModPE.saveData("WellClears in Map '" + Level.getWorldDir() + "' : ", createdWellClearS);
}

function useItem(x,y,z,itemId,blockId,side,itemDamage,blockDamage)
{
    if(itemId == 420)
    {
       // if(blockId == SpawnerID)
        
        preventDefault();
        addItemInventory(420, -1);
        Entity.spawnMob(x, y+1, z, 35);
    } 
    if(itemId == 421)
    {
        preventDefault();
        addItemInventory(421, -1);
        Entity.spawnMob(x, y+1, z, 34);
    } 
    if(itemId == 422)
    {
        preventDefault();
        addItemInventory(422, -1);
        Entity.spawnMob(x, y+1, z, 36);
    } 
    if(itemId == 423)
    {
        preventDefault();
        addItemInventory(423, -1);
        Entity.spawnMob(x, y+1, z, 33);
    }
    if(itemId == 424)
    {
        preventDefault();
        addItemInventory(424, -1);
        Entity.spawnMob(x, y+1, z, 32);
    }
}

function modTick()
{
    modTickSpawn--;
    if(modTickSpawn <= 0)
    {
        modTickSpawn = rand(600,3600);
        for(var i=1; i <= MaxDungeons; i++)
        {
            spawnerX[i] = ModPE.readData("SpawnerX '" + Level.getWorldDir() + "' " + i);
            spawnerY[i] = ModPE.readData("SpawnerY '" + Level.getWorldDir() + "' " + i);
            spawnerZ[i] = ModPE.readData("SpawnerZ '" + Level.getWorldDir() + "' " + i);
            spawnerMobType[i] = ModPE.readData("SpawnerType '" + Level.getWorldDir() + "' " + i);
            if(spawnerX[i] > 0 && spawnerY[i] > 0 && spawnerZ[i] > 0)
            { 
                if(getTile(spawnerX[i], spawnerY[i], spawnerZ[i]) == SpawnerID)
                {
                    if(spawnerMobType[i] >= 0 && spawnerMobType[i] < 1) 
                    {
                        Entity.spawnMob(rand(spawnerX[i]-2, spawnerX[i]+2), spawnerY[i]+1, rand(spawnerZ[i]-2, spawnerZ[i]+2), 35);
                    } 
                    else if(spawnerMobType[i] >= 1 && spawnerMobType[i] < 2 ) 
                    {
                        Entity.spawnMob(rand(spawnerX[i]-2, spawnerX[i]+2), spawnerY[i]+1, rand(spawnerZ[i]-2, spawnerZ[i]+2), 34);
                    } 
                    else
                    {
                        Entity.spawnMob(rand(spawnerX[i]-2, spawnerX[i]+2), spawnerY[i]+1, rand(spawnerZ[i]-2, spawnerZ[i]+2), 32);
                    } 
                } 
            } 
        } 
    }
} 



/*    - - - - -    */



function rand(min, max)
{
    return Math.random() * (max - min) + min;
}

function createWallX(x, y, z)
{
    for(var x_x=-4+x; x_x <= 4+x; x_x++) 
    {
        for(var y_y=y; y_y <= 3+y; y_y++) 
        {
            setTile(x_x ,y_y , z, 4);
        } 
    } 
} 

function createWallZ(x, y, z)
{
    for(var z_z=-2+z; z_z <= 2+z; z_z++) 
    {
        for(var y_y=y; y_y <= 3+y; y_y++) 
        {
            setTile(x ,y_y , z_z, 4);
        } 
    } 
} 

function setCube(blockId, x1, y1, z1, x2, y2, z2)
{
    for(var x_x=x1; x_x <= x2; x_x++) 
    {
        for(var y_y=y1; y_y <= y2; y_y++) 
        {
            for(var z_z=z1; z_z <= z2; z_z++) 
            {
                setTile(x_x, y_y, z_z, blockId);
            } 
        } 
    } 
} 

function createFloor(x, y, z)
{
    for(var x_x=-4+x; x_x <= 4+x; x_x++) 
    {
        for(var z_z=-3+z; z_z <=3+z ; z_z++) 
        {
            var randCobb = parseInt(rand(0, 12));
            var blockCobb;
            if(randCobb >= 0 && randCobb <= 3)
            {
                blockCobb = 4;
            } 
            else
            {
                blockCobb = 48;
            } 
            setTile(x_x, y, z_z, blockCobb);
        } 
    } 
} 