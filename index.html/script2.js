// Checkout → Open receipt
document.getElementById("checkout-btn").onclick = () => {
  document.getElementById("cart").style.display = "none";
  document.getElementById("receipt").style.display = "block";
};

// Make receipt
document.getElementById("gen").onclick = () => {
  let n = document.getElementById("name").value;
  let a = document.getElementById("addr").value;
  let e = document.getElementById("email").value;
  if (!n || !a || !e) return alert("Fill all!");

  let t = cart.reduce((s,i)=>s+i.price,0);
  document.getElementById("info").innerHTML = `<b>Name:</b> ${n}<br><b>Address:</b> ${a}<br><b>Email:</b> ${e}`;
  document.getElementById("items").innerHTML = cart.map(i=>`<p>${i.name} - ₱${i.price}</p>`).join("");
  document.getElementById("total").innerHTML = `<b>Total: ₱${t}</b>`;
  document.getElementById("form").style.display = "none";
  document.getElementById("show").style.display = "block";
};

// Close all modals
document.querySelectorAll(".modal-close-x, .close").forEach(x => x.onclick = e => {
  e.preventDefault();
  let m = x.closest(".modal");
  m.style.display = "none";
  if (m.id === "receipt") {
    document.getElementById("form").style.display = "block";
    document.getElementById("show").style.display = "none";
  }
});

// Close when click outside
window.onclick = e => { if (e.target.classList.contains("modal")) e.target.style.display = "none"; };

// Open cart
document.getElementById("cart-btn").onclick = () => document.getElementById("cart").style.display = "block";


// PRODUCT FILTERS & SORTING
document.addEventListener('DOMContentLoaded', function () {
  const products = document.querySelectorAll('.product1');
  const searchInput = document.getElementById('search-input');
  const brandFilter = document.getElementById('brand-filter');
  const sortPrice = document.getElementById('sort-price');
  const menuGrid = document.querySelector('.menu-grid');

  function filterAndSort() {
    let filtered = Array.from(products);

    // 1. Search Filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        return title.includes(searchTerm);
      });
    }

    // 2. Brand Filter
    const selectedBrand = brandFilter.value;
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        return title.includes(selectedBrand);
      });
    }

    // 3. Sort by Price
    const sortValue = sortPrice.value;
    if (sortValue === 'low') {
      filtered.sort((a, b) => {
        const priceA = parsePrice(a.querySelector('.price').textContent);
        const priceB = parsePrice(b.querySelector('.price').textContent);
        return priceA - priceB;
      });
    } else if (sortValue === 'high') {
      filtered.sort((a, b) => {
        const priceA = parsePrice(a.querySelector('.price').textContent);
        const priceB = parsePrice(b.querySelector('.price').textContent);
        return priceB - priceA;
      });
    }

    // Clear and re-append
    menuGrid.innerHTML = '';
    filtered.forEach(product => menuGrid.appendChild(product));

    // Show "No results" if empty
    if (filtered.length === 0) {
      menuGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#999; font-size:1.1rem;">No products found.</p>';
    }
  }

  // Helper: Convert "₱45,995" → 45995
  function parsePrice(priceText) {
    return parseInt(priceText.replace('₱', '').replace(',', ''));
  }

  // Event Listeners
  searchInput.addEventListener('input', filterAndSort);
  brandFilter.addEventListener('change', filterAndSort);
  sortPrice.addEventListener('change', filterAndSort);

  // Initial load
  filterAndSort();
});