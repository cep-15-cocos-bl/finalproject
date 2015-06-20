var crumblingNextId = 0;

var CrumblingPlatformClass = cc.Sprite.extend({
    world: null,
    pbody: null,
    pshape: null,
    sprite: null,
    lifespan: 2,
    decaying: false,
    exists: true, 
    collision_type: "crumbling",
    crumblingId: 0,
    platformSprite:null,
    CAction:null,
    CspriteSheet:null,

    ctor: function(game, gWorld, posX, posY, spriteImage) {
        var CFrames = [];
        this.game = game;
        this.world = gWorld;
        this.pbody = new cp.Body(Infinity, Infinity);
        this.pbody.setPos(cp.v(posX, posY));
        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, 50, 10));
        this.pshape.setElasticity(0);
        this.pshape.setFriction(0.0);
        //console.log("apple");
        this.pshape.crumblingId = crumblingNextId;
        this.pshape.setCollisionType("crumbling");
        this.pshape.decaying = false;
        cc.spriteFrameCache.addSpriteFrames(res.Cplatform_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.Cplatform_png);
        this.addChild(this.spriteSheet);
        var tokenFrames = [];
        for (var i = 1; i < 5; i++) {
          var str = "Cplatform" + i + ".png";
          var frame = cc.spriteFrameCache.getSpriteFrame(str);
          CFrames.push(frame);
        }

        //3.create a animation with the spriteframe array along with a period time
        var animation = new cc.Animation(CFrames, 0.1);
        //4.wrap the animate action with a repeat forever action
        this.CAction = new cc.Animate(animation,1)
        this.CSprite = new cc.Sprite.create(spriteImage);
        this.game.addChild(this.CSprite,0);
        this.CSprite.setPosition(posX,posY);
        var spriteImage = res.platform_png;


        this.crumblingId = crumblingNextId++;
    },

    advanceDecay: function(dt) {
        if(!this.exists) {
            this.pshape.decaying = false;
            return;
        }

        this.pshape.decaying = true;
        //console.log(this.lifespan + ", " + dt);

        if(this.lifespan < dt) {
            // process death
            this.CSprite.runAction(this.CAction);
        this.spriteSheet.addChild(this.CSprite);
            //console.log("processing death");
            this.exists = false;
            this.world.removeShape(this.pshape);
            if(dt <0.001){
                this.game.removeChild(this.CSprite);
            }

        } else {
            this.lifespan -= dt;
        }

    },

    reset: function() {
        this.lifespan = 2;
        this.pshape.decaying = false;
        this.exists = true;
//        this.world.addShape(this.pshape);
    }
});