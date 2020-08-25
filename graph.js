var cwidth = 1000; // largeur par défaut de la zone graphique
var cheight = 800; // hauteur par défaut de la zone graphique
var xmin = -2;document.getElementById("formxmin").value=xmin; // coordonnées cartésiennes de la fenêtre
var xmax = 6;document.getElementById("formxmax").value=xmax;
var ymin = -3.2;document.getElementById("formymin").value=ymin;
var ymax = 3.2;document.getElementById("formymax").value=ymax;
var step = 1; // pas de la grille
var dx = cwidth/(xmax-xmin); // facteur d'échelle x
var dy = cheight/(ymax-ymin); // facteur d'échelle y
var type = 1; // inutilisé pour le moment
var d0,d1; // chrono
var fx="cos(x/2)+sin(x*2)";document.getElementById("formfx").value=fx; // fonction f(x) par défaut, pour l'exemple
function x2scr(x){ // converti une coordonnée x cartésienne en coordonnée "écran" (canevas)
    return (x-xmin)*dx;
}
function y2scr(y){ // converti une coordonnée y cartésienne en coordonnée "écran" (canevas)
    return (-y+ymax)*dy;
}
function scr2x(x){ // converti une coordonnée x "écran" (canevas) en coordonnée cartésienne
    return xmin+x/dx;
}
function scr2y(y){ // converti une coordonnée y "écran" (canevas) en coordonnée cartésienne
    return ymax-y/dy;
}
function cartline(x1,y1,x2,y2,c,ctx){ // dessine une ligne à partir de coordonnées cartésiennes 
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = c;
    context.moveTo(x2scr(x1),y2scr(y1));
    context.lineTo(x2scr(x2),y2scr(y2));
    context.stroke();
}
function line(x1,y1,x2,y2,c,ctx){ // dessine une ligne à partir de coordonnées écran
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = c;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
}
function drawgrid(ctx){ // dessine la grille
    for(var i=0;i<xmax;i+=step){ //allignée sur le 0, à droite
        var a = x2scr(i);
        line(a,0,a,cheight,"#ccc",ctx);
    }
    for(var i=0;i>xmin;i-=step){ // et à gauche
        var a = x2scr(i);
        line(a,0,a,cheight,"#ccc",ctx);
    }
    for(var i=0;i<ymax;i+=step){ // en haut
        var b = y2scr(i);
        line(0,b,cwidth,b,"#ccc",ctx);
    }
    for(var i=0;i>ymin;i-=step){ // et en bas
        var b = y2scr(i);
        line(0,b,cwidth,b,"#ccc",ctx);
    }
}
function drawaxis(ctx){ // dessine les axes x et y avec les graduations
    var a,b;
    line(0,y2scr(0),cwidth,y2scr(0),"black",ctx);
    line(x2scr(0),0,x2scr(0),cheight,"black",ctx);
    b = y2scr(0);
    for(var i=0;i<xmax;i+=step){
        var a = x2scr(i);
        line(a,b,a,b-4,"black",ctx);
    }
    for(var i=0;i>xmin;i-=step){
        var a = x2scr(i);
        line(a,b,a,b-4,"black",ctx);
    }
    ctx.strokeText("x", cwidth-10, b-5);
    a = x2scr(0);
    for(var i=0;i<ymax;i+=step){
        var b = y2scr(i);
        line(a,b,a+4,b,"black",ctx);
    }
    for(var i=0;i>ymin;i-=step){
        var b = y2scr(i);
        line(a,b,a+4,b,"black",ctx);
    }
    ctx.strokeText("y", a+5, 10);
}
function cos(x){return Math.cos(x);}
function sin(x){return Math.sin(x);}
function tan(x){return Math.tan(x);}
function log(x,b){if(b===undefined){b=10;};return Math.log(x)/Math.log(b);}
function ln(x){return Math.log(x);}
function parsefx(f){
    f = f.replace("pi","Math.PI");
    return f;
}

function cartesien(){
    d0 = new Date(); // début chronomètre
    context = document.getElementById("canvas").getContext("2d");
    document.getElementById("canvas").width = cwidth;
    document.getElementById("canvas").height = cheight;
    document.getElementById("param").style.left = cwidth+"px";
    drawgrid(context);
    drawaxis(context);
    var i=0;
    var x = scr2x(i);
    fx2 = parsefx(fx);
    y = eval(fx2);
    context.lineJoin = "bevel";
    context.lineWidth = 1;
    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(i,y2scr(y));
    for(i=1;i<cwidth;i++){
        x = scr2x(i);
        y = eval(fx2);
        context.lineTo(i,y2scr(y));
    }
    context.stroke();
    d1 = new Date(); // fin chrononmètre
    var d = (d1-d0)/1000;
    document.getElementById("disp").innerHTML = "temps de calcul : "+d.toString()+"sec";
    document.getElementById("calc").style.display = "none";
    
}

function polaire(){ // à faire : tracé de graphiques en coordonnées polaires
    
}

function calc(){
    document.getElementById("calc").style.display = "block";
    dx = cwidth/(xmax-xmin);
    dy = cheight/(ymax-ymin);
    switch(type){
        case 1:
        default:
            cartesien();
            break;
        case 2:
            polaire();
            break;
    }
}

function draw(){
    setTimeout("calc()", 10);
}

function reinit(){
    cwidth = 1000;document.getElementById("formlarg").value=cwidth;
    cheight = 800;document.getElementById("formhaut").value=cheight;
    xmin = -2;document.getElementById("formxmin").value=xmin;
    xmax = 6;document.getElementById("formxmax").value=xmax;
    ymin = -3.2;document.getElementById("formymin").value=ymin;
    ymax = 3.2;document.getElementById("formymax").value=ymax;
    dx = cwidth/(xmax-xmin);
    dy = cheight/(ymax-ymin);
    draw();
}
function ratio(){
    var dx = xmax-xmin;
    var dy = dx*cheight/cwidth;
    var y0 = (ymin+ymax)/2;
    ymin = y0-(dy/2);document.getElementById("formymin").value=ymin;
    ymax = y0+(dy/2);document.getElementById("formymax").value=ymax;
    draw();
}

var m_x = "0";
var m_y = "0";
var m_x0 = "0";
var m_y0 = "0";
function mousse_position (e) {
    m_x = (navigator.appName.substring(0,3) == "Net") ? e.pageX : event.clientX+document.body.scrollLeft;
    m_y = (navigator.appName.substring(0,3) == "Net") ? e.pageY : event.clientY+document.body.scrollTop;
}

function handle(delta) {
    var dx = xmax-xmin;
    var dy = ymax-ymin;
    var xs = (xmax-xmin)/cwidth;
    var ys = (ymax-ymin)/cheight;
    var x = parseInt(m_x);
    var y = parseInt(m_y);
    var cx = xmin + x*xs;
    var cy = ymax - y*ys;
    
    if (delta < 0){
        dx*=2;
        dy*=2;
    }else{
        dx/=2;
        dy/=2;
    }
    xmin = cx - dx/2;document.getElementById("formxmin").value=xmin;
    xmax = cx + dx/2;document.getElementById("formxmax").value=xmax;
    ymin = cy - dy/2;document.getElementById("formymin").value=ymin;
    ymax = cy + dy/2;document.getElementById("formymax").value=ymax;
    draw();
}

function wheel(event){
    var delta = 0;
    if (!event)
            event = window.event;
    if (event.wheelDelta){
            delta = event.wheelDelta/120;
            if (window.opera)
                    delta = -delta;
    } else if (event.detail) {
            delta = -event.detail/3;
    }
    if (delta)
            handle(delta);
    if (event.preventDefault)
            event.preventDefault();
    event.returnValue = false;
}

var context;
var img;
var mov=false;
function begin(event){
    m_x0 = m_x;
    m_y0 = m_y;
    context = document.getElementById("canvas").getContext("2d");
    img = context.getImageData(0, 0, cwidth, cheight);
    mov=true;
}
function move(event){
    if (!mov) return;
    var xs=(xmax-xmin)/cwidth;
    var ys=(ymax-ymin)/cheight;
    var mx=m_x-m_x0;
    var my=m_y-m_y0;
    var cx=- mx*xs;
    var cy=my*ys;
    document.getElementById("formxmin").value=xmin+cx;
    document.getElementById("formxmax").value=xmax+cx;
    document.getElementById("formymin").value=ymin+cy;
    document.getElementById("formymax").value=ymax+cy;
    context.clearRect(0,0,cwidth,cheight);
    context.putImageData(img,mx,my);
}
function end(event){
    mov=false;
    var xs = (xmax-xmin)/cwidth;
    var ys = (ymax-ymin)/cheight;
    var mx = m_x-m_x0;
    var my = m_y-m_y0;
    var cx = - mx*xs;
    var cy = my*ys;
    xmin+=cx;document.getElementById("formxmin").value=xmin;
    xmax+=cx;document.getElementById("formxmax").value=xmax;
    ymin+=cy;document.getElementById("formymin").value=ymin;
    ymax+=cy;document.getElementById("formymax").value=ymax;
    draw();
}

window.document.onmousemove = mousse_position;
if (window.addEventListener)
    document.getElementById("canvas").addEventListener('DOMMouseScroll', wheel, false);
document.getElementById("canvas").onmousewheel = wheel;
document.getElementById("canvas").onmousedown = begin;
document.getElementById("canvas").onmousemove = move;
document.getElementById("canvas").onmouseup = end;
draw();
