let searchBox=document.querySelector('.searchBox')
let searchBtn=document.querySelector('.searchBtn')
let recipeContainer=document.querySelector('.recipe-container')
let recipedetailscontent=document.querySelector('.recipe-details-content')
let recipeCloseBtn=document.querySelector('.recipe-close-btn')


// function to get recipes  fetch return promises
let fetchRecipes  =  async(query)=>{
    recipeContainer.innerHTML="<h2>Accessing Recipes...</h2>";
    try{

    let data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let response = await data.json();
    // console.log(response);

    recipeContainer.innerHTML ="";
    response.meals.forEach(meal=>{
       let  recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML = `
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span>Dish</p>
       <p>Belongs to <span>${meal.strCategory}</span> Category</p>
       `
       let button =document.createElement('button');
       button.textContent = "View Recipe";
       recipeDiv.appendChild(button);

       //AddEvent Listener to recipe button

       button.addEventListener('click',()=>{
           openRecipePopup(meal);
       })
       recipeContainer.appendChild(recipeDiv)
    });
}
catch(error){
    recipeContainer.innerHTML="<h2> Error in Fetching Recipes...</h2>";
}

}


// Function to fetch ingredients and measurements***
const fetchIngredients=(meal)=>{
//    console.log(meal)
     let  ingredientsList = "";
     for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure =  meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
     }
     return ingredientsList; 


}
let openRecipePopup = (meal)=>{
    recipedetailscontent.innerHTML = `
    <h2 class="recipeName"  >${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="instruction">
    <h3>Instruction:</h3>
    <p >${meal.strInstructions}</p>
    </div>
    `
   
    recipedetailscontent.parentElement.style.display="block"
}
recipeCloseBtn.addEventListener('click',()=>{
    recipedetailscontent.parentElement.style.display="none"

});



searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`

    }
    fetchRecipes(searchInput);
    // console.log("button");
})