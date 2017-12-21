


setTimeout(function initGES () {

    setInterval(calculateOpenSells,6000)


    function calculateOpenSells(){       
        var sellsPriceSum=0


            

        $('[class*=" OrderList_row"]').each(function (i, obj) {
			if(obj.className.includes('header')) return
			console.log(obj.className)            
            console.log(obj)
            
            //find OrderList_order-size
            //var sizeDiv=$(obj).find('[class*=" OrderList_order-size_"]')
            //var tmp= sizeDiv.text()

           // var tmp=$(obj).find($('[class*=" OrderList_column"]'))
           //var tmp=$(obj).find($('[class*=" OrderList_column"]'))
           var tmp=$(obj).find($('[class*="OrderList_order-size_"]'))
           var orderSize=tmp.text()


            sellsPriceSum+= 222
			
		}) 
    }




}, 150)
