var activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var gui = null;
var fuelgui = null;
var onoffgui = null;

var forwardTouched = false;
var backwardTouched = false;
var status = false;

var carVel = 1;
var car = null;
var riding = false;
var fuelbtn = null;
var fuel = 9600; //8 minutes! /  96  = %100
var fmessage = false;
function attackHook(player,vehicle){
    if(getCarriedItem()==280){//280
        if(Entity.getEntityTypeId(vehicle)==84){
            car = vehicle;
            clientMessage("Car selected.");
            preventDefault();
            rideAnimal(player, vehicle);
            riding = true;

            //gui stuff
            activity.runOnUiThread(new java.lang.Runnable(){
                run:function(){
                    try{
                        status = true;
                        gui = new android.widget.PopupWindow();
                        fuelgui = new android.widget.PopupWindow();
                        onoffgui = new android.widget.PopupWindow();
                        var layout = new android.widget.LinearLayout(activity);
                        var fuellayout = new android.widget.LinearLayout(activity);
                        var onofflayout = new android.widget.LinearLayout(activity);

                        //Forward button

                        var forwardbtn = new android.widget.Button(activity);
                        forwardbtn.setText("F");
                        forwardbtn.setOnClickListener(new android.view.View.OnClickListener({
                           onClick: function(viewarg){
                             move("forward");
                             if(backwardTouched){backwardTouched=false;}
                             forwardTouched = true;
                           }
                        }));

                        //Forward button done

                        //Backward button

                        var backwardbtn = new android.widget.Button(activity);
                        backwardbtn.setText("B");
                        backwardbtn.setOnClickListener(new android.view.View.OnClickListener({
                           onClick: function(viewarg){
                             move("backward");
                             if(forwardTouched){forwardTouched=false;}
                             backwardTouched = true;
                           }
                        }));

                        //Backward button done
                        
                        //Stop button
                        
                        var stopbtn = new android.widget.Button(activity);
                        stopbtn.setText("STOP");
                        stopbtn.setOnClickListener(new android.view.View.OnClickListener({
                           onClick: function(viewarg){
                             backwardTouched = false;
                             forwardTouched = false;
                           }
                        }));
                        
                        //Stop button done
                        
                        //Fuel button
                        fuelbtn = new android.widget.Button(activity);
                        fuelbtn.setText("Fuel: %" + Math.round(fuel / 96));
                        
                        //Fuel button done
                        
                        //Gui on/off button
                        /*var onoffbtn = new android.widget.Button(activity);
                        if(status){onoffbtn.setText("GUI off");}else{onoffbtn.setText("GUI on");}
                        onoffbtn.setOnClickListener(new android.view.View.OnClickListener({
                           onClick: function(viewarg){
                             if(status){
                                 status = false;
                                 gui.hide();
                                 fuelgui = null;
                                 onoffbtn.setText("GUI on");
                                 move("stop");
                                 print("GUI turned off.");
                             }else{
                                 status = true;
                                 gui.show();
                                 fuelgui.show();
                                 onoffbtn.setText("GUI off");
                                 move("stop");
                                 print("GUI turned on.");
                             }
                           }
                        }));*/
                        
                        /*onofflayout.addView(onoffbtn);
                        onoffgui.setContentView(onofflayout);
                        onoffgui.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        onoffgui.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        onoffgui.setBackgroundDrawable(new
android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                        onoffgui.showAtLocation(activity.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);*/
                        
                        fuellayout.addView(fuelbtn);
                        layout.addView(forwardbtn);
                        layout.addView(stopbtn);
                        layout.addView(backwardbtn);
                        
                        fuelgui.setContentView(fuellayout);
                        gui.setContentView(layout);
                        
                        gui.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        gui.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        gui.setBackgroundDrawable(new
android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

                        fuelgui.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        fuelgui.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        fuelgui.setBackgroundDrawable(new
android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

                        gui.showAtLocation(activity.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.BOTTOM, 0, 90);
                        fuelgui.showAtLocation(activity.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 80, 0);

                    }catch(error){
                        print("Error: "+error);
                    }
                }
            });
        }
    }
}
function modTick(){
if(status){
    if(fuel >= 0){
       if(forwardTouched){
          move("forward");
          checkForBlock();
          if(getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car))-2,Math.round(Entity.getZ(car)))==0) Entity.setVelY(car,-5);
       }else
       if(backwardTouched){
          move("backward");
          checkForBlock();
          if(getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car))-2,Math.round(Entity.getZ(car)))==0) Entity.setVelY(car,-5);
       }
    }
    if(getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) == 42 || getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) == 42 || getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))+1) == 42 || getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))-1) == 42){
       if(fuel < 9600){
          fuel++;
          //thanks temena
          if(!fmessage){
             clientMessage("Refuelling...");
             fmesagge = true;
          }else
          if(fuel==9600){
              fmessage = false;
          }
          activity.runOnUiThread(new java.lang.Runnable(){
                run:function(){
                    try{
                        fuelbtn.setText("Fuel: %" + Math.round(fuel / 96));
                    }catch(error){
                        clientMessage("Error: "+error);
                    }
                }
            });
       }
    }
}
}
function leaveGame(){
  activity.runOnUiThread(new java.lang.Runnable({ run: function() {
        gui.dismiss();
        gui = null;
        fuelgui.dismiss();
        fuelgui = null;
  }}));
}
function move(direction){
    var yaw = Entity.getYaw(Player.getEntity());
    if(direction=="forward"){
    //thanks zhuowei
        Entity.setVelX(car, -carVel * Math.sin(yaw / 180 * Math.PI));
        Entity.setVelZ(car, carVel * Math.cos(yaw / 180 * Math.PI));
        fuel--;
        activity.runOnUiThread(new java.lang.Runnable(){
                run:function(){
                    try{
                        fuelbtn.setText("Fuel: %" + Math.round(fuel / 96));
                    }catch(error){
                        clientMessage("Error: "+error);
                    }
                }
            });
        if(Entity.getYaw(Player.getEntity()) > 360){Entity.setRot(Player.getEntity(),0,Entity.getPitch(Player.getEntity));}else if(Entity.getYaw(Player.getEntity()) < 0){Entity.setRot(Player.getEntity(),360,Entity.getPitch(Player.getEntity()));}
    }else
    if(direction=="backward"){
    //again, thanks zhuowei
        Entity.setVelX(car, 0.5 * Math.sin(yaw / 180 * Math.PI));
        Entity.setVelZ(car, -0.5 * Math.cos(yaw / 180 * Math.PI));
        fuel--;
        activity.runOnUiThread(new java.lang.Runnable(){
                run:function(){
                    try{
                        fuelbtn.setText("Fuel: %" + Math.round(fuel / 96));
                    }catch(error){
                        clientMessage("Error: "+error);
                    }
                }
            });
        if(Entity.getYaw(Player.getEntity()) > 360){Entity.setRot(Player.getEntity(),0,Entity.getPitch(Player.getEntity));}else if(Entity.getYaw(Player.getEntity()) < 0){Entity.setRot(Player.getEntity(),360,Entity.getPitch(Player.getEntity()));}
    }else
    if(direction=="stop"){
        Entity.setVelX(car,0);
        Entity.setVelZ(car,0);
    }
}
function checkForBlock(){
   if(getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 0 && getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 42 || getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 0 && getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 42 || getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))+1) != 0 && getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))+1) != 42 || getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))-1) != 0&& getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))-1) != 42 && getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 78 || getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 0 && getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))) != 78 || getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))+1) != 0 && getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))+1) != 78 || getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))-1) != 0&& getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car)),Math.round(Entity.getZ(car))-1) != 78 && getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car))+1,Math.round(Entity.getZ(car))) == 0 && getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car))+2,Math.round(Entity.getZ(car))) == 0){
      if(getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car))+1,Math.round(Entity.getZ(car))) == 0 && getTile(Math.round(Entity.getX(car))+1,Math.round(Entity.getY(car))+2,Math.round(Entity.getZ(car))) == 0){
         if(Entity.getYaw(Player.getEntity()) <= 90){
            Entity.setVelY(car,0.7);
         }
      }
      if(getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car))+1,Math.round(Entity.getZ(car))+1) == 0 && getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car))+2,Math.round(Entity.getZ(car))+1) == 0){
         if(Entity.getYaw(Player.getEntity()) <= 180){
            Entity.setVelY(car,0.7);
         }
      }
      if(getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car))+1,Math.round(Entity.getZ(car))) == 0 && getTile(Math.round(Entity.getX(car))-1,Math.round(Entity.getY(car))+2,Math.round(Entity.getZ(car))) == 0){
         if(Entity.getYaw(Player.getEntity()) <= 270){
            Entity.setVelY(car,0.7);
         }
      }
      if(getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car))+1,Math.round(Entity.getZ(car))-1) == 0 && getTile(Math.round(Entity.getX(car)),Math.round(Entity.getY(car))+2,Math.round(Entity.getZ(car))-1) == 0){
         if(Entity.getYaw(Player.getEntity()) <= 360){
            Entity.setVelY(car,0.7);
         }
      }
   }
}