class Game{

constructor(){

}

getState(){
    var getStateRef=database.ref("gameState");
    getStateRef.on("value",(data)=>{gameState=data.val()});
}

update(state){
    database.ref("/").update({gameState: state});
}

//gameState 0- wait-start, gameState 1- play
async start(){
    if(gameState===0){
    player= new Player();
    var playerCountRef = await database.ref('playerCount').once("value");
    if(playerCountRef.exists()){
        playerCount= playerCountRef.val();
        player.getCount();
    }
    
    //form to be created
    form = new Form();
    form.display();
    }
    car1= createSprite(100,200);
    car1.addImage(c1);
    car2= createSprite(300,200);
    car2.addImage(c2);
    car3= createSprite(500,200);
    car3.addImage(c3);
    car4= createSprite(700,200);
    car4.addImage(c4);
    cars = [car1, car2, car3, car4];//
}
/*
play(){

    form.hide();
    textSize(30);
    text("GAME IS GOING TO START NOW",550,100)
    //CALLING STATIC FUNCTION USING CLASS NAME
    Player.getPlayerInfo(); //fill up the allPlayers=[ [names],[distances],[],[] ]
    if(allPlayers !== undefined){
        var display_y=130;//fixing my y postion
        for(var plr in allPlayers){
            if(plr=== "player"+player.index)
           { fill("red");}
            else
            {fill("black");}
        
            display_y= display_y+50;
            textSize(20);
    text(allPlayers[plr].name +":"+allPlayers[plr].distance, 220, display_y);
        }


       

    }
    

}
*/
play(){

    form.hide();
  //  textSize(30);
  //  text("GAME IS GOING TO START NOW",550,100)
    //CALLING STATIC FUNCTION USING CLASS NAME
    Player.getPlayerInfo(); //fill up the allPlayers=[ [names],[distances],[],[] ]
   // Player.updateCarsAtEnd();
  player.getCarsAtEnd();//what is th rank already present in the cosole
    if(allPlayers !== undefined){
        background("brown");
        image(track,0,-displayHeight*3,displayWidth,displayHeight*5)
        //var display_y=130;//fixing my y postion
        var index =0;
        var x=290;
        var y;
        for(var plr in allPlayers){
            index = index+1;
            x=x+300;
            y= displayHeight-allPlayers[plr].distance;
            cars[index-1].x=x;
            cars[index-1].y=y;

            if(index=== player.index)
           { fill("red");
               ellipse(x,y,60,60);
            cars[index-1].shapeColor="red";

            camera.position.x=displayWidth/2;
            camera.position.y = cars[index-1].y;
            }
        }//for  

    }
    if(keyIsDown(UP_ARROW) && player.index!==null){
        player.distance=player.distance+10;
        player.update();
    }
    if(player.distance>4010){
        gameState=2
        player.rank=player.rank+1;
        Player.updateCarsAtEnd(player.rank);
    }
  
drawSprites();
}

end(){
    console.log("Gameover");
    console.log(player.rank);

}

}