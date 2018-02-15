window.startLeftSidebar = function () {
    var $binancePrice = 0
    var $bitfinexPrice = 0
    var $gdaxPrice = 0

	console.log('loading left sidebar')
	

	
	if(window.updatePricesInterval == null || typeof( window.updatePricesInterval) == 'undefined' ){
		initRegions()
		window.updatePricesInterval = setInterval(updatePrices, 1800)
		loadBitfinexWS()
	}else {
			clearInterval(window.updatePricesInterval)
			window.updatePricesInterval = setInterval(updatePrices, 1800)
			initRegions()
			console.log('I did not restart leftsidebar')
	}

    function updatePrices() {
        updateBinance()
        updateGdax()

    }

    function updateGdax() {
        if (window.currentPrice) {
            $gdaxPrice.html(parseFloat(window.currentPrice).toFixed(2))
        } else {
            $gdaxPrice.html('-')
        }

    }

    function loadBitfinexWS() {
        var ws = new WebSocket('wss://api.bitfinex.com/ws');
        ws.onopen = function () {
            ws.send(JSON.stringify({ "event": "subscribe", "channel": "ticker", "pair": "BTCUSD" }));
        };

        ws.onmessage = function (msg) {
            var data = JSON.parse(msg.data);
            console.log(data)
            var hb = data[1];
            if (hb != "hb") {
                var price = parseFloat(data[7]).toFixed(2)
                if (price === NaN) return

                if (price > window.currentPrice) {
                    price = '<span class="green">' + price + '</span>'
                } else {
                    price = '<span class="red">' + price + '</span>'
                }

                $bitfinexPrice.html(price)
            }
        };
    }




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
            $binancePrice.html(price)
        });
    }

    function initRegions() {

        var $bitfinexBoxInner = $('<div class="lsItem"><span class="lsItemTitle">Bitfinex</span> <span class="bitfinexPrice lsPrice">-</span></div>')
        $('[class*="OrderForm_order-form_"]').after($bitfinexBoxInner)
        $bitfinexPrice = $('.bitfinexPrice')


        var $binanceBoxInner = $('<div class="lsItem"><span class="lsItemTitle">Binance</span> <span class="binancePrice lsPrice">-</span></div>')
        $('[class*="OrderForm_order-form_"]').after($binanceBoxInner)
        $binancePrice = $('.binancePrice')

        var $gdaxBoxInner = $('<div class="lsItem"><span class="lsItemTitle">GDAX</span> <span class="gdaxPrice lsPrice">-</span></div>')
        $('[class*="OrderForm_order-form_"]').after($gdaxBoxInner)
        $gdaxPrice = $('.gdaxPrice')


    }
}


setTimeout(window.startLeftSidebar,4000)

