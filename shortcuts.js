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
function $count(a){//return an array with unique items and how many times they appear in array a 
	a.sort(function (a,b){return a-b});
	var b = [];
	var c = [a[0],1];
	for (var d=1; d<a.length; d++){
		if (a[d] == a[d-1]) c[1]++;
		else{
			b.push(c);
			c = [a[d],1];
		}
	}
	b.push(c);
	return $sort(b,1);
}
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
function $key(e){return e.keyCode}//see: http://www.kirupa.com/html5/keyboard_events_in_javascript.htm and http://keycode.info/
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
function $sort(a){//sort array a from Z-A according weight [tag,weight] 
   var b = [];//array with sortable element in the orignal order
   var c = [];//array with sortable element in new order
   var d = [];//sorted array a [tag,weight]
   for (var e in a) b.push(a[e][1]);
   c = c.concat(b).sort(function(a,b){return a-b});
   for (var f=c.length-1; f>=0; f--){
		var g = b.indexOf(c[f]);
		d.push(a[g]);
		a.splice(g,1);
		b.splice(g,1);
	}
   return d;
}
function $space(){return window.innerHeight - $('header').clientHeight - $('tags').clientHeight - $('input').clientHeight - $('footer').clientHeight}
function $tags(a,b){//return an array with [tag-id,count] that are found in string a with title b
	var c = $tagscount(a);
	var d = $tagscount(b);
	var e = [];
	for (var f=0; f<5; f++) e = e.concat(d);
	e = $sort(e.concat(c));
	return e;
}
function $tagscount(a){//return an array with [tag-id,count] that are found in string a
	var skip = ['object'];
	a = '_' + $normalize(a) + '_';
	var b = [];
	var array = nflt;
   for (var c in array){
		if (lst > -1) if (array[c][lst] == 0) continue;
		var d = [array[c][pt]];
		var e = array[c][syn];
		(typeof(e) == 'object')? d = d.concat(e) : d.push(e);
		for (var f in d){
			var g = d[f];
			if (g == 0) continue;
			d[f] = $normalize(g.split('(')[0]);
		}
		arrayDeduplicate(d);
		var h = 0;
		for (var i in d){
			var j = d[i];
			if (j.length < 3) continue;
			h += a.split('_' + j + '_').length - 1;//How many times does the search string match a preferred term or synonym?
		}
		if (h > 0) b.push([c,h]);
	}
	return b;
}
function $text(a){return document.createTextNode(a)}
function $title(a){
	var b = ['<title>','<h1>'];
	var c = ['</title>','</h1>'];
	var d = '';
	for (var e in b){
		var f = a.indexOf(b[e]);
		var g = a.indexOf(c[e]);
		var h = (f > -1)? a.substring(f + b[e].length,g) : '';
		if (d.indexOf(h) == -1) d += ' ' + h
	}
	return d.trim();
}