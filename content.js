


setTimeout(function initGES () {
    var currentPrice=0;
    var $sellsOrderSizeInfo
    var $sellsOrderSizeTotal
    var $sellsSum
    var $buysSum
    var currencySymbol='$' //todo, find users local symbol

    addOrdersInfoBoxes()

    setInterval(function(){
        calculateOpenOrders('sell')
        calculateOpenOrders('buy')
    },2000)

    setInterval(updateCurrentPrice,1000)

    function addOrdersInfoBoxes(){
        if($('.sellOrderSizeTotal')[0]) return

        var $sellsOrderSizeInfoBox = $('<div class="sellBtn infoBox"> <div>Size</div> <div class="sellOrderSizeTotal">-</div></div>')
        $('[class*="UserPanel_cancel"]').after($sellsOrderSizeInfoBox)
        $sellsOrderSizeTotal = $('.sellOrderSizeTotal')

        var $sellsTotalPriceInfoBox = $('<div class="sellBtn infoBox"> <div>Sum</div> <div class="sellSum">-</div></div>')
        $('[class*="UserPanel_cancel"]').after($sellsTotalPriceInfoBox)
        $sellsSum = $('.sellSum')

        var $buysOrderSizeInfoBox = $('<div class="buyBtn infoBox"> <div>Size</div> <div class="buyOrderSizeTotal">-</div></div>')
        $('[class*="UserPanel_cancel"]').after($buysOrderSizeInfoBox)
        $buyOrderSizeTotal = $('.buyOrderSizeTotal')

        var $buysTotalPriceInfoBox = $('<div class="buyBtn infoBox"> <div>Sum</div> <div class="buySum">-</div></div>')
        $('[class*="UserPanel_cancel"]').after($buysTotalPriceInfoBox)
        $buysSum = $('.buysSum')
    }


    function calculateOpenOrders(buyOrSell){       
        var priceSum=0
        var orderSizeSum=0
        var orderSizeSumTxt;
        addOrdersInfoBoxes()

        $('[class*=" OrderList_row"]').each(function (i, el) {
            if(el.className.includes('header')) return
            var $el= $(el)

            if(buyOrSell==='sell' && $el.html().includes('OrderList_sell_') ===false) return
            if(buyOrSell==='buy' && $el.html().includes('OrderList_buy_') ===false) return 

           var orderSizeCol= $el.find($('[class*="OrderList_order-size_"]'))
           var orderSize=orderSizeCol.text().match(/\d+/g)
           orderSize = Number.parseFloat(orderSize[0] + '.' +orderSize[1])
        
           var priceCol= $el.find($('[class*="OrderList_order-price_"]'))
           var desiredPrice= combineWholeAndPart(priceCol)
           var calculatedSalePrice=(desiredPrice * orderSize)
           priceSum += calculatedSalePrice
           orderSizeSum += orderSize
            
           //insert the final price after the desired price
           updateCalculatedPrice(priceCol, calculatedSalePrice)
        })    

        if(!orderSizeSum) {
            orderSizeSumTxt='-'
        }else {
            orderSizeSumTxt = orderSizeSum.toFixed(5).toString()
        }
         

        if(buyOrSell==='sell'){
            $sellsOrderSizeTotal.text(orderSizeSumTxt)
            $sellsSum.text(currencySymbol+priceSum.formatMoney())
        }else {
            $buyOrderSizeTotal.text(orderSizeSumTxt)
            $buysSum.text(currencySymbol+priceSum.formatMoney())
        }
     

    }

    function updateCalculatedPrice(priceCol, calculatedSalePrice){
        var newHtml='<span class="calculatedPrice">(' + currencySymbol +  calculatedSalePrice.formatMoney() + ')</span>'

        if(priceCol.html().includes('calculatedPrice') ==false){
            priceCol.append(newHtml)
        }else {
           var found= priceCol.find($('.calculatedPrice'))
           found.html(newHtml)
        }
        
    }

    function combineWholeAndPart(el) {
        var wholeDiv=$(el).find($('.whole'))
        var whole=wholeDiv.text()

        var partDiv=$(el).find($('.part'))
        var part=partDiv.text()
        return Number.parseFloat(whole + '.' + part)
    }


    function updateCurrentPrice(){
        var found=$('[class*="MarketInfo_market-"]')
        currentPrice= found.text()
    }

    Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
            c = isNaN(c = Math.abs(c)) ? 2 : c, 
            d = d == undefined ? "." : d, 
            t = t == undefined ? "," : t, 
            s = n < 0 ? "-" : "", 
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
            j = (j = i.length) > 3 ? j % 3 : 0;
           return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
         };




}, 150)
