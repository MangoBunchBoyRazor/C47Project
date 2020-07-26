class Form{
    constructor(){
        canvas.hide();

        this.formDiv = createDiv('');
        this.formDiv.id('form');
        this.formDiv.position(300,100);
        this.formDiv.size(200,400);
        this.formDiv.style('border: 2px solid black; border-radius: 5px;');
        this.formDiv.style('background-color: cornsilk;');

        this.heading = createElement('h1','Killer Mode On');
        this.heading.position(280,10);

        this.nameLabel = createElement('label',"Your blob's Name:");
        this.nameLabel.parent('#form');
        this.nameLabel.position(10,20);

        this.nameInp = createInput();
        this.nameInp.attribute('placeholder','name');
        this.nameInp.style('position: relative;');
        this.nameInp.position(10,50);
        this.nameInp.parent('#form');

        this.submit = createButton('Play');
        this.submit.position(50,100);
        this.submit.parent('#form');
        this.submit.mousePressed(()=>{
            this.submitData();
        })
    }
    submitData(){
        if(this.nameInp.value() == ""){
            alert("We need a name!");
            return null;
        }
        for(var plr in players){
            if(this.nameInp.value() == players[plr].name){
                alert("Name taken!");
                return null;
            }
        }
        canvas.show();
        this.formDiv.hide();
        this.heading.hide();

        player = new Player(width/2,height/2);
        player.setName(this.nameInp.value());

        database.ref('players/'+this.nameInp.value()).set({
            name: player.name,
            ammoCount: player.ammoCount,
            size: player.radius,
            health: player.health,
            kills: player.kills,
            bullets: player.bulletsArr,
            position: {
                x: player.sprite.position.x,
                y: player.sprite.position.y
            }
        });

        player.setPlayerCount(playerCount+1);

        gameState = "play";
    }
    static registerEventListeners(){
        database.ref("players").on('value',(data)=>{
            players = data.val();
        });
        database.ref("playerCount").on('value',(data)=>{
            playerCount = data.val();
        })
    }
}