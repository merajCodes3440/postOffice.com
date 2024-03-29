console.log("scrit.js file")
function getUserInfo() {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {
     let ipAddress = data.ip;
     let ipadd2= document.getElementById("ipadd2")

         ipadd2.innerHTML=`<h4>${ipAddress}</h4>`;
//  ?token=a65aa5704d8782 token
       console.log(ipAddress)
// fatch additional info based on the ip address
        fetch(`https://ipinfo.io/${ipAddress}?token=a65aa5704d8782`)
          .then((response) => response.json())
          .then((data) => {
            const ip = data.ip;
           // console.log(data.ip);
            const lat = data.loc.split(",")[0];
            const lon = data.loc.split(",")[1];
            const timezone = data.timezone;
            const pincode = data.postal;
  // display location on map
            showLocationOnMap(lat, lon, data);
  // show timezone info
            showTimezone(timezone, pincode);
   // get and  display post offices based on pin code          
            getPostOffices(pincode);
  
           console.log(data);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      });
  }
   getUserInfo();
   
  function showLocationOnMap(lat, lon, data) {
    const mapDiv = document.getElementById("map");
    // const mapUrl = `https://www.google.com/maps/embed/v1/view?key=a65aa5704d8782=${lat},${lon}&zoom=10`;
    mapDiv.classList.add("map");
    const mapUrl = `<iframe src="https://maps.google.com/maps?q=${lat}, ${lon}&z=15&output=embed" width="100%" height="100%"></iframe>`;
  
    // const btn = document.querySelector(".btn");
    //  // btn.classList.add("removeBtn");
    // btn.addEventListener('click',()=>{
    //   window.location.href="test.html"
    // })
    
  
    const ipDetails = document.querySelector(".ipDetails");
    // console.log(data)
    ipDetails.innerHTML += `
          <ul>
            <li>Lat: ${lat}</li>
            <li>long: ${lon}</li>
          </ul>
          <ul>
            <li>City: ${data.city}</li>
            <li>Region: ${data.region}</li>
          </ul>
          <ul>
            <li>Organisation: ${data.org}</li>
            <li>Hostname: ${data.timezone}</li>
          </ul>
        
        `;
    mapDiv.innerHTML = mapUrl;
  }
  
  function showTimezone(timezone, pincode) {
    // for count of pincodes found
    var pincodeCount = 0;
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => response.json())
      .then((data) => {
        const postOffices = data[0].PostOffice;
        postOffices.forEach((element) => {
          pincodeCount++;
        });
  
        console.log(pincodeCount);
  
        //   console.log(timezone);
        const timezoneElement = document.getElementById("timezone");
        let currentTime = new Date().toLocaleString("en-US", {
          timeZone: timezone,
        });
  
           console.log(currentTime);
  
        timezoneElement.innerHTML += `
          <h3>Time Zone: ${timezone}</h3>
          <h3>Date And Time: ${currentTime}</h3>
          <h3>Pincode: ${pincode}</h3>
          <h3>Message: Number of pincode(s) found: ${pincodeCount}</h3>
        `;
      });
  }
  
  function getPostOffices(pincode) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => response.json())
      .then((data) => {
        const postOffices = data[0].PostOffice;
           console.log(postOffices);
  
        const postOfficeList = document.getElementById("postOfficeList");
        postOffices.forEach((postOffice) => {
          postOfficeList.innerHTML += `
            <ul class="Card">
                <li>Name: ${postOffice.Name}</li>
                <li>Branch Type: ${postOffice.BranchType}</li>
                <li>Delivery Status: ${postOffice.DeliveryStatus}</li>
                <li>District: ${postOffice.District}</li>
                <li>Division: ${postOffice.Division}</li>
            </ul>
            `;
        });
  
        const searchBar = document.getElementById("searchBoxed");
        searchBar.innerHTML += `
                <input
                type="text"
                id="searchBox"
                placeholder="Search By Name"
                oninput="filterPostOffices()"
                />
            `;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  
  function filterPostOffices() {
    const searchBox = document.getElementById("searchBox");
  
    const filter = searchBox.value.toUpperCase();
     console.log(filter)
    const postOfficeList = document.getElementById("postOfficeList");
  
    // const listItems = postOfficeList.getElementsByTagName("li");
    const listItems = postOfficeList.getElementsByTagName("ul");
  
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      console.log(listItem);
      const text = listItem.textContent || listItem.innerText;
      if (text.toUpperCase().indexOf(filter) > -1) {
        listItem.style.display = "";
      } else {
        listItem.style.display = "none";
      }
    }
  }