// =========================================
// LEGEND FITNESS — MAIN SCRIPT
// =========================================

import CartModule from './js/cart.js';
import { PRODUCTS, ACCESSORIES, CATEGORIES, filterByCategory, buildProductCard, formatPrice, getProductById } from './js/products.js';
import Utils from './js/utils.js';

window.CartModule = CartModule;

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  CartModule.updateBadges();
  Utils.initScrollReveal();

  const page = document.body.dataset.page;
  if (page === 'home')     initHomePage();
  if (page === 'cart')     initCartPage();
  if (page === 'product')  initProductPage();
  if (page === 'checkout') initCheckoutPage();
});

// ===== HEADER =====
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', Utils.throttle(() => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, 80), { passive: true });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const ham = document.querySelector('.header__hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!ham || !menu) return;
  ham.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ===== HOME PAGE =====
function initHomePage() {
  renderFilters();
  renderProducts('all');
  renderAccessories();
  initFilterButtons();
  initNewsletter();
  initCountdown();
  animateHero();
}

function animateHero() {
  document.querySelectorAll('.hero__inner > *').forEach((el, i) => {
    el.style.cssText = `opacity:0;transform:translateY(22px);transition:opacity 0.6s ease ${i*0.13}s,transform 0.6s ease ${i*0.13}s`;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 80);
  });
}

function renderAccessories() {
  const grid = document.getElementById('accessories-grid');
  if (!grid) return;
  grid.innerHTML = ACCESSORIES.map(acc => `
    <div class="accessory-card">
      <img class="accessory-card__img" src="${acc.image}" alt="${acc.name}" loading="lazy">
      <div class="accessory-card__name">${acc.name}</div>
    </div>
  `).join('');
}

function renderFilters() {
  const c = document.getElementById('product-filters');
  if (!c) return;
  c.innerHTML = CATEGORIES.map(cat => `
    <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
      ${cat.label} <span style="opacity:0.5;font-size:0.65em">(${cat.count})</span>
    </button>
  `).join('');
}

function renderProducts(category) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const products = filterByCategory(category);
  grid.innerHTML = products.map(p => buildProductCard(p, './')).join('');
}

function initFilterButtons() {
  const c = document.getElementById('product-filters');
  if (!c) return;
  c.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    c.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inp = form.querySelector('input[type=email]');
    if (!inp.value) return;
    Utils.showToast('Cadastro realizado! Bem-vindo à família Legend 🎉', 'success');
    inp.value = '';
  });
}

function initCountdown() {
  const endDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 45 * 60 * 1000);
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');
  if (!cdDays) return;

  function update() {
    const diff = endDate - Date.now();
    if (diff <= 0) return;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    cdDays.textContent = String(d).padStart(2, '0');
    cdHours.textContent = String(h).padStart(2, '0');
    cdMins.textContent = String(m).padStart(2, '0');
    cdSecs.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// ===== CART PAGE =====
function initCartPage() {
  const container = document.getElementById('cart-items');
  CartModule.renderCartItems(container);
  CartModule.renderSummary();

  let currentDiscount = 0;

  document.getElementById('apply-coupon')?.addEventListener('click', () => {
    const input = document.getElementById('coupon-input');
    const result = CartModule.applyCoupon(input?.value || '');
    if (result.valid) {
      currentDiscount = result.discount;
      CartModule.renderSummary(currentDiscount);
      Utils.showToast(result.message, 'success');
      if (input) input.style.borderColor = '#22c55e';
    } else {
      Utils.showToast(result.message, 'error');
      if (input) input.style.borderColor = 'var(--pink)';
    }
  });

  document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (confirm('Deseja limpar o carrinho?')) {
      CartModule.clearCart();
      CartModule.renderCartItems(container);
      CartModule.renderSummary();
    }
  });

  document.getElementById('go-checkout')?.addEventListener('click', () => {
    if (!CartModule.getCart().length) {
      Utils.showToast('Adicione produtos ao carrinho primeiro!', 'error');
      return;
    }
    window.location.href = './checkout.html';
  });
}

// ===== PRODUCT PAGE =====
function initProductPage() {
  const id = Utils.getParam('id');
  const product = getProductById(id);
  if (!product) {
    document.getElementById('product-detail')?.insertAdjacentHTML('beforeend',
      '<p style="color:var(--gray);padding:60px 0;text-align:center">Produto não encontrado.</p>'
    );
    return;
  }
  renderProductDetail(product);
  renderRelatedProducts(product);
}

function renderProductDetail(product) {
  const nameEl     = document.getElementById('product-name');
  const priceEl    = document.getElementById('product-price');
  const oldPriceEl = document.getElementById('product-old-price');
  const badgeEl    = document.getElementById('product-price-badge');
  const descEl     = document.getElementById('product-desc');
  const sizesEl    = document.getElementById('product-sizes');
  const emojiEl    = document.getElementById('product-emoji');
  const catEl      = document.getElementById('product-cat');
  const catBadgeEl = document.getElementById('product-cat-badge');
  const ratingEl   = document.getElementById('product-rating');
  const reviewsEl  = document.getElementById('product-reviews');
  const mainImgEl  = document.querySelector('.product-gallery__main');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = formatPrice(product.price);
  if (catEl) catEl.textContent = product.categoryLabel;
  if (catBadgeEl) catBadgeEl.textContent = product.categoryLabel;
  if (descEl) descEl.textContent = product.description;
  if (emojiEl) emojiEl.textContent = product.emoji;
  if (ratingEl) ratingEl.innerHTML = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  if (reviewsEl) reviewsEl.textContent = `${product.reviews} avaliações`;

  // Main image
  if (mainImgEl && product.image) {
    mainImgEl.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover">`;
  }

  if (oldPriceEl) {
    if (product.oldPrice) {
      oldPriceEl.textContent = formatPrice(product.oldPrice);
      oldPriceEl.style.display = '';
    } else oldPriceEl.style.display = 'none';
  }
  if (badgeEl) {
    if (product.oldPrice) {
      badgeEl.textContent = `-${Math.round((1 - product.price / product.oldPrice) * 100)}%`;
      badgeEl.style.display = '';
    } else badgeEl.style.display = 'none';
  }

  if (sizesEl) {
    sizesEl.innerHTML = product.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('');
    sizesEl.querySelector('.size-btn')?.classList.add('active');
    sizesEl.addEventListener('click', e => {
      const btn = e.target.closest('.size-btn');
      if (!btn) return;
      sizesEl.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  }

  const qtyEl = document.getElementById('product-qty');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qtyEl) qtyEl.textContent = Math.max(1, parseInt(qtyEl.textContent) - 1);
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    if (qtyEl) qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
  });

  document.getElementById('add-to-cart')?.addEventListener('click', function () {
    const size = sizesEl?.querySelector('.size-btn.active')?.dataset.size || 'M';
    const qty = parseInt(qtyEl?.textContent || '1');
    CartModule.addItem(product.id, size, product.colors[0], qty);
    const orig = this.textContent;
    this.textContent = '✓ Adicionado';
    this.style.background = '#1a6e38';
    setTimeout(() => { this.textContent = orig; this.style.background = ''; }, 2000);
  });
}

function renderRelatedProducts(product) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (!related.length) { grid.closest('section')?.remove(); return; }
  grid.innerHTML = related.map(p => buildProductCard(p, './')).join('');
}

// ===== CHECKOUT =====
function initCheckoutPage() {
  CartModule.renderSummary();

  const payOpts = document.querySelectorAll('.payment-option');
  payOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      payOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type=radio]').checked = true;
      const method = opt.querySelector('input').value;
      const cardFields = document.getElementById('card-fields');
      if (cardFields) cardFields.style.display = method === 'card' ? 'grid' : 'none';
    });
  });

  const form = document.getElementById('checkout-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.textContent = 'Processando...';
    btn.disabled = true;
    setTimeout(() => {
      CartModule.clearCart();
      document.body.innerHTML = `
        <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Oswald:wght@700&display=swap');</style>
        <div style="min-height:100vh;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:'Montserrat',sans-serif;gap:20px">
          <div style="font-size:5rem">✅</div>
          <h1 style="font-family:'Oswald',sans-serif;font-size:4rem;letter-spacing:0.06em;color:#fff;text-transform:uppercase">Pedido Confirmado!</h1>
          <p style="color:#888;font-size:1rem;max-width:440px;line-height:1.8">Seu pedido foi recebido com sucesso. Em breve você receberá um e-mail de confirmação com o código de rastreio.</p>
          <a href="./index.html" style="background:#e91e8c;color:#fff;padding:14px 36px;border-radius:2px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;font-size:0.8rem;text-decoration:none;margin-top:12px">Continuar Comprando</a>
        </div>`;
    }, 2000);
  });
}
