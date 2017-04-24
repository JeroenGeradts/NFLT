/*
Tested in:
Internet Explorer 11
FireFox 51.0.1
Chrome 55.0.2883.87 m
*/
window.onload=function(){//screen set-up
   var a = ['nav','div'];
   var b = ['sidebar','main'];
   var c = ['w3-sidenav w3-black w3-center',''];
   var d = [[60,0],[0,60]];
   for (var e in a) document.body.appendChild($$(a[e],b[e],'','','','',c[e],'','','','','',d[e]));

   var a = ['i','i','i'];
   var b = ['fa-home','fa-tags','fa-excel'];
   var c = ['fa fa-home w3-xlarge w3-padding w3-opennav','fa fa-tags w3-xlarge w3-padding','fa fa-file-excel-o w3-xlarge w3-padding'];
   for (var d in a) $('sidebar').appendChild($$(a[d],b[d],'','','','',c[d]));

   var a = ['header','div','div','div','footer'];
   var b = ['header','tags','input','content','footer'];
   var c = ['w3-row-padding w3-theme w3-padding-8','w3-container w3-theme-l4 w3-padding','w3-container w3-padding','w3-container w3-padding','w3-container w3-theme-l3 w3-bottom w3-left w3-padding w3-col'];
   for (var d in a) $('main').appendChild($$(a[d],b[d],'','','','',c[d]));

	var a = ['div','div','div','div'];
	var b = ['title','search-icon','search-container','search-type'];
	var c = ['w3-col m9 w3-padding-8 w3-xlarge','w3-col w3-padding-12','w3-col m2 w3-padding-8','w3-rest w3-padding-8 w3-tooltip'];
	var d = [[],[35],[],[]];
   for (var e in a) $('header').appendChild($$(a[e],b[e],'','','','',c[e],'','','','','',d[e]));
	
	var a = $$('div','licence','','','','','w3-tooltip');
	var b = $$('a');
	b.href = 'http://creativecommons.org/licenses/by-sa/4.0/';
	b.target = '_blank';
	b.appendChild($$('img','','https://i.creativecommons.org/l/by-sa/4.0/88x31.png'));
	b.appendChild($$('span','','','','','','w3-text w3-small w3-margin-left','','Taxonomiemanager van Jeroen Geradts, is in licentie gegeven volgens een Creative Commons Naamsvermelding-GelijkDelen 4.0 Internationaal-licentie'));
	a.appendChild(b);
	$('footer').appendChild(a);
	
   $('search-icon').appendChild($$('i','','','','','','w3-xlarge fa fa-search'));
   $('search-type').appendChild($$('input','exact','','checkbox','','','w3-check',searchboxCheck));
   $('search-type').appendChild($$('span','','','','','','w3-text w3-small','','Exact zoeken'));
   $('search-container').appendChild($$('input','searchbox','','text','','','w3-input w3-tiny','','','',searchboxInput));
   $('searchbox').placeholder = 'Search...';
	$('input').style.display = 'none';
	
	declareNFLT();

	NFLT = ['j.5:prefLabel','j.5:altLabel','j.1:broader','NT','j.1:related','j.4:termname_jci13','j.4:leerstuk','j.7:note'];
	pt = NFLT.indexOf('j.5:prefLabel');//0
	syn = NFLT.indexOf('j.5:altLabel');//1
	bt = NFLT.indexOf('j.1:broader');//2
	nt = NFLT.indexOf('NT');//3
	rt = NFLT.indexOf('j.1:related');//4
	jci = NFLT.indexOf('j.4:termname_jci13');//5
	lst = NFLT.indexOf('j.4:leerstuk');//6
	sn = NFLT.indexOf('j.7:note');//7
	
	var a = Number(location.hash.replace('#',''));
	if (a == 0) contentStart();
	else switch (isNaN(a)){
		case false:
			$parent(nflt[a][pt]);
			searchboxShowResults(nflt,[a]);
			break;
		case true:
			var a = location.hash.replace('#','');
			$parent(a);
			$('searchbox').value = a;
			searchboxFind.call($('searchbox'));
			break;
	}
}
function arrayDeduplicate(a){//sort array a and remove duplicate values
   if (a.length<2) return;
   switch (typeof (a[0])){
      case 'string':
         a.sort();
         for (var b=a.length-1; b>0; b--) if (a[b] == a[b - 1]) a.splice(b,1);
         break;
      case 'number':
         a.sort(function (a,b){return a-b});
         for (var b=a.length-1; b>0; b--) if (a[b] == a[b - 1]) a.splice(b,1);
         break;
      case 'object':
         for (var b = a.length-1; b>0; b--){
            var c = [];
            c = c.concat(a);
            c.splice(b);
            if (c.toString().indexOf(a[b].toString()) > -1) a.splice(b,1);
         }
         break;
   }
}
function contentClose(){
	$click_off(this,contentClose);
	$click(this,contentOpen);
	$class(this.childNodes[1],'w3-right w3-large fa fa-caret-down');
	this.parentNode.removeChild(this.nextElementSibling);
}
function contentOpen(){
	var a = this.parentNode.id;
	var b = $$('ul');
	for (var c in nflt[a]){
		var d = nflt[a][c];
		if (d == 0) continue;
		var e = ['PT','SYN','BT','NT','RT','Juriconnect','Leerstuk','SN'][c];
		var f = ['Voorkeursterm','Synoniem','Algemenere term','Specifiekere term','Gerelateerde term','Juriconnect','Leerstuk','Beschrijving'][c];
		switch(typeof(d)){
			case 'number':
				var g = $action(d,e);
				b.appendChild($$('li',d,'','','','',$color(g),g,f + ': ' + nflt[d][pt]));
				break;
			case 'string':
				var g = $action(d,e);
				b.appendChild($$('li',d,'','','','',$color(g),g,f + ': ' + d));
				break;
			case 'object':
				for (var h in d){
					var i = d[h];
					var g = $action(i,e);
					(typeof(i) == 'string')? b.appendChild($$('li',i,'','','','',$color(g),g,f + ': ' + i)) : b.appendChild($$('li',i,'','','','',$color(g),g,f + ': ' + nflt[i][pt]));
				}
				break;
		}
	}
	$click_off(this,contentOpen);
	$click(this,contentClose);
	$class(this.childNodes[1],'w3-right w3-large fa fa-caret-up');
	this.parentNode.appendChild(b);
	location.hash = a;
	sidemenuChange('Consult');
	$('content').scrollTop = 0;
}
function contentStart(){
	$('title').style.display = 'block';
	$('search-icon').style.display = 'block';
	$('searchbox').style.display = 'block';
	$('licence').style.display = 'block';
	$('input').style.display = 'none';
	$empty($('content'));
	$empty($('tags'));
	$parent('Nederlandse Fiscale Leerstukken Taxonomie');
	searchboxShowResults(nflt,[192128,446075]);
	location.hash = location.hash.split('#')[0];
	sidemenuChange('Consult');
}
function fileClassify(content,name){//extract metadata from website-pages
	var title = $title(content);
	result.appendChild($text('bestand: ' + name));
	result.appendChild($$('br'));
	result.appendChild($text('titel: ' + title));
	result.appendChild($$('br'));
	result.appendChild($text('mogelijke tags: '));
	result.appendChild($$('br'));
	var a = $tags(content,title);
	var b = [];
	for (var c in a){
		var d = a[c][0];//tag id
		var e = [d];
		while (nflt[d][bt] != 446075){
			d = nflt[d][bt];
			e.push(d);
		}
		for (var f=0; f<a[c][1]; f++) b = b.concat(e);
	}
	var g = $count(b);
	for (var h in g){
		if (g[h][1] < 30) break;
		var i = $$('span',g[h][0],'','','','','w3-hover-text-blue',popupShow,'#' + nflt[g[h][0]][pt].split('(')[0].trim().replace(/ /g,'-'));
		i.style.fontSize = Math.round(g[h][1]/3) + 'px';
		i.appendChild($text(' '));
		result.appendChild(i);
	}
	result.appendChild($$('br'));
	result.appendChild($$('hr'));
   var next = filenames.indexOf(name) + 1;
   if (next < files.length) fileLoad(filenames[next],files[next]);
   else{
		$('content').style.height = $space() + 'px';
		$('content').style.overflow = 'auto';
		$('content').appendChild(result);
	}
}
function fileExport(){
	var a = Number(location.hash.replace('#',''));
   switch(this.title){
		case 'Exporteer naar Excel':
			this.style.color = 'lightgreen';
			this.title = 'Terug naar raadplegen';
			var b = $follow(a,nflt,[a]);
			var c = '<b>Volgnummer</b>;<b>Leerstuk</b>;<b>Pad</b>;<b>Voorkeursterm</b>;<b>Synoniemen</b>;<b>Gerelateerde termen</b>;<b>Aantekeningen</b><br>';
			for (var d in b){
				var e = b[d];
				c += e + ';' + nflt[e][lst] + ';' + $path(e,nflt,a) + ';' + nflt[e][pt] + ';';
				c += (nflt[e][syn] == 0)? ';' : nflt[e][syn] + ';';
				c += $list(nflt[e][rt]) + ';';
				c += (nflt[e][sn] == 0)? '<br>' : nflt[e][sn] + '<br>';
			}
			$('title').style.display = 'none';
			$('search-icon').style.display = 'none';
			$('searchbox').style.display = 'none';
			$('exact').style.display = 'none';
			$('licence').style.display = 'none';
			$('content').innerHTML = c;
			break;
		case 'Terug naar raadplegen':
			this.style.color = '';
			this.title = 'Exporteer naar Excel';
			$('title').style.display = 'block';
			$('search-icon').style.display = 'block';
			$('searchbox').style.display = 'block';
			$('exact').style.display = 'block';
			$('licence').style.display = 'block';
			$empty($('content'));
			$empty($('tags'));
			searchboxShowResults(nflt,[a]);
			break;
	}
}
function fileLoad(name,file){//load file in FileReader for extracting tags
	var a = new FileReader();
	a.onload = function(evt){fileClassify(evt.target.result,name)};
	a.readAsText(file);		
}
function fileLoadNext(evt){
   files = evt.target.files;
	filenames = [];
	result = $$('span');
	for (var a=0; a<files.length; a++) filenames.push(files[a].name);
	fileLoad(filenames[0],files[0]);
}
function fileLoadStart(){//start or end capture new content
	$empty($('tags'));
	$empty($('content'));
	$empty($('input'));
   switch(this.title){
		case 'Zoek tags':
         window.addEventListener('keydown',$key,false);
         this.style.color = 'lightgreen';
			$('input').style.display = '';
			$('input').appendChild($$('input','','','file','','','','','',fileLoadNext,'',true));
         sidemenuChange('Classify');
         break;
      case 'Terug naar raadplegen taxonomie':
         this.style.color = '';
			location.reload();
         break;
   }
}
function hyperlinkOpenJuriconnect(){
	switch(isNaN(Number(this.id))){
		case true:
			window.open('http://wetten.overheid.nl/' + this.id);
			break;
		case false:
			window.open('http://wetten.overheid.nl/' + nflt[this.id][jci]);
			break;
	}
}
function popupClose(){
	$('content').removeChild($('content').lastChild);
}
function popupShow(){
	var array = nflt;
	var a = $$('div','popup','','','','','w3-modal',popupClose);
	var b = $$('div','','','','','','w3-modal-content');
	var c = $$('div','','','','','','w3-container-padding');
	c.appendChild($$('i','','','','','','fa fa-close w3-padding w3-display-topright'));
	c.appendChild($$('header','','','','','','w3-container w3-padding w3-theme-l4','',array[this.id][pt]));
	var d = $$('ul');
	for (var e in array[this.id]){
		var f = array[this.id][e];
		if (f == 0) continue;
		var g = ['Voorkeursterm','Synoniem','Algemenere term','Specifiekere term','Gerelateerde term','Juriconnect','Leerstuk','Beschrijving'][e];
		switch(typeof(f)){
			case 'number':
				d.appendChild($$('li',f,'','','','','w3-text-grey','',g + ': ' + array[f][pt]));
				break;
			case 'string':
				d.appendChild($$('li',f,'','','','','w3-text-grey','',g + ': ' + f));
				break;
			case 'object':
				for (var h in f)(typeof(f[h]) == 'string')? d.appendChild($$('li',f[h],'','','','','w3-text-grey','',g + ': ' + f[h])) : d.appendChild($$('li',f[h],'','','','','w3-text-grey','',g + ': ' + array[f[h]][pt]));
				break;
		}
	}
	c.appendChild(d);
	b.appendChild(c);
	a.appendChild(b);
	a.style.display = 'block';
	a.style.marginLeft = '60px';
	$('content').appendChild(a);
}
function searchboxCheck(){//do the search again when changing the search type (Exact search or not)
	searchboxFind.call($('searchbox'));//http://keycode.info/		
}
function searchboxFind(){//find all content that matches the string or content-id typed in the search-box
   $empty($('tags'));
   $empty($('content'));
   sidemenuChange('Find');
	var array = nflt;
	var search = ($('exact').checked == true)? 'Exact zoeken naar: ' : 'Zoeken naar: ';
   (this.id == 'searchbox')? $parent(search + $('searchbox').value.replace(/_/g,' ').replace(/"/g,'')) : $parent(array[this.id][pt]);
   var a = (this.id == 'searchbox')? $normalize($('searchbox').value) : $normalize(this.id);
   var b = [];//nflt
   if (!array[Number(a)] == false) b.push(Number(a));//Does the search string match an id?
   else for (var c in array){
		var d = [$normalize(array[c][pt])];
		var e = array[c][syn];
		switch(typeof(e)){
			case 'string':
				d.push($normalize(e));
				break;
			case 'object':
				for (var f in e) d.push($normalize(e[f]));
				break;
		}
		switch($('exact').checked){
			case true:
				if (d.indexOf(a) > -1) b.push(Number(c));//Does the search string exactly match a preferred term or synonym?
				break;
			case false:
				if (d.toString().indexOf(a) > -1) b.push(Number(c));//Does the search string partially or exactly match a preferred term or synonym?
				break;
		}
	}
   arrayDeduplicate(b);
	var g = b.length;
	$('tags').innerHTML = (this.id != 'searchbox')? '' : (g == 0)? 'geen resultaten gevonden' : (g == 1)? '1 resultaat gevonden' : g + ' resultaten gevonden';
	location.hash = a;
	searchboxShowResults(array,b);
}
function searchboxInput(){//work-around for IE not responding to changes in input field
	window.onkeydown = function(evt){if (evt.keyCode == 13 || window.event.keyCode == 13) searchboxFind.call($('searchbox'))};//http://keycode.info/		
}
function searchboxShowResults(array,item){
   $('title').innerHTML = $parent();
	var a = $$('div','searchresult','','','','','w3-container-padding');
	$('content').style.height = $space() + 'px';
	$('content').style.overflow = 'auto';
	for (var b in item){
		var d = array[item[b]][pt];
		var e = $$('div',item[b],'','','','','w3-margin w3-card-2 w3-half');
		var f = $$('header','','','','','','w3-container w3-padding w3-theme-l4',contentOpen,d);
		f.appendChild($$('i','','','','','','w3-right w3-large fa fa-caret-down'));
		e.appendChild(f);
		a.appendChild(e);
	}
	$('content').appendChild(a);
	if (item.length == 1) contentOpen.call($(item[0]).firstChild);
}
function sidemenuChange(a){//change color and function of icons in accordance with context a
	$context(a);
	//standard behaviour
   var icons = ['fa-home','fa-tags','fa-excel'];
   var active = [1,1,0];
   var title = ['Home','Zoek tags','Exporteer naar Excel'];
   var click = [contentStart,fileLoadStart,fileExport];
   var ho = icons.indexOf('fa-home');
   var tg = icons.indexOf('fa-tags');
   var ex = icons.indexOf('fa-excel');
   switch(a){//exceptions from standard behaviour depending on context a
      case 'Classify':
			var active = [0,1,0];
			title[tg] = 'Terug naar raadplegen taxonomie';
			break;
      case 'Consult':
			if (!$('searchresult') == false) if ($children($('searchresult')).length == 1) active[ex] = 1;
         break;
   }
   for (var b in icons){//add eventListeners and titles to all active icons or icons that can be activated
      var c = icons[b];
      $(c).parentNode.replaceChild($(c).cloneNode(false),$(c));//remove current eventListener from all icons
      switch(active[b]){
         case 0:
				$(c).style.color = 'grey';
            $(c).title = '';
            break;
         case 1:
				if ($(c).style.color != 'lightgreen') $(c).style.color = '';
            $click($(c),click[b]);
            $(c).title = title[b];
            break;
      }
   }
}