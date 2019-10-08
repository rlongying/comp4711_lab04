const ARTISTS_KEY = "artists";

const refreshArtistList = () => {
  clearArtistList();
  let artistsToDisplay = [];
  let myArtists = localStorage.getItem(ARTISTS_KEY);
  if (myArtists !== null) {
    artistsToDisplay = JSON.parse(myArtists);
  }
  if (artistsToDisplay.length > 0) {
    artistsToDisplay.forEach(artist => {
      const { name, desc, url } = artist;
      displayArtist(name, desc, url);
    });
  }
};

function displayArtist(artist_name, artist_desc, url) {
  var artist_list = document.querySelector(".artist_list");

  //   <li class="artist">
  //     <img src="https://randomuser.me/api/portraits/med/women/1.jpg" alt="" />

  //     <div class="artist_info">
  //       <h3 class="artist_name">Hillary Hewitt Goldwynn-Post</h3>
  //       <p class="artist_desc">New Yor University</p>
  //     </div>

  //   </li>;

  var li = document.createElement("div");
  li.setAttribute("class", "artist");

  var img = document.createElement("img");
  img.setAttribute("src", url);
  li.appendChild(img);

  var info_div = document.createElement("div");
  info_div.setAttribute("class", "artist_info");

  var name = document.createElement("h3");
  name.textContent = artist_name;
  name.setAttribute("class", "artist_name");

  var desc = document.createElement("p");
  desc.textContent = artist_desc;
  desc.setAttribute("class", "artist_desc");

  var delete_btn = document.createElement("button");
  delete_btn.setAttribute("class", "delete_artist_btn");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", () => {
    let name = delete_btn.parentElement.querySelector(".artist_name")
      .textContent;
    delete_btn.parentElement.remove();
    deleteArtistFromLocal(name);
  });

  info_div.appendChild(name);
  info_div.appendChild(desc);
  li.appendChild(info_div);
  li.appendChild(delete_btn);

  artist_list.appendChild(li);
}

const addArtist = () => {
  var name = document.querySelector("#artist_name");
  var desc = document.querySelector("#artist_desc");
  var url = document.querySelector("#artist_url");

  saveArtistToLocal(name.value, desc.value, url.value);

  displayArtist(name.value, desc.value, url.value);

  name.value = "";
  desc.value = "";
  url.value = "";

  document.querySelector(".add_form").classList.add("hide");
};

const saveArtistToLocal = (name, desc, url) => {
  let myArtists = localStorage.getItem(ARTISTS_KEY);

  //not set
  if (myArtists === null) {
    myArtists = [];
  } else {
    myArtists = JSON.parse(myArtists);
  }

  let newArtist = {
    name,
    desc,
    url
  };

  myArtists.push(newArtist);

  localStorage.setItem(ARTISTS_KEY, JSON.stringify(myArtists));
};

const deleteArtistFromLocal = nameToDelete => {
  let myArtists = JSON.parse(localStorage.getItem(ARTISTS_KEY));

  myArtists = myArtists.filter(artist => {
    // console.log(artist.name);
    // console.log(nameToDelete);

    // if (nameToDelete === artist.name) {
    //   console.log("equal");
    // } else {
    //   console.log("not equal");
    // }

    return artist.name != nameToDelete;
  });

  localStorage.setItem(ARTISTS_KEY, JSON.stringify(myArtists));
};

const clearArtistList = () => {
  //clear all list under artist ul, if
  const artist_list = document.querySelector(".artist_list");
  while (artist_list.lastChild) {
    artist_list.removeChild(artist_list.lastChild);
  }
};

const searchArtists = () => {
  let keyword = document
    .querySelector("#search_box")
    .value.trim()
    .toLowerCase();

  if (keyword !== "") {
    let myArtists = JSON.parse(localStorage.getItem(ARTISTS_KEY));

    myArtists = myArtists.filter(artist => {
      return artist.name.toLowerCase().includes(keyword);
    });

    //clear
    clearArtistList();

    //show filtered artist
    if (myArtists.length > 0) {
      myArtists.forEach(artist => {
        const { name, desc, url } = artist;
        displayArtist(name, desc, url);
      });
    }
  } else {
    refreshArtistList();
  }
};

// bind event listeners
document.querySelector("#add_btn").addEventListener("click", addArtist);

document.querySelector(".add_artist_btn").addEventListener("click", () => {
  document.querySelector(".add_form").classList.toggle("hide");
});

document
  .querySelector(".search_artist_btn")
  .addEventListener("click", searchArtists);

document.querySelector("#search_box").addEventListener("input", searchArtists);

window.onload = refreshArtistList;
