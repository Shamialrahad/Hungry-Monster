//Search box input and select button 
var inputMeal = document.getElementById('inputMeal');
var selectMeal = document.getElementById('selectMeal');

selectMeal.addEventListener('click',function(){
    //fetch meal api with image
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputMeal.value}`)
        .then(res => res.json())
        .then(data=>displayMeals(data.meals))
        .catch(err => alert("Wrong meal name!")) 


        const displayMeals = mealList =>{
            const mealListDiv = document.getElementById('mealList');
            mealList.forEach(meals => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'meals';
                //display meal
                const mealInfo = `
                    <div class="card meal-name">
                        <img id="meal-area" class="card-img-top" src="${meals.strMealThumb}" onclick="displayMealDetails('${meals.strMeal}')" alt="${meals.strMeal}" style="cursor:pointer;">
                        <div class="card-body">
                            <h6 class="card-text">${meals.strMeal}</h6>
                        </div>
                    </div>
                `
                mealDiv.innerHTML = mealInfo;
                mealListDiv.appendChild(mealDiv);
            });
            
        }   
    
})


const displayMealDetails = strMeal =>{
    //fetch mealDetails
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`
    fetch(url)
    .then(res =>res.json())
    .then(data => renderMealInfo(data.meals[0]));

}

const renderMealInfo = meals =>{
    const mealsDiv = document.getElementById('mealDetail');
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meals[`strIngredient${i}`]) {
        ingredients.push(
            ` ${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}`
        );
        } else {
        break;
        }
    }
    mealsDiv.innerHTML = `
    <div class="card" style="width: 30rem;">
        <img src="${meals.strMealThumb}" class="card-img-top" alt="${meals.strMeal}">
        <div class="card-body">
            <h2>${meals.strMeal}</h2>
            <br>
            <h3>Ingredients</h3>
            <div>
                <ul>
                   ${ingredients.map((ing) => `<li>${ing}</li>`).join("")} 
                </ul>
            </div>
        </div>
    </div>
    `

    mealArea = document.getElementById('mealList');
    mealArea.style.display = "none";
}



