window.startLeftSidebar = function () {
    var $binanceBoxInner = $('<div class="binanceBox"></div>')
    $('[class*="OrderForm_order-form_"]').after($binanceBoxInner)
    var $binanceBox = $('.binanceBox')

    setInterval(updateBinance, 600)

    function updateBinance() {
        $.ajax({
            method: "GET",
            url: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
            dataType: 'json',
        }).success(function (data, x, y) {
            if (!data || !data.price) return
            var price = parseFloat(data.price).toFixed(2)

            if (price > window.currentPrice) {
                price = '<span class="green">' + price + '</span>'
            } else {
                price = '<span class="red">' + price + '</span>'
            }
            $binanceBox.html(price)
        });
    }
}
