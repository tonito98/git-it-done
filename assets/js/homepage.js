//Define variables of the repo container event listener and search term repo
let repoContainerEL = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");
let languageButtonsEl = document.querySelector("#language-buttons");

let getFeaturedRepos = function(language) {
  let apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function(response){
    if (response.ok) {
     response.json().then(function(data){
       displayRepos(data.items, language);
     });
    } else {
      alert('Error: GitHub User Not Found');
    }
  });
};


let getUserRepos = function(user){
    //format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl)
    .then(function(response){
      // if request was successful display the list of repos and issues count
      if (response.ok) {
      response.json().then(function(data){
        displayRepos(data, user);
    });
  } else {
    alert("Error: Github User Not Found");
  }
  })
  .catch(function(error){
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to Github");
  })
};


//Define variables for user form event listener and name input event listener
let userFormEL = document.querySelector("#user-form");
let nameInputEL = document.querySelector("#username");

//Function executed upon a form submission browser event
let formSubmitHandler = function(event){
  //get value from input element
  let username = nameInputEL.value.trim();

  if(username) {
    getUserRepos(username);
    nameInputEL.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
  event.preventDefault();
  console.log(event);
};

//Added a submit event listener to userFormEL
userFormEL.addEventListener("submit", formSubmitHandler);

//Function to display repos
let displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEL.textContent = "No repositories found.";
    return;
  }
  //clear old content
  repoContainerEL.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  console.log(repos);
  console.log(searchTerm);
  //loop over repos
  for (var i = 0; i < repos.length; i++){
    //format repo name
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    let repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    //create a span element to hold repository name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);


       //Create a status of issue element
       let statusEL = document.createElement("span");
       statusEL.classList = "flex-row align-center";

       // check if current repo has issues or not
       if (repos[i].open_issues_count > 0) {
         statusEL.innerHTML = 
         "<i class='fas fa-times status-icon icon-danger'></i>" + "issues(s)";
       } else {
          statusEL.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
       }
       // append to container
       repoEl.appendChild(statusEL);
       


    //append container to the dom
    repoContainerEL.appendChild(repoEl)

  }
}

let buttonClickHandler = function(event){
    let language = event.target.getAttribute("data-language");
    console.log(language);
    if(language){
      getFeaturedRepos(language);

      // clear old content
      repoContainerEL.textContent = "";
    }
};

languageButtonsEl.addEventListener("click", buttonClickHandler);
