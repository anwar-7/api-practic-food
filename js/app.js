const displayFood = document.getElementById('display-food');

const lodeFoodData = async () => {
  const inputField = document.getElementById('search-field');
  const inputFieldText = inputField.value;
  inputField.value = '';
  displayFood.textContent = '';
  //   console.log(inputFieldText);
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayFoodData(data.meals);
};

const displayFoodData = (meals) => {
  //   console.log(meals.strMealThumb);

  meals.forEach((meal) => {
    // console.log(meal);

    /* 
    // const displayFood = document.getElementById('display-food'); 
    // this is not needed here this is global now 
    */

    const div = document.createElement('div');
    div.classList.add('col');

    /*  
  // div.innerText = ''; // this is ont working
  // displayFood.innerHTML = ''; // this is not working 
  */

    div.innerHTML = `
    <div class="card" style="width: 18rem">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
            ${meal.strInstructions.slice(0, 150)}
            </p>
        <button 
        onclick="lodeDetailByIdName('${
          meal.idMeal
        }')" data-bs-target="#modal-detils" data-bs-toggle="modal" class="btn btn-primary">
        Go Detail
        </button>
        </div>
    </div>
  `;
    displayFood.appendChild(div);
  });
};

const lodeDetailByIdName = async (idMeal) => {
  //   console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

  const res = await fetch(url);
  const data = await res.json();
  displayDetailByIdName(data.meals);
};

const displayDetailByIdName = (meals) => {
  console.log(meals);
  meals.forEach((meal) => {
    const modal = document.getElementById('modal-detils');
    const div = document.createElement('div');
    div.classList.add('modal-dialog');
    modal.textContent = '';
    div.innerHTML = `
        <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> ${meal.strTags}</h5>
                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <p>Title: ${meal.strMeal}, Details: ${meal.strInstructions} </p>
                </div>
                <div class="modal-footer">
                    <a href="${meal.strYoutube}" type="button" class="btn btn-primary">
                    See Video
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
    modal.appendChild(div);
  });
};
