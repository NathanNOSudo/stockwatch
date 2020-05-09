//  STOCKS RAN ON WATCHLIST PAGE ONLOAD
let stocks = ['AAPL', 'FB', 'NFLX']

for (let i = 0; i < stocks.length; i++) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stocks[i]}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(response => response.json())
        .then(allInfo => {
            let symbol = stocks[i]
            let mostRecent = allInfo.data.slice(-1).pop()

            function stockPercentageUp(symbol) {
                let resultw = (symbol.close - symbol.open)
                let result2w = parseFloat(resultw).toFixed(2)
                return result2w
            }

            cardStocksw.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                    <p class="card-text">
                        <ul id='cardText' style="text-align: left;">
                        <button class="buttons" onclick="addToWatchlist('${symbol}')" window.alert('${symbol} Successfully Added to Watchlist!')" >+</button> 
                        <li><b> ${symbol}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUp(mostRecent) > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp(mostRecent)}</p></li>
                        
                    <p>Today's High: ${mostRecent.high}</p>
                    <p>Today's Low: ${mostRecent.low}</p>
                    <p>Recent Closing: ${mostRecent.close}</p>
                    <p>Opening Price: ${mostRecent.open}</p>
                    <p>Volume: ${mostRecent.volume} Shares</p>  
                    <p>Date: ${mostRecent.date}</p> 
                    </ul>

                
                    <div>
                        <button onclick="grabInfo('${symbol}')" class="btn btn-primary"><a href="stock-info.html" style="text-align: center;">See more about this stock</a></button>
                    </div>
                
                </div>
            </div>`
        })
}

function grabInfo(symbol) {
    sessionStorage.setItem('dataStored', symbol);
    console.log(symbol)
}
