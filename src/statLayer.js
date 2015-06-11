var StatusLayer = cc.Layer.extend({
    score: 0,
    lives: 5,

    ctor: function() {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelScore = new cc.LabelTTF("Trinkets: 0/4 ", "Helvetica", 15);
        this.labelScore.setColor(cc.color(254,254,254));
        this.labelScore.setPosition(cc.p(winsize.width - 50, 40));
        this.addChild(this.labelScore);

        this.labelLives = new cc.LabelTTF("Lives left: 5", "Helvetica", 15);
        this.labelLives.setColor(cc.color(254, 254, 254));
        this.labelLives.setPosition(cc.p(winsize.width - 50, 20));
        this.addChild(this.labelLives);
    },

    addScore: function() {
        ++this.score;
        this.labelScore.setString("Trinkets: " + this.score + "/4");

        ++this.lives,
        this.labelLives.setString("Lives left: " + this.lives);
    },

    useLife: function() {
        --this.lives,
        this.labelLives.setString("Lives left: " + this.lives);
    }
})