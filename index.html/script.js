// === ADD TO CART SYSTEM ===
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Mini cart preview
const miniCart = document.getElementById("mini-cart");
const miniCartItems = document.getElementById("mini-cart-items");
const miniCartTotal = document.getElementById("mini-cart-total");
const viewCartBtn = document.getElementById("view-cart-btn");

let cart = [];

// Handle Add to Cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".product1");
    const name = product.querySelector("h3").innerText;
    const priceText = product.querySelector(".price").innerText.replace(/[₱,]/g, "");
    const price = parseFloat(priceText);
    const image = product.querySelector("img").src;

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    updateCartUI();
    showMiniCart();
  });
});

// Update Cart UI
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  miniCartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    // Full cart modal item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>₱${item.price.toLocaleString()} × ${item.quantity}</p>
        </div>
      </div>
      <div class="cart-item-actions">
        <button class="remove-item" data-index="${index}">✖</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);

    // Mini cart item
    const miniItem = document.createElement("div");
    miniItem.classList.add("mini-cart-item");
    miniItem.innerHTML = `${item.name} × ${item.quantity}`;
    miniCartItems.appendChild(miniItem);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: ₱${total.toLocaleString()}`;
  miniCartTotal.textContent = `Total: ₱${total.toLocaleString()}`;
  cartCount.textContent = cart.length;

  // Add remove event listeners
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCartUI();
    });
  });
}

// Show Mini Cart (stay open)
function showMiniCart() {
  miniCart.style.display = "flex";
}

// Hide Mini Cart if clicking outside
document.addEventListener("click", (e) => {
  if (
    !miniCart.contains(e.target) &&
    !cartBtn.contains(e.target) &&
    !e.target.classList.contains("add-to-cart")
  ) {
    miniCart.style.display = "none";
  }
});

// Toggle mini cart when clicking cart icon
cartBtn.addEventListener("click", () => {
  if (miniCart.style.display === "flex") {
    miniCart.style.display = "none";
  } else {
    miniCart.style.display = "flex";
  }
});

// View full cart modal from mini cart
viewCartBtn.addEventListener("click", () => {
  miniCart.style.display = "none";
  cartModal.style.display = "block";
});

// Close modal
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
});

// Clear Cart
clearCartBtn.addEventListener("click", () => {
  if (cart.length > 0 && confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    updateCartUI();
  }
});



// === FAVORITES SYSTEM ===
const favBtn = document.getElementById("fav-btn");
const favModal = document.getElementById("favorites");
const favItemsContainer = document.getElementById("fav-items");
const favCount = document.getElementById("fav-count");
const clearFavBtn = document.getElementById("clear-fav-btn");

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Update UI on load
updateFavoritesUI();

// Add to favorites when button clicked
document.querySelectorAll(".add-to-favorite").forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".product1");
    const name = product.querySelector("h3").innerText;
    const image = product.querySelector("img").src;
    const price = product.querySelector(".price").innerText;

    // Check if already added
    if (favorites.some((item) => item.name === name)) {
      alert("Already in Favorites 💖");
      return;
    }

    favorites.push({ name, image, price });
    saveFavorites();
    updateFavoritesUI();
  });
});

// Function to update favorites list UI
function updateFavoritesUI() {
  favItemsContainer.innerHTML = "";

  if (favorites.length === 0) {
    favItemsContainer.innerHTML = `<p style="text-align:center;">No favorites yet 💔</p>`;
  } else {
    favorites.forEach((item, index) => {
      const favDiv = document.createElement("div");
      favDiv.classList.add("cart-item");
      favDiv.innerHTML = `
        <div class="cart-item-info">
          <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;">
          <div>
            <h4>${item.name}</h4>
            <p>${item.price}</p>
          </div>
        </div>
        <div class="cart-item-actions">
          <button class="remove-fav" data-index="${index}">✖</button>
        </div>
      `;
      favItemsContainer.appendChild(favDiv);
    });
  }

  // Update count
  favCount.textContent = favorites.length;

  // Remove favorite item
  document.querySelectorAll(".remove-fav").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      favorites.splice(index, 1);
      saveFavorites();
      updateFavoritesUI();
    });
  });
}

// Save favorites to localStorage
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Open favorites modal
favBtn.addEventListener("click", () => {
  favModal.style.display = "block";
});

// Close modal
favModal.querySelector(".close").addEventListener("click", (e) => {
  e.preventDefault();
  favModal.style.display = "none";
});

// Clear all favorites
clearFavBtn.addEventListener("click", () => {
  if (favorites.length > 0 && confirm("Clear all favorites?")) {
    favorites = [];
    saveFavorites();
    updateFavoritesUI();
  }
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === favModal) {
    favModal.style.display = "none";
  }
});

// Menu Toggle Functionality
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
    navList.classList.remove('active');
    menuToggle.classList.remove('active');
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
      dropdown.classList.remove('active');
    });
  }
});

// Handle navigation links and dropdowns
const navLinks = navList.querySelectorAll('a');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // Handle dropdown toggle on mobile
    if (link.classList.contains('dropbtn') && window.innerWidth <= 768) {
      e.preventDefault(); // Prevent navigation for dropdown button
      const dropdown = link.parentElement;
      dropdown.classList.toggle('active');
    } else {
      // Close menu and scroll to section
      navList.classList.remove('active');
      menuToggle.classList.remove('active');
      document.querySelectorAll('.dropdown').forEach((dropdown) => {
        dropdown.classList.remove('active');
      });

      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault(); // Prevent default anchor behavior
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  });
});

// PRODUCT FILTERS & SORTING (THEMED & RESPONSIVE)
document.addEventListener('DOMContentLoaded', function () {
  const products = document.querySelectorAll('.product1');
  const searchInput = document.getElementById('search-input');
  const brandFilter = document.getElementById('brand-filter');
  const sortPrice = document.getElementById('sort-price');
  const clearBtn = document.getElementById('clear-filters');
  const menuGrid = document.querySelector('.menu-grid');

  function filterAndSort() {
    let filtered = Array.from(products);

    // Search
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(p => {
        const title = p.querySelector('h3').textContent.toLowerCase();
        return title.includes(searchTerm);
      });
    }

    // Brand
    const brand = brandFilter.value;
    if (brand !== 'all') {
      filtered = filtered.filter(p => {
        const title = p.querySelector('h3').textContent.toLowerCase();
        return title.includes(brand);
      });
    }

    // Sort
    const sort = sortPrice.value;
    if (sort === 'low' || sort === 'high') {
      filtered.sort((a, b) => {
        const priceA = parsePrice(a.querySelector('.price').textContent);
        const priceB = parsePrice(b.querySelector('.price').textContent);
        return sort === 'low' ? priceA - priceB : priceB - priceA;
      });
    }

    // Update Grid
    menuGrid.innerHTML = '';
    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding:40px; color:#999;">
          <p style="font-size:1.2rem; margin:0;">No products found.</p>
          <p style="font-size:0.9rem; margin-top:8px; color:#666;">Try adjusting your filters.</p>
        </div>`;
    } else {
      filtered.forEach(p => menuGrid.appendChild(p));
    }
  }

  function parsePrice(text) {
    return parseInt(text.replace('₱', '').replace(',', '').trim()) || 0;
  }

  // Events
  searchInput.addEventListener('input', filterAndSort);
  brandFilter.addEventListener('change', filterAndSort);
  sortPrice.addEventListener('change', filterAndSort);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    brandFilter.value = 'all';
    sortPrice.value = 'default';
    filterAndSort();
  });

  // Initial
  filterAndSort();
});


