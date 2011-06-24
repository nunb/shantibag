/******************************************
CM_ADD-IN - hideselectboxes (last updated: 11/13/02)
*****************************************/
if(bw.dom&&!bw.op){
  makeCM.prototype.sel=0
  makeCM.prototype.onshow+=";this.hideselectboxes(pm,pm.subx,pm.suby,maxw,maxh,pm.lev)"
  makeCM.prototype.hideselectboxes=function(pm,x,y,w,h,l){
    var selx,sely,selw,selh,i
    if(!this.sel){
      this.sel=this.doc.getElementsByTagName("SELECT")
		  this.sel.level=0
    }
    var sel=this.sel
    for(i=0;i<sel.length;i++){
			selx=0; sely=0; var selp;
			if(sel[i].offsetParent){selp=sel[i]; while(selp.offsetParent){selp=selp.offsetParent; selx+=selp.offsetLeft; sely+=selp.offsetTop;}}
			selx+=sel[i].offsetLeft; sely+=sel[i].offsetTop
			selw=sel[i].offsetWidth; selh=sel[i].offsetHeight
			if(selx+selw>x && selx<x+w && sely+selh>y && sely<y+h){
				if(sel[i].style.visibility!="hidden"){sel[i].level=l; sel[i].style.visibility="hidden"; if(pm){ if(!pm.mout) pm.mout=""; pm.mout+=this.name+".sel["+i+"].style.visibility='visible';"}}
      }else if(l<=sel[i].level && !(pm&&l==0)) sel[i].style.visibility="visible"
    }
  }
}


/***************************************************
 CoolMenus page check by Charles J. Cliffe Oct. 2004
 ***************************************************/
makeCM.prototype.onshow+=";this.pagecheck(b,pm,pm.subx,pm.suby,maxw,maxh)"
makeCM.prototype.pagecheck=function(b,pm,x,y,w,h,n)
{
  var l=pm.lev+1,a=b.align; if(!n) n=1
  var ok=1
	var ie=bw.ie55||bw.ie6;

	winW = (ie) ? document.body.offsetWidth-20 : window.innerWidth-16;
	winH = (ie) ? document.body.offsetHeight : window.innerHeight;

	winTop = (ie) ? document.body.scrollTop : window.pageYOffset;
	winLeft = (ie) ? document.body.scrollLeft : window.pageXOffset;

	if (y+h > winH+winTop) 
	{
		y = y - h + this.l[l].height + (2*this.l[l].borderY);
	}

	while (y < winTop)
	{
		y += this.l[l].height + this.l[l].borderY;
	}

	if (x + w > winW + winLeft && l > 1)
	{
		x -= w + this.l[l-1].width;
	}
	else if (x + w > winW + winLeft)
	{
		x = winW + winLeft - w;
	}
	
	b.moveIt(x,y)
}

