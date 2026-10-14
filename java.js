const { useState } = React;

const productData = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 2499, icon: "🎧", description: "Clear sound with comfortable wireless design." },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 3499, icon: "⌚", description: "Track fitness, time and daily activities." },
  { id: 3, name: "Running Shoes", category: "Fashion", price: 2999, icon: "👟", description: "Lightweight shoes for everyday running." },
  { id: 4, name: "Backpack", category: "Fashion", price: 1599, icon: "🎒", description: "Durable backpack for work and travel." },
  { id: 5, name: "Coffee Maker", category: "Home", price: 4299, icon: "☕", description: "Make fresh coffee quickly at home." },
  { id: 6, name: "Desk Lamp", category: "Home", price: 999, icon: "💡", description: "Modern LED lamp for your workspace." },
  { id: 7, name: "Sunglasses", category: "Fashion", price: 1299, icon: "🕶️", description: "Classic sunglasses with UV protection." },
  { id: 8, name: "Bluetooth Speaker", category: "Electronics", price: 1999, icon: "🔊", description: "Portable speaker with powerful audio." }
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const categories = ["All", ...new Set(productData.map(p => p.category))];

  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  function addToCart(product) {
    setCart(prev => [...prev, product]);
  }

  function removeFromCart(index) {
    setCart(prev => prev.filter((_, i) => i !== index));
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order placed successfully! Total: ₹${total.toLocaleString("en-IN")}`);
    setCart([]);
    setShowCart(false);
  }

  return React.createElement(
    React.Fragment,
    null,

    React.createElement("nav", { className: "navbar" },
      React.createElement("div", { className: "logo" }, "Shop", React.createElement("span", null, "Ease")),
      React.createElement("ul", { className: "nav-links" },
        React.createElement("li", null, React.createElement("a", { href: "#home" }, "Home")),
        React.createElement("li", null, React.createElement("a", { href: "#products" }, "Products")),
        React.createElement("li", null, React.createElement("a", { href: "#about" }, "About"))
      ),
      React.createElement("button", { className: "cart", onClick: () => setShowCart(!showCart) },
        `🛒 Cart (${cart.length})`
      )
    ),

    showCart && React.createElement("section", { className: "section", style: { background: "#fff3cd" } },
      React.createElement("h2", null, "Your Cart"),
      cart.length === 0
        ? React.createElement("p", null, "Your cart is empty.")
        : React.createElement("div", null,
            cart.map((item, index) =>
              React.createElement("p", { key: index, style: { padding: "8px 0" } },
                `${item.icon} ${item.name} — ₹${item.price.toLocaleString("en-IN")} `,
                React.createElement("button", {
                  onClick: () => removeFromCart(index),
                  style: { marginLeft: "10px", cursor: "pointer" }
                }, "Remove")
              )
            ),
            React.createElement("h3", { style: { marginTop: "15px" } },
              `Total: ₹${total.toLocaleString("en-IN")}`
            ),
            React.createElement("button", {
              className: "hero-btn",
              style: { marginTop: "15px" },
              onClick: checkout
            }, "Checkout")
          )
    ),

    React.createElement("main", null,
      React.createElement("section", { className: "hero", id: "home" },
        React.createElement("div", null,
          React.createElement("h1", null, "Shop Smart. Live Better."),
          React.createElement("p", null,
            "Discover quality products at great prices. This demo e-commerce website combines HTML, CSS, JavaScript and React."
          ),
          React.createElement("button", {
            className: "hero-btn",
            onClick: () => document.getElementById("products").scrollIntoView({ behavior: "smooth" })
          }, "Shop Now")
        ),
        React.createElement("div", { className: "hero-card" }, "🛍️")
      ),

      React.createElement("section", { className: "section", id: "products" },
        React.createElement("h2", { className: "section-title" }, "Featured Products"),

        React.createElement("div", { className: "controls" },
          React.createElement("input", {
            className: "search",
            type: "text",
            placeholder: "Search products...",
            value: search,
            onChange: e => setSearch(e.target.value)
          }),
          React.createElement("select", {
            className: "category",
            value: category,
            onChange: e => setCategory(e.target.value)
          },
            categories.map(cat => React.createElement("option", { key: cat, value: cat }, cat))
          )
        ),

        React.createElement("div", { className: "products" },
          filteredProducts.length === 0
            ? React.createElement("div", { className: "empty" }, "No products found.")
            : filteredProducts.map(product =>
                React.createElement("article", { className: "product", key: product.id },
                  React.createElement("div", { className: "product-image" }, product.icon),
                  React.createElement("div", { className: "product-info" },
                    React.createElement("h3", null, product.name),
                    React.createElement("p", null, product.description),
                    React.createElement("div", { className: "price" }, `₹${product.price.toLocaleString("en-IN")}`),
                    React.createElement("button", {
                      className: "add-btn",
                      onClick: () => addToCart(product)
                    }, "Add to Cart")
                  )
                )
              )
        )
      ),

      React.createElement("section", { className: "section", id: "about" },
        React.createElement("h2", { className: "section-title" }, "Why ShopEase?"),
        React.createElement("div", { className: "products" },
          React.createElement("div", { className: "card" }, "⚡ Fast shopping experience"),
          React.createElement("div", { className: "card" }, "🔒 Secure checkout concept"),
          React.createElement("div", { className: "card" }, "💰 Affordable products"),
          React.createElement("div", { className: "card" }, "📱 Responsive design")
        )
      )
    ),

    React.createElement("footer", { className: "footer" },
      "© 2026 ShopEase — Demo E-Commerce Website"
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
