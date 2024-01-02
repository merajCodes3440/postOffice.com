const btn = document.querySelector(".btn");
     // btn.classList.add("removeBtn");
    btn.addEventListener('click',()=>{
      for(let i=0;i<1000;i++){
         console.log(i);
      }
      window.location.href="index.html"
    })