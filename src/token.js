var trinkets = [];

var TrinketClass  = cc.Sprite.extend({
    pName:"trinket",
    game: null,
    world:null,
    pbody:null,
    shape:null,
    tokenSprite:null,
    tokenAction:null,
    spriteSheet:null,
    isAlive: true,
    isDynamic:false,
    posX: 0,
    posY: 0,
    ctor:function(game,gWorld,posX,posY, id) {
        width = 10;
        height = 10;
        this.world = gWorld;
        this.game = game;
        this.posX = posX;
        this.posY = posY;

        this.pbody = new cp.Body(1, 0.1);
        this.pbody.setPos(cp.v(this.posX, this.posY));

        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, 20, 20));
        this.pshape.setFriction(0.0);
        this.pshape.setElasticity(0.0);
        this.pshape.setCollisionType("trinket");
        this.pshape.name = "trinket" + id;

        this.pshape.id = id;
        this.pshape.type = "trinket";

        cc.spriteFrameCache.addSpriteFrames(res.token_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.token_png);
        this.addChild(this.spriteSheet);
        var tokenFrames = [];
        for (var i = 1; i < 5; i++) {
          var str = "token" + i + ".png";
          var frame = cc.spriteFrameCache.getSpriteFrame(str);
          tokenFrames.push(frame);
        }

        //3.create a animation with the spriteframe array along with a period time
        var animation = new cc.Animation(tokenFrames, 0.5);
        //4.wrap the animate action with a repeat forever action
        this.tokenAction = new cc.RepeatForever(new cc.Animate(animation));
        this.tokenSprite = new cc.Sprite.create(spriteImage);
        this.game.addChild(this.tokenSprite,0);
        this.tokenSprite.setPosition(this.posX,this.posY);
        var spriteImage = res.tokens_png;

        this.tokenSprite.runAction(this.tokenAction);
        this.spriteSheet.addChild(this.tokenSprite);

    },

    die: function() {
        if(!this.isAlive) {
            return null;
        } 
        this.world.removeShape(this.pshape);
        this.game.removeChild(this.tokenSprite);
        this.isAlive = false;
    },

    reset: function() {
        this.isAlive = true;
        this.world.addShape(this.pshape);
        //this.game.addChild(this.tokenSprite);
        //this.tokenSprite.setPosition(this.posX, this.posY)
    }
});
