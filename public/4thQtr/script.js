let rating = 0

const stars = document.querySelectorAll(".star")

stars.forEach(star=>{
    star.addEventListener("click",function(){

        rating = Number(this.dataset.value)

        stars.forEach(s=>s.classList.remove("active"))

        for(let i=0;i<rating;i++){
            stars[i].classList.add("active")
        }
    })
})

function addMovie(){

let title = document.getElementById("title").value.trim()
let year = document.getElementById("year").value
let genre = document.getElementById("genre").value

if(!title || !year || rating === 0){
    alert("Please fill out all fields!")
    return
}

let movies = JSON.parse(localStorage.getItem("movies")) || []

let existingIndex = movies.findIndex(m => m.title.toLowerCase() === title.toLowerCase())

if(existingIndex !== -1){

    let oldMovie = movies[existingIndex]

    
    let avgRating = Math.round((Number(oldMovie.rating) + rating) / 2)

    movies[existingIndex] = {
        title:title,
        year:year,
        genre:genre,
        rating:avgRating
    }

}else{

    movies.push({
        title:title,
        year:year,
        genre:genre,
        rating:rating
    })
}

localStorage.setItem("movies", JSON.stringify(movies))

displayMovies()
resetForm()
}


function deleteMovie(index){

let confirmDelete = confirm("Are you sure you want to delete?")

if(confirmDelete){

    let movies = JSON.parse(localStorage.getItem("movies")) || []

    movies.splice(index,1)

    localStorage.setItem("movies", JSON.stringify(movies))

    displayMovies()
}
}


function displayMovies(){

let movies = JSON.parse(localStorage.getItem("movies")) || []

let list = document.getElementById("movieList")

list.innerHTML=""

movies.forEach((m,index)=>{

let starsHTML = ""

for(let i=0;i<m.rating;i++){
starsHTML += "★"
}

let div = document.createElement("div")
div.className = "movie"

div.innerHTML = `
${m.title} (${m.year}) - ${m.genre}, Rating: 
<span style="color:gold">${starsHTML}</span>
<button onclick="deleteMovie(${index})">Delete</button>
`

list.appendChild(div)

})
}


function resetForm(){
document.getElementById("title").value = ""
document.getElementById("year").value = ""
rating = 0

stars.forEach(s=>s.classList.remove("active"))
}

displayMovies()