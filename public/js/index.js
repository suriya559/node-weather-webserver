
const weatherFrom = document.querySelector('form');
const inputSearch = document.querySelector('input');
const message1 = document.querySelector('#first');
const message2 = document.querySelector('#second')


weatherFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = inputSearch.value;
  
  fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
   res.json().then((data) =>{
    if(data.error) {
       return message1.textContent = data.error;

    }
     message2.textContent = data.forcast +' '+data.address;
     inputSearch.textContent = ''
   })
})

})