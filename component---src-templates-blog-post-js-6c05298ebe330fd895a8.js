(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{150:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",function(){return h});a(34);var n=a(7),r=a.n(n),i=a(0),o=a.n(i),s=a(155),l=a(162),c=a(159),u=a(160),d=a(156),p=a(175),m=a.n(p),f=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t=this.props.data.markdownRemark,e=this.props.data.site.siteMetadata.title,a=this.props.data.site.siteMetadata.siteUrl,n=this.props.pageContext,r=n.previous,i=n.next;return o.a.createElement(c.a,{location:this.props.location,title:e},o.a.createElement(u.a,{title:t.frontmatter.title,description:t.excerpt}),o.a.createElement("h1",null,t.frontmatter.title),o.a.createElement("p",{style:Object.assign({},Object(d.b)(-.2),{display:"block",marginBottom:Object(d.a)(1),marginTop:Object(d.a)(-1)})},t.frontmatter.date),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}),o.a.createElement("hr",{style:{marginBottom:Object(d.a)(1)}}),o.a.createElement(l.a,null),o.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},o.a.createElement("li",null,r&&o.a.createElement(s.a,{to:r.fields.slug,rel:"prev"},"← ",r.frontmatter.title)),o.a.createElement("li",null,i&&o.a.createElement(s.a,{to:i.fields.slug,rel:"next"},i.frontmatter.title," →"))),o.a.createElement(m.a,{identifier:t.id,title:t.title,url:""+a+this.props.location.pathname}))},e}(o.a.Component);e.default=f;var h="2761936148"},155:function(t,e,a){"use strict";a.d(e,"b",function(){return u});var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=a(33),l=a.n(s);a.d(e,"a",function(){return l.a});a(157);var c=r.a.createContext({}),u=function(t){return r.a.createElement(c.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},156:function(t,e,a){"use strict";a.d(e,"a",function(){return l}),a.d(e,"b",function(){return c});var n=a(164),r=a.n(n),i=a(165),o=a.n(i);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var s=new r.a(o.a);var l=s.rhythm,c=s.scale},157:function(t,e,a){var n;t.exports=(n=a(158))&&n.default||n},158:function(t,e,a){"use strict";a.r(e);a(34);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=a(55),l=a(2),c=function(t){var e=t.location,a=l.default.getResourcesForPathnameSync(e.pathname);return a?r.a.createElement(s.a,Object.assign({location:e,pageResources:a},a.json)):null};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=c},159:function(t,e,a){"use strict";a(34);var n=a(7),r=a.n(n),i=a(0),o=a.n(i),s=a(155),l=a(156),c=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t,e=this.props,a=e.location,n=e.title,r=e.children;return t="/"===a.pathname?o.a.createElement("h1",{style:Object.assign({},Object(l.b)(1.5),{marginBottom:Object(l.a)(1.5),marginTop:0})},o.a.createElement(s.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)):o.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},o.a.createElement(s.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)),o.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(l.a)(24),padding:Object(l.a)(1.5)+" "+Object(l.a)(.75)}},o.a.createElement("header",null,t),o.a.createElement("main",null,r),o.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",o.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},e}(o.a.Component);e.a=c},160:function(t,e,a){"use strict";var n=a(161),r=a(0),i=a.n(r),o=a(4),s=a.n(o),l=a(166),c=a.n(l);function u(t){var e=t.description,a=t.lang,r=t.meta,o=t.keywords,s=t.title,l=n.data.site,u=e||l.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:s},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:u}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})}u.defaultProps={lang:"en",meta:[],keywords:[],description:""},u.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.arrayOf(s.a.object),keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},e.a=u},161:function(t){t.exports={data:{site:{siteMetadata:{title:"Tech Bites",description:"A peronal blog",author:"Mayuresh Waykole"}}}}},162:function(t,e,a){"use strict";var n=a(163),r=a(0),i=a.n(r),o=a(155),s=a(156);var l="4007731267";e.a=function(){return i.a.createElement(o.b,{query:l,render:function(t){var e=t.site.siteMetadata,a=e.author,n=e.social;return i.a.createElement("div",{style:{display:"flex",marginBottom:Object(s.a)(2.5)}},i.a.createElement("p",null,"Written by ",i.a.createElement("strong",null,a)," who lives and works in San Francisco building useful things."," ",i.a.createElement("a",{href:"https://twitter.com/"+n.twitter},"You should follow him on Twitter")))},data:n})}},163:function(t){t.exports={data:{avatar:null,site:{siteMetadata:{author:"Mayuresh Waykole",social:{twitter:"mayureshnw"}}}}}},175:function(t,e,a){"use strict";var n=a(8);e.__esModule=!0,e.default=void 0;var r=n(a(75)),i=n(a(7)),o=n(a(0)),s=n(a(4));a(151);var l=function(t){function e(e){var a;return(a=t.call(this,e)||this).state=e,a.shortname="mayureshnw-github-io",a}(0,i.default)(e,t);var a=e.prototype;return a.componentWillReceiveProps=function(t){this.setState(t)},a.componentWillMount=function(){if("undefined"!=typeof window&&window.document){var t=this;window.disqus_config=function(){this.page.identifier=t.state.identifier,this.page.title=t.state.title,this.page.url=t.state.url};var e=document.createElement("script");e.src="//"+this.shortname+".disqus.com/embed.js",e.async=!0,document.body.appendChild(e)}},a.render=function(){var t=this.props;return o.default.createElement("div",(0,r.default)({id:"disqus_thread"},t,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/index.js",lineNumber:36},__self:this}))},e}(o.default.Component);e.default=l,l.propTypes={identifier:s.default.string,title:s.default.string,url:s.default.string}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-6c05298ebe330fd895a8.js.map