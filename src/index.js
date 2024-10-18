document.addEventListener("DOMContentLoaded", main);

const baseURL =("http://localhost:3000/ramens");

function main(){
    displayRamens();
    addSubmitListener();
}

function displayRamens(){
    fetch(baseURL)
    .then(response=>response.json())
    .then(ramen =>{
        const ramenMenu = document.getElementById('ramen-menu');
    console.log(ramen)
        ramen.forEach(ramen=>{
         const img = document.createElement('img');
         img.src = ramen.image;
         img.alt = ramen.image;
         img.addEventListener('click', () => handleClick(ramen));
    
         ramenMenu.appendChild(img);

        })
    })
    .catch(error=>console.error('Error fetching ramen date',error));
}
function handleClick(ramen) {
   
    document.querySelector('#ramen-detail img').src = ramen.image;
    document.querySelector('#ramen-detail .name').textContent = ramen.name;
    document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant;
    document.querySelector('#rating-display').textContent = ramen.rating;
    document.querySelector('#comment-display').textContent = ramen.comment;
}
function addSubmitListener() {
    const form = document.getElementById('new-ramen');
        
        form.addEventListener('submit', event => {
            event.preventDefault();
           
            const newRamen = {
                name: document.getElementById('new-name').value,
                restaurant: document.getElementById('new-restaurant').value,
                image: document.getElementById('new-image').value,
                rating: document.getElementById('new-rating').value,
                comment: document.getElementById('new-comment').value
            };
            fetch('http://localhost:3000/ramens', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRamen),
              })
              .then(response => response.json()) 
              .then(addedRamen => {
               
                const img = document.createElement('img');
                img.src = addedRamen.image; 
                img.alt = addedRamen.name;  
                img.addEventListener('click', () => handleClick(addedRamen)); 
            
                
                document.getElementById('ramen-menu').appendChild(img);
            
              
                form.reset();
              })
              .catch(error => console.error('Error adding new ramen:', error)); 
            
            // const img = document.createElement('img');
            // img.src = newRamen.image;
            // img.alt = newRamen.name;

            // img.addEventListener('click', () => handleClick(newRamen));
    
            // document.getElementById('ramen-menu').appendChild(img);
    
            // form.reset();
        });
    }
