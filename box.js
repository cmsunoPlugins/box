//
// CMSUno
// Plugin Box
//
function f_save_box(){
	jQuery(document).ready(function(){
		var a=document.getElementById("frmBox").getElementsByTagName("textarea"),b,h=[];
		h.push({name:'action',value:'save'});
		h.push({name:'unox',value:Unox});
		for(v=0;v<a.length;v++){if(a[v].name.substr(0,1)=='E')b=CKEDITOR.instances[a[v].name].getData();else b=a[v].value;h.push({name:a[v].name,value:b});};
		jQuery.post('uno/plugins/box/box.php',h,function(r){f_alert(r);});
	});
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
	jQuery(document).ready(function(){
		jQuery.getJSON("uno/data/"+Ubusy+"/box.json?r="+Math.random(),function(data){
			jQuery.each(data.box,function(k,d){
				jQuery('#curBox').append('<tr><td style="width:100px;vertical-align:middle;padding-left:40px;">'+d.n+'</td><td style="'+(d.t=='E'?'padding-bottom:10px;padding-top:10px':'padding-right:8px;')+'"><textarea style="width:100%;" name="'+d.t+d.n+'">'+d.b+'</textarea></td><td width="30px" style="cursor:pointer;background:transparent url(\''+Udep+'includes/img/close.png\') no-repeat scroll center center;" onClick="this.parentNode.parentNode.removeChild(this.parentNode);"></td></tr>');
				if(d.t=='E')CKEDITOR.replace(d.t+d.n,{height:'300'});
			});
		});
	});
}
//
f_load_box();