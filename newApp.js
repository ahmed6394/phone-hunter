const searchMobile = () => {
  const searhField = document.getElementById("search-field");
  const searchText = searhField.value;
  //   clear data
  searhField.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  //   console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(info => displaySearchResult(info.data));
};

const displaySearchResult = data => {
  const searchResult = document.getElementById("search-result");
  //   console.log(data.length);
  const mobileDetails = document.getElementById("mobile-details");
  // Clear data
  mobileDetails.textContent = "";
  searchResult.textContent = "";
  if (data.length == 0) {
    alert("No phone found!! Please, try again...");
  } else {
    data.slice(0, 20).forEach(data => {
      // console.log(data);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
              <div class="card h-100 container py-3">
                <img src="${data.image}" class="card-img-top h-60" alt="..." />
                <div class="card-body">
                  <h5 class="card-title fw-bold">${data.brand}</h5>
                  <p class="card-text fw-bolder">${data.phone_name}
                  </p>
                </div>
                <button onclick="loadMobileDetails('${data.slug}')" type="button" class="btn btn-primary mx-auto" style =" width: 85px">Details</button>
              </div>
              
          `;
      searchResult.appendChild(div);
    });
  }
};

const loadMobileDetails = mobileId => {
  const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMobileDetail(data.data));
};

const displayMobileDetail = mobile => {
  console.log(mobile);

  const mobileDetails = document.getElementById("mobile-details");
  mobileDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
      <img src="${mobile.image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${mobile.name}</h5>
        <p class="card-text">Release Date: ${
          mobile.releaseDate ? mobile.releaseDate : "Release date not found"
        }</p>
        <p class="card-text">Main Features:
          <p class="fw-light">Storage: ${mobile.mainFeatures.storage}</p>
          <p class="fw-light">Display Size: ${
            mobile.mainFeatures.displaySize
          }</p>
          <p class="fw-light">ChipSet: ${mobile.mainFeatures.chipSet}</p>
          <p class="fw-light">Memory: ${mobile.mainFeatures.memory}</p>
        </p>
        <p class="card-text">Sensors: ${mobile.mainFeatures.sensors}</p>
        <p class="card-text">Others: 
          <p class="fw-light">WLAN: ${mobile.others.WLAN}</p>
          <p class="fw-light">Bluetooth: ${mobile.others.Bluetooth}</p>
          <p class="fw-light">GPS: ${mobile.others.GPS}</p>
          <p class="fw-light">NFC: ${mobile.others.NFC}</p>
          <p class="fw-light">Radio: ${mobile.others.Radio}</p>
        </p>
      </div>
  `;
  mobileDetails.appendChild(div);
};
