//
// CMSUno
// Plugin Box
//
function f_save_box(){
	let a=document.getElementById("frmBox").getElementsByTagName("textarea"),b,h=new FormData();
	h.set('action','save');
	h.set('unox',Unox);
	h.set('ubusy',Ubusy);
	for(v=0;v<a.length;v++){
		if(a[v].name.substr(0,1)=='E')b=CKEDITOR.instances[a[v].name].getData();
		else b=a[v].value;
		h.set(a[v].name,b);
	}
	fetch('uno/plugins/box/box.php',{method:'post',body:h})
	.then(r=>r.text())
	.then(r=>f_alert(r));
}
//
function f_add_box(f,g){
	a=document.getElementById('curBox');
	b=document.createElement('tr');
	c=document.createElement('td');
	f=f.replace(/[^\w]/gi, '');
	c.innerHTML=f;
	c.style.width='110px';
	c.style.verticalAlign='middle';
	c.style.paddingLeft='40px';
	b.appendChild(c);
	c=document.createElement('td');
	d=document.createElement('textarea');
	d.name=g+f;
	d.style.width='100%';
	c.appendChild(d);
	b.appendChild(c);
	c=document.createElement('td');
	c.style.backgroundImage='url('+Udep+'includes/img/close.png)';
	c.style.backgroundPosition='center center';
	c.style.backgroundRepeat='no-repeat';
	c.style.cursor='pointer';
	c.width='30px';
	c.onclick=function(){this.parentNode.parentNode.removeChild(this.parentNode);}
	b.appendChild(c);
	a.appendChild(b);
	document.getElementById('boxName').value='';
	if(g=='E')CKEDITOR.replace(g+f,{height:'300'});
}
//
function f_load_box(){
	let a = document.getElementById('curBox'),k,d;
	fetch("uno/data/"+Ubusy+"/box.json?r="+Math.random())
	.then(r=>r.json())
	.then(function(data){
		for(k in data.box){
			d=data.box[k];
			document.getElementById('curBox').insertAdjacentHTML('beforeend','<tr><td style="width:100px;vertical-align:middle;padding-left:40px;">'+d.n+'</td><td style="'+(d.t=='E'?'padding-bottom:10px;padding-top:10px':'padding-right:8px;')+'"><textarea style="width:100%;" name="'+d.t+d.n+'">'+d.b+'</textarea></td><td width="30px" style="cursor:pointer;background:transparent url(\''+Udep+'includes/img/close.png\') no-repeat scroll center center;" onClick="this.parentNode.parentNode.removeChild(this.parentNode);"></td></tr>');
			if(d.t=='E')CKEDITOR.replace(d.t+d.n,{height:'300'});
		}
	});
}
//
f_load_box();
