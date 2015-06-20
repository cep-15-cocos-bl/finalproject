var gameNeedsRestarting = false;

var StatusLayer = cc.Layer.extend({
    score: 0,
    maxScore: 4,
    lives: 5,
    endbg: null,
    deathbg: null,
    menubtn: {},

    ctor: function() {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelScore = new cc.LabelTTF("Trinkets: 0/" + this.maxScore, "Helvetica", 15);
        this.labelScore.setColor(cc.color(254,254,254));
        this.labelScore.setPosition(cc.p(winsize.width - 100, 60));
        this.addChild(this.labelScore);

        this.labelLives = new cc.LabelTTF("Lives left: 5", "Helvetica", 15);
        this.labelLives.setColor(cc.color(254, 254, 254));
        this.labelLives.setPosition(cc.p(winsize.width - 100, 40));
        this.addChild(this.labelLives);

        this.endbg = new cc.Sprite(res.end_png);
        this.endbg.setPosition(400,300);

        this.deathbg = new cc.Sprite(res.death_png);
        this.deathbg.setPosition(400, 300);

        this.menubtn.onPlay = function(sender) {
            cc.director.resume();
            cc.director.runScene(new MenuScene());
        };

        this.menubtn.btn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.start_n_png), // normal state image
            cc.Sprite.create(res.start_s_png), //select state image
            this.menubtn.onPlay, this);
        this.menubtn.menu = new cc.Menu(this.menubtn.btn);  //7. create the menu
        this.menubtn.menu.setPosition(400,100);

    },

    addScore: function() {
        if(++this.score < this.maxScore) {
            this.labelScore.setString("Trinkets: " + this.score + "/" + this.maxScore);
        } else {
            this.labelScore.setString("All trinkets collected!")
            this.labelLives.setColor(cc.color(0, 254, 0));
            this.addChild(this.endbg);
        }

        ++this.lives,
        this.labelLives.setString("Lives left: " + this.lives);
    },

    useLife: function() {
        if(gameNeedsRestarting) return false;

        console.log(this.lives);

        if(--this.lives >= 0) {
            this.labelLives.setString("Lives left: " + this.lives);
            return true;
        } else {
            cc.director.pause();
            this.labelLives.setString("Game over! All lives are used. \n Refresh to start a new game.");
            this.addChild(this.deathbg);
            this.addChild(this.menubtn.menu);

            return false;
        }
    },
})