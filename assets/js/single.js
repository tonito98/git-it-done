let limitWarningEL = document.querySelector("#limit-warning");

let issueContainerEL = document.querySelector("#issues-container");

let getRepoIssues = function(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                //pass response data to dom function
                displayIssues(data);
            });

            // check if api has paginated issues
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
        }
        else {
            alert("There was a problem with your request!");
        }
    });
    console.log(repo);
};

getRepoIssues("facebook/react");

let displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEL.textContent = "This repo has no issues!";
        return;
    }
    for(var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        let issueEL = document.createElement("a");
        issueEL.classList = "list-item flex-row justify-space-between align-center";
        issueEL.setAttribute("href", issues[i].html_url);
        issueEL.setAttribute("target", "_blank");
        // create span to hold issue title
        let titleEL = document.createElement("span");
        titleEL.textContent = issues[i].title;

        // append to container
        issueEL.appendChild(titleEL);

        // create a type element
        let typeEL = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEL.textContent = "(Pull request)";
        } else {
            typeEL.textContent = "(Issue)";
        }

        //append to container
        issueEL.appendChild(typeEL);

        issueContainerEL.appendChild(issueEL);
    }
};

let displayWarning = function(repo) {
    // add text to warning container
    limitWarningEL.textContent = "To see more than 30 issues, visit ";
    // append a link element
    let linkEL = document.createElement("a");
    linkEL.textContent = "See More Issues on GitHub.com";
    linkEL.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEL.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEL.appendChild(linkEL);
};

