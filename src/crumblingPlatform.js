var crumblingNextId = 0;

var CrumblingPlatformClass = cc.Sprite.extend({
    world: null,
    pbody: null,
    pshape: null,
    sprite: null,
    lifespan: 1,
    decaying: false,
    exists: true, 
    collision_type: "crumbling",
    crumblingId: 0,

    ctor: function(game, gWorld, posX, posY) {
        this.game = game;
        this.world = gWorld;

        this.pbody = new cp.Body(Infinity, Infinity);
        this.pbody.setPos(cp.v(posX, posY));

        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, 40, 10));
        this.pshape.setElasticity(0);
        this.pshape.setFriction(0.5);
        this.pshape.crumblingId = crumblingNextId;
        this.pshape.setCollisionType("crumbling");
        this.pshape.decaying = false;

        this.crumblingId = crumblingNextId++;
    },

    advanceDecay: function(dt) {
        if(!this.exists) {
            this.pshape.decaying = false;
            return;
        }

        this.pshape.decaying = true;

        if(this.lifespan < dt) {
            // process death
            this.exists = false;
            this.world.removeShape(this.pshape);

        } else {
            this.lifespan -= dt;
        }

    },

    reset: function() {
        this.lifespan = 1000;
        this.pshape.decaying = false;
        if(!this.exists) {
            this.exists = true;
            this.world.addShape(this.pshape);
        }
    }
});