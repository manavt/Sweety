!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,o){return e||(e=window),o&&o.fn.dataTable||(o=require("datatables.net")(e,o).$),t(o,e,e.document)}:t(jQuery,window,document)}(function(t,e,o){"use strict";var r=t.fn.dataTable,n=function(e,o){if(!r.versionCheck||!r.versionCheck("1.10.8"))throw"DataTables RowReorder requires DataTables 1.10.8 or newer";this.c=t.extend(!0,{},r.defaults.rowReorder,n.defaults,o),this.s={bodyTop:null,dt:new r.Api(e),getDataFn:r.ext.oApi._fnGetObjectDataFn(this.c.dataSrc),middles:null,setDataFn:r.ext.oApi._fnSetObjectDataFn(this.c.dataSrc),start:{top:0,left:0,offsetTop:0,offsetLeft:0,nodes:[]},windowHeight:0},this.dom={clone:null};var s=this.s.dt.settings()[0],i=s.rowreorder;if(i)return i;s.rowreorder=this,this._constructor()};return t.extend(n.prototype,{_constructor:function(){var e=this,o=this.s.dt,r=t(o.table().node());"static"===r.css("position")&&r.css("position","relative"),t(o.table().container()).on("mousedown.rowReorder touchstart.rowReorder",this.c.selector,function(r){var n=t(this).closest("tr");if(o.row(n).any())return e._mouseDown(r,n),!1}),o.on("destroy.rowReorder",function(){t(o.table().container()).off(".rowReorder"),o.off(".rowReorder")})},_cachePositions:function(){var o=this.s.dt,r=t(o.table().node()).find("thead").outerHeight(),n=t.unique(o.rows({page:"current"}).nodes().toArray()),s=t.map(n,function(e){return t(e).position().top-r}),i=t.map(s,function(e,r){return s.length<r-1?(e+s[r+1])/2:(e+e+t(o.row(":last-child").node()).outerHeight())/2});this.s.middles=i,this.s.bodyTop=t(o.table().body()).offset().top,this.s.windowHeight=t(e).height()},_clone:function(e){var o=this.s.dt,r=t(o.table().node().cloneNode(!1)).addClass("dt-rowReorder-float").append("<tbody/>").append(e.clone(!1)),n=e.outerWidth(),s=e.outerHeight(),i=e.children().map(function(){return t(this).width()});r.width(n).height(s).find("tr").children().each(function(t){this.style.width=i[t]+"px"}),r.appendTo("body"),this.dom.clone=r},_clonePosition:function(t){var e,o=this.s.start,r=this._eventToPage(t,"Y")-o.top,n=this._eventToPage(t,"X")-o.left,s=this.c.snapX;e=!0===s?o.offsetLeft:"number"==typeof s?o.offsetLeft+s:n+o.offsetLeft,this.dom.clone.css({top:r+o.offsetTop,left:e})},_emitEvent:function(e,o){this.s.dt.iterator("table",function(r){t(r.nTable).triggerHandler(e+".dt",o)})},_eventToPage:function(t,e){return-1!==t.type.indexOf("touch")?t.originalEvent.touches[0]["page"+e]:t["page"+e]},_mouseDown:function(r,n){var s=this,i=this.s.dt,a=this.s.start,d=n.offset();a.top=this._eventToPage(r,"Y"),a.left=this._eventToPage(r,"X"),a.offsetTop=d.top,a.offsetLeft=d.left,a.nodes=t.unique(i.rows({page:"current"}).nodes().toArray()),this._cachePositions(),this._clone(n),this._clonePosition(r),this.dom.target=n,n.addClass("dt-rowReorder-moving"),t(o).on("mouseup.rowReorder touchend.rowReorder",function(t){s._mouseUp(t)}).on("mousemove.rowReorder touchmove.rowReorder",function(t){s._mouseMove(t)}),t(e).width()===t(o).width()&&t(o.body).addClass("dt-rowReorder-noOverflow")},_mouseMove:function(e){this._clonePosition(e);for(var r=this._eventToPage(e,"Y")-this.s.bodyTop,n=this.s.middles,s=null,i=this.s.dt,a=i.table().body(),d=0,l=n.length;d<l;d++)if(r<n[d]){s=d;break}if(null===s&&(s=n.length),null===this.s.lastInsert||this.s.lastInsert!==s){if(0===s)this.dom.target.prependTo(a);else{var c=t.unique(i.rows({page:"current"}).nodes().toArray());s>this.s.lastInsert?this.dom.target.before(c[s-1]):this.dom.target.after(c[s])}this._cachePositions(),this.s.lastInsert=s}var h=this._eventToPage(e,"Y")-o.body.scrollTop,u=this.s.scrollInterval;h<65?u||(this.s.scrollInterval=setInterval(function(){o.body.scrollTop-=5},15)):this.s.windowHeight-h<65?u||(this.s.scrollInterval=setInterval(function(){o.body.scrollTop+=5},15)):(clearInterval(u),this.s.scrollInterval=null)},_mouseUp:function(){var e,r,n=this.s.dt,s=this.c.dataSrc;this.dom.clone.remove(),this.dom.clone=null,this.dom.target.removeClass("dt-rowReorder-moving"),t(o).off(".rowReorder"),t(o.body).removeClass("dt-rowReorder-noOverflow"),clearInterval(this.s.scrollInterval),this.s.scrollInterval=null;var i=this.s.start.nodes,a=t.unique(n.rows({page:"current"}).nodes().toArray()),d={},l=[],c=[],h=this.s.getDataFn,u=this.s.setDataFn;for(e=0,r=i.length;e<r;e++)if(i[e]!==a[e]){var f=n.row(a[e]).id(),w=n.row(a[e]).data(),p=n.row(i[e]).data();f&&(d[f]=h(p)),l.push({node:a[e],oldData:h(w),newData:h(p),newPosition:e,oldPosition:t.inArray(a[e],i)}),c.push(a[e])}if(this._emitEvent("row-reorder",[l,{dataSrc:s,nodes:c,values:d,triggerRow:n.row(this.dom.target)}]),this.c.editor&&this.c.editor.edit(c,!1,{submit:"changed"}).multiSet(s,d).submit(),this.c.update){for(e=0,r=l.length;e<r;e++){u(n.row(l[e].node).data(),l[e].newData),n.columns().every(function(){this.dataSrc()===s&&n.cell(l[e].node,this.index()).invalidate("data")})}n.draw(!1)}}}),n.defaults={dataSrc:0,editor:null,selector:"td:first-child",snapX:!1,update:!0},n.version="1.1.0",t.fn.dataTable.RowReorder=n,t.fn.DataTable.RowReorder=n,t(o).on("init.dt.dtr",function(e,o){if("dt"===e.namespace){var s=o.oInit.rowReorder,i=r.defaults.rowReorder;if(s||i){var a=t.extend({},s,i);!1!==s&&new n(o,a)}}}),n});