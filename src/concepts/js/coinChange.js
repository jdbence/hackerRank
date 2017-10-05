function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    var coins = readLine().split(' ');
    coins = coins.map(Number).sort((a,b) => a - b);
    console.log(currency(n, coins));
}

  function currency(n, denominations) {
    let hash = {};
    if(n != 0){
        for(let i = 1; i <= n; i++) {  
          hash[i] = 0;
        }

        for(let i = denominations[0]; i <= n; i += denominations[0]) {
          hash[i] = 1;
        }

        for(let i = 1; i < denominations.length; i++) {
          let c = denominations[i];

          for(let i = 0; i <= n; i++) {
            if (hash[i - c] || i === c) {
              hash[i] += hash[i - c] || 1;
            }
          }
        }
        return hash[n];
    }
    return 0;
  }