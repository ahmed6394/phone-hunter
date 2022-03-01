const searchMobile = () => {
  const searhField = document.getElementById("search-field");
  const searchText = searhField.value;
  //   clear data
  searhField.value = "";
  if (searchText == "") {
    // Please write some thing to display
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    //   console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(info => displaySearchResult(info.data));
  }
};

const displaySearchResult = data => {
  const searchResult = document.getElementById("search-result");
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
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <img src="${mobile.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${mobile.name}</h5>
          </p>
          <p class="card-text">
          </p>
          <p class="card-text">
          </p>
          <p class="card-text">
          </p>
          
        </div>
  `;
  mobileDetails.appendChild(div);
};
