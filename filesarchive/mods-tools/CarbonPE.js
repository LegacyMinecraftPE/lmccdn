/*CarbonPE
    ~ The Droid Team
    Перевод от KillerBLS     */
var speed = 1;
var movement = "Нормально";
var shouldRun = 1;
var Xdiff = 0;
var Zdiff = 0;
var Xpos = 0;
var Zpos = 0;
var jumpHeight = "1";
var jump = 0;
var jumpVel = 0;
var starterUI = null;
var closeUI = null;
var carbonPE = null;
var gunUI = null;
var jumpUI = null;
var flyUI = null;
var controlUI = null;
var itemDrop = false;
var itemDropChecked = false;
var unlimitedArrow = false;
var unlimitedArrowChecked = false;
var X, Y, Z;
var farmReady = false;
var farmChecked = false;
var spawnType = 10;
var spawnName = "Куриц";
var spawnCount = 160;
var farmActive = false;
var godMode = false;
var modeChecked = false;
var instaKill = false;
var killChecked = false;
var instant = false;
var instantChecked = false;
var saddleUp = false;
var saddleChecked = false;
var flyUp = false;
var flyDown = false;
var flyReady = false;
var flyChecked = false;
var gunReady = false;
var gunChecked = false;
var gunEngaged = false;
var entityType = "65";
var entityName = "Стрелять TNT";
var defaultDestroyTime = [
null, 1.5, 0.6, 0.5, 2, 2, 0, -1, null, null, null, null, 0.5, 0.6, 3, 3, 3, 2, 0.2, 0.6, 0.3, 3, 3, null, 0.8, null, 0.2, 0.7, null, null, 4, 0, 0, null, null, 0.8, null, 0, 0, 0, 0, 3, 5, 2, 2, 2, 0, 1.5, 2, 50, 0, 0, null, 2, 2.5, null, 3, 5, 2.5, 0, 0.6, 3.5, 3.5, 1, 3, 0.4, 0.7, 2, 1, null, null, 5, null, 3, 3, null, null, null, 0.1, 0.5, 0.2, 0.4, 0.6, 0, null, 2, 1, 0.4, 0.3, null, 1, 0.5, null, null, -1, 3, null, 1.5, null, null, 5, 0.3, 1, 0, 0, null, 2, 2, 1.5, null, null, 2, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.8, null, null, null, null, null, 2, 2, 2, null, null, 2, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, 0.8, 0.8, 2, 2, null, null, null, null, null, null, null, null, null, null, null, 0.5, 0.1, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 3.5, 50, 5, 0.6, 0.6, null, null, null, null, null, 0
]
var arrow;
var ground = 0;
var explosive = 0;
var fire = 0;
var onFire = 0;
var teleport = 0;
var canTP = 0;
var water = 0;
var ice = 0;
var light = 0;
var lava = 0;
var web = 0;
var block = 0;
var getBlock;
var getBlockData;
var typeOfArrow = "Нормально";
var hitChecked = false;
var knockBack = false;
var controlsReady = false;
var forward = false;
var backward = false;
var up = false;
var down = false;
var verticalDIRchecked = false;
var verticalMovement = false;
var ANIMAL_SPEED = 0.5;
var fontType = "Comic Sans MS";

function dip2px(ctx, dips){
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}
 
function newLevel(){
	speed = 1;
	movement = "Нормально";
	hitChecked = false;
	knockBack = false;
	jumpHeight = "1";
	jump = 0;
	jumpVel = 0;
	arrow;
	ground = 0;
	explosive = 0;
	fire = 0;
	onFire = 0;
	teleport = 0;
	canTP = 0;
	water = 0;
	ice = 0;
	light = 0;
	lava = 0;
	web = 0;
	block = 0;
	typeOfArrow = "Нормально";
    starter();
    itemDrop = false;
    itemDropChecked = false;
    unlimitedArrow = false;
    unlimitedArrowChecked = false;
    farmReady = false;
    farmChecked = false;
    spawnType = 10;
    spawnName = "Куриц";
    spawnCount = 160;
    farmActive = false;
    godMode = false;
    modeChecked = false;
    instaKill = false;
    killChecked = false;
    instant = false;
    instantChecked = false;
    saddleUp = false;
    saddleChecked = false;
    flyUp = false;
    flyDown = false;
    flyReady = false;
    flyChecked = false;
    gunReady = false;
    gunChecked = false;
    gunEngaged = false;
    entityType = "65";
    entityName = "Стрелять TNT";
	controlsReady = false;
	forward = false;
	backward = false;
	up = false;
	down = false;
	verticalDIRchecked = false;
	verticalMovement = false;
	fontType = "Comic Sans MS";
}
 
function starter(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(0);
             
            var menuBtn = new android.widget.Button(ctx);
            menuBtn.setText("M");
            menuBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
					if(gunUI != null){
                        gunUI.dismiss();
						gunUI = null;
                    }
                    if(flyUI != null){
                        flyUI.dismiss();
						flyUI = null;
                    }
					if(controlUI != null){
						controlUI.dismiss();
						controlUI = null;
					}
					mainMenu();
					close();
                }
            }));
            layout.addView(menuBtn);
             
            starterUI = new android.widget.PopupWindow(layout, dip2px(ctx, 40), dip2px(ctx, 40));
            starterUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 245, 0);
        }catch(err){
            print("The Menu-Button could not be displayed, because: " + err);
        }
    }}));
}
 
function close(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var closeLayout = new android.widget.LinearLayout(ctx);
            closeLayout.setOrientation(0);
             
            var closeBtn = new android.widget.Button(ctx);
            closeBtn.setText("X");
            closeBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(gunReady==true && gunUI==null){
                        gunButton();
                    }
                    if(flyReady==true && flyUI==null){
                        flyButton();
                    }
					if(saddleUp==true && controlUI==null){
						mobControls();
					}
                    carbonPE.dismiss();
                    closeUI.dismiss();
                }
            }));
            closeLayout.addView(closeBtn);
             
            closeUI = new android.widget.PopupWindow(closeLayout, dip2px(ctx,40), dip2px(ctx,40));
            closeUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(e){
            print("The X-Button could not be displayed, because: " + e);
        }
    }}));
}
 
function mainMenu(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var menuLayout = new android.widget.LinearLayout(ctx);
            var menuScroll = new android.widget.ScrollView(ctx);
            var menuLayout1 = new android.widget.LinearLayout(ctx);
            menuLayout.setOrientation(1);
            menuLayout1.setOrientation(1);
             
            menuScroll.addView(menuLayout);
            menuLayout1.addView(menuScroll);
             
            var layoutParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            layoutParams.setMargins(dip2px(ctx, 15), 0, 0, 0);
             
            var heading = new android.widget.TextView(ctx);
            heading.setTextSize(24);
            heading.setText("CarbonPE Alpha  v1.1");
			heading.setLayoutParams(layoutParams);
            menuLayout.addView(heading);
             
            var itemDropBtn = new android.widget.CheckBox(ctx);
            itemDropBtn.setTextSize(18);
            itemDropBtn.setText("64 Предмета при разрушении блока");
            itemDropBtn.setChecked(itemDropChecked);
            itemDropBtn.setLayoutParams(layoutParams);
            itemDropBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!itemDrop){
                        itemDrop = true;
                        itemDropChecked = true;
                    }else{
                        itemDrop = false;
                        itemDropChecked = false;
                    }
                    itemDropBtn.setChecked(itemDropChecked);
                }
            }));
            menuLayout.addView(itemDropBtn);
             
            var unlimitedArrowBtn = new android.widget.CheckBox(ctx);
            unlimitedArrowBtn.setTextSize(18);
            unlimitedArrowBtn.setText("Бесконечные стрелы");
            unlimitedArrowBtn.setChecked(unlimitedArrowChecked);
            unlimitedArrowBtn.setLayoutParams(layoutParams);
            unlimitedArrowBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!unlimitedArrow){
                        unlimitedArrow = true;
                        unlimitedArrowChecked = true;
                    }else{
                        unlimitedArrow = false;
                        unlimitedArrowChecked = false;
                    }
                    unlimitedArrowBtn.setChecked(unlimitedArrowChecked);
                }
            }));
            menuLayout.addView(unlimitedArrowBtn);
             
            var farmBtn = new android.widget.CheckBox(ctx);
            farmBtn.setTextSize(18);
            farmBtn.setText("Ферма животных");
            farmBtn.setChecked(farmChecked);
            farmBtn.setLayoutParams(layoutParams);
            farmBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!farmReady){
                        farmReady = true;
                        farmChecked = true;
                    }else{
                        farmReady = false;
                        farmChecked = false;
                    }
                    farmBtn.setChecked(farmChecked);
                }
            }));
            menuLayout.addView(farmBtn);
             
            var animalBtn = new android.widget.TextView(ctx);
            animalBtn.setTextSize(18);
            animalBtn.setText("Ферма животных: " + spawnName);
            animalBtn.setLayoutParams(layoutParams);
            animalBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(spawnType==10 && spawnName=="Куриц"){
                        spawnType = 11;
                        spawnName = "Коров";
                    }
                    else if(spawnType==11 && spawnName=="Коров"){
                        spawnType = 12;
                        spawnName = "Свиней";
                    }
                    else if(spawnType==12 && spawnName=="Свиней"){
                        spawnType = 13;
                        spawnName = "Овец";
                    }
                    else if(spawnType==13 && spawnName=="Овец"){
                        spawnType = 32;
                        spawnName = "Зомби";
                    }
                    else if(spawnType==32 && spawnName=="Зомби"){
                        spawnType = 33;
                        spawnName = "Криперов";
                    }
                    else if(spawnType==33 && spawnName=="Криперов"){
                        spawnType = 34;
                        spawnName = "Скелетов";
                    }
                    else if(spawnType==34 && spawnName=="Скелетов"){
                        spawnType = 35;
                        spawnName = "Пауков";
                    }
                    else if(spawnType==35 && spawnName=="Пауков"){
                        spawnType = 36;
                        spawnName = "Свинозомби";
                    }
                    else if(spawnType==36 && spawnName=="Свинозомби"){
                        spawnType = 10;
                        spawnName = "Куриц";
                    }
                    animalBtn.setText("Ферма животных: " + spawnName);
                }
            }));
            menuLayout.addView(animalBtn);
             
            var modeBtn = new android.widget.CheckBox(ctx);
            modeBtn.setTextSize(18);
            modeBtn.setText("Режим бога");
            modeBtn.setChecked(modeChecked);
            modeBtn.setLayoutParams(layoutParams);
            modeBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!godMode){
                        godMode = true;
                        modeChecked = true;
                    }else{
                        godMode = false;
                        modeChecked = false;
                        Player.setHealth(20);
                    }
                    modeBtn.setChecked(modeChecked);
                }
            }));
            menuLayout.addView(modeBtn);
             
            var instaKillBtn = new android.widget.CheckBox(ctx);
            instaKillBtn.setTextSize(18);
            instaKillBtn.setText("Мгновенное убийство");
            instaKillBtn.setChecked(killChecked);
            instaKillBtn.setLayoutParams(layoutParams);
            instaKillBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!instaKill){
                        instaKill = true;
                        killChecked = true;
                    }else{
                        instaKill = false;
                        killChecked = false;
                    }
                    instaKillBtn.setChecked(killChecked);
                }
            }));
            menuLayout.addView(instaKillBtn);

			var arrowBtn = new android.widget.TextView(ctx);
			arrowBtn.setTextSize(18);
			arrowBtn.setText("Тип стрел: " + typeOfArrow);
			arrowBtn.setLayoutParams(layoutParams);
			arrowBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(typeOfArrow=="Normal"){
						typeOfArrow = "Взрыв"
						explosive = 1;
					}
					else if(typeOfArrow=="Explosive"){
						web = 1;
						explosive = 0;
						typeOfArrow = "Web";
					}
					else if(typeOfArrow=="Web"){
						fire = 1;
						web = 0;
						typeOfArrow = "Огонь";
					}
					else if(typeOfArrow=="Fire"){
						teleport = 1;
						fire = 0;
						typeOfArrow = "Телепортирующие";
					}
					else if(typeOfArrow=="Teleporting"){
						lava = 1;
						teleport = 0;
						typeOfArrow = "Лавовые";
					}
					else if(typeOfArrow=="Lava"){
						water = 1;
						lava = 0;
						typeOfArrow = "Водяные";
					}
					else if(typeOfArrow=="Water"){
						ice = 1;
						water = 0;
						typeOfArrow = "Ледяные";
					}
					else if(typeOfArrow=="Ice"){
						light = 1;
						ice = 0;
						typeOfArrow = "Light";
					}
					else if(typeOfArrow=="Light"){
						block = 1;
						light = 0;
						typeOfArrow = "Block";
					}
					else if(typeOfArrow=="Block"){
						block = 0;
						typeOfArrow = "Normal";
					}
					arrowBtn.setText("Тип стрел: " + typeOfArrow);
				}
			}));
			menuLayout.addView(arrowBtn);

            var instantBtn = new android.widget.CheckBox(ctx);
            instantBtn.setTextSize(18);
            instantBtn.setText("Мгновенное копание");
            instantBtn.setChecked(instantChecked);
            instantBtn.setLayoutParams(layoutParams);
            instantBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!instant){
                        instant = true;
                        instaDestroy();
                        instantChecked = true;
                    }else{
                        instant = false;
                        defaultDestroy();
                        instantChecked = false;
                    }
                    instantBtn.setChecked(instantChecked);
                }
            }));
            menuLayout.addView(instantBtn);
             
            var saddleBtn = new android.widget.CheckBox(ctx);
            saddleBtn.setTextSize(18);
            saddleBtn.setText("Сидеть на мобах");
            saddleBtn.setChecked(saddleChecked);
            saddleBtn.setLayoutParams(layoutParams);
            saddleBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!saddleUp){
                        saddleUp = true;
                        saddleChecked = true;
                    }else{
                        saddleUp = false;
                        saddleChecked = false;
                    }
                    saddleBtn.setChecked(saddleChecked);
                }
            }));
            menuLayout.addView(saddleBtn);
             
			var speedBtn = new android.widget.TextView(ctx);
			speedBtn.setTextSize(18);
			speedBtn.setText("Скорость: " + movement);
			speedBtn.setLayoutParams(layoutParams);
			speedBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(speed==1){
						movement = "Быстрая";
						speed = 2;
					}
					else if(speed==2){
						Entity.setSneaking(getPlayerEnt(), true);
						movement = "Медленная";
						speed = 0;
					}
					else if(speed==0){
						Entity.setSneaking(getPlayerEnt(), false);
						movement = "Нормальная";
						speed = 1;
					}
					speedBtn.setText("Скорость: " + movement);
				}
			}));
			menuLayout.addView(speedBtn);

            var flyBtn = new android.widget.CheckBox(ctx);
            flyBtn.setTextSize(18);
            flyBtn.setText("Полет");
            flyBtn.setChecked(flyChecked);
            flyBtn.setLayoutParams(layoutParams);
            flyBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!flyReady){
                        flyReady = true;
                        flyChecked = true;
                    }else{
                        flyUp = false;
                        flyDown = false;
                        flyReady = false;
                        flyChecked = false;
                    }
                    flyBtn.setChecked(flyChecked);
                }
            }));
            menuLayout.addView(flyBtn);
             
            var entityGunBtn = new android.widget.CheckBox(ctx);
            entityGunBtn.setTextSize(18);
            entityGunBtn.setText("Ракетница");
            entityGunBtn.setChecked(gunChecked);
            entityGunBtn.setLayoutParams(layoutParams);
            entityGunBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(!gunReady){
                        gunReady = true;
                        gunChecked = true;
                    }else{
                        gunReady = false;
                        gunChecked = false;
                    }
                    entityGunBtn.setChecked(gunChecked);
                }
            }));
            menuLayout.addView(entityGunBtn);
             
            var entityBtn = new android.widget.TextView(ctx);
            entityBtn.setTextSize(18);
            entityBtn.setText("Боезапас ракетницы: " + entityName);
            entityBtn.setLayoutParams(layoutParams);
            entityBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    if(entityType==65 && entityName=="Заряжено TNT"){
                        entityType = 80;
                        entityName = "Стрелами";
                    }
                    else if(entityType==80 && entityName=="Стрелами"){
                        entityType = 80;
                        entityName = "Огненными стрелами";
                    }
                    else if(entityType==80 && entityName=="Огненными стрелами"){
                        entityType = 81;
                        entityName = "Снежками";
                    }
                    else if(entityType==81 && entityName=="Снежками"){
                        entityType = 82;
                        entityName = "Яйцами";
                    }
                    else if(entityType==82 && entityName=="Яйцами"){
                        entityType = 65;
                        entityName = "Заряжено TNT";
                    }
                    entityBtn.setText("Боезапас ракетницы: " + entityName);
                }
            }));
            menuLayout.addView(entityBtn);

			var knockBackBtn = new android.widget.CheckBox(ctx);
			knockBackBtn.setTextSize(20);
			knockBackBtn.setText("Отталкивание мобов при ударе");
            knockBackBtn.setChecked(hitChecked);
			knockBackBtn.setLayoutParams(layoutParams);
			knockBackBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(!knockBack){
						knockBack = true;
						hitChecked = true;
					
					}else{
						knockBack = false;
						hitChecked = false;
				
					}
					knockBackBtn.setChecked(hitChecked);
				}
			}));
			menuLayout.addView(knockBackBtn);

			var jumpBtn = new android.widget.TextView(ctx);
			jumpBtn.setTextSize(18);
			jumpBtn.setText("Прыжок на: " + jumpHeight + " Блок(а/ов)");
			jumpBtn.setLayoutParams(layoutParams);
			jumpBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(jumpHeight=="1"){
						jumpHeight = "2";
                        jumpVel = 0.6;
					}
					else if(jumpHeight=="2"){
						jumpHeight = "3";
						jumpVel = 0.7;
					}
					else if(jumpHeight=="3"){
						jumpHeight = "4";
						jumpVel = 0.8;
					}
					else if(jumpHeight=="4"){
						jumpVel = 0.9;
						jumpHeight = "5";
					}
					else if(jumpHeight=="5"){
						jumpVel = 1;
						jumpHeight = "6";
					}
					else if(jumpHeight=="6"){
						jumpHeight = "1";
					}
					jumpBtn.setText("Прыжок на: " + jumpHeight + " Блок(а/ов)");
				}
			}));
			menuLayout.addView(jumpBtn);
			
			var currentFont = "Comic Sans MS";
			
			var fontScroll = new android.widget.TextView(ctx);
			fontScroll.setText("Шрифт: " + currentFont);
			fontScroll.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(fontType=="Comic Sans MS"){
						fontType = "DS Crystal";
					}
					else if(fontType=="DS Crystal"){
						fontType = "Apple Kid";
					}
					else if(fontType=="Apple Kid"){
						fontType = "Archangelsk";
					}
					else if(fontType=="Archangelsk"){
						fontType = "Broadway";
					}
					else if(fontType=="Broadway"){
						fontType = "Choco Cooky";
					}
					else if(fontType=="Choco Cooky"){
						fontType = "Comic Sans MS";
					}
					fontScroll.setText("Current Font: " + fontType);
					setFont(fontType);
				}
			}));
			menuLayout.addView(fontScroll);

            var maker = new android.widget.TextView(ctx);
            maker.setTextSize(16);
            maker.setText("Сделано коммандой The Droid Team и KillerBLS");
            maker.setGravity(android.view.Gravity.CENTER);
            menuLayout.addView(maker);
			
			menuComponents = [
			heading, itemDropBtn, unlimitedArrowBtn, farmBtn, animalBtn, modeBtn, instaKillBtn, arrowBtn, instantBtn, saddleBtn, speedBtn, flyBtn, entityGunBtn, entityBtn, knockBackBtn, jumpBtn, fontScroll, maker
			]
			
			setFont(fontType);
             
            carbonPE = new android.widget.PopupWindow(menuLayout1, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
            carbonPE.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
            carbonPE.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(error){
            print("The menu could not be displayed, because: " + error);
        }
    }}));
}

function setFont(fontName){
	var font = new android.graphics.Typeface.createFromFile(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/", fontName + ".ttf"));
	
	for(var c = 0; c < menuComponents.length; c++){
		menuComponents[c].setTypeface(font);
	}
}
 
function gunButton(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var gLayout = new android.widget.LinearLayout(ctx);
            gLayout.setOrientation(0);
             
            var gunBtn = new android.widget.Button(ctx);
            gunBtn.setText("Стрелять");
            gunBtn.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function(view, event){
                    switch(event.getAction()){
                        case 0:
                            gunEngaged = true;
                            break;
                        case 1:
                            gunEngaged = false;
                            break;
                    }
                    return true;
                }
            }));
            gLayout.addView(gunBtn);
             
            gunUI = new android.widget.PopupWindow(gLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            gunUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 230);
        }catch(p){
            print("The entity launcher button could not be displayed, because: " + p);
        }
    }}));
}
 
function flyButton(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var flyLayout = new android.widget.LinearLayout(ctx);
            flyLayout.setOrientation(1);
             
            var upBtn = new android.widget.Button(ctx);
            upBtn.setText("Вверх");
            upBtn.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function(view, event){
                    switch(event.getAction()){
                        case 0:
                            flyUp = true;
                            break;
                        case 1:
                            flyUp = false;
                            break;
                    }
                    return true;
                }
            }));
            flyLayout.addView(upBtn);
             
            var downBtn = new android.widget.Button(ctx);
            downBtn.setText("Вниз");
            downBtn.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function(view, event){
                    switch(event.getAction()){
                        case 0:
                            flyDown = true;
                            break;
                        case 1:
                            flyDown = false;
                            break;
                    }
                    return true;
                }
            }));
            flyLayout.addView(downBtn);
             
            flyUI = new android.widget.PopupWindow(flyLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            flyUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 50);
        }catch(prob){
            print("The jump button could not be displayed, because: " + prob);
        }
    }}));
}

function mobControls(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var controlLayout = new android.widget.LinearLayout(ctx);
			controlLayout.setOrientation(1);
			
			var forwardBtn = new android.widget.Button(ctx);
			forwardBtn.setText("Вперед/Вверх");
			forwardBtn.setOnTouchListener(new android.view.View.OnTouchListener({
				onTouch: function(v, event){
					if(!verticalMovement){
						switch(event.getAction()){
							case 0:
								forward = true;
								break;
							case 1:
								forward = false;
								break;
						}
					}else{
						switch(event.getAction()){
							case 0:
								up = true;
								break;
							case 1:
								up = false;
								break;
						}
					}
					return true;
				}
			}));
			controlLayout.addView(forwardBtn);
			
			var middleBtn = new android.widget.ToggleButton(ctx);
			middleBtn.setChecked(verticalDIRchecked);
			middleBtn.setText("Полет/Ехать");
			middleBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(!verticalMovement){
						verticalMovement = true;
						verticalDIRchecked = true;
					}else{
						verticalMovement = false;
						verticalDIRchecked = false;
					}
					middleBtn.setChecked(verticalDIRchecked);
					middleBtn.setText("Полет/Ехать");
				}
			}));
			controlLayout.addView(middleBtn);
			
			var backwardBtn = new android.widget.Button(ctx);
			backwardBtn.setText("Назад/Вниз");
			backwardBtn.setOnTouchListener(new android.view.View.OnTouchListener({
				onTouch: function(v, event){
					if(!verticalMovement){
						switch(event.getAction()){
							case 0:
								backward = true;
								break;
							case 1:
								backward = false;
								break;
						}
					}else{
						switch(event.getAction()){
							case 0:
								down = true;
								break;
							case 1:
								down = false;
								break;
						}
					}
					return true;
				}
			}));
			controlLayout.addView(backwardBtn);
			
			controlUI = new android.widget.PopupWindow(controlLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			controlUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 25);
		}catch(problem){
			print("The mob controls could not be displayed, because: " + problem);
		}
	}}));
}
 
 
function leaveGame(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        if(starterUI != null){
            starterUI.dismiss();
			starterUI = null;
        }
        if(closeUI != null){
            closeUI.dismiss();
			closeUI = null;
        }
        if(carbonPE != null){
            carbonPE.dismiss();
			carbonPE = null;
        }
        if(gunUI != null){
            gunUI.dismiss();
			gunUI = null;
        }
        if(flyUI != null){
            flyUI.dismiss();
			flyUI = null;
        }
		if(controlUI != null){
			controlUI.dismiss();
			controlUI = null;
		}
    }}));
}
 
function destroyBlock(x,y,z,side){
    var data = Level.getData(x,y,z);
    var tile = Level.getTile(x,y,z);
    if(itemDrop){
        if(tile==1 && getCarriedItem()==270 || tile==1 && getCarriedItem()==257 || tile==1 && getCarriedItem()==274 || tile==1 && getCarriedItem()==278 || tile==1 && getCarriedItem()==285 || tile==4 && getCarriedItem()==270 || tile==4 && getCarriedItem()==257 || tile==4 && getCarriedItem()==274 || tile==4 && getCarriedItem()==278 || tile==4 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,4,63);
        }
        else if(tile==1 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285 || tile==4 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,4,64);
        }
        if(tile==2 || tile==3){
            Level.dropItem(x,y,z,0.5,3,63);
        }
        if(tile==5 || tile==6 || tile==12 || tile==13){
            Level.dropItem(x,y,z,0.5,tile,63,data);
        }
        if(tile==14 && getCarriedItem()==257 || tile==14 && getCarriedItem()==278 || tile==14 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,14,63);
        }
        else if(tile==14 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,14,64);
        }
        if(tile==15 && getCarriedItem()==257 || tile==15 && getCarriedItem()==274 || tile==15 && getCarriedItem()==278 || tile==15 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,15,63);
        }
        else if(tile==15 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,15,64);
        }
        if(tile==16 && getCarriedItem()==270 || tile==16 && getCarriedItem()==257 || tile==16 && getCarriedItem()==274 || tile==16 && getCarriedItem()==278 || tile==16 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,263,63);
        }
        else if(tile==16 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,263,64);
        }
        if(tile==17){
            Level.dropItem(x,y,z,0.5,17,63,data);
        }
        if(tile==18 && getCarriedItem()==359){
            Level.dropItem(x,y,z,0.5,18,63);
        }
        else if(tile==18 && getCarriedItem()!=359){
            Level.dropItem(x,y,z,0.5,18,64);
        }
        if(tile==19 || tile==20){
            Level.dropItem(x,y,z,0.5,tile,63,data);
        }
        if(tile==21 && getCarriedItem()==257 || tile==21 && getCarriedItem()==274 || tile==21 && getCarriedItem()==278 || tile==21 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,21,63);
        }
        else if(tile==21 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,21,64);
        }
        if(tile==22 && getCarriedItem()==257 || tile==22 && getCarriedItem()==274 || tile==22 && getCarriedItem()==278 || tile==22 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,22,63);
        }
        else if(tile==22 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,22,64);
        }
        if(tile==24 && getCarriedItem()==270 || tile==24 && getCarriedItem()==257 || tile==24 && getCarriedItem()==274 || tile==24 && getCarriedItem()==278 || tile==24 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,24,63);
        }
        else if(tile==24 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,24,64);
        }
        if(tile==26){
            Level.dropItem(x,y,z,0.5,26,63,data);
        }
        if(tile==27 && getCarriedItem()==270 || tile==27 && getCarriedItem()==257 || tile==27 && getCarriedItem()==274 || tile==27 && getCarriedItem()==278 || tile==27 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,27,63);
        }
        else if(tile==27 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,27,64);
        }
        if(tile==30 && getCarriedItem()==359){
            Level.dropItem(x,y,z,0.5,287,63);
        }
        else if(tile==30 && getCarriedItem()!=359){
            Level.dropItem(x,y,z,0.5,287,64);
        }
        if(tile==31 && getCarriedItem()==359 || tile==32 & getCarriedItem()==359){
            Level.dropItem(x,y,z,0.5,tile,63,data);
        }
        else if(tile==31 && getCarriedItem()!=359 || tile==32 && getCarriedItem()!=359){
            Level.dropItem(x,y,z,0.5,tile,64,data);
        }
        if(tile==37 || tile==38 || tile==39 || tile==40){
            Level.dropItem(x,y,z,0.5,tile,63);
        }
        if(tile==41 && getCarriedItem()==257 || tile==41 && getCarriedItem()==278 || tile==41 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,41,63);
        }
        else if(tile==41 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,41,64);
        }
        if(tile==42 && getCarriedItem()==257 || tile==42 && getCarriedItem()==274 || tile==42 && getCarriedItem()==278 || tile==42 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,42,63);
        }
        else if(tile==42 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,42,64);
        }
        if(tile==44 && getCarriedItem()==257 || tile==44 && getCarriedItem()==270 || tile==44 && getCarriedItem()==274 || tile==44 && getCarriedItem()==278 || tile==44 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,44,63);
        }
        else if(tile==44 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,44,64);
        }
        if(tile==45 && getCarriedItem()==270 || tile==45 && getCarriedItem()==257 || tile==45 && getCarriedItem()==274 || tile==45 && getCarriedItem()==278 || tile==45 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,45,63);
        }
        else if(tile==45 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,45,64);
        }
        if(tile==47){
            Level.dropItem(x,y,z,0.5,340,61);
        }
        if(tile==48 && getCarriedItem()==270 || tile==48 && getCarriedItem()==257 || tile==48 && getCarriedItem()==274 || tile==48 && getCarriedItem()==278 || tile==48 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,48,63);
        }
        else if(tile==48 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,48,64);
        }
        if(tile==49 && getCarriedItem()==278 || tile==246 && getCarriedItem()==278){
            Level.dropItem(x,y,z,0.5,49,63);
        }
        else if(tile==49 && getCarriedItem()!=278 || tile==246 && getCarriedItem()!=278){
            Level.dropItem(x,y,z,0.5,49,64);
        }
        if(tile==50 || tile==53 || tile==54){
            Level.dropItem(x,y,z,0.5,tile,63);
        }
        if(tile==56 && getCarriedItem()==257 || tile==57 && getCarriedItem()==257 || tile==56 && getCarriedItem()==278 || tile==57 && getCarriedItem()==278 || tile==56 && getCarriedItem()==285 || tile==57 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,tile,63);
        }
        else if(tile==56 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285 || tile==57 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,tile,64);
        }
        if(tile==61 && getCarriedItem()==270 || tile==61 && getCarriedItem()==257 || tile==61 && getCarriedItem()==274 || tile==61 && getCarriedItem()==278 || tile==61 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,61,63);
        }
        else if(tile==61 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,61,64);
        }
        if(tile==63 || tile==64 || tile==65 || tile==66){
            Level.dropItem(x,y,z,0.5,tile,63);
        }
        if(tile==67 && getCarriedItem()==270 || tile==67 && getCarriedItem()==257 || tile==67 && getCarriedItem()==274 || tile==67 && getCarriedItem()==278 || tile==67 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,67,63);
        }
        else if(tile==67 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,67,64);
        }
        if(tile==73 && getCarriedItem()==257 || tile==73 && getCarriedItem()==278 || tile==73 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,331,63);
        }
        else if(tile==73 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,331,64);
        }
        if(tile==78 && getCarriedItem()==256 || tile==78 && getCarriedItem()==269 || tile==78 && getCarriedItem()==273 || tile==78 && getCarriedItem()==277 || tile==78 && getCarriedItem()==284){
            Level.dropItem(x,y,z,0.5,332,63);
        }
        else if(tile==78 && getCarriedItem()!=256 && getCarriedItem()!=269 && getCarriedItem()!=273 && getCarriedItem()!=277 && getCarriedItem()!=284){
            Level.dropItem(x,y,z,0.5,332,64);
        }
        if(tile==80 && getCarriedItem()==256 || tile==80 && getCarriedItem()==269 || tile==80 && getCarriedItem()==273 || tile==80 && getCarriedItem()==277 || tile==80 && getCarriedItem()==284){
            Level.dropItem(x,y,z,0.5,332,60);
        }
        else if(tile==80 && getCarriedItem()!=256 && getCarriedItem()!=269 && getCarriedItem()!=273 && getCarriedItem()!=277 && getCarriedItem()!=284){
            Level.dropItem(x,y,z,0.5,332,64);
        }
        if(tile==81 || tile==82 || tile==83 || tile==85 || tile==86 || tile==89 || tile==91 || tile==96 || tile==102 || tile==107){
            Level.dropItem(x,y,z,0.5,tile,63);
        }
        if(tile==87 && getCarriedItem()==257 || tile==87 && getCarriedItem()==270 || tile==87 && getCarriedItem()==274 || tile==87 && getCarriedItem()==278 || tile==87 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,87,63);
        }
        else if(tile==87 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,87,64);
        }
        if(tile==98 && getCarriedItem()==257 || tile==98 && getCarriedItem()==270 || tile==98 && getCarriedItem()==274 || tile==98 && getCarriedItem()==278 || tile==98 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,98,63);
        }
        else if(tile==98 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,98,64);
        }
        if(tile==101 && getCarriedItem()==257 || tile==101 && getCarriedItem()==270 || tile==101 && getCarriedItem()==274 || tile==101 && getCarriedItem()==278 || tile==101 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,101,63);
        }
        else if(tile==101 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,101,64);
        }
        if(tile==103){
            Level.dropItem(x,y,z,0.5,360,57);
        }
        if(tile==108 && getCarriedItem()==257 || tile==108 && getCarriedItem()==270 || tile==108 && getCarriedItem()==274 || tile==108 && getCarriedItem()==278 || tile==108 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,108,63);
        }
        else if(tile==108 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,108,64);
        }
        if(tile==109 && getCarriedItem()==257 || tile==109 && getCarriedItem()==270 || tile==109 && getCarriedItem()==274 || tile==109 && getCarriedItem()==278 || tile==109 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,109,63);
        }
        else if(tile==109 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,109,64);
        }
        if(tile==112 && getCarriedItem()==257 || tile==112 && getCarriedItem()==270 || tile==112 && getCarriedItem()==274 || tile==112 && getCarriedItem()==278 || tile==112 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,112,63);
        }
        else if(tile==112 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,112,64);
        }
        if(tile==114 && getCarriedItem()==257 || tile==114 && getCarriedItem()==270 || tile==114 && getCarriedItem()==274 || tile==114 && getCarriedItem()==278 || tile==114 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,114,63);
        }
        else if(tile==114 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,114,64);
        }
        if(tile==128 && getCarriedItem()==257 || tile==128 && getCarriedItem()==270 || tile==128 && getCarriedItem()==274 || tile==128 && getCarriedItem()==278 || tile==128 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,128,63);
        }
        else if(tile==128 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,128,64);
        }
        if(tile==134 || tile==135 || tile==136 || tile==158 || tile==170 || tile==171 || tile==245 || tile==247){
            Level.dropItem(x,y,z,0.5,tile,63,data);
        }
        if(tile==139 && getCarriedItem()==257 || tile==139 && getCarriedItem()==270 || tile==139 && getCarriedItem()==274 || tile==139 && getCarriedItem()==278 || tile==139 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,139,63);
        }
        else if(tile==139 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,139,64);
        }
        if(tile==155 && getCarriedItem()==257 || tile==155 && getCarriedItem()==270 || tile==155 && getCarriedItem()==274 || tile==155 && getCarriedItem()==278 || tile==155 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,155,63);
        }
        else if(tile==155 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,155,64);
        }
        if(tile==156 && getCarriedItem()==257 || tile==156 && getCarriedItem()==270 || tile==156 && getCarriedItem()==274 || tile==156 && getCarriedItem()==278 || tile==156 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,156,63);
        }
        else if(tile==156 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,156,64);
        }
        if(tile==173 && getCarriedItem()==257 || tile==173 && getCarriedItem()==270 || tile==173 && getCarriedItem()==274 || tile==173 && getCarriedItem()==278 || tile==173 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,173,63);
        }
        else if(tile==173 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,173,64);
        }
        if(tile==244 && getCarriedItem()==257 || tile==244 && getCarriedItem()==270 || tile==244 && getCarriedItem()==274 || tile==244 && getCarriedItem()==278 || tile==244 && getCarriedItem()==285){
            Level.dropItem(x,y,z,0.5,457,63);
        }
        else if(tile==244 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
            Level.dropItem(x,y,z,0.5,457,64);
        }
    }
}
 
function entityAddedHook(entity){
	if(Entity.getEntityTypeId(entity)==80 ){
		ground = 1;
		arrow = entity;
	}
	if(Entity.getEntityTypeId(entity)==80 && unlimitedArrow==true){
		addItemInventory(262,1);
	}
}
function entityRemovedHook(entity)
{
var underArrow=getTile(Entity.getX(entity), Entity.getY(entity)-1, Entity.getZ(entity));
var arrowCoords =getTile(Entity.getX(entity),Entity.getY(entity),Entity.getZ(entity));
var arrowX=Entity.getX(entity);
var arrowY=Entity.getY(entity);
var arrowZ =Entity.getZ(entity);
if(Entity.getEntityTypeId(entity)==80)

{
if(explosive==1)
{
explode (Entity.getX(entity), Entity.getY(entity)-1,Entity.getZ(entity), 4);
}
if(fire==1)
{
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity), 51);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity), 51);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity), 51);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)+1, 51);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)-1, 51);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity)+1, 51);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity)-1, 51);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity)-1, 51);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity)+1, 51);
setTile(Entity.getX(entity)+2, Entity.getY(entity), Entity.getZ(entity), 51);
setTile(Entity.getX(entity)-2, Entity.getY(entity), Entity.getZ(entity), 51);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)+2, 51);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)-2, 51);
onFire==1;
}
if(teleport==1)
{
setPosition(getPlayerEnt(),Entity.getX(entity), Entity.getY(entity)+2,Entity.getZ(entity));
}
if(water==1)
{
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity)+1,Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity)+2,Entity.getZ(entity), 9);
setTile (Entity.getX(entity)+1, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)+2, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)-1, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)-2, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity)+3,Entity.getZ(entity), 9);
setTile (Entity.getX(entity)+3, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)-3, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+1, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-1,9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+2, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-2, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+3, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-3, 9);
}
if(ice==1)
{
 if(getTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity))==8||getTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity))==9)
{
setTile(arrowX, arrowY,arrowZ,79);
setTile(arrowX+1, arrowY, arrowZ, 79);
setTile(arrowX-1, arrowY, arrowZ, 79);
setTile(arrowX, arrowY, arrowZ+1, 79);
setTile(arrowX, arrowY, arrowZ-1, 79);
setTile(arrowX+1, arrowY, arrowZ+1, 79);
setTile(arrowX-1, arrowY, arrowZ-1, 79);
setTile(arrowX+1, arrowY, arrowZ-1, 79);
setTile(arrowX-1, arrowY, arrowZ+1, 79);
setTile(arrowX+2, arrowY, arrowZ, 79);
setTile(arrowX-2, arrowY, arrowZ, 79);
setTile(arrowX, arrowY, arrowZ+2, 79);
setTile(arrowX, arrowY, arrowZ-2, 79);
}
if(underArrow!=8&&underArrow!=9)
{
setTile(arrowX, arrowY, arrowZ,79);
}
else if(underArrow==8||underArrow==9)
{
if(getTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity))==0)
{
setTile(arrowX, arrowY-1,arrowZ,79);
setTile(arrowX+1, arrowY-1, arrowZ, 79);
setTile(arrowX-1, arrowY-1, arrowZ, 79);
setTile(arrowX, arrowY-1, arrowZ+1, 79);
setTile(arrowX, arrowY-1, arrowZ-1, 79);
setTile(arrowX+1, arrowY-1, arrowZ+1, 79);
setTile(arrowX-1, arrowY-1, arrowZ-1, 79);
setTile(arrowX+1, arrowY-1, arrowZ-1, 79);
setTile(arrowX-1, arrowY-1, arrowZ+1, 79);
setTile(arrowX+2, arrowY-1, arrowZ, 79);
setTile(arrowX-2, arrowY-1, arrowZ, 79);
setTile(arrowX, arrowY-1, arrowZ+2, 79);
setTile(arrowX, arrowY-1, arrowZ-2, 79);
}
}
}
if(lava==1)
{
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity)+1,Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity)+2,Entity.getZ(entity), 10);
setTile (Entity.getX(entity)+1, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)+2, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)-1, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)-2, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity)+3,Entity.getZ(entity), 10);
setTile (Entity.getX(entity)+3, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)-3, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+1, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-1,10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+2, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-2, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+3, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-3, 10);
}
if(web==1)
{
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity),30);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity),30);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity),30);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+1, Entity.getZ(entity),30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+1, Entity.getZ(entity),30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+1, Entity.getZ(entity),30);
setTile(Entity.getX(entity), Entity.getY(entity)+1, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+1, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+1, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+1, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+1, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+1, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+2, Entity.getZ(entity),30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+2, Entity.getZ(entity),30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+2, Entity.getZ(entity),30);
setTile(Entity.getX(entity), Entity.getY(entity)+2, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+2, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+2, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+2, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+2, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+2, Entity.getZ(entity)+1,30);
}
if(block==1)
{
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity),getBlock, getBlockData);
}
}
}

function useItem(x,y,z,itemId,blockId,side){
	if(itemId==261 && block==1){
		getBlock = blockId;
		getBlockData = Level.getData(x, y, z);
		clientMessage("Set block arrow to " + getBlock + ".");
	}
    if(blockId==247 && farmReady==true){
        preventDefault();
        setTile(x,y,z,246);
		X = x;
		Y = y;
		Z = z;
        farmActive = true;
        clientMessage("Animal Farm has started");
    }
    if(blockId==246 && farmActive==true){
        setTile(x,y,z,247);
        farmActive = false;
        clientMessage("Animal Farm has ended");
        spawnCount = 160;
        preventDefault();
    }
}
 
function modTick(){
	if(speed==2){
		if(shouldRun==1){
			Xpos=getPlayerX();
			Zpos=getPlayerZ();
			shouldRun = shouldRun + 1;
		}
		else if(shouldRun==3){
			shouldRun=1;
			Xdiff=getPlayerX()-Xpos;
			Zdiff=getPlayerZ()-Zpos;
			setVelX(getPlayerEnt(),Xdiff);
			setVelZ(getPlayerEnt(),Zdiff);
			Xdiff=0;
			Zdiff=0;
		}
		if(shouldRun!=1){
			shouldRun = shouldRun+ 1;
		}
	}
	if(jumpHeight!="1" && Entity.getVelY(getPlayerEnt())>0 && jump==0){
		setVelY(getPlayerEnt(), jumpVel);
		jump = 1;
	}
	else if(getTile(getPlayerX(), getPlayerY()-2, getPlayerZ())!=0&&jump==1){
		jump = 0;
	}
if(explosive==1&&ground==1||fire==1&&ground==1||water==1&&ground==1||ice==1&&ground==1||lava==1&&ground==1||web==1&&ground==1||block==1&&ground==1)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow)-1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow)+1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)+1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)-1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)+1)!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)-1)!=0)
{

Entity.remove(arrow);
}
}
if(teleport==1&&ground==1)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow)-1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow)+1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)+1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)-1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)+1)!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)-1)!=0)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow))!=95&&Entity.getY(arrow)>1)
{
Entity.remove(arrow);


}
}
}
if(light==1&&ground==1)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow)-1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow)+1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)+1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)-1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)+1)!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)-1)!=0)
{


setTile(Entity.getX(arrow), Entity.getY(arrow), Entity.getZ(arrow),89);
Entity.remove(arrow);

}
}
	if(farmActive){
		spawnCount--;
	}
	if(spawnCount==140){
		Level.spawnMob(X+4, Y, Z+4, spawnType);
	}
	if(spawnCount==120){
		Level.spawnMob(X+4, Y, Z-4, spawnType);
	}
	if(spawnCount==100){
		Level.spawnMob(X-4, Y, Z+4, spawnType);
	}
	if(spawnCount==80){
		Level.spawnMob(X-4, Y, Z-4, spawnType);
	}
	if(spawnCount==60){
		Level.spawnMob(X+4, Y, Z, spawnType);
	}
	if(spawnCount==40){
		Level.spawnMob(X, Y, Z+4, spawnType);
	}
	if(spawnCount==20){
		Level.spawnMob(X, Y+1, Z, spawnType);
	}
	if(spawnCount==0){
		spawnCount = 160;
	}
	if(godMode){
		Player.setHealth(30000);
	}
	if(gunEngaged==true && getPitch(getPlayerEnt())>40){
        var playerYaw = Entity.getYaw(Player.getEntity());
        var playerPitch = Entity.getPitch(Player.getEntity());
        velY = Math.sin((playerPitch - 180) / 180 * Math.PI);
        velX = Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        velZ = -1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        entity = Level.spawnMob(Player.getX() + velX * 2, Player.getY(), Player.getZ() + velZ * 2, entityType);
        if(entityType==80 && entityName=="Fire Arrow"){
            Entity.setFireTicks(entity, 60);
        }
        setVelX(entity, velX * 2);
        setVelY(entity, velY);
        setVelZ(entity, velZ * 2);  
    }
	if(gunEngaged==true && getPitch(getPlayerEnt())<40){
        var playerYaw = Entity.getYaw(Player.getEntity());
        var playerPitch = Entity.getPitch(Player.getEntity());
        velY = Math.sin((playerPitch - 180) / 180 * Math.PI);
        velX = Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        velZ = -1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        entity = Level.spawnMob(Player.getX() + velX * 2, Player.getY() + 1, Player.getZ() + velZ * 2, entityType);
        if(entityType==80 && entityName=="Fire Arrow"){
            Entity.setFireTicks(entity, 60);
        }
        setVelX(entity, velX * 2);
        setVelY(entity, velY);
        setVelZ(entity, velZ * 2);  
    }
	if(flyUp){
		setVelY(getPlayerEnt(), 0.5);
	}
	if(flyDown){
		setVelY(getPlayerEnt(), -0.5);
	}
	if(flyReady==true && flyUp==false && flyDown==false){
		setVelY(getPlayerEnt(), 0);
	}
	if(controlsReady){
	    //500ISE's script
		var playerYaw = getYaw();
		var playerPitch = getPitch();
		var velX = -1 * Math.sin(playerYaw / 180 * Math.PI) * ANIMAL_SPEED;
		var velZ = Math.cos(playerYaw / 180 * Math.PI) * ANIMAL_SPEED;
		if(forward){
			setVelX(controlledMob, velX);
			setVelZ(controlledMob, velZ);
			setVelY(controlledMob, 0);
		}
		if(backward){
			setVelX(controlledMob, -velX);
			setVelZ(controlledMob, -velZ);
			setVelY(controlledMob, 0);
		}
		if(up){
			setVelY(controlledMob, 0.5);
		}
		if(down){
			setVelY(controlledMob, -0.5);
		}
	}
	if(controlsReady==true && forward==false && backward==false && up==false && down==false){
		setVelX(controlledMob, 0);
		setVelZ(controlledMob, 0);
		setVelY(controlledMob, 0);
	}
}
 
function attackHook(attacker, victim){
	if(knockBack){
		if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(victim, x*3);
			setVelY(victim, 1);
			setVelZ(victim, z*3);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(victim, XVel*3);
			setVelY(victim, 1);
			setVelZ(victim, ZVel*3);
		}
		else if( getYaw() >= 360)
		{
			var hit= getYaw()+90;
			for(go=0; hit>=360; go++)
			{
				hit -= 360;
			}
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel = Math.sin(hit*(Math.PI/180));
			setVelX(victim, XVel*3);
			setVelY(victim, 1);
			setVelZ(victim, ZVel*3);
		}
	}
	if(instaKill){
		Entity.setHealth(victim, 0);
	}
	if(saddleUp){
		preventDefault();
		rideAnimal(attacker, victim);
		controlledMob = victim;
		controlsReady = true;
	}
}
 
function instaDestroy(){
	for(i = 0; i < 256; i++){
		Block.setDestroyTime