setTimeout(function initGES () {
    var $els = []    
    var root=$('[class*="Navbar_nav-wrapper_"]')
    var $ticker=$('<marquee class="topTicker"></marquee>')
    root.append($ticker)
    setInterval(updatePrices,5000)

    function updatePrices(){
        $.ajax({
            method: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=20",
            dataType: 'json'  
          }).success(function(data,x,y){
            if(!data || !data[0] ) return

            data.forEach(function(pair) {
                createOrUpdateSymbolEl(pair)  

            });
            

        });
    }

    function createOrUpdateSymbolEl(pair){

        var color='green'
        if(parseFloat(pair.percent_change_1h) < 0 ){
            color=red;
        }

        newHtml=pair.symbol + '<span class="'+color+' topPrice"> '+pair.price_usd+'</span>'


        if($els[pair.symbol]) {
             $els[pair.symbol].html(newHtml);
        }else {
            $els[pair.symbol] =$('<span class="topPair">'+pair.symbol+'</span>')
            $ticker.append($els[pair.symbol])        
            $els[pair.symbol].html(newHtml);
        }
    }


}, 400)