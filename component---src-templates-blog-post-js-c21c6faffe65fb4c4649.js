(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{150:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",function(){return m});a(34);var n=a(7),r=a.n(n),A=a(0),i=a.n(A),o=a(155),s=a(162),l=a(159),c=a(160),u=a(156),d=a(175),p=a.n(d),f=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t=this.props.data.markdownRemark,e=this.props.data.site.siteMetadata.title,a=this.props.data.site.siteMetadata.siteUrl,n=this.props.pageContext,r=n.previous,A=n.next;return i.a.createElement(l.a,{location:this.props.location,title:e},i.a.createElement(c.a,{title:t.frontmatter.title,description:t.excerpt}),i.a.createElement("h1",null,t.frontmatter.title),i.a.createElement("p",{style:Object.assign({},Object(u.b)(-.2),{display:"block",marginBottom:Object(u.a)(1),marginTop:Object(u.a)(-1)})},t.frontmatter.date),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}),i.a.createElement("hr",{style:{marginBottom:Object(u.a)(1)}}),i.a.createElement(s.a,null),i.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},i.a.createElement("li",null,r&&i.a.createElement(o.a,{to:r.fields.slug,rel:"prev"},"← ",r.frontmatter.title)),i.a.createElement("li",null,A&&i.a.createElement(o.a,{to:A.fields.slug,rel:"next"},A.frontmatter.title," →"))),i.a.createElement(p.a,{identifier:t.id,title:t.title,url:""+a+this.props.location.pathname}))},e}(i.a.Component);e.default=f;var m="2761936148"},155:function(t,e,a){"use strict";a.d(e,"b",function(){return c});var n=a(0),r=a.n(n),A=a(4),i=a.n(A),o=a(33),s=a.n(o);a.d(e,"a",function(){return s.a});a(157);var l=r.a.createContext({}),c=function(t){return r.a.createElement(l.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};c.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},156:function(t,e,a){"use strict";a.d(e,"a",function(){return s}),a.d(e,"b",function(){return l});var n=a(164),r=a.n(n),A=a(165),i=a.n(A);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete i.a.googleFonts;var o=new r.a(i.a);var s=o.rhythm,l=o.scale},157:function(t,e,a){var n;t.exports=(n=a(158))&&n.default||n},158:function(t,e,a){"use strict";a.r(e);a(34);var n=a(0),r=a.n(n),A=a(4),i=a.n(A),o=a(55),s=a(2),l=function(t){var e=t.location,a=s.default.getResourcesForPathnameSync(e.pathname);return a?r.a.createElement(o.a,Object.assign({location:e,pageResources:a},a.json)):null};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},e.default=l},159:function(t,e,a){"use strict";a(34);var n=a(7),r=a.n(n),A=a(0),i=a.n(A),o=a(155),s=a(156),l=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t,e=this.props,a=e.location,n=e.title,r=e.children;return t="/"===a.pathname?i.a.createElement("h1",{style:Object.assign({},Object(s.b)(1.5),{marginBottom:Object(s.a)(1.5),marginTop:0})},i.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},i.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(s.a)(24),padding:Object(s.a)(1.5)+" "+Object(s.a)(.75)}},i.a.createElement("header",null,t),i.a.createElement("main",null,r),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},e}(i.a.Component);e.a=l},160:function(t,e,a){"use strict";var n=a(161),r=a(0),A=a.n(r),i=a(4),o=a.n(i),s=a(166),l=a.n(s);function c(t){var e=t.description,a=t.lang,r=t.meta,i=t.keywords,o=t.title,s=n.data.site,c=e||s.siteMetadata.description;return A.a.createElement(l.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:o},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:c}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})}c.defaultProps={lang:"en",meta:[],keywords:[],description:""},c.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.arrayOf(o.a.object),keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},e.a=c},161:function(t){t.exports={data:{site:{siteMetadata:{title:"Tech Bites",description:"A peronal blog",author:"Mayuresh Waykole"}}}}},162:function(t,e,a){"use strict";var n=a(163),r=a(0),A=a.n(r),i=a(155),o=a(156);var s="4007731267";e.a=function(){return A.a.createElement(i.b,{query:s,render:function(t){var e=t.site.siteMetadata,a=e.author,n=e.social;return A.a.createElement("div",{style:{display:"flex",marginBottom:Object(o.a)(2.5)}},A.a.createElement("p",null,"Written by ",A.a.createElement("strong",null,a)," who lives and works in San Francisco building useful things."," ",A.a.createElement("a",{href:"https://twitter.com/"+n.twitter},"You should follow him on Twitter")))},data:n})}},163:function(t){t.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAUBAgME/8QAFwEBAQEBAAAAAAAAAAAAAAAAAgEAA//aAAwDAQACEAMQAAABtTuWpVlGTeDJ0HAG/wD/xAAbEAACAgMBAAAAAAAAAAAAAAABAgMTABEjJP/aAAgBAQABBQJzpYGe3LyGZxGLsY+mY8Yzof/EABgRAAIDAAAAAAAAAAAAAAAAAAABEBIh/9oACAEDAQE/AcKjj//EABkRAAEFAAAAAAAAAAAAAAAAAAABEBIhMf/aAAgBAgEBPwGyQmN//8QAIBAAAQIFBQAAAAAAAAAAAAAAAQARAgMQEiExQWGBkf/aAAgBAQAGPwItqmMdwNLT4n2JbCwQU/Kl90//xAAaEAEAAwEBAQAAAAAAAAAAAAABABEhMUFR/9oACAEBAAE/IUVXGRfSl5yZEWkVrGwnd6EDTA+sdXqEbIVcO+k//9oADAMBAAIAAwAAABD76AH/xAAZEQACAwEAAAAAAAAAAAAAAAAAAREhMVH/2gAIAQMBAT8QhKbI9NMWH//EABkRAAIDAQAAAAAAAAAAAAAAAAABEBEhUf/aAAgBAgEBPxBNtovyBrT/xAAeEAEBAQACAQUAAAAAAAAAAAABEQAhMUFRYXGBkf/aAAgBAQABPxClwdnV04hQo4lO/wAzyyjjEGw+cZbkILxecbfXBH7zaeBntAmta2n5uEBbXZ4N/9k=",width:50,height:50,src:"/static/4f27694bd7811d13157e5e488ad64f43/c15d6/profile-pic.jpg",srcSet:"/static/4f27694bd7811d13157e5e488ad64f43/c15d6/profile-pic.jpg 1x,\n/static/4f27694bd7811d13157e5e488ad64f43/43c20/profile-pic.jpg 1.5x,\n/static/4f27694bd7811d13157e5e488ad64f43/da97e/profile-pic.jpg 2x,\n/static/4f27694bd7811d13157e5e488ad64f43/3e75a/profile-pic.jpg 3x"}}},site:{siteMetadata:{author:"Mayuresh Waykole",social:{twitter:"mayureshnw"}}}}}},175:function(t,e,a){"use strict";var n=a(8);e.__esModule=!0,e.default=void 0;var r=n(a(75)),A=n(a(7)),i=n(a(0)),o=n(a(4));a(151);var s=function(t){function e(e){var a;return(a=t.call(this,e)||this).state=e,a.shortname="mayureshnw-github-io",a}(0,A.default)(e,t);var a=e.prototype;return a.componentWillReceiveProps=function(t){this.setState(t)},a.componentWillMount=function(){if("undefined"!=typeof window&&window.document){var t=this;window.disqus_config=function(){this.page.identifier=t.state.identifier,this.page.title=t.state.title,this.page.url=t.state.url};var e=document.createElement("script");e.src="//"+this.shortname+".disqus.com/embed.js",e.async=!0,document.body.appendChild(e)}},a.render=function(){var t=this.props;return i.default.createElement("div",(0,r.default)({id:"disqus_thread"},t,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/index.js",lineNumber:36},__self:this}))},e}(i.default.Component);e.default=s,s.propTypes={identifier:o.default.string,title:o.default.string,url:o.default.string}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-c21c6faffe65fb4c4649.js.map