const btn = document.querySelector(".btn");

// btn.classList.add("removeBtn");
btn.addEventListener("click", () => {
  console.log("clicked")
  setTimeout(()=>{
     redirect()
  },1000)
 
});

function redirect() {
  window.location.href = "mainPage.html";
}
fetch("https://api.ipify.org/?format=json")
    .then((res) => res.json())
    .then((data) => {
      let ipAddress = data.ip;
      let ipadd = document.getElementById("ipadd");

      ipadd.innerHTML = `<h4>${ipAddress}</h4>`;
      //  ?token=a65aa5704d8782 token
      console.log(ipAddress);
    });