// SetCurrentYear
document.getElementById("year").textContent = new Date().getFullYear();

// CapitalizeCategoryName'sFirstLetter
const capitalizedCategoryName = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// SetActiveClassToAllProductsButtonOnPageLoad
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("allProductsBtn").classList.add("active");
});

// LoadProductCategoryLevels
const loadProductCategoryLevels = () => {
  const url = "https://fakestoreapi.com/products/categories";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProductCategoryLevels(data));
};

// DisplayProductCategoryLevels
const displayProductCategoryLevels = (categories) => {
  //   console.log(categories); // DisplayedCategoriesSuccessfully

  // GetProductCategoryLevelsContainer
  const productCategoryLevelsContainer = document.getElementById(
    "productCategoryLevelContainer",
  );

  // ClearPreviousCategories
  productCategoryLevelsContainer
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.remove());

  // GetProductCategoryLevels
  categories.map((category) => {
    // CreateProductCategoryLevel
    const productCategoryLevel = document.createElement("div");

    // SetProductCategoryLevel
    productCategoryLevel.innerHTML = `
    <button class="bg-transparent hover:bg-primary border-2 border-primary text-primary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer category-btn"
    >
        ${capitalizedCategoryName(category)} 
    </button>
    `;

    // AppendProductCategoryLevelToContainer
    productCategoryLevelsContainer.append(productCategoryLevel);
  });
};

// LoadProductCategoryLevelsOnPageLoad
loadProductCategoryLevels();

// LoadProducts
const loadProducts = () => {
  const url = "https://fakestoreapi.com/products";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

// DisplayProducts
const displayProducts = (products) => {
  // console.log(products); // DisplayedProductsSuccessfully

  // GetProductsContainer
  const productsContainer = document.getElementById("productsContainer");

  // ClearPreviousProducts
  productsContainer.innerHTML = "";

  // GetProducts
  products.map((product) => {
    // CreateProductItem
    const productItem = document.createElement("div");

    // SetProductItem
    productItem.innerHTML = `
    <div class="shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
        <!-- ProductImage -->
        <div>
            <img
                src="${product.image}"
                alt="Product Image"
                class="w-full h-60 object-cover rounded-lg"
            />
        </div>

        <!-- ProductCategoryAndRatings -->
        <div class="flex justify-between mt-4">
            <span
                class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
                ${capitalizedCategoryName(product.category)}
            </span>
            <!-- Badge -->
            <p>
                <span class="text-orange-300">★</span> ${product.rating.rate}
            </p>
        </div>

        <!-- ProductTitle -->
        <h4 class="text-black/95 font-medium mt-2">${product.title}</h4>

        <!-- ProductPrice -->
        <p class="text-black/95 font-bold mt-1">${product.price}</p>

        <!-- ProductButtons -->
        <div class="flex justify-between">
            <button
                class="bg-white border-2 border-black/50 hover:border-transparent hover:bg-secondary hover:scale-110 px-6 py-3 rounded-lg mt-6 transition-all duration-300 cursor-pointer text-black/50 hover:text-white"
            >
                <i class="fa-solid fa-eye"></i> Details
            </button>
            <button
                class="bg-primary hover:bg-secondary hover:scale-110 px-6 py-3 rounded-lg mt-6 transition-all duration-300 cursor-pointer text-white"
            >
                <i class="fa-solid fa-cart-plus"></i> Add
            </button>
        </div>
    </div>
    `;

    // AppendProductItemToContainer
    productsContainer.append(productItem);
  });
};

// GetProductsByCategory
const getProductsByCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProducts(data)); // DisplayProductsByCategory
};

// DisplayProductsByCategory
const displayProductsByCategory = (category) => {
  getProductsByCategory(category);
};

// DisplayAllProductsOnAllButtonClick
document.getElementById("allProductsBtn").addEventListener("click", () => {
  // RemoveActiveCategoryClassFromAllButtons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Set All button active
  document.getElementById("allProductsBtn").classList.add("active");

  // LoadProductsOnPageLoad
  loadProducts();
});

// DisplayCategoryProductsOnCategoryButtonClick
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("category-btn")) {
    // RemoveActiveClassFromAllButtons
    document.getElementById("allProductsBtn").classList.remove("active");
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));

    // SetActiveClassToClickedCategoryButton
    event.target.classList.add("active");

    // DisplayClickedCategoryProducts
    const category = event.target.textContent.trim().toLowerCase();

    // DisplayProductsByCategory
    displayProductsByCategory(category);
  }
});

// ShopNow
function shopNow() {
  window.location.href = "./product/products.html";
}

// LoadProductsOnPageLoad
loadProducts();