

var EndLayer = cc.Layer.extend({
	ctor : function(){
		//1. call super class's ctor function		
		this._super();
	},
	init:function(){
		//call super class's super function
		this._super();	
		//2. get the screen size of your game canvas
		var winsize = cc.director.getWinSize();

		//3. calculate the center point
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

		//4. create a background image and set it's position at the center of the screen
		/* var spritebg = new cc.Sprite(res.helloBG_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);*/

		//5.
	 this.endLabel = new cc.LabelTTF("END", "Helvetica", 50);
        this.endLabel.setColor(cc.color(254,254,254));//black color
        this.endLabel.setPosition(centerpos);
        this.addChild(this.endLabel);
	}
});

var EndScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new EndLayer();
		layer.init();
		this.addChild(layer);
	}
});
