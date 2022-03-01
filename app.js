const searchMobile = () => {
  const searhField = document.getElementById("search-field");
  const failedError = document.getElementById("notify-fail");
  const searchText = searhField.value;
  //   clear data
  searhField.value = "";
  if (
    searchText.toUpperCase() != "HUAWEI" &&
    searchText.toUpperCase() != "IPHONE" &&
    searchText.toUpperCase() != "SAMSUNG" &&
    searchText.toUpperCase() != "OPPO" &&
    searchText == ""
  ) {
    failedError.style.display = "block";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    //   console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(info => displaySearchResult(info.data));
    failedError.style.display = "none";
  }
};

const displaySearchResult = data => {
  const searchResult = document.getElementById("search-result");

  const mobileDetails = document.getElementById("mobile-details");
  // Clear data
  mobileDetails.textContent = "";
  searchResult.textContent = "";
  if (data.length == 0) {
    // no result found
  }
  data.forEach(data => {
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

  if (`${mobile.releaseDate}` != "") {
    div.innerHTML = `
    <img src="${mobile.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${mobile.name}</h5>
      <p class="card-text">Release Date: ${mobile.releaseDate}</p>
      <p class="card-text">Main Features:
        <p class="fw-light">Storage: ${mobile.mainFeatures.storage}</p>
        <p class="fw-light">Display Size: ${mobile.mainFeatures.displaySize}</p>
        <p class="fw-light">ChipSet: ${mobile.mainFeatures.chipSet}</p>
        <p class="fw-light">Memory: ${mobile.mainFeatures.memory}</p>
      </p>
      <p class="card-text">Sensors: ${mobile.mainFeatures.sensors}</p>
      <p class="card-text">Others: ${mobile.others}</p>
      
    </div>
`;
  } else {
    div.innerHTML = `
    <img src="${mobile.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${mobile.name}</h5>
      <p class="card-text">Release Date: No release date found</p>
      <p class="card-text">Main Features:
        <p class="fw-light">Storage: ${mobile.mainFeatures.storage}</p>
        <p class="fw-light">Display Size: ${mobile.mainFeatures.displaySize}</p>
        <p class="fw-light">ChipSet: ${mobile.mainFeatures.chipSet}</p>
        <p class="fw-light">Memory: ${mobile.mainFeatures.memory}</p>
      </p>
      <p class="card-text">Sensors: ${mobile.mainFeatures.sensors}</p>
      <p class="card-text">Others:
        <p class="fw-light">WLAN: ${mobile.mainFeatures.WLAN}</p>
        <p class="fw-light">Bluetooth: ${mobile.mainFeatures.Bluetooth}</p>
        <p class="fw-light">GPS: ${mobile.mainFeatures.GPS}</p>
        <p class="fw-light">NFC: ${mobile.mainFeatures.NFC}</p>
        <p class="fw-light">Radio: ${mobile.mainFeatures.Radio}</p>
      </p>
      <p class="card-text">Others: ${mobile.others}</p>
      
    </div>
`;
  }
  mobileDetails.appendChild(div);
};
