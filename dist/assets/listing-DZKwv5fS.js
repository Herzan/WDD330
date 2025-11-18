import{c as s,l as i,b as c}from"./utils-DreIoATk.js";import{E as n}from"./ExternalServices-DglhzZ9G.js";function o(t){return`<li class="product-card">
  <a href="/product_pages/index.html?product=${t.Id}">
  <img
    src="${t.Images.PrimaryMedium}"
    alt="Image of ${t.Name}"
  />
  <h3 class="card__brand">${t.Brand.Name}</h3>
  <h2 class="card__name">${t.Name}</h2>
  <p class="product-card__price">$${t.FinalPrice}</p></a>
</li>`}class l{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").innerHTML=this.category}renderList(e){s(o,this.listElement,e)}}i();const d=c("category"),m=new n,h=document.querySelector(".product-list"),u=new l(d,m,h);u.init();
