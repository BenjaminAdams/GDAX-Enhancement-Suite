


setTimeout(function initGES () {
    var currentPrice=0;
    var $sellsOrderSizeInfo
    var $sellsOrderSizeTotal
    addOrdersInfoBoxes()
    setInterval(calculateOpenSells,6000)
    setInterval(updateCurrentPrice,1000)

    function addOrdersInfoBoxes(){
        if($('.sellOrderSizeTotal')[0]) return

        $sellsOrderSizeInfoBox = $('<div class="sellOrderSizeTotal">oh hey</div> ')
        $('[class*="UserPanel_cancel"]').after($sellsOrderSizeInfoBox)
        $sellsOrderSizeTotal = $('.sellOrderSizeTotal')
    }


    function calculateOpenSells(){       
        var sellsPriceSum=0
        var orderSizeSum=0
        addOrdersInfoBoxes()

            

        $('[class*=" OrderList_row"]').each(function (i, el) {
			if(el.className.includes('header')) return
            
           var orderSizeCol=$(el).find($('[class*="OrderList_order-size_"]'))
           var orderSize=orderSizeCol.text().match(/\d+/g)
           orderSizeSum += Number.parseFloat(orderSize[0] + '.' +orderSize[1])

           var priceCol=$(el).find($('[class*="OrderList_order-price_"]'))
           var desiredPrice= combineWholeAndPart(priceCol)
           sellsPriceSum += (desiredPrice * orderSizeSum)
			
        })
        
        console.log(orderSizeSum.toFixed(2))
        console.log(sellsPriceSum.toFixed(4))

        $sellsOrderSizeTotal.text(sellsPriceSum.toFixed(4))

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




}, 150)
