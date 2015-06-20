
var MenuLayer = cc.Layer.extend({
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
		var startbg = new cc.Sprite(res.start_png);
        startbg.setPosition(centerpos);
        this.addChild(startbg);

		//5.
		cc.MenuItemFont.setFontSize(60);

		//6.create a menu and assign onPlay event callback to it
		var menuItemPlay = cc.MenuItemSprite.create(
				cc.Sprite.create(res.start_n_png), // normal state image
				cc.Sprite.create(res.start_s_png), //select state image
				this.onPlay, this);
		var menu = new cc.Menu(menuItemPlay);  //7. create the menu
		menu.setPosition(400,100);
		this.addChild(menu);
	},

	onPlay : function(){		
		cc.director.runScene(new gameScene());
	}
});

var MenuScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild(layer);
	}
});
