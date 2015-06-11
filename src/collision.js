var collisionHandler = {

    beginCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == arbiter.b.collision_type) {
            return false;
        } else if(arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "spike" || 
            arbiter.b.collision_type == "ground" && arbiter.a.collision_type == "spike") {
            return false;
        } else if(arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "crumbling" || 
            arbiter.b.collision_type == "ground" && arbiter.a.collision_type == "crumbling") {
            return false;
        } else if(arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "gravline" ||
            arbiter.b.collision_type == "ground" && arbiter.a.collision_type == "gravline") {
            return false;
        }

        return true;
    },

    preCollision: function(arbiter, space) {
        return true;
    },

    postCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == "crumbling" && arbiter.b.collision_type == "player") {
            arbiter.a.decaying = true;
        } else if(arbiter.b.collision_type == "crumbling" && arbiter.a.collision_type == "player") {
            arbiter.b.decaying = true;
        } else if(arbiter.a.collision_type == "player" && arbiter.b.collision_type == "gravline" ||
            arbiter.b.collision_type == "player" && arbiter.a.collision_type == "gravline") {
            space.invertGravity();
        }
    },

    endCollision: null

};