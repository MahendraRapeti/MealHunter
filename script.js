var searchbtni=document.getElementById('searchbtn-i');
var searchbtnc=document.getElementById('searchbtn-c');
var searchbtna=document.getElementById('searchbtn-a');
var cards=document.getElementById('cardslist');
var notfound=document.getElementsByClassName('notfound')
var details=document.getElementById('details');
var homebtn=document.getElementById("homebtn")
var input="";
(searchbtni && searchbtni.addEventListener('click',getmeallist1));
(searchbtnc && searchbtnc.addEventListener('click',getmeallist2));
(searchbtna && searchbtna.addEventListener('click',getmeallist3));
cards.addEventListener('click',getmeals);

homebtn.addEventListener('click',()=>{
    window.location.assign("/home.html")
})

function getmeallist1(){
    let searchInputTxt = document.getElementById('inputbox').value.trim();
    if(searchInputTxt==='')
    {
        alert("Please Enter Valid Ingrediant")
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="card" id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="food">
                <h3>${meal.strMeal}</h3>
                <button class="receipe-btn" id="btn1" >get receipe</button>
              </div>
                `;
              
            });
        } 
        else
        {
            html=`
                <div class="notfound"><h2>OOPS!! We didnot find any matching meals for your ingrediants...</h2></div>
            `;
        }
        inputbox.value="";
        cards.innerHTML=html;
    });

}
function getmeallist2(){
    let searchInputTxt = document.getElementById('inputbox').value.trim();
    if(searchInputTxt==='')
    {
        alert("Please Enter Valid Category")
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="card" id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="food">
                <h3>${meal.strMeal}</h3>
                <button class="receipe-btn" id="btn1" >get receipe</button>
              </div>
                `;
              
            });
        } 
        else
        {
            html=`
                <div class="notfound"><h2>OOPS!! We didnot find any matching meals for your ingrediants...</h2></div>
            `;
        }
        inputbox.value="";
        cards.innerHTML=html;
    });

}
function getmeallist3(){
    let searchInputTxt = document.getElementById('inputbox').value.trim();
    if(searchInputTxt==='')
    {
        alert("Please Enter Valid Area")
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="card" id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="food">
                <h3>${meal.strMeal}</h3>
                <button class="receipe-btn" id="btn1" >get receipe</button>
              </div>
                `;
              
            });
        } 
        else
        {
            html=`
                <div class="notfound"><h2>OOPS!! We didnot find any matching meals for your ingrediants...</h2></div>
            `;
        }
        inputbox.value="";
        cards.innerHTML=html;
    });

}

function getmeals(e){
    e.preventDefault();
    if(e.target.classList.contains('receipe-btn')){
        let mealItem = e.target.parentElement;
        console.log(mealItem)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}

function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
    <button id="closebtn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg></button>
    <h2>Name: ${meal.strMeal}</h2>
    <h2>Category: ${meal.strCategory}</h2>
    <h2>Instructions:</h2>
    <p>${meal.strInstructions}</p>
    <img src="${meal.strMealThumb}" alt="">
    <a href="${meal.strYoutube}" target="_blank">Watch Here</a>
    `;
    console.log(html);
    details.innerHTML = html;
    console.log(details)
    details.classList.remove('dontshow')
    details.classList.add('show');
    console.log(details);
    var closebtn=document.getElementById('closebtn');
    closebtn.addEventListener('click',() =>{
        details.classList.remove('show')
        details.classList.add('dontshow');
    })
}

