const products = [
  {id:8,name:"METANFETAMINA",category:"drogas",price:570,stock:"sold",symbol:"M"},
  {id:9,name:"MACONHA",category:"drogas",price:570,stock:"sold",symbol:"C"},
  {id:10,name:"COCAÍNA",category:"drogas",price:570,stock:"sold",symbol:"C"},
];
const categories = ["drogas"];
const categoryNames = {drogas:"Drogas"};
let activeCategory = "drogas";
let cart = [];
const $ = s => document.querySelector(s);
const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

function renderCategories(){
  $("#categoryList").innerHTML = categories.map(c=>`<button class="category-button ${c===activeCategory?"selected":""}" data-category="${c}">${categoryNames[c]}</button>`).join("");
  document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;renderCategories();renderProducts()}));
}
function renderProducts(){
  const query=normalize($("#searchInput").value.trim());
  let visible=products.filter(p=>p.category===activeCategory&&normalize(p.name+" "+p.category).includes(query));
  const sort=$("#sortSelect").value;
  if(sort==="low") visible.sort((a,b)=>a.price-b.price);
  if(sort==="high") visible.sort((a,b)=>b.price-a.price);
  if(sort==="az") visible.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
  $("#resultsCount").textContent=`${visible.length} PRODUTO${visible.length===1?"":"S"}`;
  $("#emptyState").hidden=visible.length>0;
  $("#productGrid").innerHTML=visible.map(p=>{
    const stockLabel=p.stock==="sold"?"ESGOTADO":p.stock==="last"?"ÚLTIMAS UNIDADES":"DISPONÍVEL";
    const disabled=p.stock==="sold"?"disabled":"";
    return `<article class="product-card"><div class="product-visual"><span class="product-category">${categoryNames[p.category]}</span><span class="stock-badge ${p.stock==="sold"?"sold":""}">${stockLabel}</span><span class="product-symbol">${p.symbol}</span></div><div class="product-info"><h3>${p.name}</h3><p>${categoryNames[p.category]}</p><div class="product-bottom"><strong class="product-price">${money(p.price)}</strong><button class="add-button" data-add="${p.id}" aria-label="Adicionar ${p.name}" ${disabled}>+</button></div></div></article>`;
  }).join("");
  document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(Number(btn.dataset.add))));
}
function addToCart(id){
  const product=products.find(p=>p.id===id);if(!product||product.stock==="sold")return;
  const item=cart.find(i=>i.id===id);if(item)item.qty++;else cart.push({...product,qty:1});
  renderCart();showToast(`${product.name} adicionado ao carrinho.`);
}
function changeQty(id,delta){
  const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart();
}
function renderCart(){
  const count=cart.reduce((sum,i)=>sum+i.qty,0),total=cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  $("#cartCount").textContent=count;$("#cartTotal").textContent=money(total);
  $("#cartEmpty").style.display=cart.length?"none":"flex";$("#cartItems").innerHTML=cart.map(i=>`<div class="cart-row"><div><h4>${i.name}</h4><p>${money(i.price)} cada</p></div><div class="quantity"><button data-qty="${i.id}" data-delta="-1">−</button><span>${i.qty}</span><button data-qty="${i.id}" data-delta="1">+</button></div></div>`).join("");
  document.querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>changeQty(Number(b.dataset.qty),Number(b.dataset.delta))));
}
function openCart(){ $("#overlay").classList.add("show");$("#cartDrawer").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"; }
function closeCart(){ $("#overlay").classList.remove("show");$("#cartDrawer").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""; }
let toastTimer;
function showToast(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2400)}
$("#searchInput").addEventListener("input",renderProducts);
$("#sortSelect").addEventListener("change",renderProducts);
$("#openCart").addEventListener("click",openCart);
$("#closeCart").addEventListener("click",closeCart);
$("#overlay").addEventListener("click",closeCart);
$("#focusSearch").addEventListener("click",()=>$("#searchInput").focus());
$("#mobileMenu").addEventListener("click",()=>$(".desktop-nav").classList.toggle("open"));
$("#checkoutButton").addEventListener("click",()=>showToast(cart.length?"Checkout ainda precisa ser conectado ao seu sistema.":"Adicione produtos antes de continuar."));
$("#ordersInfo").addEventListener("click",()=>showToast("A área de pedidos será ativada com a integração do backend."));
$("#year").textContent=new Date().getFullYear();
renderCategories();renderProducts();renderCart();
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#searchInput").focus()}});
