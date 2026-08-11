/* =============================================
   LA ART CAFE & PATISSERIE — APP.JS
   ============================================= */

'use strict';

const WA_NUMBER = '994559406018';
const PAGE_SCROLL_MAP = {};
let currentPage = 'home';
let currentModalProduct = null;
let currentVacancy = null;
let cart = [];

// ─── MENU PRODUCT IMAGE ─────────────────────
const PRODUCT_IMG = 'images/drink-hero.jpg';

// ─── MENU DATA ────────────────────────────────

const menuData = {
  espresso: [
    { id: 'e1',  name: 'Americano',        desc: 'Klassik espresso suyu ilə seyreltilmiş, güclü və aromatik qəhvə.', price: 6,  priceL: 7,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'e2',  name: 'Cappucino',        desc: 'Espresso, isti süd və qalın süd köpüyü ilə hazırlanmış klassik kafe içkisi.', price: 7,  priceL: 8.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'e3',  name: 'Flat White',       desc: 'Espresso üzərinə incə süd köpüyü ilə servis edilən yüngül latte.', price: 7,  priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'e4',  name: 'Cortado',          desc: 'Espresso ilə bərabər miqdarda isti süd qarışığından ibarət balanslaşdırılmış içki.', price: 6.5,priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'e5',  name: 'Ristretto',        desc: 'Standart espressodan daha az su ilə hazırlanmış, intensiv dadlı qəhvə.', price: 6,  priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'e6',  name: 'Espresso',         desc: 'Xalis, güclü və aromatik klassik espresso.', price: 4.5,priceL: 5.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'e7',  name: 'Lungo',            desc: 'Uzun espresso — daha çox su ilə yumşaldılmış, aromatik qəhvə.', price: 5.5,priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'e8',  name: 'Raf Coffee',       desc: 'Espresso, krem və şəkər tozu ilə hazırlanmış yumşaq raf qəhvəsi.', price: 8,  priceL: 9,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'e9',  name: 'Latte',            desc: 'Espresso üzərinə bol isti süd ilə hazırlanmış yüngül və kremli içki.', price: 7,  priceL: 8.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'e10', name: 'Espresso Macciato',desc: 'Espresso üzərinə az miqdarda süd köpüyü ilə servis edilən qısa içki.', price: 6.5,priceL: null, weight: 'M',    img: PRODUCT_IMG }
  ],
  matcha: [
    { id: 'm1', name: 'Matcha Latte',        desc: 'Premium yapon matcha çayı, isti süd ilə hazırlanmış kremlı içki.', price: 9,  priceL: 10, weight: 'M / L', img: PRODUCT_IMG },
    { id: 'm2', name: 'Matcha Latte (Soyuq)',desc: 'Soyuq süd üzərinə matcha tozu ilə hazırlanmış serinlədici içki.', price: 9,  priceL: 10, weight: 'M / L', img: PRODUCT_IMG },
    { id: 'm3', name: 'Matcha Kokteyl',      desc: 'Matcha əsaslı, xüsusi hazırlanmış serinlədici kokteyl.', price: 11, priceL: null, weight: 'M',    img: PRODUCT_IMG }
  ],
  milkshake: [
    { id: 'ms1', name: 'Vanilli Milkshake',   desc: 'Klassik vanil dondurmadan hazırlanmış qalın milkşeyk.', price: 8.5, priceL: null, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'ms2', name: 'Şokoladlı Milkshake', desc: 'Zəngin şokolad dondurmadan hazırlanmış dadlı milkşeyk.', price: 8.5, priceL: null, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'ms3', name: 'Çiyələkli Milkshake', desc: 'Təzə çiyələk ilə hazırlanmış meyvəli milkşeyk.', price: 8.5, priceL: null, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'ms4', name: 'Snikers Milkshake',   desc: 'Snikers şokoladından ilham alan qalın milkşeyk.', price: 8.5, priceL: null, weight: 'Stəkan', img: PRODUCT_IMG }
  ],
  special: [
    { id: 'sp1', name: 'Şəkərbura Raf',  desc: 'Azərbaycan milli tatlısından ilham alan xüsusi şəkərbura aromalı raf qəhvəsi.', price: 9,   priceL: 10,   weight: 'M / L', img: PRODUCT_IMG, badge: 'Spesial' },
    { id: 'sp2', name: 'Tiramisu Raf',   desc: 'İtalyan tiramisu aromalı, maskarpone ilhamlı xüsusi raf qəhvəsi.', price: 9,   priceL: 10,   weight: 'M / L', img: PRODUCT_IMG, badge: 'Spesial' },
    { id: 'sp3', name: 'Konyak Raf',     desc: 'Konyak ətriyyatlı xüsusi raf qəhvəsi, qeyri-adi dadlar üçün.', price: 9,   priceL: 10,   weight: 'M / L', img: PRODUCT_IMG, badge: 'Spesial' },
    { id: 'sp4', name: 'Spesial Frappe', desc: 'La Art\'ın özünəməxsus spesial frappe resepti, buzlu kremli içki.', price: 9.5, priceL: 10.5, weight: 'M / L', img: PRODUCT_IMG, badge: 'Populyar' }
  ],
  cold: [
    { id: 'c1',  name: 'Iced Americano',    desc: 'Buzlu su üzərinə espresso ilə hazırlanmış serinlədici iced americano.', price: 6,   priceL: 7,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'c2',  name: 'Iced Latte',        desc: 'Buzlu süd üzərinə espresso ilə hazırlanmış kremlı iced latte.', price: 7,   priceL: 8.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'c3',  name: 'Iced Mocha',        desc: 'Buzlu süd, espresso və şokolad siropundan hazırlanmış iced mocha.', price: 8,   priceL: 9,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'c4',  name: 'Raf Iced',          desc: 'Buzlu kremli raf qəhvəsi — serinlədici versiyada.', price: 8,   priceL: 9.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'c5',  name: 'Spanish Latte',     desc: 'Kondenslənmiş süd ilə hazırlanmış spesial ispan lattesi.', price: 8.5, priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'c6',  name: 'Mango Iced Tea',    desc: 'Tropik mango aromalı serinlədici buzlu çay.', price: 7.5, priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'c7',  name: 'Şaftalı Iced Tea',  desc: 'Şirin şaftalı aromalı serinlədici buzlu çay.', price: 7.5, priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'c8',  name: 'Bergamot Iced Tea', desc: 'Earl Grey bergamot aromalı zərif buzlu çay.', price: 7.5, priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'c9',  name: 'Lemon Iced Tea',    desc: 'Klassik limon aromalı serinlədici buzlu çay.', price: 7.5, priceL: null, weight: 'M',    img: PRODUCT_IMG },
    { id: 'c10', name: 'Cola',              desc: 'Klassik Coca-Cola.', price: 3,   priceL: null, weight: 'Banka', img: PRODUCT_IMG },
    { id: 'c11', name: 'Fanta',             desc: 'Portağallı Fanta.', price: 3,   priceL: null, weight: 'Banka', img: PRODUCT_IMG },
    { id: 'c12', name: 'Sprite',            desc: 'Limonlu Sprite.', price: 3,   priceL: null, weight: 'Banka', img: PRODUCT_IMG },
    { id: 'c13', name: 'Sirab Premium',     desc: 'Premium mineral su.', price: 3.5, priceL: null, weight: 'Şüşə', img: PRODUCT_IMG },
    { id: 'c14', name: 'Redbull',           desc: 'Enerji içkisi Red Bull.', price: 6.5, priceL: null, weight: 'Banka', img: PRODUCT_IMG },
    { id: 'c15', name: 'Sandora',           desc: 'Sandora təbii meyve şirəsi.', price: 3,   priceL: null, weight: 'Qab', img: PRODUCT_IMG },
    { id: 'c16', name: 'Biscoff Chiller',   desc: 'Biscoff peçenye ilə hazırlanmış xüsusi buzlu içki.', price: 11,  priceL: 12.5, weight: 'M / L', img: PRODUCT_IMG, badge: 'Xüsusi' }
  ],
  hot: [
    { id: 'h1', name: 'Türk Qəhvəsi',  desc: 'Ənənəvi üsulla hazırlanmış Türk qəhvəsi.', price: 7,   priceL: null, weight: 'Fincan', img: PRODUCT_IMG },
    { id: 'h2', name: 'İsti Şokolad',  desc: 'Zəngin kakao ilə hazırlanmış qalın isti şokolad.', price: 8,   priceL: 9,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'h3', name: 'Ağ Şokolad',    desc: 'Kremli ağ şokoladdan hazırlanmış yüngül isti içki.', price: 8,   priceL: 9,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'h4', name: 'Sahlep',        desc: 'Ənənəvi sahlep tozu ilə hazırlanmış isti sevilən içki.', price: 7,   priceL: 8,    weight: 'M / L', img: PRODUCT_IMG },
    { id: 'h5', name: 'Choi Tea Latte', desc: 'Hind çayı ədviyyatları ilə hazırlanmış chai tea latte.', price: 6.5, priceL: 7.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'h6', name: 'Karamel Mocha', desc: 'Espresso, şokolad sirupu və karamel ilə hazırlanmış mocha.', price: 8.5, priceL: 9.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'h7', name: 'Mocha',         desc: 'Espresso, süd və şokolad siropundan hazırlanmış klassik mocha.', price: 7.5, priceL: 8.5,  weight: 'M / L', img: PRODUCT_IMG },
    { id: 'h8', name: 'Mocha Marble',  desc: 'Xüsusi mermer effektli iki rəngli mocha içkisi.', price: 8.5, priceL: 9.5,  weight: 'M / L', img: PRODUCT_IMG, badge: 'Xüsusi' }
  ],
  lemonade: [
    { id: 'l1',  name: 'Feyxoa Maxito',    desc: 'Tropik feyxoa aromalı təzə limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l2',  name: 'Grapefruit Aloe',  desc: 'Qreypfrut və aloe vera ilə hazırlanmış sağlam limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l3',  name: 'Mango Marakuya',   desc: 'Mango və marakuya (passion fruit) ilə tropik limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l4',  name: 'Qaragilə Quaranna',desc: 'Qaragilə və quaranna ilə hazırlanmış enerji verən limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l5',  name: 'Albalı Masala',    desc: 'Albalı və hindistan ədviyyatları ilə ekzotik limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l6',  name: 'Alma Kivi',        desc: 'Alma və kivi ilə hazırlanmış serinlədici limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l7',  name: 'Kaktus Zirinc',    desc: 'Kaktus meyvəsi və zirincvari limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l8',  name: 'Tərxun',           desc: 'Ənənəvi tərxun (estragon) ilə hazırlanmış klassik limonad.', price: 8.5, weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l9',  name: 'Moxito Sada',      desc: 'Klassik nane-limon mojito limonad.', price: 9,   weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l10', name: 'Moxito Çiyələk',   desc: 'Çiyələk ilə zənginləşdirilmiş serinlədici mojito limonad.', price: 9,   weight: 'Stəkan', img: PRODUCT_IMG },
    { id: 'l11', name: 'Moxito Energy',    desc: 'Enerji verən spesial mojito limonad.', price: 10,  weight: 'Stəkan', img: PRODUCT_IMG, badge: 'Enerji' }
  ]
};

const faqData = [
  { q: 'Sifariş vermək mümkündürmü?', a: 'Bəli! WhatsApp vasitəsilə sifariş verə bilərsiniz. Sifarişinizi hazırlayıb ünvanınıza çatdırarıq.' },
  { q: 'Rezervasiya üçün depozit tələb olunurmu?', a: 'Xeyr, rezervasiya tamamilə pulsuzdur. Sadəcə gəlmədiyiniz halda xəbər verməyinizi xahiş edirik.' },
  { q: 'Allergenləri nəzərə alırsınızmı?', a: 'Bəli, allergen məlumatlarını ciddi qəbul edirik. Sifarişinizi verərkən xüsusi tələblərinizi qeyd etdikdə barıstamız uyğun hazırlayacaq.' },
  { q: 'Ödəniş üsulları hansılardır?', a: 'Nağd pul, bank kartı (Kapital Bank, ABB, PASHA Bank) və onlayn ödəniş sistemləri qəbul edilir.' },
  { q: 'Korporativ sifarişlər mümkündürmü?', a: 'Bəli! Şirkətlər, tədbirlər və böyük qruplar üçün xüsusi menyu imkanlarımız mövcuddur. WhatsApp vasitəsilə bizimlə əlaqə saxlayın.' },
  { q: 'Restoranın iş saatları necədir?', a: 'B.E – Cümə: 09:00–22:00 | Şənbə: 09:00–23:00 | Bazar: 10:00–22:00.' },
  { q: 'Matcha nədir?', a: 'Matcha Japoniyadan gətirilən premium yaşıl çay tozudur. La Art-da ən keyfiyyətli matcha istifadə olunur.' },
  { q: 'Instagram-da izləyə bilərəmmi?', a: 'Əlbəttə! @la_art.az hesabını Instagram-da izlə, yeni içkiler və kampaniyaları izlə.' }
];

const vacanciesData = [
  {
    id: 'v1', icon: '☕', title: 'Barista',
    type: 'Tam Ştat',
    salary: '700 – 1100 AZN',
    schedule: 'Dəyişən növbə (2/2)',
    requirements: 'Ən az 6 ay barista təcrübəsi, qəhvə bilikləri',
    desc: 'La Art mütbəxinə peşəkar barista axtarırıq. Kreativlik, dəqiqlik və gülərüzlük vacibdir.',
    duties: 'İçkilərin hazırlanması, müştəri xidməti, ətriyyat nəzarəti'
  },
  {
    id: 'v2', icon: '🛵', title: 'Kuryer',
    type: 'Yarım / Tam Ştat',
    salary: '500 – 800 AZN + bonus',
    schedule: 'Çevik qrafik',
    requirements: 'Sürücülük vəsiqəsi (B kateqoriyası), Bakı ərazisinə bələdlik',
    desc: 'Sürətli, etibarlı kuryer işə qəbul edirik.',
    duties: 'Sifarişlərin vaxtında çatdırılması, müştəri ilə ünsiyyət'
  },
  {
    id: 'v3', icon: '👩‍💼', title: 'Kassir / Operator',
    type: 'Tam Ştat',
    salary: '600 – 900 AZN',
    schedule: 'Dəyişən növbə',
    requirements: 'Kompüter savadlılığı, ünsiyyət bacarığı, 18+ yaş',
    desc: 'Müştəri xidmətləri üzrə kassir/operator axtarırıq.',
    duties: 'Sifarişlərin qəbulu, ödəniş əməliyyatları, müştəri məmnuniyyəti'
  },
  {
    id: 'v4', icon: '🧹', title: 'Sanitar Texnik',
    type: 'Tam Ştat',
    salary: '500 – 650 AZN',
    schedule: 'Günlük',
    requirements: 'Gigiyena standartları bilikləri, fiziki hazırlıq',
    desc: 'Kafe sahəsinin gigiyena standartlarına uyğun saxlanılması üçün işçi axtarırıq.',
    duties: 'Kafe sahəsinin təmizliyi, sanitariya standartlarına riayət'
  }
];

// ─── PAGE NAVIGATION ───────────────────────────

function showPage(pageId) {
  const oldPage = document.getElementById('page-' + currentPage);
  if (oldPage) {
    PAGE_SCROLL_MAP[currentPage] = window.scrollY;
    oldPage.classList.remove('active');
  }
  currentPage = pageId;
  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;
  newPage.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
  const savedScroll = PAGE_SCROLL_MAP[pageId] || 0;
  window.scrollTo({ top: savedScroll, behavior: 'instant' });
}

function goBack() {
  PAGE_SCROLL_MAP[currentPage] = window.scrollY;
  showPage('home');
}

// ─── MOBILE MENU ───────────────────────────────

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  overlay.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── CART ─────────────────────────────────────

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  const backdrop = document.getElementById('cartBackdrop');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  backdrop.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  renderCart();
  bumpCartCount();
  showToast(`${product.name} səbətə əlavə edildi!`);
}

function addToCartFromModal() {
  if (!currentModalProduct) return;
  addToCart(currentModalProduct.id);
  closeProductModalBtn();
}

function findProduct(id) {
  for (const cat of Object.values(menuData)) {
    const found = cat.find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else renderCart();
}

function renderCart() {
  const itemsEl  = document.getElementById('cartItems');
  const emptyEl  = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const countEl  = document.getElementById('cartCount');
  const totalEl  = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  countEl.textContent = totalItems;
  totalEl.textContent = totalPrice.toFixed(2) + ' AZN';

  const isEmpty = cart.length === 0;
  emptyEl.style.display = isEmpty ? 'flex' : 'none';
  footerEl.style.display = isEmpty ? 'none' : 'block';

  itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.src='images/drink-hero.jpg'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(item.name)}</div>
        <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} AZN</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}',-1)" aria-label="Azalt">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}',1)" aria-label="Artır">+</button>
      </div>
    `;
    itemsEl.insertBefore(div, emptyEl);
  });
}

function bumpCartCount() {
  const el = document.getElementById('cartCount');
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

function sendOrder() {
  if (cart.length === 0) return;
  let msg = '☕ *YENİ SİFARİŞ — La Art Cafe & Patisserie*\n\n';
  msg += '━━━━━━━━━━━━━━━━━━━━\n';
  cart.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.name}\n   ${item.qty} × ${item.price} AZN = ${(item.qty * item.price).toFixed(2)} AZN\n`;
  });
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  msg += '━━━━━━━━━━━━━━━━━━━━\n';
  msg += `💰 *CƏMİ: ${total.toFixed(2)} AZN*\n\n`;
  msg += '📍 Ünvanınızı bildirin.';
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── MENU RENDERING ───────────────────────────

function getPriceLabel(item) {
  if (item.priceL != null) {
    return `${item.price} / ${item.priceL} AZN`;
  }
  return `${item.price} AZN`;
}

function renderMenuGrids() {
  Object.entries(menuData).forEach(([cat, items]) => {
    const grid = document.getElementById('grid-' + cat);
    if (!grid) return;
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', item.name);

      const badgeHtml = item.badge
        ? `<div class="menu-card-badge">${escHtml(item.badge)}</div>`
        : '';

      card.innerHTML = `
        <div class="menu-card-img">
          ${badgeHtml}
          <img src="${item.img}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.src='images/drink-hero.jpg'" />
        </div>
        <div class="menu-card-body">
          <div class="menu-card-name">${escHtml(item.name)}</div>
          <div class="menu-card-desc">${escHtml(item.desc)}</div>
          <div class="menu-card-footer">
            <span class="menu-card-price">${getPriceLabel(item)}</span>
            <button class="add-btn" onclick="event.stopPropagation();addToCart('${item.id}')" aria-label="Səbətə əlavə et">+</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openProductModal(item));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openProductModal(item); });
      grid.appendChild(card);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });
  document.querySelectorAll('.menu-section').forEach(s => {
    s.classList.toggle('active', s.id === 'tab-' + tabId);
  });
}

// ─── PRODUCT MODAL ────────────────────────────

function openProductModal(product) {
  currentModalProduct = product;
  document.getElementById('modalImg').src = product.img;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalPrice').textContent = getPriceLabel(product);
  document.getElementById('modalWeight').textContent = product.weight;
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal(e) {
  if (e.target === document.getElementById('productModal')) closeProductModalBtn();
}
function closeProductModalBtn() {
  document.getElementById('productModal').classList.remove('open');
  currentModalProduct = null;
  document.body.style.overflow = '';
}

// ─── FAQ ──────────────────────────────────────

function renderFaq() {
  const list = document.getElementById('faqList');
  faqData.forEach(item => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <div class="faq-q" onclick="toggleFaq(this)">
        <span>${escHtml(item.q)}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-a">
        <div class="faq-a-inner">${escHtml(item.a)}</div>
      </div>
    `;
    list.appendChild(el);
  });
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── VACANCIES ────────────────────────────────

function renderVacancies() {
  const grid = document.getElementById('vacancyGrid');
  vacanciesData.forEach(v => {
    const card = document.createElement('div');
    card.className = 'vacancy-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="vacancy-card-icon">${v.icon}</div>
      <div class="vacancy-card-title">${escHtml(v.title)}</div>
      <div class="vacancy-card-type">${escHtml(v.type)}</div>
      <div class="vacancy-card-desc">${escHtml(v.desc)}</div>
      <div class="vacancy-card-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    `;
    card.addEventListener('click', () => openVacancyModal(v));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openVacancyModal(v); });
    grid.appendChild(card);
  });
}

function openVacancyModal(v) {
  currentVacancy = v;
  document.getElementById('vacancyModalIcon').textContent = v.icon;
  document.getElementById('vacancyModalTitle').textContent = v.title;
  document.getElementById('vacancyModalType').textContent = v.type;
  document.getElementById('vacancyModalDetails').innerHTML = `
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">💰 Maaş:</span><span class="vacancy-detail-value">${escHtml(v.salary)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">⏰ Qrafik:</span><span class="vacancy-detail-value">${escHtml(v.schedule)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📋 Tələblər:</span><span class="vacancy-detail-value">${escHtml(v.requirements)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📝 Vəzifələr:</span><span class="vacancy-detail-value">${escHtml(v.duties)}</span></div>
  `;
  document.getElementById('vacancyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVacancyModal(e) {
  if (e.target === document.getElementById('vacancyModal')) closeVacancyModalBtn();
}
function closeVacancyModalBtn() {
  document.getElementById('vacancyModal').classList.remove('open');
  currentVacancy = null;
  document.body.style.overflow = '';
}

function applyVacancy() {
  if (!currentVacancy) return;
  const msg = `👋 *Vakansiyaya Müraciət — La Art Cafe & Patisserie*\n\n🔹 *Vəzifə:* ${currentVacancy.title}\n🔹 *İş rejimi:* ${currentVacancy.type}\n\nSalam! Bu vakansiya ilə maraqlanıram.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── RESERVATION ─────────────────────────────

function submitReservation(e) {
  e.preventDefault();
  const name   = document.getElementById('resName').value.trim();
  const phone  = document.getElementById('resPhone').value.trim();
  const date   = document.getElementById('resDate').value;
  const time   = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const note   = document.getElementById('resNote').value.trim();

  if (!name || !phone || !date || !time || !guests) {
    showToast('Zəhmət olmasa bütün məcburi xanaları doldurun!');
    return;
  }

  const formattedDate = formatDate(date);
  let msg = `📅 *REZERVASIYA — La Art Cafe & Patisserie*\n\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Ad, Soyad:* ${name}\n`;
  msg += `📞 *Telefon:* ${phone}\n`;
  msg += `📅 *Tarix:* ${formattedDate}\n`;
  msg += `⏰ *Saat:* ${time}\n`;
  msg += `👥 *Nəfər sayı:* ${guests}\n`;
  if (note) msg += `📝 *Qeyd:* ${note}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── GALLERY LIGHTBOX ─────────────────────────

function openLightbox(img) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── TOAST ────────────────────────────────────

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── UTILS ────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('az-AZ', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return dateStr; }
}

// ─── KEYBOARD ─────────────────────────────────

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('productModal').classList.contains('open')) closeProductModalBtn();
    else if (document.getElementById('vacancyModal').classList.contains('open')) closeVacancyModalBtn();
    else if (document.getElementById('lightbox').classList.contains('open')) closeLightbox();
    else if (document.getElementById('cartPanel').classList.contains('open')) toggleCart();
    else if (document.getElementById('mobileMenu').classList.contains('open')) toggleMenu();
  }
});

// ─── INIT ─────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderMenuGrids();
  renderFaq();
  renderVacancies();
  renderCart();

  const today = new Date().toISOString().split('T')[0];
  const resDate = document.getElementById('resDate');
  if (resDate) resDate.min = today;
});
