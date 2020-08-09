class Form{
    constructor(){
        canvas.hide();

        this.formDiv = createDiv('');
        this.formDiv.id('form');
        this.formDiv.position(300,100);
        this.formDiv.size(200,400);
        this.formDiv.style("opacity: 0;");

        this.heading = createElement('h1','Killer Mode On');
        this.heading.position(280,10);
        this.heading.style("opacity: 0; transition: all 0.2s ease-out;")
        this.heading.id('head');

        this.nameLabel = createElement('label',"This is the tale of:");
        //this.nameLabel.parent('#form');
        this.nameLabel.id('name');
        this.nameLabel.style("opacity: 0; transition: 0.7s ease-out;");

        this.nameInp = createInput();
        this.nameInp.attribute('placeholder','name');
        this.nameInp.id('inputname');
        this.nameInp.style("opacity: 0; transiition: 0.9s ease-out;");
        //this.nameInp.parent('#form');

        this.submit = createButton('Play');
        //this.submit.parent('#form');
        this.submit.id('submit');
        this.submit.style('opacity: 0; transitiion: 1.1s ease-out;');
        this.submit.mousePressed(()=>{
            this.submitData();
        })

        this.resetBtn = createButton('reset');
        this.resetBtn.position(10,10);
        this.resetBtn.mousePressed(()=>{
            database.ref('/').update({
                players: null,
                playerCount: 0
            });
        })

        setTimeout(() => {
            this.heading.style("opacity: 1");
            this.formDiv.style("opacity: 1");
            this.nameInp.style("opacity: 1");
            this.nameLabel.style("opacity: 1");
            this.submit.style("opacity: 1");
        }, 500);
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
            kills: 0,
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