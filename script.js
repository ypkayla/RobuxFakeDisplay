document.addEventListener("DOMContentLoaded", function () {
    // Initialize state
    chrome.storage.local.get(["fake_robux_ext_state"]).then((result) => {
        const isActive = result.fake_robux_ext_state || false;
        updateButtonState(isActive);
    });

    chrome.storage.local.get(["fake_robux_ext_amount"]).then((result) => {
        const amount = result.fake_robux_ext_amount || 0;
        document.getElementById("inputamount").value = amount;
    });

    // Button toggle logic
    document.getElementById("btnactivate").addEventListener("click", function () {
        chrome.storage.local.get(["fake_robux_ext_state"]).then((result) => {
            const isActive = !result.fake_robux_ext_state;
            chrome.storage.local.set({ fake_robux_ext_state: isActive });
            updateButtonState(isActive);
        });
    });

    // Input field logic
    document.getElementById("inputamount").addEventListener("input", function () {
        const value = parseInt(this.value, 10) || 0;
        chrome.storage.local.set({ fake_robux_ext_amount: value });
    });

    function updateButtonState(isActive) {
        const button = document.getElementById("btnactivate");
        if (isActive) {
            button.textContent = "Active ✓";
            button.classList.add("green");
        } else {
            button.textContent = "Inactive";
            button.classList.remove("green");
        }
    }
});
