!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,s){return t||(t=window),s&&s.fn.dataTable||(s=require("datatables.net")(t,s).$),e(s,t,t.document)}:e(jQuery,window,document)}(function(e,t,s,i){"use strict";var n=e.fn.dataTable,a=function(t,s){if(!n.versionCheck||!n.versionCheck("1.10.8"))throw"KeyTable requires DataTables 1.10.8 or newer";this.c=e.extend(!0,{},n.defaults.keyTable,a.defaults,s),this.s={dt:new n.Api(t),enable:!0},this.dom={};var i=this.s.dt.settings()[0],l=i.keytable;if(l)return l;i.keytable=this,this._constructor()};return e.extend(a.prototype,{blur:function(){this._blur()},enable:function(e){this.s.enable=e},focus:function(e,t){this._focus(this.s.dt.cell(e,t))},focused:function(e){if(!this.s.lastFocus)return!1;var t=this.s.lastFocus.index();return e.row===t.row&&e.column===t.column},_constructor:function(){this._tabInput();var t=this,i=this.s.dt,n=e(i.table().node());"static"===n.css("position")&&n.css("position","relative"),e(i.table().body()).on("click.keyTable","th, td",function(){if(!1!==t.s.enable){var e=i.cell(this);e.any()&&t._focus(e)}}),e(s.body).on("keydown.keyTable",function(e){t._key(e)}),this.c.blurable&&e(s.body).on("click.keyTable",function(s){e(s.target).parents(".dataTables_filter").length&&t._blur(),e(s.target).parents().filter(i.table().container()).length||e(s.target).parents("div.DTE").length||t._blur()}),this.c.editor&&i.on("key.kt",function(e,s,i,n,a){t._editor(i,a)}),i.settings()[0].oFeatures.bStateSave&&i.on("stateSaveParams.keyTable",function(e,s,i){i.keyTable=t.s.lastFocus?t.s.lastFocus.index():null}),i.on("destroy.keyTable",function(){i.off(".keyTable"),e(i.table().body()).off("click.keyTable","th, td"),e(s.body).off("keydown.keyTable").off("click.keyTable")});var a=i.state.loaded();a&&a.keyTable?i.cell(a.keyTable).focus():this.c.focus&&i.cell(this.c.focus).focus()},_blur:function(){if(this.s.enable&&this.s.lastFocus){var t=this.s.lastFocus;e(t.node()).removeClass(this.c.className),this.s.lastFocus=null,this._emitEvent("key-blur",[this.s.dt,t])}},_columns:function(){var e=this.s.dt,t=e.columns(this.c.columns).indexes(),s=[];return e.columns(":visible").every(function(e){-1!==t.indexOf(e)&&s.push(e)}),s},_editor:function(t,s){var i=this.s.dt,n=this.c.editor;s.stopPropagation(),n.inline(this.s.lastFocus.index());var a=e("div.DTE input");a.length&&a[0].select(),i.keys.enable("navigation-only"),i.one("key-blur.editor",function(){n.displayed()&&n.submit()}),n.one("close",function(){i.keys.enable(!0),i.off("key-blur.editor")})},_emitEvent:function(t,s){this.s.dt.iterator("table",function(i){e(i.nTable).triggerHandler(t,s)})},_focus:function(i,n){var a=this,l=this.s.dt,o=l.page.info(),r=this.s.lastFocus;if(this.s.enable){if("number"!=typeof i){var c=i.index();n=c.column,i=l.rows({filter:"applied",order:"applied"}).indexes().indexOf(c.row),o.serverSide&&(i+=o.start)}if(-1!==o.length&&(i<o.start||i>=o.start+o.length))return void l.one("draw",function(){a._focus(i,n)}).page(Math.floor(i/o.length)).draw(!1);if(-1!==e.inArray(n,this._columns())){o.serverSide&&(i-=o.start);var u=l.cell(":eq("+i+")",n,{search:"applied"});if(r){if(r.node()===u.node())return;this._blur()}var f=e(u.node());f.addClass(this.c.className),this._scroll(e(t),e(s.body),f,"offset");var d=l.table().body().parentNode;if(d!==l.table().header().parentNode){var h=e(d.parentNode);this._scroll(h,h,f,"position")}this.s.lastFocus=u,this._emitEvent("key-focus",[this.s.dt,u]),l.state.save()}}},_key:function(t){if(this.s.enable&&!(0===t.keyCode||t.ctrlKey||t.metaKey||t.altKey)){var s=this.s.lastFocus;if(s){var i=this,n=this.s.dt;if(!this.c.keys||-1!==e.inArray(t.keyCode,this.c.keys))switch(t.keyCode){case 9:this._shift(t,t.shiftKey?"left":"right",!0);break;case 27:this.s.blurable&&!0===this.s.enable&&this._blur();break;case 33:case 34:t.preventDefault();var a=n.cells({page:"current"}).nodes().indexOf(s.node());n.one("draw",function(){var e=n.cells({page:"current"}).nodes();i._focus(n.cell(a<e.length?e[a]:e[e.length-1]))}).page(33===t.keyCode?"previous":"next").draw(!1);break;case 35:case 36:t.preventDefault();var l=n.cells({page:"current"}).indexes();this._focus(n.cell(l[35===t.keyCode?l.length-1:0]));break;case 37:this._shift(t,"left");break;case 38:this._shift(t,"up");break;case 39:this._shift(t,"right");break;case 40:this._shift(t,"down");break;default:!0===this.s.enable&&this._emitEvent("key",[n,t.keyCode,this.s.lastFocus,t])}}}},_scroll:function(e,t,s,i){var n=s[i](),a=s.outerHeight(),l=s.outerWidth(),o=t.scrollTop(),r=t.scrollLeft(),c=e.height(),u=e.width();n.top<o&&t.scrollTop(n.top),n.left<r&&t.scrollLeft(n.left),n.top+a>o+c&&t.scrollTop(n.top+a-c),n.left+l>r+u&&t.scrollLeft(n.left+l-u)},_shift:function(t,s,i){var n=this.s.dt,a=n.page.info(),l=a.recordsDisplay,o=this.s.lastFocus,r=this._columns();if(o){var c=n.rows({filter:"applied",order:"applied"}).indexes().indexOf(o.index().row);a.serverSide&&(c+=a.start);var u=n.columns(r).indexes().indexOf(o.index().column),f=c,d=r[u];"right"===s?u>=r.length-1?(f++,d=r[0]):d=r[u+1]:"left"===s?0===u?(f--,d=r[r.length-1]):d=r[u-1]:"up"===s?f--:"down"===s&&f++,f>=0&&f<l&&-1!==e.inArray(d,r)?(t.preventDefault(),this._focus(f,d)):i&&this.c.blurable?this._blur():t.preventDefault()}},_tabInput:function(){var t=this,s=this.s.dt,i=null!==this.c.tabIndex?this.c.tabIndex:s.settings()[0].iTabIndex;if(-1!=i){e('<div><input type="text" tabindex="'+i+'"/></div>').css({position:"absolute",height:1,width:0,overflow:"hidden"}).insertBefore(s.table().node()).children().on("focus",function(){t._focus(s.cell(":eq(0)",{page:"current"}))})}}}),a.defaults={blurable:!0,className:"focus",columns:"",editor:null,focus:null,keys:null,tabIndex:null},a.version="2.1.0",e.fn.dataTable.KeyTable=a,e.fn.DataTable.KeyTable=a,n.Api.register("cell.blur()",function(){return this.iterator("table",function(e){e.keytable&&e.keytable.blur()})}),n.Api.register("cell().focus()",function(){return this.iterator("cell",function(e,t,s){e.keytable&&e.keytable.focus(t,s)})}),n.Api.register("keys.disable()",function(){return this.iterator("table",function(e){e.keytable&&e.keytable.enable(!1)})}),n.Api.register("keys.enable()",function(e){return this.iterator("table",function(t){t.keytable&&t.keytable.enable(e===i||e)})}),n.ext.selector.cell.push(function(e,t,s){var n=t.focused,a=e.keytable,l=[];if(!a||n===i)return s;for(var o=0,r=s.length;o<r;o++)(!0===n&&a.focused(s[o])||!1===n&&!a.focused(s[o]))&&l.push(s[o]);return l}),e(s).on("preInit.dt.dtk",function(t,s){if("dt"===t.namespace){var i=s.oInit.keys,l=n.defaults.keys;if(i||l){var o=e.extend({},i,l);!1!==i&&new a(s,o)}}}),a});