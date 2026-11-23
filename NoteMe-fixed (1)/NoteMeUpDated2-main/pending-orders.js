
// ========================================
// NOTEME PENDING ORDERS
// ========================================

const loadOrders = (key, fallback = []) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

const pesoOrders = amount =>
    "₱" + Number(amount || 0).toLocaleString("en-PH");

const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);


// ========================================
// FORMAT DATE
// ========================================

function formatDate(date) {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}


// ========================================
// GET ALL ORDERS
// ========================================

function getAllOrders() {
    const regularOrders = loadOrders("notemeOrders", []);
    const customRequests = loadOrders("notemeCustomRequests", []);

    const orders = [
        ...regularOrders.map(order => ({
            ...order,
            type: "template"
        })),

        ...customRequests.map(request => ({
            ...request,
            type: "customization"
        }))
    ];

    return orders.sort((a, b) =>
        new Date(b.createdAt || b.date || 0) -
        new Date(a.createdAt || a.date || 0)
    );
}


// ========================================
// STATUS
// ========================================

function getStatus(order) {
    const status = String(order.status || "pending").toLowerCase();

    if (status === "delivered") {
        return {
            label: "Delivered",
            className: "delivered"
        };
    }

    if (status === "progress" || status === "in-progress") {
        return {
            label: "In Progress",
            className: "progress"
        };
    }

    return {
        label: "Pending Admin Confirmation",
        className: "pending"
    };
}


// ========================================
// UPDATE SUMMARY CARDS
// ========================================

function updateOrderSummary(orders) {
    const total = orders.length;

    const pending = orders.filter(order =>
        !order.status || order.status.toLowerCase() === "pending"
    ).length;

    const progress = orders.filter(order => {
        const status = String(order.status || "").toLowerCase();
        return status === "progress" || status === "in-progress";
    }).length;

    const delivered = orders.filter(order =>
        String(order.status || "").toLowerCase() === "delivered"
    ).length;

    if (document.getElementById("totalOrders")) {
        document.getElementById("totalOrders").textContent = total;
    }

    if (document.getElementById("pendingOrders")) {
        document.getElementById("pendingOrders").textContent = pending;
    }

    if (document.getElementById("progressOrders")) {
        document.getElementById("progressOrders").textContent = progress;
    }

    if (document.getElementById("deliveredOrders")) {
        document.getElementById("deliveredOrders").textContent = delivered;
    }
}


// ========================================
// ESTIMATED COMPLETION
// ========================================

function addBusinessDays(startDate, days) {
    const date = new Date(startDate);
    let count = 0;

    while (count < days) {
        date.setDate(date.getDate() + 1);

        if (date.getDay() !== 0 && date.getDay() !== 6) {
            count++;
        }
    }

    return date;
}

function getEstimate(order) {
    if (order.type !== "customization") return "";

    if (!order.confirmedAt) {
        return `
            <p>
                <strong>Estimated Completion:</strong>
                After admin confirmation
            </p>
        `;
    }

    return `
        <p>
            <strong>Estimated Completion:</strong>
            ${formatDate(addBusinessDays(order.confirmedAt, 3))}
        </p>
        <small>3 business days after confirmation</small>
    `;
}


// ========================================
// ORDER DETAILS
// ========================================

function getOrderDetails(order) {
    if (order.type === "customization") {
        return `
            <p><strong>Type:</strong> Customization Request</p>
            <p><strong>Template:</strong> ${escapeHTML(order.template)}</p>
            <p><strong>Color Palette:</strong> ${escapeHTML(order.palette)}</p>
            <p><strong>Notes:</strong> ${escapeHTML(order.notes || "None")}</p>
            <p><strong>Starting Price:</strong> ${pesoOrders(order.startingPrice)}</p>
        `;
    }

    const items = Array.isArray(order.items) ? order.items : [];

    return `
        <p><strong>Type:</strong> Ready-made Products</p>

        ${items.map(item => `
            <p>
                ${escapeHTML(item.name)}
                × ${Number(item.qty || 1)}
                - ${pesoOrders(Number(item.price || 0) * Number(item.qty || 1))}
            </p>
        `).join("")}

        <p><strong>Total:</strong> ${pesoOrders(order.total)}</p>

        <p>
            <strong>Payment Method:</strong>
            ${escapeHTML(order.payment || "Not specified")}
        </p>
    `;
}


// ========================================
// RENDER ORDERS
// ========================================

function renderPendingOrders(filter = "all") {

    // FIXED: HTML uses ordersList, not ordersContainer
    const container = document.getElementById("ordersList");

    if (!container) {
        console.error("Missing ordersList element in HTML.");
        return;
    }

    const allOrders = getAllOrders();

    // Update summary cards
    updateOrderSummary(allOrders);

    let orders = allOrders;

    if (filter !== "all") {
        orders = allOrders.filter(order => {
            const status = String(order.status || "pending").toLowerCase();

            if (filter === "progress") {
                return status === "progress" || status === "in-progress";
            }

            return status === filter;
        });
    }

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-orders">
                <h3>No orders yet</h3>
                <p>Your submitted orders will appear here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => {
        const status = getStatus(order);

        return `
            <article class="order-card">

                <div class="order-card-header">
                    <div>
                        <span class="order-number">
                            ${escapeHTML(order.id || "NoteMe Order")}
                        </span>

                        <h3>
                            ${order.type === "customization"
                                ? "Customization Request"
                                : "Ready-made Product Order"}
                        </h3>
                    </div>

                    <span class="order-status ${status.className}">
                        ${status.label}
                    </span>
                </div>

                <div class="order-card-body">

                    ${order.type === "template"
                        ? `<p><strong>Customer:</strong> ${escapeHTML(order.name)}</p>`
                        : ""
                    }

                    ${getOrderDetails(order)}

                    <p>
                        <strong>Date Submitted:</strong>
                        ${formatDate(order.createdAt || order.date)}
                    </p>

                    ${order.confirmedAt
                        ? `<p><strong>Confirmed:</strong> ${formatDate(order.confirmedAt)}</p>`
                        : ""
                    }

                    ${getEstimate(order)}

                    ${order.completedAt
                        ? `<p><strong>Delivered:</strong> ${formatDate(order.completedAt)}</p>`
                        : ""
                    }

                </div>
            </article>
        `;
    }).join("");
}


// ========================================
// FILTER BUTTONS
// ========================================

document.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");

    if (!button) return;

    document.querySelectorAll("[data-filter]").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    renderPendingOrders(button.dataset.filter);
});


// ========================================
// INITIAL DISPLAY
// ========================================

renderPendingOrders();


// ========================================
// REFRESH WHEN ADMIN UPDATES ORDERS
// ========================================

window.addEventListener("storage", event => {
    if (
        event.key === "notemeOrders" ||
        event.key === "notemeCustomRequests"
    ) {
        const activeFilter =
            document.querySelector("[data-filter].active")?.dataset.filter || "all";

        renderPendingOrders(activeFilter);
    }
});