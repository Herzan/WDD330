import{g as r,s as d,a as s,l as o,b as i}from"./utils-DreIoATk.js";import{E as c}from"./ExternalServices-DglhzZ9G.js";function n(t){return`<section class="product-detail"> <h3>${t.Brand.Name}</h3>
    <h2 class="divider">${t.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${t.Images.PrimaryLarge}"
      alt="${t.NameWithoutBrand}"
    />
    <p class="product-card__price">$${t.FinalPrice}</p>
    <p class="product__color">${t.Colors[0].ColorName}</p>
    <p class="product__description">
    ${t.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
    </div></section>`}class l{constructor(a,e){this.productId=a,this.product={},this.dataSource=e}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails("main"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))}addToCart(){let a=r("so-cart");a||(a=[]),a.push(this.product),d("so-cart",a),s(`${this.product.NameWithoutBrand} added to cart!`)}renderProductDetails(a){document.querySelector(a).insertAdjacentHTML("afterBegin",n(this.product))}}o();const u=new c("tents"),p=i("product"),m=new l(p,u);m.init();
