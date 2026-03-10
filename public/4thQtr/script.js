let rating = 0

const stars = document.querySelectorAll(".star")

stars.forEach(star=>{
    star.addEventListener("click",function(){

        rating = this.dataset.value

        stars.forEach(s=>s.classList.remove("active"))

        for(let i=0;i<rating;i++){
            stars[i].classList.add("active")
        }

    })
})

function addMovie(){

let title = document.getElementById("title").value
let year = document.getElementById("year").value
let genre = document.getElementById("genre").value

let movie = {
title:title,
year:year,
genre:genre,
rating:rating
}

let movies = JSON.parse(localStorage.getItem("movies")) || []

movies.push(movie)

localStorage.setItem("movies",JSON.stringify(movies))

displayMovies()

}

function displayMovies(){

let movies = JSON.parse(localStorage.getItem("movies")) || []

let list = document.getElementById("movieList")

list.innerHTML=""

movies.forEach(m=>{

let stars=""

for(let i=0;i<m.rating;i++){
stars+="★"
}

let div=document.createElement("div")

div.className="movie"

div.innerHTML=
`${m.title} (${m.year}) - ${m.genre}, Rating: <span style="color:gold">${stars}</span>`

list.appendChild(div)

})

}

displayMovies()