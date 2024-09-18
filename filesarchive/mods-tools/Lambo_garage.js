//Garage addon
var garageDoor = null;
var selections = [false,false];
var status = "closed";
var sel1 = [0,0,0];
var sel2 = [0,0,0];
var time = [61,60];
var whatToDo = "nothing";

var bigX = 0;
var smallX = 0;
var bigY = 0;
var smallY = 0;
var bigZ = 0;
var smallZ = 0;
function useItem(x,y,z,itemId,blockId,side,itemDamage,blockDamage){
	if(itemId==267){
	   if(!selections[0] && !selections[1]){
	      selections[0] = true;
	      sel1[0] = x;
	      sel1[1] = y;
	      sel1[2] = z;
	      clientMessage("Pos #1 defined.");
	   }else
	   if(selections[0] && !selections[1]){
	      selections[1] = true;
	      sel2[0] = x;
	      sel2[1] = y;
	      sel2[2] = z;
	      bigX = Math.max(sel1[0],sel2[0]);
    	  smallX = Math.min(sel1[0],sel2[0]);

    	  bigY = Math.max(sel1[1],sel2[1]);
    	  smallY = Math.min(sel1[1],sel2[1]);

    	  bigZ = Math.max(sel1[2],sel2[2]);
    	  smallZ = Math.min(sel1[2],sel2[2]);
	      clientMessage("Pos #2 defined.");
	   }
	}else
	if(blockId==80){
	   if(selections[0] && selections[1]){
	      if(status=="open"){
	         status = "closed";
	         whatToDo = "close";
	         close();
	         clientMessage("[Garage] Closing...");
	      }else{
	         status = "open";
	         whatToDo = "open";
	         open();
	         clientMessage("[Garage] Opening...");
	      }
	   }
	}
}
function modTick(){
    if(selections[0] && selections[1]){
    	if(whatToDo=="close"){
           close();
    	}else
    	if(whatToDo=="open"){
    	   open();
    	}
    }
}
function open(){
	time[0]--;
	if(time[0]==60){
	   for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY,z,44,8);
    	   }
       }
   }else
   if(time[0]==50){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY,z,0);
    	   }
       }
   }else
   if(time[0]==40){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY+1,z,44,8);
    	   }
       }
   }else
   if(time[0]==30){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY+1,z,0);
    	   }
       }
   }else
   if(time[0]==20){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,bigY,z,44,8);
    	   }
       }
   }else
   if(time[0]==10){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,bigY,z,0);
    	   }
       }
       clientMessage("Done!");
       whatToDo = "nothing";
       time[0] = 61;
   }
}
function close(){
    time[0]--;
	if(time[0]==60){
	   for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,bigY,z,44,8);
    	   }
       }
   }else
   if(time[0]==50){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,bigY,z,43);
    	   }
       }
   }else
   if(time[0]==40){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY+1,z,44,8);
    	   }
       }
   }else
   if(time[0]==30){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY+1,z,43);
    	   }
       }
   }else
   if(time[0]==20){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY,z,44,8);
    	   }
       }
   }else
   if(time[0]==10){
      for(x = smallX; x <= bigX; x++){
    	   for(z = smallZ; z <= bigZ; z++){
    		   setTile(x,smallY,z,43);
    	   }
       }
       clientMessage("Done!");
       whatToDo = "nothing";
       time[0] = 61;
   }
}
function procCmd(cmd){if(selections[0] && selections[1]){
   if(cmd=="open"){
      if(status!="open"){
	     status = "open";
	     whatToDo = "open";
	     clientMessage("[Garage] Opening...");
	  }else{
	     clientMessage("[Garage] Your garage is already open!");
	  }
   }else
   if(cmd=="close"){
      if(status!="closed"){
	     status = "closed";
	     whatToDo = "close";
	     clientMessage("[Garage] Closing...");
	  }else{
	     clientMessage("[Garage] Your garage is already open!");
	  }
   }
}}