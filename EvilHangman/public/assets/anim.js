/**
 * Simulates springs and gravity
 * @param {canvas} canvas Requires a HTML5 Canvas object
 * @return {object} This returns a simulation module
 */
var simStarted = false;
var sim;

function Simulation (c) {
    
    var canvas = c;
    var width, height;
    var timer;
    var objs = [];
    var prts = [];
    var ctx;

    width = canvas.width;
    height = canvas.height;
	
	function applyBehavior (obj){
		obj.behavior(obj,false);
	}
	
	function changeBehavior (obj,behavior,parameters){
		obj.behavior = behavior;
		obj.parameters = parameters;
	}
	
	function moveParticle (prt,draw){
		prt.life = prt.life - 1;
		bh_Move(prt);
		return false;
	}
	
	function bh_None (obj,draw)
	{
		return false;
	}
	
	function bh_Move (obj,draw)
	{
		obj.x = obj.x + obj.xv;
		obj.xv = obj.xv + obj.xa;
		obj.y = obj.y + obj.yv;
		obj.yv = obj.yv + obj.ya;
	}
	
	function bh_MoveTo (obj,draw)
	{
		obj.xv = obj.xv + obj.xa;
		obj.yv = obj.yv + obj.ya;
	}
	
	function bh_Float (obj,draw)
	{
		obj.y = obj.y + obj.yv;
		obj.ya = obj.parameters[1];
		obj.yv = obj.yv + obj.ya;
		
		if (obj.yv > obj.parameters[0] && obj.parameters[1] > 0){
			obj.parameters[1] = -(obj.parameters[1]);
		}
		if (obj.yv < -obj.parameters[0] && obj.parameters[1] < 0){
			obj.parameters[1] = -(obj.parameters[1]);
		}
		return false;
	}
	
	function bh_Rotate (obj,draw)
	{
		if(draw){
			ctx.save();
			
			var img = document.getElementById(obj.image);
			
			ctx.translate(obj.x+img.width/2,obj.y+img.height/2);

			ctx.rotate(obj.parameters[0]*Math.PI/180);
			
			ctx.drawImage(img,-(img.width/2),-(img.height/2));
			ctx.restore();
			
			return true;
		}
		else{
			obj.parameters[0] = obj.parameters[0] + obj.parameters[1];
			obj.parameters[1] = obj.parameters[1] + obj.parameters[3]
			
			if (obj.parameters[1] > obj.parameters[2] && obj.parameters[3] > 0){
				obj.parameters[3] = -(obj.parameters[3]);
			}
			if (obj.parameters[1] < -obj.parameters[2] && obj.parameters[3] < 0){
				obj.parameters[3] = -(obj.parameters[3]);
			}
		}
		return false;
	}
	
	function bh_Shake (obj,draw)
	{
		obj.x = obj.x + obj.xv;
		obj.xa = obj.parameters[1];
		obj.xv = obj.xv + obj.xa;
		
		if (obj.xv > obj.parameters[0] && obj.parameters[1] > 0){
			obj.parameters[1] = -(obj.parameters[1]);
		}
		if (obj.xv < -obj.parameters[0] && obj.parameters[1] < 0){
			obj.parameters[1] = -(obj.parameters[1]);
		}
	
	}
	
	function bh_Drip (obj,draw)
	{
		if (obj.parameters[1] < obj.parameters[0]){
			obj.parameters[1]++
		}
		else{
			obj.parameters[1] = 0;
			addPrt(obj.x,obj.y,0,obj.parameters[2],0,obj.parameters[3],30,"particle");
		}
		return false;
	}
	function bh_Fret (obj,draw)
	{
		if(obj.parameters[2] < (obj.parameters[3])){
			obj.parameters[2]++;
		}
		else if(obj.parameters[2] == (obj.parameters[3])){
			obj.parameters[2] = 0;
			obj.parameters[3] = -obj.parameters[3];
			var sign = obj.parameters[3]/Math.abs(obj.parameters[3]);
			addPrt(obj.x+40+sign*40,obj.y,sign*Math.random(),Math.random(),sign*Math.random(),Math.random(),10,"particle");
		}
		else{
			obj.parameters[2]--;
		}
		
		bh_Shake(obj,draw);
	}
	
    function Obj (x,y,image)
    {
		this.x = x;
		this.y = y;
		this.xv = 0.0;
		this.yv = 0.0;
		this.xa = 0.0;	// force
		this.ya = 0.0;	// force
		this.behavior = bh_None;	// force
		this.parameters = null;
		this.dt = 0.0;
		this.image = image;
    }
    
    function Prt (x,y,xv,yv,xa,ya,life,image)
    {
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
		this.xa = xa;	// force
		this.ya = ya;	// force
		this.life = life;
		this.dt = 0.0;
		this.behavior = bh_None;	// force
		this.image = image;
    }
    
    function update(dt)
    {
		prts = prts.filter(function (element) {
			moveParticle(element);
			return element.life >= 0;
		});
		
		objs.forEach(applyBehavior);
    }
	
	function drawItem(itm)
	{
		var img = document.getElementById(itm.image);
		if(!(itm.behavior(itm,true)))
			ctx.drawImage(img,itm.x,itm.y);
	}
	
    function draw()
    {
		//var c = $("#mycanvas")[0];
		ctx = canvas.getContext("2d");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,width,height);
		objs.forEach(drawItem);
		prts.forEach(drawItem);
    }

    function init(scene)
    {	
		switch(scene){
			case 0:
				addObj(0,0,bh_None,[0,0,0.10,0.01],"titlepic");
				addObj(225,30,bh_Rotate,[0,0,0.20,0.01],"titlehead");
				addObj(51,200,bh_Drip,[240,0,0.10,0.10],"particle");
				addObj(151,200,bh_Drip,[220,0,0.10,0.10],"particle");
				addObj(201,200,bh_Drip,[230,0,0.10,0.10],"particle");
				addObj(311,200,bh_Drip,[260,0,0.10,0.10],"particle");
				break;
			case 1:
				addObj(0,0,bh_None,[0,0,0.10,0.01],"optionspic");
				addObj(46,35,bh_Float,[0.40,0.01],"angel");
				addObj(282,55,bh_Float,[0.40,-0.01],"angel");
				break;
			case 2:
				addObj(0,0,bh_None,[0,0,0.10,0.01],"optionspic");
				addObj(46,35,bh_Float,[0.40,0.01],"demon");
				addObj(282,55,bh_Float,[0.40,-0.01],"demon");
				break;
			case 3:
				addObj(0,0,bh_None,[0,0,0.10,0.01],"optionspic");
				addObj(46,35,bh_Float,[0.40,0.01],"demon");
				addObj(282,55,bh_Float,[0.40,-0.01],"angel");
				break;
			case 10:
				addObj(20,0,bh_None,[0,0,0.10,0.01],"frame1");
				break;
			case 11:
				addObj(20,0,bh_None,[0,0,0.10,0.01],"frame2");
				break;
			case 12:
				addObj(20,0,bh_None,[0,0,0.10,0.01],"frame3");
				break;
			case 13:
				addObj(20,0,bh_None,[0,0,0.10,0.01],"frame4");
				break;
			case 14:
				addObj(20,0,bh_None,[0,0,0.10,0.01],"frame5");
				break;
			case 15:
				addObj(20,0,bh_None,[0,0,0.10,0.01],"frame6");
				break;
		}
		draw();
    }

    function start()
    {
	lastFrame = +new Date;

	timer = setInterval(function() {
	    var now = +new Date,
		deltaT = now - lastFrame;
	    lastFrame = now;
	    
	    update(deltaT*0.01);
	    draw();
	    
	}, 8);
    }

	function end(){
		var objs = [];
		var prts = [];
		stop();
	}

    function stop()
    {
		clearInterval(timer);
    }

    function addObj(x,y,behavior,parameters,image)
    {
		var newObj = new Obj(x,y);
		newObj.behavior = behavior;
		newObj.parameters = parameters;
		newObj.image = image;
		objs.push(newObj);
    }
    
    function addPrt(x,y,xv,yv,xa,ya,life,image)
    {
		var newPrt = new Prt(x,y,xv,yv,xa,ya,life,image);
		prts.push(newPrt);
    }
    
    return {
		init: init,
		start: start,
		addPrt: addPrt,
		end: end,
		stop: stop
    };

} // end Simulation

var scenen = 0;
var pdeg = 0;


function sceneNum(){
	return scenen;
}

function startScene(scene) {
	
	scenen = scene;
	
    var canvas = $("#gamefield")[0];
    if (simStarted) {
		sim.end();
		sim = Simulation(canvas);
	}
	else
		sim = Simulation(canvas);
    simStarted = true;
    
    sim.init(scene);
	sim.start();
	
    var c = $("#gamefield").on("click", function(event) {
		var x,y, rect,xv,yv,xa,ya;
		rect = canvas.getBoundingClientRect();
			
			x = event.clientX - rect.left;
			y = event.clientY - rect.top;
			var r = 3;
			var i = 0
			for (i;i<20;i++){
			pdeg = pdeg + 0.35;
			sim.addPrt(x,y,Math.cos(pdeg)*r,Math.sin(pdeg)*r,-Math.cos(pdeg)*r*0.05,-Math.sin(pdeg)*r*0.05,40,"particle");
			}
		console.log("Canvas was clicked at %f,%f", x, y);
    });
	
}
