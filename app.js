const loadAllDrink = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a") 
    .then((res) => res.json()) 
    .then((data) => {
        console.log(data.drinks);
        displayDrinks(data.drinks)
    });
}



// showind drinks
const displayDrinks = (drinks) => {
    const container = document.getElementById("drink-container");
    container.innerHTML = "";

    drinks.forEach(drink => {
        const singleDrink = document.createElement("div");
        singleDrink.classList.add("col");

        singleDrink.innerHTML=`
        <div class="col">
            <div class="card">
                    <img src="${drink.strDrinkThumb}" class=" card-image" alt="...">
                    
                    <div class="card-body">
                        <h5 class="card-title ">${drink.strDrink}</h5>
                        <p class="card-text">Category: ${drink.strCategory}</p>
                        <p class="card-text">${drink.strGlass}</p>
                    </div>
            </div>
        </div>
        
        `;

        container.appendChild(singleDrink)
    });



} ;
















loadAllDrink();
