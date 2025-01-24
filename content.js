function updateFakeRobux() {
    chrome.storage.local.get(["fake_robux_ext_state", "fake_robux_ext_amount"]).then((result) => {
        if (result.fake_robux_ext_state && document.querySelector("#nav-robux-amount")) {
            const fakeRobux = result.fake_robux_ext_amount || 0;
            const formattedRobux =
                fakeRobux >= 1e6
                    ? (fakeRobux / 1e6).toFixed(1) + "M+"
                    : fakeRobux >= 1e4
                    ? (fakeRobux / 1e3).toFixed(0) + "K+"
                    : fakeRobux;
            document.querySelector("#nav-robux-amount").textContent = formattedRobux;
        }
    });
}

const observer = new MutationObserver(updateFakeRobux);
observer.observe(document.body, { childList: true, subtree: true });
updateFakeRobux();
