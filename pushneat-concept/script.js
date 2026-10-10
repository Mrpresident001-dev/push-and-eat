const cart=[];
const money=n=>new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n);
const cartItems=document.getElementById('cartItems'), cartTotal=document.getElementById('cartTotal');
function renderCart(){
  if(!cart.length){cartItems.innerHTML='<p class="empty">Your basket is empty. Add something delicious.</p>';cartTotal.textContent='₦0';return;}
  cartItems.innerHTML=cart.map((item,i)=>`<div class="cart-row"><div><strong>${item.name}</strong><br><small>${money(item.price)}</small></div><div class="qty"><button onclick="changeQty(${i},-1)">−</button> ${item.qty} <button onclick="changeQty(${i},1)">+</button></div><strong>${money(item.price*item.qty)}</strong></div>`).join('');
  cartTotal.textContent=money(cart.reduce((sum,x)=>sum+x.price*x.qty,0));
}
function changeQty(i,delta){cart[i].qty+=delta;if(cart[i].qty<=0)cart.splice(i,1);renderCart()}
document.querySelectorAll('.add-btn').forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.name,price=Number(btn.dataset.price),found=cart.find(x=>x.name===name);found?found.qty++:cart.push({name,price,qty:1});renderCart();btn.textContent='Added ✓';setTimeout(()=>btn.textContent='Add +',900)}));
document.getElementById('clearCart').addEventListener('click',()=>{cart.length=0;renderCart()});
document.getElementById('checkoutBtn').addEventListener('click',()=>{if(!cart.length){alert('Please add an item first.');return}alert('Demo only: the next version can connect this order button to WhatsApp, a backend, or an online payment/order system.');});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('.food-card').forEach(card=>card.style.display=filter==='all'||card.dataset.category===filter?'block':'none')}));
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('formMessage').textContent='Demo message captured. A real version can send this to the business.';e.target.reset()});
document.getElementById('year').textContent=new Date().getFullYear();
renderCart();
