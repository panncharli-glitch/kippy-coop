const products = [
  { id: 1, name: 'Mekong Dawn — Pendant Lamp, Large',  price: 580, category: 'lamp',   tag: 'S/S 2025',  preorder: true  },
  { id: 2, name: 'Mekong Dawn — Pendant Lamp, Medium', price: 420, category: 'lamp',   tag: 'S/S 2025',  preorder: true  },
  { id: 3, name: 'Monsoon Quiet — Table Lamp',         price: 380, category: 'lamp',   tag: 'A/W 2025',  preorder: true  },
  { id: 4, name: 'Eggshell Writing Paper — Set of 20', price: 48,  category: 'paper',  tag: 'In Stock',  preorder: false },
  { id: 5, name: 'Eggshell Art Sheet — A3',            price: 28,  category: 'paper',  tag: 'In Stock',  preorder: false },
  { id: 6, name: 'Old Quarter — Hanging Orb',          price: 650, category: 'lamp',   tag: 'Sold Out',  preorder: false },
  { id: 7, name: 'Shell Incense Holder',               price: 85,  category: 'object', tag: 'In Stock',  preorder: false },
  { id: 8, name: 'Eggshell Tray — Small',             price: 120, category: 'object', tag: 'Pre-order', preorder: true  },
];

let filteredProducts = [...products];
let currentFilter = 'all';
let currentSort = 'default';

function renderHomeProducts() {
  const el = document.getElementById('home-products');
  el.innerHTML = products.slice(0, 4).map(p => `
    <div class="product-card" onclick="openPreorder('${p.name}')">
      <div class="product-img">
        <div class="product-visual ${p.category === 'lamp' ? 'lamp' : ''}"></div>
      </div>
      <div class="product-info">
        <div class="product-tag">${p.tag}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">$${p.price.toFixed(2)}</div>
      </div>
    </div>`).join('');
}

function renderShop() {
  const el = document.getElementById('shop-grid');
  let list = [...filteredProducts];
  if (currentSort === 'low')  list.sort((a, b) => a.price - b.price);
  if (currentSort === 'high') list.sort((a, b) => b.price - a.price);
  el.innerHTML = list.map(p => `
    <div class="shop-item">
      <div class="shop-img">
        <div class="product-visual ${p.category === 'lamp' ? 'lamp' : ''}"></div>
        ${p.preorder ? '<span style="position:absolute;top:1rem;left:1rem" class="pre-badge">Pre-order</span>' : ''}
      </div>
      <div class="shop-info">
        <div class="shop-name">${p.name}</div>
        <div class="shop-price">$${p.price.toFixed(2)}</div>
        ${p.preorder
          ? `<div class="preorder-note">Min. 5 units · <span style="cursor:pointer;text-decoration:underline" onclick="openPreorder('${p.name}')">Request batch</span></div>`
          : `<button class="btn btn-dark" style="width:100%;margin-top:.5rem;font-size:.68rem;padding:.6rem" onclick="addToCart()">Add to Cart</button>`
        }
      </div>
    </div>`).join('');
}

function filterShop(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filteredProducts = cat === 'all' ? [...products] : products.filter(p => p.category === cat);
  renderShop();
}

function sortShop(val) {
  currentSort = val;
  renderShop();
}

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo(0, 0);
  const nav = document.getElementById('nav');
  if (page === 'home') {
    nav.classList.remove('scrolled');
  } else {
    nav.classList.add('scrolled');
  }
}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('open');
}

function addToCart() {
  const badge = document.getElementById('cart-badge');
  badge.textContent = parseInt(badge.textContent) + 1;
  toggleCart();
}

function openPreorder(name) {
  document.getElementById('modal-product-name').textContent = name;
  document.getElementById('preorder-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('preorder-modal').classList.remove('open');
}

function switchAuthTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('auth-signin').style.display = 'none';
  document.getElementById('auth-register').style.display = 'none';
  document.getElementById('auth-orders').style.display = 'none';
  document.getElementById('auth-' + tab).style.display = 'block';
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const activePage = document.querySelector('.page.active').id;
  if (activePage === 'page-home') {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});

// Init
renderHomeProducts();
renderShop();
