import{j as f}from"./jsx-runtime-cVIYwxC-.js";import"./iframe-BohxyJs9.js";const w="_btn_1wx57_1",_="_primary_1wx57_13",x="_secondary_1wx57_21",t={btn:w,primary:_,secondary:x},u=({label:y,onClick:b,variant:g="primary",disabled:v=!1})=>f.jsx("button",{className:`${t.btn} ${t[g]}`,onClick:b,disabled:v,children:y});u.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const S={title:"Components/Button",component:u,tags:["autodocs"],parameters:{docs:{description:{component:`
### Design Reference

[Figma Button UI Design System ↗](https://www.figma.com/community/file/769870685529936013/button-ui-design-system)

⚠️ Figma embedding is restricted in some environments (like VS Code Webview). Open it in a new tab to view.
        `}},viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"},type:"mobile"},tablet:{name:"Tablet",styles:{width:"768px",height:"1024px"},type:"tablet"}},defaultViewport:"mobile"}},argTypes:{onClick:{action:"clicked"},variant:{control:"radio",options:["primary","secondary"]}}},e={args:{label:"Primary Button",variant:"primary"}},a={args:{label:"Secondary Button",variant:"secondary"}},r={args:{label:"Disabled Button",variant:"primary",disabled:!0}};var n,s,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Primary Button',
    variant: 'primary'
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var i,m,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(l=(m=a.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var c,d,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const D=["Primary","Secondary","Disabled"];export{r as Disabled,e as Primary,a as Secondary,D as __namedExportsOrder,S as default};
