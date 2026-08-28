document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LẤY CÁC PHẦN TỬ HTML
    ===================================================== */

    const serviceType = document.getElementById("serviceType");
    const provider = document.getElementById("provider");
    const amountInput = document.getElementById("amount");
    const calculateBtn = document.getElementById("calculateBtn");
const newResultButtons =
    document.getElementById("newResultButtons");

const newResetBtn =
    document.getElementById("newResetBtn");

    const feeResult = document.getElementById("feeResult");

    const resultServiceName =
        document.getElementById("resultServiceName");

    const resultProvider =
        document.getElementById("resultProvider");

    const resultAmount =
        document.getElementById("resultAmount");

    const resultRate =
        document.getElementById("resultRate");

    const feeAmount =
        document.getElementById("feeAmount");

    const resultReceive =
        document.getElementById("resultReceive");
const resultButtons = document.getElementById("resultButtons");
const btnTinhLai = document.getElementById("btnTinhLai");

    /* =====================================================
       BẢNG PHÍ
       
       Có thể chỉnh các % ở đây.
       
       Ví dụ:
       0.15 = 15%
       0.10 = 10%
       0.06 = 6%
    ===================================================== */

    const feeRates = {

        /* =========================
           VÍ TRẢ SAU
        ========================= */

        momo: 0.15,

        zalopay: 0.15,

        vnpay: 0.15,

        shopeepay: 0.15,

        tiktokpay: 0.15,

        kredivo: 0.15,

        cake: 0.15,

        muadee: 0.15,

        "viettel-money": 0.15,

        "homepaylater": 0.15,

        "fe-paylater": 0.15,

        "other-wallet": 0.15,


        /* =========================
           THẺ TÍN DỤNG
        ========================= */

        tpbank: 0.06,

        bidv: 0.06,

        hdbank: 0.06,

        liobank: 0.06,

        hdsaison: 0.06,

        "cake-credit": 0.06,

        "other-credit": 0.06
    };


    /* =====================================================
       HÀM FORMAT TIỀN
    ===================================================== */

    function formatMoney(number) {

        number = Number(number) || 0;

        return new Intl.NumberFormat("vi-VN").format(number) + " VNĐ";

    }


    /* =====================================================
       HÀM LẤY SỐ TỪ Ô NHẬP
    ===================================================== */

    function getAmount() {

        if (!amountInput) {
            return 0;
        }

        let value = amountInput.value
            .replace(/[^\d]/g, "");

        return Number(value) || 0;

    }


    /* =====================================================
       FORMAT Ô NHẬP TIỀN KHI NGƯỜI DÙNG NHẬP
    ===================================================== */

    if (amountInput) {

        amountInput.addEventListener("input", function () {

            let value = this.value
                .replace(/[^\d]/g, "");

            if (!value) {

                this.value = "";

                return;

            }

            this.value =
                Number(value).toLocaleString("vi-VN");

        });

    }


    /* =====================================================
       THAY ĐỔI LOẠI DỊCH VỤ
       
       Nếu HTML có select serviceType:
       
       wallet = Ví trả sau
       credit = Thẻ tín dụng
    ===================================================== */

    if (serviceType && provider) {

        serviceType.addEventListener("change", function () {

            const type = this.value;


            /* =========================
               VÍ TRẢ SAU
            ========================= */

            if (type === "wallet") {

                const momoOption =
                    provider.querySelector(
                        'option[value="momo"]'
                    );

                if (momoOption) {

                    provider.value = "momo";

                }

            }


            /* =========================
               THẺ TÍN DỤNG
            ========================= */

            if (type === "credit") {

                const tpbankOption =
                    provider.querySelector(
                        'option[value="tpbank"]'
                    );

                if (tpbankOption) {

                    provider.value = "tpbank";

                }

            }

        });

    }


    /* =====================================================
       LẤY TÊN DỊCH VỤ
    ===================================================== */

    function getServiceName() {

        if (!serviceType) {

            return "Dịch vụ";

        }

        const value = serviceType.value;

        if (
            value === "credit" ||
            value === "the" ||
            value === "card"
        ) {

            return "Thẻ tín dụng";

        }

        return "Ví trả sau";

    }


    /* =====================================================
       LẤY TÊN NHÀ CUNG CẤP
    ===================================================== */

    function getProviderName() {

        if (!provider) {

            return "Dịch vụ";

        }

        const option =
            provider.options[
                provider.selectedIndex
            ];

        if (!option) {

            return "Dịch vụ";

        }

        return option.textContent.trim();

    }


    /* =====================================================
       TÌM MỨC PHÍ
    ===================================================== */

    function getFeeRate() {

        const providerValue =
            provider
                ? provider.value
                : "";

        /* Có trong bảng phí */

        if (
            providerValue &&
            feeRates[
                providerValue
            ] !== undefined
        ) {

            return feeRates[
                providerValue
            ];

        }


        /* Nếu không có */

        const serviceName =
            getServiceName();


        /* Thẻ tín dụng */

        if (
            serviceName === "Thẻ tín dụng"
        ) {

            return 0.06;

        }


        /* Ví trả sau */

        return 0.15;

    }


    /* =====================================================
       HIỂN THỊ KẾT QUẢ
    ===================================================== */

    function showResult(
        amount,
        rate,
        fee,
        receive
    ) {

        const serviceName =
            getServiceName();

        const providerName =
            getProviderName();


        /* Tên dịch vụ */

        if (resultServiceName) {

            resultServiceName.textContent =
                serviceName;

        }


        /* Tên nhà cung cấp */

        if (resultProvider) {

            resultProvider.textContent =
                providerName;

        }


        /* Số tiền */

        if (resultAmount) {

            resultAmount.textContent =
                formatMoney(amount);

        }


        /* Phần trăm */

        if (resultRate) {

            resultRate.textContent =
                (rate * 100)
                .toFixed(2)
                .replace(".00", "")
                + "%";

        }


        /* Tiền phí */

        if (feeAmount) {

            feeAmount.textContent =
                formatMoney(fee);

        }


        /* Tiền khách nhận */

        if (resultReceive) {

            resultReceive.textContent =
                formatMoney(receive);

        }


        /* Hiện kết quả */

        if (feeResult) {

            feeResult.classList.add("show");

if (newResultButtons) {
    newResultButtons.classList.add("active");
}
            /* Cuộn tới kết quả */

            setTimeout(function () {

                feeResult.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);

        }

    }


    /* =====================================================
       NÚT TÍNH PHÍ
    ===================================================== */

    if (calculateBtn) {

        calculateBtn.addEventListener(
            "click",
            function () {

                /* Lấy số tiền */

                const amount =
                    getAmount();


                /* =========================
                   KIỂM TRA SỐ TIỀN
                ========================= */

                if (
                    !amount ||
                    amount <= 0
                ) {

                    alert(
                        "Vui lòng nhập số tiền cần rút."
                    );

                    if (amountInput) {

                        amountInput.focus();

                    }

                    return;

                }


                /* =========================
                   GIỚI HẠN SỐ TIỀN
                   
                   Nếu website của bạn
                   không cần giới hạn thì
                   có thể bỏ phần này.
                ========================= */

                if (
                    amount < 100000
                ) {

                    alert(
                        "Số tiền tối thiểu là 100.000 VNĐ."
                    );

                    return;

                }


                /* =========================
                   TÍNH PHÍ
                ========================= */

                const rate =
                    getFeeRate();


                const fee =
                    Math.round(
                        amount * rate
                    );


                /* =========================
                   TIỀN KHÁCH NHẬN
                ========================= */

                const receive =
                    amount - fee;


                /* =========================
                   HIỂN THỊ
                ========================= */

                showResult(
                    amount,
                    rate,
                    fee,
                    receive
                );

            }
        );

    }


    /* =====================================================
       NÚT TÍNH LẠI
       
       Cho phép dùng:
       
       onclick="resetCalculator()"
    ===================================================== */

    window.resetCalculator =
        function () {

            if (feeResult) {

                feeResult.classList.remove(
                    "show"
                );

            }


            if (amountInput) {

                amountInput.value = "";

                amountInput.focus();

            }

        };


    /* =====================================================
       CHO PHÉP NHẤN ENTER ĐỂ TÍNH
    ===================================================== */

    if (amountInput) {

        amountInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    if (calculateBtn) {

                        calculateBtn.click();

                    }

                }

            }
        );

    }


    /* =====================================================
       CUỘN MƯỢT TOÀN TRANG
    ===================================================== */

    document.documentElement.style.scrollBehavior =
        "smooth";


    /* =====================================================
       XỬ LÝ CÁC LINK MENU
       
       Giúp bấm:
       - Giới thiệu
       - Dịch vụ
       - Phí rút tiền
       - Đánh giá
       - FAQ
       
       và kéo mượt tới phần tương ứng.
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {

                        return;

                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       HOÀN TẤT
    ===================================================== */

    console.log(
        "MINH HOÀNG VTS - Calculator loaded successfully."
    );

});
// ==========================================
// DỮ LIỆU ĐƠN VỊ
// ==========================================

const providers = {

    vi: [
        "MoMo",
        "ZaloPay",
        "Kredivo",
        "VNPay",
        "Cake",
        "Muadee",
        "Viettel Money",
        "FE PayLater",
        "ShopeePay Later",
        "TikTok Pay Later",
        "Home PayLater",
        "Các ví trả sau khác"
    ],

    the: [
        "TPBank",
        "Liobank",
        "BIDV",
        "HDBank",
        "HDSaiSon",
        "Cake",
        "Các loại thẻ tín dụng khác"
    ]

};


// ==========================================
// MỨC PHÍ
// ==========================================

const feeRates = {

    vi: {
        "MoMo": 15,
        "ZaloPay": 15,
        "Kredivo": 15,
        "VNPay": 15,
        "Cake": 15,
        "Muadee": 15,
        "Viettel Money": 15,
        "FE PayLater": 15,
        "ShopeePay Later": 15,
        "TikTok Pay Later": 15,
        "Home PayLater": 15,
        "Các ví trả sau khác": 15
    },

    the: {
        "TPBank": 6,
        "Liobank": 6,
        "BIDV": 6,
        "HDBank": 6,
        "HDSaiSon": 6,
        "Cake": 6,
        "Các loại thẻ tín dụng khác": 6
    }

};


// ==========================================
// LẤY ELEMENT
// ==========================================

const serviceType = document.getElementById("serviceType");
const provider = document.getElementById("provider");
const amountInput = document.getElementById("amount");
const calculateBtn = document.getElementById("calculateBtn");

const feeResult = document.getElementById("feeResult");

const resultService = document.getElementById("resultService");
const resultProvider = document.getElementById("resultProvider");

const resultAmount = document.getElementById("resultAmount");
const resultPercent = document.getElementById("resultPercent");
const resultFee = document.getElementById("resultFee");
const resultReceive = document.getElementById("resultReceive");


// ==========================================
// FORMAT TIỀN
// ==========================================

function formatMoney(number) {

    return new Intl.NumberFormat("vi-VN").format(number);

}


// ==========================================
// LẤY SỐ TỪ INPUT
// ==========================================

function getAmount() {

    return Number(
        amountInput.value
            .replace(/\./g, "")
            .replace(/,/g, "")
            .replace(/[^\d]/g, "")
    );

}


// ==========================================
// FORMAT INPUT TIỀN
// ==========================================

amountInput.addEventListener("input", function () {

    let value = this.value.replace(/[^\d]/g, "");

    if (!value) {
        this.value = "";
        return;
    }

    this.value = formatMoney(Number(value));

});


// ==========================================
// CẬP NHẬT DANH SÁCH ĐƠN VỊ
// ==========================================

function updateProviders() {

    const type = serviceType.value;

    // Xóa toàn bộ danh sách cũ
    provider.innerHTML = "";

    // Lấy danh sách mới
    const list = providers[type] || [];

    list.forEach(function (name) {

        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;

        provider.appendChild(option);

    });

    // Chọn đơn vị đầu tiên
    if (list.length > 0) {

        provider.value = list[0];

    }

}


// ==========================================
// KHI ĐỔI LOẠI DỊCH VỤ
// ==========================================

serviceType.addEventListener("change", function () {

    updateProviders();

    // Ẩn kết quả cũ
    feeResult.classList.add("hidden");

});


// ==========================================
// TÍNH PHÍ
// ==========================================

calculateBtn.addEventListener("click", function () {

    const type = serviceType.value;
    const selectedProvider = provider.value;
    const amount = getAmount();

    if (!amount || amount <= 0) {

        alert("Vui lòng nhập số tiền cần rút.");

        amountInput.focus();

        return;

    }

    const rate =
        feeRates[type]?.[selectedProvider] ?? 0;

    const fee =
        Math.round(amount * rate / 100);

    const receive =
        amount - fee;


    // ==========================
    // ĐƯA DỮ LIỆU RA KẾT QUẢ
    // ==========================

    resultService.textContent =
        type === "vi"
            ? "Ví trả sau"
            : "Thẻ tín dụng";

    resultProvider.textContent =
        selectedProvider;

    resultAmount.textContent =
        formatMoney(amount) + " VNĐ";

    resultPercent.textContent =
        rate + "%";

    resultFee.textContent =
        formatMoney(fee) + " VNĐ";

    resultReceive.textContent =
        formatMoney(receive) + " VNĐ";


    // Hiện kết quả
    feeResult.classList.remove("hidden");


    // Cuộn nhẹ tới kết quả
    setTimeout(function () {

        feeResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 100);

});


// ==========================================
// KHỞI TẠO
// ==========================================

updateProviders();
/* ================================
   NÚT TÍNH LẠI
================================ */

if (newResetBtn) {

    newResetBtn.addEventListener("click", function () {

        // Ẩn kết quả
        if (feeResult) {
            feeResult.classList.remove("show");
        }

        // Ẩn 2 nút
        if (newResultButtons) {
            newResultButtons.classList.remove("active");
        }

        // Xóa số tiền
        if (amountInput) {
            amountInput.value = "";

            amountInput.focus();

            amountInput.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    });

}