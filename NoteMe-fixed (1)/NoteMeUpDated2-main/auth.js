(function () {
    const returnToKey = "notemeReturnTo";
    let cachedUser = null;

    function setFormError(element, message) {
        if (element) element.textContent = message;
    }

    function getReturnTarget(user) {
        const target = sessionStorage.getItem(returnToKey);
        sessionStorage.removeItem(returnToKey);

        if (!target) {
            return user?.role === "admin" ? "admin.html" : "index.html";
        }

        try {
            const url = new URL(target);
            const appDirectory = new URL(".", window.location.href).pathname;
            if (url.protocol === window.location.protocol &&
                url.host === window.location.host &&
                url.pathname.startsWith(appDirectory)) {
                return url.href;
            }
        } catch {
            return "index.html";
        }

        return "index.html";
    }

    function updateNavForUser(user) {
        cachedUser = user;
        const signedIn = Boolean(user);
        document.querySelectorAll("#loginLink, #menuLogin, #menuSignup, .header-signup").forEach(link => {
            link.style.display = signedIn ? "none" : "";
        });
        document.querySelectorAll("#logoutBtn, #menuLogout").forEach(link => {
            link.style.display = signedIn ? "" : "none";
        });
    }

    fetch("session.php")
        .then(res => res.json())
        .then(data => {
            updateNavForUser(data.user || null);
        })
        .catch(() => {
            updateNavForUser(null);
        });

    window.notemeRequireAccount = function () {
        if (cachedUser) return true;

        try {
            sessionStorage.setItem(returnToKey, window.location.href);
        } catch {
            // Continue to login even if this browser cannot preserve a return location.
        }

        alert("Please sign up or log in before adding items to your cart.");
        window.location.assign("login.html");
        return false;
    };

    document.querySelectorAll("#logoutBtn, #menuLogout").forEach(link => {
        link.addEventListener("click", async event => {
            event.preventDefault();
            await fetch("logout.php", { method: "POST" });
            window.location.assign("index.html");
        });
    });

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async event => {
            event.preventDefault();
            const errorElement = document.getElementById("signupError");
            const submitButton = signupForm.querySelector('[type="submit"]');

            const payload = {
                username: document.getElementById("su-username").value.trim(),
                name: document.getElementById("su-name").value.trim(),
                age: Number(document.getElementById("su-age").value),
                email: document.getElementById("su-email").value.trim(),
                address: document.getElementById("su-address").value.trim(),
                password: document.getElementById("su-password").value
            };

            submitButton.disabled = true;
            setFormError(errorElement, "");

            try {
                const response = await fetch("signup.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();

                if (!response.ok || !data.ok) {
                    setFormError(errorElement, data.message || "Unable to create your account. Please try again.");
                    return;
                }

                window.location.assign(getReturnTarget(data.user));
            } catch {
                setFormError(errorElement, "Unable to reach the server. Make sure PHP/Apache is running.");
            } finally {
                submitButton.disabled = false;
            }
        });
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async event => {
            event.preventDefault();
            const errorElement = document.getElementById("loginError");
            const submitButton = loginForm.querySelector('[type="submit"]');

            const selectedRole = loginForm.querySelector('input[name="login-as"]:checked')?.value || "customer";
            const payload = {
                username: document.getElementById("login-username").value.trim(),
                password: document.getElementById("login-password").value,
                loginAs: selectedRole
            };

            submitButton.disabled = true;
            setFormError(errorElement, "");

            try {
                const response = await fetch("login.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();

                if (!response.ok || !data.ok) {
                    setFormError(errorElement, data.message || "Unable to log in. Please try again.");
                    return;
                }

                window.location.assign(getReturnTarget(data.user));
            } catch {
                setFormError(errorElement, "Unable to reach the server. Make sure PHP/Apache is running.");
            } finally {
                submitButton.disabled = false;
            }
        });
    }
})();