
// ========================================
// NOTEME SHARED JAVASCRIPT
// ========================================

const $ = id => document.getElementById(id);

const peso = amount =>
    "₱" + Number(amount || 0).toLocaleString("en-PH");

const load = (key, defaultValue = []) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
    } catch (error) {
        return defaultValue;
    }
};

const store = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const createId = () =>
    "NM-" + Date.now() + "-" + Math.floor(Math.random() * 1000);


// ========================================
// HAMBURGER MENU
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = $("menuToggle");
    const mainNav = $("mainNav");

    if (!menuToggle || !mainNav) return;

    function openMenu() {
        mainNav.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation();

        if (mainNav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mainNav.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("click", function () {
        closeMenu();
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
// PRODUCT LIST
// ========================================

const products = [
    {
        id: "planner",
        name: "Weekly Reset Planner",
        price: 149,
        description: "Organize your week with a simple and aesthetic planner."
    },
    {
        id: "study",
        name: "Study Session Kit",
        price: 99,
        description: "Stay focused and organized during your study sessions."
    },
    {
        id: "creator",
        name: "Creator Business Bundle",
        price: 249,
        description: "Helpful digital templates for content creators and small businesses."
    },
    {
        id: "journal",
        name: "Everyday Digital Journal",
        price: 129,
        description: "A digital space for your thoughts, plans, and daily reflections."
    },
    {
        id: "budget",
        name: "Monthly Budget Tracker",
        price: 119,
        description: "Track your monthly expenses, savings, and budget."
    },
    {
        id: "habit",
        name: "Habit Tracker Bundle",
        price: 89,
        description: "Build consistent routines and track your daily habits."
    },
    {
        id: "notes",
        name: "Aesthetic Digital Notes",
        price: 99,
        description: "Keep your notes neat, organized, and easy to review."
    },
    {
        id: "goals",
        name: "Goal Setting Workbook",
        price: 109,
        description: "Plan your goals and break them into manageable steps."
    },
    {
        id: "meal",
        name: "Meal Planner",
        price: 89,
        description: "Organize your meals and weekly food plans."
    },
    {
        id: "fitness",
        name: "Wellness Journal",
        price: 129,
        description: "Keep track of your wellness routines and reflections."
    },
    {
        id: "content",
        name: "Content Calendar",
        price: 149,
        description: "Plan and organize your social media content."
    },
    {
        id: "resume",
        name: "Resume Template Kit",
        price: 99,
        description: "Create a clean and organized resume."
    },
    {
        id: "finance",
        name: "Savings Challenge Kit",
        price: 79,
        description: "Make saving money more organized with simple trackers."
    },
    {
        id: "reading",
        name: "Reading Journal",
        price: 89,
        description: "Track your reading progress, notes, and favorite books."
    },
    {
        id: "travel",
        name: "Travel Planner",
        price: 119,
        description: "Organize your travel plans, itinerary, and expenses."
    },
    {
        id: "project",
        name: "Project Management Kit",
        price: 179,
        description: "Manage tasks, deadlines, and project progress."
    },
    {
        id: "presentation",
        name: "Presentation Template Kit",
        price: 159,
        description: "Create organized and visually pleasing presentations."
    },
    {
        id: "business",
        name: "Small Business Starter Kit",
        price: 199,
        description: "Useful templates for organizing a small business."
    },
    {
        id: "daily",
        name: "Daily Productivity Kit",
        price: 139,
        description: "Plan your daily tasks and keep track of priorities."
    },
    {
        id: "case-file",
        name: "Case File",
        price: 149,
        description: "Digital notes and document templates designed to make organizing your schoolwork easier."
    }
];


// ========================================
// CANVA COLLECTION ITEMS (shown in Product Overview)
// ========================================

(function () {
    const groups = [
        { label: "University Series", sub: "Campus template", name: "University Series", price: 149, from: 1, to: 5 },
        { label: "Color Combinations", sub: "Palette variation", name: "Color Combination", price: 179, from: 6, to: 10 },
        { label: "Game Series", sub: "Spider-Man theme", name: "Game Series", price: 199, from: 11, to: 15 },
        { label: "Customized Templates", sub: "Personalized design", name: "Customized Template", price: 249, from: 16, to: 19 }
    ];

    groups.forEach(function (group) {
        for (let id = group.from; id <= group.to; id++) {
            const number = String(id - group.from + 1).padStart(2, "0");

            products.push({
                id: "canva-" + id,
                name: group.name + " " + number,
                price: group.price,
                description: group.label + " \u00b7 " + group.sub
            });
        }
    });
})();


// ========================================
// SHOPPING CART
// ========================================

function addCart(id) {

    if (!window.notemeRequireAccount || !window.notemeRequireAccount()) return;

    const product = products.find(item => item.id === id);

    if (!product) {
        alert("Product not found.");
        return;
    }

    const cart = load("notemeCart", []);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty = Number(existing.qty || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1
        });
    }

    store("notemeCart", cart);

    updateCartCount();

    alert(product.name + " has been added to your cart!");
}


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cart = load("notemeCart", []);

    const count = cart.reduce((total, item) => {
        return total + Number(item.qty || 1);
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function (element) {
        element.textContent = count;
    });

}


// ========================================
// PRODUCT DETAILS AND CART BUTTONS
// ========================================

document.addEventListener("click", function (event) {

    const overviewButton = event.target.closest("[data-overview]");
    const cartButton = event.target.closest("[data-cart]");
    const removeButton = event.target.closest("[data-remove]");

    if (overviewButton) {

        const id = overviewButton.dataset.overview;
        const product = products.find(item => item.id === id);

        if (!product) return;

        const detailContent = $("detailContent");
        const detailModal = $("detailModal");

        if (detailContent && detailModal) {

            detailContent.innerHTML = `
                <span class="eyebrow">NOTEME PRODUCT</span>

                <h2 class="section-title">${product.name}</h2>

                <p class="muted">${product.description}</p>

                <div class="price">${peso(product.price)}</div>

                <button
                    type="button"
                    class="btn btn-primary"
                    data-cart="${product.id}">
                    Add to Cart +
                </button>
            `;

            detailModal.classList.add("open");
        }
    }

    if (cartButton) {
        addCart(cartButton.dataset.cart);
    }

    if (removeButton) {

        const id = removeButton.dataset.remove;

        const cart = load("notemeCart", [])
            .filter(item => item.id !== id);

        store("notemeCart", cart);

        renderCheckout();
        updateCartCount();
    }

});


// ========================================
// CLOSE PRODUCT DETAILS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const closeDetail = $("closeDetail");
    const detailModal = $("detailModal");

    if (closeDetail && detailModal) {
        closeDetail.addEventListener("click", function () {
            detailModal.classList.remove("open");
        });
    }

    if (detailModal) {
        detailModal.addEventListener("click", function (event) {
            if (event.target === detailModal) {
                detailModal.classList.remove("open");
            }
        });
    }

});


// ========================================
// CHECKOUT DISPLAY
// ========================================

function renderCheckout() {

    const checkoutItems = $("checkoutItems");
    const totalElement = $("grandTotal");
    const emptyCart = $("emptyCart");
    const checkoutButton = $("checkoutButton");

    if (!checkoutItems || !totalElement) return;

    const cart = load("notemeCart", []);

    if (cart.length === 0) {

        checkoutItems.innerHTML = "";
        totalElement.textContent = peso(0);

        if (emptyCart) emptyCart.hidden = false;
        if (checkoutButton) checkoutButton.disabled = true;

        return;
    }

    if (emptyCart) emptyCart.hidden = true;
    if (checkoutButton) checkoutButton.disabled = false;

    let total = 0;

    checkoutItems.innerHTML = cart.map(item => {

        const product = products.find(p => p.id === item.id);

        const quantity = Number(item.qty || 1);
        const price = Number(item.price || 0);
        const subtotal = price * quantity;

        total += subtotal;

        const description = product
            ? product.description
            : "Digital product from NoteMe.";

        return `
            <tr>
                <td>${item.name}</td>
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${peso(subtotal)}</td>
                <td>
                    <button
                        type="button"
                        class="remove-item"
                        data-remove="${item.id}">
                        Remove
                    </button>
                </td>
            </tr>
        `;

    }).join("");

    totalElement.textContent = peso(total);
}


// ========================================
// PAYMENT MODAL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const checkoutButton = $("checkoutButton");
    const paymentModal = $("paymentModal");
    const closePayment = $("closePayment");

    if (checkoutButton && paymentModal) {

        checkoutButton.addEventListener("click", function () {

            const cart = load("notemeCart", []);

            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            paymentModal.classList.add("show");
            document.body.style.overflow = "hidden";

        });

    }

    function closePaymentModal() {

        if (paymentModal) {
            paymentModal.classList.remove("show");
            document.body.style.overflow = "";
        }

    }

    if (closePayment) {
        closePayment.addEventListener("click", closePaymentModal);
    }

    if (paymentModal) {

        paymentModal.addEventListener("click", function (event) {

            if (event.target === paymentModal) {
                closePaymentModal();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closePaymentModal();
        }

    });

});


// ========================================
// SUBMIT ORDER
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const paymentForm = $("paymentForm");

    if (!paymentForm) return;

    paymentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const cart = load("notemeCart", []);

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const customerName = $("customerName").value.trim();
        const customerAddress = $("customerAddress").value.trim();
        const paymentMethod = $("paymentMethod").value;
        const confirmed = $("confirmPayment").checked;

        if (
            !customerName ||
            !customerAddress ||
            !paymentMethod ||
            !confirmed
        ) {
            alert("Please complete all the required information.");
            return;
        }

        const total = cart.reduce((sum, item) => {
            return sum +
                Number(item.price || 0) *
                Number(item.qty || 1);
        }, 0);

        const order = {
            id: createId(),
            name: customerName,
            address: customerAddress,
            payment: paymentMethod,
            items: cart,
            total: total,
            orderType: "template",
            status: "pending",
            createdAt: new Date().toISOString(),
            confirmedAt: null,
            completedAt: null
        };

        const orders = load("notemeOrders", []);

        orders.push(order);

        store("notemeOrders", orders);

        store("notemeCustomer", {
            name: customerName,
            address: customerAddress
        });

        store("notemeCart", []);

        const paymentStatus = $("paymentStatus");

        if (paymentStatus) {
            paymentStatus.textContent =
                "Your order has been submitted successfully!";
        }

        paymentForm.reset();

        renderCheckout();
        updateCartCount();

        const paymentModal = $("paymentModal");

        if (paymentModal) {
            paymentModal.classList.remove("show");
        }

        document.body.style.overflow = "";

        alert(
            "Thank you for ordering from NoteMe!\n\n" +
            "Order ID: " + order.id +
            "\nStatus: Pending Admin Confirmation"
        );

    });

});


// ========================================
// CUSTOMIZATION REQUEST
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const customForm = $("customForm");

    if (!customForm) return;

    customForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const requests = load("notemeCustomRequests", []);

        const request = {
            id: createId(),
            template: $("templateName")?.value || "Custom Design",
            palette: $("palette")?.value || "Not specified",
            notes: $("customNotes")?.value || "",
            startingPrice: 199,
            orderType: "customization",
            status: "pending",
            createdAt: new Date().toISOString(),
            confirmedAt: null,
            completedAt: null
        };

        requests.push(request);

        store("notemeCustomRequests", requests);

        const customStatus = $("customStatus");

        if (customStatus) {
            customStatus.textContent =
                "Your customization request has been submitted! Starting price: ₱199. Please wait for admin confirmation.";
        }

        customForm.reset();

    });

});


// ========================================
// CUSTOMER SUPPORT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const supportForm = $("supportForm");

    if (!supportForm) return;

    supportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const inquiries = load("notemeInquiries", []);

        inquiries.push({
            name: $("supportName")?.value || "",
            email: $("supportEmail")?.value || "",
            message: $("supportMessage")?.value || "",
            date: new Date().toISOString()
        });

        store("notemeInquiries", inquiries);

        const supportStatus = $("supportStatus");

        if (supportStatus) {
            supportStatus.textContent =
                "Your message has been submitted. Thank you for contacting NoteMe!";
        }

        supportForm.reset();

    });

});


// ========================================
// INITIALIZE PAGE
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    renderCheckout();
    updateCartCount();
});