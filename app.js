let allDrink = [];
let selectedDrinks = [];


const loadAllDrink = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a") 
    .then((res) => res.json()) 
    .then((data) => {
        allDrink = data.drinks;
        // console.log(data.drinks);
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
                    <img src="${drink.strDrinkThumb}" class=" card-image" alt="Image of ${drink.strDrink}">
                    
                    <div class="card-body">
                        <h5 class="card-title ">${drink.strDrink}</h5>
                        <p class="card-text">Category: ${drink.strCategory}</p>
                        <p class="card-text">Glass: ${drink.strGlass}</p>
                        <p class="instruction">
                            Instruction: ${drink.strInstructions.slice(0,15)}
                        </p>

                        <p>
                            <button class="btn btn-primary add-to-group">
                                Add to groups
                            </button>
                            <button class="btn btn-info details">
                                Details
                            </button>
                        </p>
                    </div>
            </div>
        </div>
        
        `;




        singleDrink.querySelector(".add-to-group").addEventListener("click", function () {
            addToGroup(drink);
        });
        

        singleDrink.querySelector(".details").addEventListener("click" , function () {
            showDrinkDetails(drink);
        });

        container.appendChild(singleDrink);


    });



} ;

const showDrinkDetails = (drink) => {
    const modalBody = document.getElementById("drink-details-body");

    modalBody.innerHTML = `
        <div class="card">
            <img src="${drink.strDrinkThumb}" class=" card-image" alt="Image of ${drink.strDrink}">

            <h5><strong>Name:</strong>${drink.strDrink}</h5>
            <p><strong>Category:</strong>${drink.strCategory}</p>
            <p><strong>Glass:</strong>${drink.strGlass}</p>
            <p><strong>Instructions:</strong>${drink.strInstructions}</p>
            
            <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
        </div>
    
    `;

    document.getElementById('drinkDetailsModal').classList.add('show');
    document.getElementById('drinkDetailsModal').style.display = 'block';

    const myModal = new bootstrap.Modal(document.getElementById('drinkDetailsModal'));
    myModal.show();
};







// search drink functionalities
const searchDrink = (event) => {
    event.preventDefault();
    const searchInputField = document.getElementById("search-input-field").value.trim().toLowerCase();
    
    if (searchInputField === "")
    {
        displayDrinks(allDrink); 
        return;
    }

    const searchResult = allDrink.filter(drink => 
        drink.strDrink.toLowerCase().includes(searchInputField)
    );

    if( searchResult.length > 0)
    {
        displayDrinks(searchResult);
    }

    else
    {
        document.getElementById("drink-container").innerHTML = `
        <p id="not-found-text" class="container text-center ">
            No Drinks Found. Try Again.
        </p>
        `;
    }

          
    
};


document.getElementById("search-form").addEventListener("submit",searchDrink);



const addToGroup = (drink) => {
    if (selectedDrinks.length >= 7)
    {
        alert('You have added maximum number of drinks. (Max - 7)');
        return;
    }

    selectedDrinks.push(drink);
    updateTable();
    updateCartNumber();
};

const updateCartNumber = () => {
    document.getElementById("cart-numbers").innerText = selectedDrinks.length;
};


const updateTable = () => {
    const tableBody = document.getElementById("selected-drinks-table-body");
    tableBody.innerHTML = "";

    selectedDrinks.forEach((drink, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${idx + 1}</th>
            <td> 
                <img id="table-drink-image" class="rounded-circle" height="100" width="100" src="${drink.strDrinkThumb}"  alt=""> 
            </td>
            <td>${drink.strDrink}</td>
        `;

        tableBody.appendChild(row);
    });
};

















loadAllDrink();
