// ========================================
// NOTEME SHARED JAVASCRIPT
// ========================================

const $ = id => document.getElementById(id);

const peso = amount =>
    "₱" + Number(amount || 0).toLocaleString("en-PH");

const load = (key, defaultValue) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
    } catch {
        return defaultValue;
    }
};

const store = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};


// ========================================
// PRODUCT INFORMATION
// ========================================

const products = [
    {
        id: "planner",
        name: "Weekly Reset Planner",
        description: "A digital planner for weekly goals, priorities, habits, and reflections.",
        price: 149,
        color: "",
        category: "planning",
        categoryLabel: "Planning",
        coverLabel: "Weekly planning",
        coverMark: "01"
    },
    {
        id: "study",
        name: "Study Session Kit",
        description: "Study notes, revision planning, and progress tracking templates.",
        price: 99,
        color: "yellow",
        category: "study-school",
        categoryLabel: "Study & School",
        coverLabel: "Study essentials",
        coverMark: "A+"
    },
    {
        id: "creator",
        name: "Creator Business Bundle",
        description: "Templates for content planning, creative projects, and client organization.",
        price: 249,
        color: "peach",
        category: "business-money",
        categoryLabel: "Business & Money",
        coverLabel: "Creative business",
        coverMark: "✦"
    },
    {
        id: "journal",
        name: "Everyday Digital Journal",
        description: "A flexible digital journal for daily notes, thoughts, and ideas.",
        price: 129,
        color: "mint",
        category: "lifestyle",
        categoryLabel: "Lifestyle",
        coverLabel: "Daily reflections",
        coverMark: "♡"
    },
    {
        id: "budget",
        name: "Monthly Budget Tracker",
        description: "Track your expenses, savings, and monthly budget.",
        price: 119,
        category: "business-money",
        categoryLabel: "Business & Money",
        coverLabel: "Money planner",
        coverMark: "₱"
    },
    {
        id: "habit",
        name: "Habit Tracker Bundle",
        description: "Build consistent routines and monitor your daily habits.",
        price: 89,
        category: "lifestyle",
        categoryLabel: "Lifestyle",
        coverLabel: "Small steps, daily",
        coverMark: "✓"
    },
    {
        id: "notes",
        name: "Aesthetic Digital Notes",
        description: "Organized digital notes for school, work, and everyday ideas.",
        price: 99,
        category: "study-school",
        categoryLabel: "Study & School",
        coverLabel: "Notes & ideas",
        coverMark: "✎"
    },
    {
        id: "goals",
        name: "Goal Setting Workbook",
        description: "Plan your goals and break them into achievable steps.",
        price: 109,
        category: "planning",
        categoryLabel: "Planning",
        coverLabel: "Make it happen",
        coverMark: "02"
    },
    {
        id: "meal",
        name: "Meal Planner",
        description: "Organize your weekly meals and grocery lists.",
        price: 89,
        category: "lifestyle",
        categoryLabel: "Lifestyle",
        coverLabel: "Meals made simple",
        coverMark: "♡"
    },
    {
        id: "fitness",
        name: "Wellness Journal",
        description: "Keep track of your wellness routines and personal reflections.",
        price: 129,
        category: "lifestyle",
        categoryLabel: "Lifestyle",
        coverLabel: "A little wellbeing",
        coverMark: "✦"
    },
    {
        id: "content",
        name: "Content Calendar",
        description: "Plan and organize your social media content.",
        price: 149,
        category: "business-money",
        categoryLabel: "Business & Money",
        coverLabel: "Ideas on schedule",
        coverMark: "03"
    },
    {
        id: "resume",
        name: "Resume Template Kit",
        description: "Create organized and professional-looking resumes.",
        price: 99,
        category: "study-school",
        categoryLabel: "Study & School",
        coverLabel: "Your next chapter",
        coverMark: "A+"
    },
    {
        id: "finance",
        name: "Savings Challenge Kit",
        description: "Set savings goals and track your financial progress.",
        price: 79,
        category: "business-money",
        categoryLabel: "Business & Money",
        coverLabel: "Save with a plan",
        coverMark: "₱"
    },
    {
        id: "reading",
        name: "Reading Journal",
        description: "Record your reading progress, favorite books, and notes.",
        price: 89,
        category: "lifestyle",
        categoryLabel: "Lifestyle",
        coverLabel: "A good read",
        coverMark: "✧"
    },
    {
        id: "travel",
        name: "Travel Planner",
        description: "Organize itineraries, travel schedules, and trip expenses.",
        price: 119,
        category: "lifestyle",
        categoryLabel: "Lifestyle",
        coverLabel: "Plan your getaway",
        coverMark: "✈"
    },
    {
        id: "project",
        name: "Project Management Kit",
        description: "Manage tasks, deadlines, and project progress.",
        price: 179,
        category: "planning",
        categoryLabel: "Planning",
        coverLabel: "Project, sorted",
        coverMark: "✓"
    },
    {
        id: "presentation",
        name: "Presentation Template Kit",
        description: "Ready-to-use templates for school and professional presentations.",
        price: 159,
        category: "study-school",
        categoryLabel: "Study & School",
        coverLabel: "Present with ease",
        coverMark: "A+"
    },
    {
        id: "business",
        name: "Small Business Starter Kit",
        description: "Organize your small business tasks, products, and planning.",
        price: 199,
        category: "business-money",
        categoryLabel: "Business & Money",
        coverLabel: "Start something good",
        coverMark: "✦"
    },
    {
        id: "daily",
        name: "Daily Productivity Kit",
        description: "Stay organized with daily schedules, priorities, and task lists.",
        price: 139,
        category: "planning",
        categoryLabel: "Planning",
        coverLabel: "A focused day",
        coverMark: "04"
    },
    {
        id: "case-file",
        name: "Case File",
        description: "Digital notes and document templates designed to make organizing your schoolwork easier.",
        price: 149,
        category: "study-school",
        categoryLabel: "Study & School",
        coverLabel: "Case file",
        coverMark: "A+"
    }
];


// ========================================
// HAMBURGER MENU
// ========================================


document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) return;

    function closeMenu() {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = mainNav.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    document.addEventListener("click", function (event) {

        if (
            !menuToggle.contains(event.target) &&
            !mainNav.contains(event.target)
        ) {
            closeMenu();
        }

    });

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

});


// ========================================
// CART COUNTER
// ========================================

function updateCartCount() {
    const cart = load("notemeCart", []);

    const totalItems = cart.reduce((sum, item) => {
        return sum + Number(item.qty || 0);
    }, 0);

    document.querySelectorAll(".cart-count").forEach(counter => {
        counter.textContent = totalItems;
    });
}


// ========================================
// ADD TO CART
// ========================================

function addCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    addProductToCart(product);
}

function addProductToCart(product) {

    if (!window.notemeRequireAccount || !window.notemeRequireAccount()) return;

    const cart = load("notemeCart", []);

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty = Number(existing.qty || 0) + 1;
    } else {
        cart.push({
            ...product,
            qty: 1
        });
    }

    store("notemeCart", cart);

    updateCartCount();

    alert(product.name + " added to your cart!");
}


// ========================================
// HOMEPAGE ADD TO CART BUTTONS
// ========================================

document.querySelectorAll("[data-home-cart]").forEach(button => {

    button.addEventListener("click", () => {
        addCart(button.dataset.homeCart);
    });

});

// ========================================
// PRODUCT OVERVIEW PAGE
// ========================================

if ($("products")) {

    const productContainer = $("products");

    productContainer.innerHTML = products.map(product => `
        <article class="card">

            <div class="product-art ${product.color}">
                <div class="cover ${product.color}">
                    <small>NOTEME DIGITAL EDIT</small>
                    <strong>${product.name}</strong>
                    <span>Digital Template</span>
                </div>
            </div>

            <div class="card-body">

                <h3>${product.name}</h3>

                <p class="muted">${product.description}</p>

                <div class="price">${peso(product.price)}</div>

                <div class="card-actions">

                    <button data-overview="${product.id}">
                        View Details
                    </button>

                    <button data-cart="${product.id}">
                        Add to Cart +
                    </button>

                </div>

            </div>
        </article>
    `).join("");


    // VIEW PRODUCT DETAILS

    document.querySelectorAll("[data-overview]").forEach(button => {

        button.addEventListener("click", () => {

            const product = products.find(
                item => item.id === button.dataset.overview
            );

            if (!product || !$("detailContent") || !$("detailModal")) {
                return;
            }

            $("detailContent").innerHTML = `

                <div class="eyebrow">COMPLETE PRODUCT DETAILS</div>

                <h2 class="section-title">${product.name}</h2>

                <p class="muted">${product.description}</p>

                <div class="price">${peso(product.price)}</div>

                <h3>What's Included?</h3>

                <ul class="muted">
                    <li>Digital template access</li>
                    <li>Organized and easy-to-use pages</li>
                    <li>Designed for personal productivity</li>
                </ul>

                <button class="btn" id="detailAdd">
                    Add to Cart ↗
                </button>
            `;

            $("detailModal").classList.add("open");

            $("detailAdd").addEventListener("click", () => {
                addCart(product.id);
                $("detailModal").classList.remove("open");
            });

        });

    });


    // ADD TO CART BUTTONS

    document.querySelectorAll("[data-cart]").forEach(button => {

        button.addEventListener("click", () => {
            addCart(button.dataset.cart);
        });

    });


    // CLOSE PRODUCT DETAILS

    if ($("closeDetail")) {
        $("closeDetail").addEventListener("click", () => {
            $("detailModal")?.classList.remove("open");
        });
    }

}


// ========================================
// DESIGN CUSTOMIZATION
// ========================================

// SELECT TEMPLATE

document.querySelectorAll(".choose-template").forEach(button => {

    button.addEventListener("click", () => {

        if (!$("templateName")) return;

        $("templateName").value = button.dataset.template;

        $("templateName").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        $("palette")?.focus();

    });

});


// SUBMIT CUSTOMIZATION REQUEST

if ($("customForm")) {

    $("customForm").addEventListener("submit", event => {

        event.preventDefault();

        const requests = load("notemeCustomRequests", []);

        const request = {
            template: $("templateName")?.value || "",
            palette: $("palette")?.value || "",
            notes: $("customNotes")?.value || "",
            startingPrice: 199,
            date: new Date().toLocaleString()
        };

        requests.push(request);

        store("notemeCustomRequests", requests);

        if ($("customStatus")) {
            $("customStatus").textContent =
                "Your customization request has been submitted! Starting price: ₱199.";
        }

        event.target.reset();

    });

}


// ========================================
// CHECKOUT PAGE
// ========================================

function renderCheckout() {

    if (!$("checkoutItems")) return;

    const cart = load("notemeCart", []);

    $("checkoutItems").innerHTML = cart.map(product => `

        <tr>

            <td>
                <strong>${product.name}</strong>
            </td>

            <td>${product.description || ""}</td>

            <td>
                <input
                    type="number"
                    min="1"
                    value="${product.qty}"
                    data-qty="${product.id}"
                >
            </td>

            <td>${peso(product.price * product.qty)}</td>

            <td>
                <button type="button" data-remove="${product.id}">
                    Remove
                </button>
            </td>

        </tr>

    `).join("");


    if ($("emptyCart")) {
        $("emptyCart").hidden = cart.length > 0;
    }


    const total = cart.reduce((sum, product) => {
        return sum + Number(product.price) * Number(product.qty);
    }, 0);

    if ($("grandTotal")) {
        $("grandTotal").textContent = peso(total);
    }


    // UPDATE QUANTITY

    document.querySelectorAll("[data-qty]").forEach(input => {

        input.addEventListener("change", () => {

            const updatedCart = load("notemeCart", []);

            const product = updatedCart.find(
                item => item.id === input.dataset.qty
            );

            if (product) {
                product.qty = Math.max(1, Number(input.value) || 1);
            }

            store("notemeCart", updatedCart);

            renderCheckout();
            updateCartCount();

        });

    });


    // REMOVE PRODUCT

    document.querySelectorAll("[data-remove]").forEach(button => {

        button.addEventListener("click", () => {

            const updatedCart = load("notemeCart", []).filter(
                product => product.id !== button.dataset.remove
            );

            store("notemeCart", updatedCart);

            renderCheckout();
            updateCartCount();

        });

    });

}

renderCheckout();


// ========================================
// OPEN CHECKOUT POPUP
// ========================================

if ($("checkoutButton")) {

    $("checkoutButton").addEventListener("click", () => {

        const cart = load("notemeCart", []);

        if (!cart.length) {
            alert("Your cart is empty. Please choose a product first.");
            return;
        }

        const customer = load("notemeCustomer", {});

        if ($("customerName")) {
            $("customerName").value = customer.name || "";
        }

        if ($("customerAddress")) {
            $("customerAddress").value = customer.address || "";
        }

        $("paymentModal")?.classList.add("open");

    });

}


// ========================================
// CLOSE PAYMENT POPUP
// ========================================

if ($("closePayment")) {

    $("closePayment").addEventListener("click", () => {
        $("paymentModal")?.classList.remove("open");
    });

}


// ========================================
// CONFIRM PAYMENT AND SAVE ORDER
// ========================================

if ($("paymentForm")) {

    $("paymentForm").addEventListener("submit", event => {

        event.preventDefault();

        const cart = load("notemeCart", []);

        if (!cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const total = cart.reduce((sum, product) => {
            return sum + Number(product.price) * Number(product.qty);
        }, 0);

        const order = {

            orderNumber: "NM-" + Date.now(),

            name: $("customerName")?.value || "",

            address: $("customerAddress")?.value || "",

            payment: $("paymentMethod")?.value || "",

            items: cart,

            total: total,

            date: new Date().toLocaleString(),

            status: "Pending Confirmation"

        };


        // SAVE CUSTOMER INFORMATION

        store("notemeCustomer", {
            name: order.name,
            address: order.address
        });


        // SAVE ORDER

        const orders = load("notemeOrders", []);

        orders.push(order);

        store("notemeOrders", orders);


        // CLEAR CART

        store("notemeCart", []);

        updateCartCount();
        renderCheckout();


        // SHOW SUCCESS MESSAGE

        if ($("paymentStatus")) {
            $("paymentStatus").textContent =
                "Your order has been placed! Status: Pending Confirmation.";
        }

        $("paymentModal")?.classList.remove("open");

        event.target.reset();

    });

}


// ========================================
// PENDING ORDERS PAGE
// ========================================

function renderPendingOrders() {

    if (!$("pendingOrders")) return;

    const orders = load("notemeOrders", []);

    const container = $("pendingOrders");
    const emptyMessage = $("noOrders");

    if (emptyMessage) {
        emptyMessage.hidden = orders.length > 0;
    }

    if (!orders.length) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = [...orders].reverse().map(order => {

        const itemsHTML = (order.items || []).map(item => `
            <li>
                ${item.name} × ${item.qty}
                <span>${peso(item.price * item.qty)}</span>
            </li>
        `).join("");

        return `

            <article class="order-card">

                <div class="order-heading">

                    <div>
                        <span class="eyebrow">ORDER NUMBER</span>
                        <h3>${order.orderNumber || "NoteMe Order"}</h3>
                    </div>

                    <span class="order-status">
                        ${order.status || "Pending Confirmation"}
                    </span>

                </div>

                <p><strong>Customer:</strong> ${order.name || ""}</p>

                <p><strong>Address:</strong> ${order.address || ""}</p>

                <p><strong>Payment method:</strong> ${order.payment || ""}</p>

                <p><strong>Date:</strong> ${order.date || ""}</p>

                <h4>Order Items</h4>

                <ul class="order-items">
                    ${itemsHTML}
                </ul>

                <div class="order-total">
                    Total: ${peso(order.total)}
                </div>

            </article>

        `;

    }).join("");

}

renderPendingOrders();


// ========================================
// CUSTOMER SUPPORT
// ========================================

if ($("contactForm")) {

    $("contactForm").addEventListener("submit", event => {

        event.preventDefault();

        const inquiries = load("notemeInquiries", []);

        const inquiry = {

            name: $("contactName")?.value || "",

            email: $("contactEmail")?.value || "",

            type: $("inquiryType")?.value || "",

            message: $("inquiryText")?.value || "",

            date: new Date().toLocaleString()

        };

        inquiries.push(inquiry);

        store("notemeInquiries", inquiries);


        if ($("contactStatus")) {
            $("contactStatus").textContent =
                "Thank you! Your inquiry has been submitted successfully.";
        }

        event.target.reset();

    });

}


// ========================================
// INITIAL PAGE LOAD
// ========================================

updateCartCount();