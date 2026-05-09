import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 3199,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal",
  },
  {
    id: 3,
    name: "Premium Sneakers",
    category: "Fashion",
    price: 1899,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Minimal Desk Lamp",
    category: "Home",
    price: 999,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    badge: "New",
  },
  {
    id: 5,
    name: "Gaming Keyboard RGB",
    category: "Gaming",
    price: 1499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=900&q=80",
    badge: "Limited",
  },
  {
    id: 6,
    name: "Travel Backpack",
    category: "Fashion",
    price: 1299,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    badge: "Top Pick",
  },
  {
    id: 7,
    name: "Wireless Speaker",
    category: "Electronics",
    price: 2199,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    badge: "Deal",
  },
  {
    id: 8,
    name: "Modern Coffee Maker",
    category: "Home",
    price: 2799,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80",
    badge: "Popular",
  },
];

const categories = ["All", "Electronics", "Fashion", "Home", "Gaming"];

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [liked, setLiked] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    upi: "",
    card: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || product.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = cartTotal > 0 && cartTotal < 2000 ? 99 : 0;
  const discount = cartTotal > 3000 ? 250 : 0;
  const finalTotal = cartTotal + deliveryCharge - discount;

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, value) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + value) } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleLike = (id) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
    setOrderPlaced(false);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-96 h-96 bg-orange-500/25 rounded-full blur-3xl" />
        <div className="absolute top-40 right-[-80px] w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <header className="relative z-20 sticky top-0 backdrop-blur-xl bg-slate-950/75 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-2xl">🛒</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">ShopNova</h1>
              <p className="text-xs text-slate-400 -mt-1">Modern store</p>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-1 max-w-xl mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-400/70 transition"
            />
          </div>

          <button className="hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 transition">
            ☰ Menu
          </button>

          <button onClick={() => setCartOpen(true)} className="relative px-4 py-3 rounded-2xl bg-orange-400 text-slate-950 font-bold hover:bg-orange-300 transition shadow-lg shadow-orange-400/20">
            🛒
            {cartCount > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-cyan-300 text-slate-950 text-xs w-6 h-6 rounded-full flex items-center justify-center font-black">
                {cartCount}
              </motion.span>
            )}
          </button>
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <section className="grid lg:grid-cols-2 gap-8 items-center py-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-400/15 text-orange-200 border border-orange-300/20 mb-5">
              ⚡ Mega sale is live
            </span>
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Shop smarter with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">modern</span> store.
            </h2>
            <p className="text-slate-300 text-lg mt-5 max-w-xl">
              A clean, animated and interactive e-commerce website for your CodeAlpha full stack internship task.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#products" className="px-6 py-4 rounded-2xl bg-white text-slate-950 font-black hover:scale-105 transition shadow-xl">
                Start Shopping
              </a>
              <button onClick={() => setCartOpen(true)} className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 font-bold hover:bg-white/15 transition">
                View Cart
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="rounded-[2rem] bg-white/10 border border-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <img className="rounded-[1.5rem] h-[420px] w-full object-cover" src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80" alt="Shopping" />
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -bottom-6 -left-4 bg-slate-900/90 border border-white/10 rounded-3xl p-5 shadow-xl backdrop-blur-xl">
              <p className="text-sm text-slate-400">Today Deal</p>
              <p className="text-2xl font-black">50% OFF</p>
            </motion.div>
          </motion.div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 my-8">
          {[
            { icon: "🚚", title: "Fast Delivery", text: "Quick and safe shipping" },
            { icon: "🔐", title: "Secure Payment", text: "Protected checkout" },
            { icon: "⭐", title: "Top Quality", text: "Best rated products" },
          ].map(({ icon, title, text }, index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="rounded-3xl bg-white/10 border border-white/10 p-6 backdrop-blur-xl">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="text-slate-400">{text}</p>
            </motion.div>
          ))}
        </section>

        <section id="products" className="py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-4xl font-black">Featured Products</h2>
              <p className="text-slate-400 mt-2">Search, filter, like and add products to cart.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-3 rounded-2xl font-bold transition whitespace-nowrap ${category === cat ? "bg-orange-400 text-slate-950" : "bg-white/10 hover:bg-white/15"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-400/70 transition"
            />
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.article
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-3xl bg-white/10 border border-white/10 overflow-hidden backdrop-blur-xl shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-56 w-full object-cover group-hover:scale-110 transition duration-500" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-400 text-slate-950 text-xs font-black">{product.badge}</span>
                    <button onClick={() => toggleLike(product.id)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/70 backdrop-blur flex items-center justify-center hover:scale-110 transition">
                      <span className="text-xl">{liked.includes(product.id) ? "❤️" : "🤍"}</span>
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-orange-200 font-bold">{product.category}</p>
                    <h3 className="text-lg font-black mt-1 min-h-[56px]">{product.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-2xl font-black">₹{product.price.toLocaleString("en-IN")}</p>
                      <p className="flex items-center gap-1 text-yellow-300 font-bold">⭐ {product.rating}</p>
                    </div>
                    <button onClick={() => addToCart(product)} className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 text-slate-950 font-black hover:scale-[1.03] transition shadow-lg shadow-orange-500/20">
                      Add to Cart
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 h-full w-full sm:w-[430px] bg-slate-950 border-l border-white/10 z-50 p-5 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-black">Your Cart</h2>
                  <p className="text-slate-400">{cartCount} items selected</p>
                </div>
                <button onClick={() => setCartOpen(false)} className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/15 flex items-center justify-center">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-auto space-y-4 pr-1">
                {cart.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center text-slate-400">
                    <div>
                      <div className="text-6xl mb-4 opacity-50">🛒</div>
                      <p>Your cart is empty.</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="rounded-3xl bg-white/10 border border-white/10 p-4 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <h3 className="font-black">{item.name}</h3>
                        <p className="text-orange-200 font-bold">₹{item.price.toLocaleString("en-IN")}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">−</button>
                            <span className="font-black">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">+</button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-200">🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-5 mt-5">
                <div className="flex items-center justify-between text-xl font-black mb-4">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <button onClick={openCheckout} className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 text-slate-950 font-black hover:scale-[1.02] transition">
                  Proceed to Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-40" />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }} className="fixed inset-3 md:inset-8 z-50 overflow-auto rounded-[2rem] bg-slate-950 border border-white/10 shadow-2xl">
              <div className="sticky top-0 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black">Checkout</h2>
                  <p className="text-slate-400">Address, payment and order confirmation</p>
                </div>
                <button onClick={() => setCheckoutOpen(false)} className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/15">✕</button>
              </div>

              {orderPlaced ? (
                <div className="min-h-[520px] flex items-center justify-center p-6 text-center">
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg rounded-[2rem] bg-white/10 border border-white/10 p-8">
                    <div className="text-7xl mb-4">✅</div>
                    <h3 className="text-3xl font-black mb-3">Order Placed Successfully!</h3>
                    <p className="text-slate-300 mb-6">Your demo payment is completed. Order ID: <b>SN{Math.floor(Math.random() * 90000 + 10000)}</b></p>
                    <button onClick={() => setCheckoutOpen(false)} className="px-6 py-4 rounded-2xl bg-orange-400 text-slate-950 font-black">Continue Shopping</button>
                  </motion.div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6 p-5 md:p-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-[2rem] bg-white/10 border border-white/10 p-5">
                      <h3 className="text-xl font-black mb-4">1. Delivery Address</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Full Name" className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                        <input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="Phone Number" className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                        <input value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} placeholder="City" className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                        <input value={customer.pincode} onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })} placeholder="Pincode" className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                        <textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="Full Address" className="md:col-span-2 bg-slate-900/70 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400 min-h-[110px]" />
                      </div>
                    </div>

                    <div className="rounded-[2rem] bg-white/10 border border-white/10 p-5">
                      <h3 className="text-xl font-black mb-4">2. Payment Option</h3>
                      <div className="grid sm:grid-cols-3 gap-3 mb-5">
                        {["UPI", "Card", "Cash on Delivery"].map((method) => (
                          <button key={method} onClick={() => setPaymentMethod(method)} className={`p-4 rounded-2xl border font-black transition ${paymentMethod === method ? "bg-orange-400 text-slate-950 border-orange-300" : "bg-slate-900/70 border-white/10 hover:bg-white/15"}`}>
                            {method === "UPI" ? "📱" : method === "Card" ? "💳" : "💵"} {method}
                          </button>
                        ))}
                      </div>

                      {paymentMethod === "UPI" && (
                        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-5">
                          <label className="text-sm text-slate-400">Enter UPI ID</label>
                          <input value={customer.upi} onChange={(e) => setCustomer({ ...customer, upi: e.target.value })} placeholder="example@upi" className="mt-2 w-full bg-black/30 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                          <p className="text-xs text-slate-400 mt-3">Demo payment only. Real UPI needs Razorpay/Stripe backend integration.</p>
                        </div>
                      )}

                      {paymentMethod === "Card" && (
                        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-5 grid md:grid-cols-3 gap-4">
                          <input value={customer.card} onChange={(e) => setCustomer({ ...customer, card: e.target.value })} placeholder="Card Number" className="md:col-span-3 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                          <input placeholder="MM/YY" className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                          <input placeholder="CVV" className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                          <input placeholder="Name on Card" className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400" />
                        </div>
                      )}

                      {paymentMethod === "Cash on Delivery" && (
                        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-5">
                          <p className="font-bold">Cash on Delivery selected.</p>
                          <p className="text-slate-400 text-sm mt-1">Pay when your order is delivered.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-white/10 border border-white/10 p-5 h-fit sticky top-24">
                    <h3 className="text-xl font-black mb-4">Order Summary</h3>
                    <div className="space-y-4 max-h-72 overflow-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover" />
                          <div className="flex-1">
                            <p className="font-bold leading-tight">{item.name}</p>
                            <p className="text-sm text-slate-400">Qty: {item.qty}</p>
                          </div>
                          <p className="font-black">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 mt-5 pt-5 space-y-3">
                      <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between text-slate-300"><span>Delivery</span><span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span></div>
                      <div className="flex justify-between text-green-300"><span>Discount</span><span>-₹{discount}</span></div>
                      <div className="flex justify-between text-2xl font-black pt-3 border-t border-white/10"><span>Total</span><span>₹{finalTotal.toLocaleString("en-IN")}</span></div>
                    </div>
                    <button onClick={placeOrder} className="mt-5 w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-300 text-slate-950 font-black hover:scale-[1.02] transition">
                      Pay ₹{finalTotal.toLocaleString("en-IN")}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}