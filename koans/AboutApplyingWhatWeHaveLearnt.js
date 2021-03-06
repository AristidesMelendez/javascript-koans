var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(item){
          if(!item.containsNuts){
             if( _(item.ingredients).all(function(ingr){return ingr !== 'mushrooms'}) )
                return true;
          }
      });
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

      /* try chaining range() and reduce() */
    var sum = _(_.range(1,1000)).reduce(function(memo, x) {
        if (x % 3 === 0 || x % 5 === 0)
            return memo + x;
        else
            return memo;
        }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };


    /* chain() together map(), flatten() and reduce() */
    var countIngredient = function (product) {
        _(product.ingredients).map (function (x) {
            //console.log(ingredientCount);
            return ingredientCount[x] = ingredientCount[x] === undefined ? 1 : ingredientCount[x] + 1;
        });
    }

    _(products).forEach(countIngredient);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });
*/
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

      var snd = 1;
      var primes = [2,3,5,7,11,13,17,19];
      var numbers = _.range(2, 21);
      var MCM = {};
      expect(numbers).toEqual([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

      _(numbers).map(function(x) {
          if (x === 1 || x === 0)
            return x;

          for(var i = 0; i<primes.length; i += 1){
              var power = 1
              while (x % primes[i] === 0){
                  MCM['' + primes[i]] = MCM['' + primes[i]] || 1;

                  if(power > MCM['' + primes[i]]){
                      MCM['' + primes[i]] = power;
                  }
                  x = x / primes[i];
                  power++;
              }
          }
      });

      for (var i = 0; i<primes.length; i += 1){
          if(MCM['' + primes[i]] !== undefined)
            snd *= Math.pow(primes[i], MCM['' + primes[i]]);
      }

      expect(232792560).toBe(snd);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
      fail();
  });

  it("should find the 10001st prime", function () {
      fail();
  });

});
