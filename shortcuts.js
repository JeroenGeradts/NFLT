function $(a){return document.getElementById(a)}
function $$(a,id,src,type,value,size,clas,click,txt,change,input,multiple,style,title){//create a DOM-element type a with id and thumb src
   var b = document.createElement(a);
   if (!id == false) b.id = id;
   if (!src == false) b.src = src;
   if (!type == false) b.type = type;
   if (!value == false) b.value = value;
   if (!size == false) b.size = size;
   if (!clas == false) $class(b,clas);
   if (!click == false) $click(b,click);
   if (!change == false) $change(b,change);
   if (!input == false) $input(b,input);
   if (!multiple == false) b.multiple = multiple;
   if (!txt == false) b.appendChild($text(txt));
   if (!style == false) if (style.length > 0){
		if (style[0] > 0) b.style.width = style[0] + 'px';
		if (style.length > 1) if (style[1] > 0) b.style.marginLeft = style[1] + 'px';
		if (style.length > 2) if (style[2] != 0) b.style.display = style[2];
		if (style.length > 3) if (style[3] != 0) b.style.color = style[3];
	}
   if (!title == false) b.title = title;
   return b;
}
function $action(a,b){
	var c = (/BT|NT|RT/.test(b) == true)? searchboxFind : '';
	if (/jci1/.test(a) == true) c = hyperlinkOpenJuriconnect;
	if (b == 'RT' && /jci1/.test(nflt[a][jci]) == true) c = hyperlinkOpenJuriconnect;
	return c;
}
function $change(a,b){return a.addEventListener('change',b)}
function $change_off(a,b){return a.removeEventListener('change',b)}
function $children(a){return a.childNodes}
function $class(a,b){return a.setAttribute('class',b)}
function $click(a,b){return a.addEventListener('click',b)}
function $click_off(a,b){return a.removeEventListener('click',b)}
function $color(a){return (a == '')? 'w3-text-grey' : 'w3-hover-text-blue'}
function $context(a){return (!a == true)? document.body.id : document.body.setAttribute('id',a)}
function $empty(a){while (a.hasChildNodes()) a.removeChild(a.lastChild)}//remove all children from element a
function $follow(a,b,c){//keep evaluating children of item a in array b and add these to array c
	var d = b[a][nt];
	switch(typeof(d)){
		case 'number':
			if (d>0) c.push(d);
			break;
		case 'object':
			c = c.concat(d);
			for (var e in d) c = $follow(d[e],b,c);//BUGFIX needed: does not follow objects on 2nd level
			break;
	}
	arrayDeduplicate(c);
	return c;
}
function $input(a,b){return a.addEventListener('input',b)}
function $list(a){//return a text string with a list of preferred terms of item a
	switch(typeof(a)){
		case 'number':
			return (a == 0)? '' : nflt[a][pt];
			break;
		case 'object':
			var b = [];
			for (var c in a) b.push(nflt[a[c]][pt]);
			return b;
			break;
	}
}
function $normalize(a){return a.toLowerCase().trim().replace(/<|>|\.|\/| /g,'_').replace(/____|___|__/g,'_')}
function $parent(a){return (!a == true)? $('title').getAttribute('data-parent') : $('title').setAttribute('data-parent',a)} //parent title
function $path(a,b,c){//return a string with the path to item a in array b, starting at item c in array b
	$('tags').innerHTML = a;
	var d = [a];
	var e = '';
	while (b[a][bt] != c && a != c){//BUGFIX needed: goes wrong for items with multiple BT, e.g: nflt[531914] (is it possible to have multiple BT in an ontology?)
		a = b[a][bt];
		if (a == 0) break;
		d.push(a);
	}
	d.push(c);
	d.reverse();
	for (var f in d) e += b[d[f]][pt] + ' - ';
	return e.substring(e,e.length-3);
}
function $space(){return window.innerHeight - $('header').clientHeight - $('tags').clientHeight - $('input').clientHeight - $('footer').clientHeight}
function $text(a){return document.createTextNode(a)}
