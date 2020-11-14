import { graphql } from "https://cdn.pika.dev/@octokit/graphql";

const query = `
query GetMyRepos {
    viewer {
        repositories(last: 20, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
          totalCount
          nodes{
            name
            description
            forkCount
            updatedAt
            stargazers {
              totalCount
            },
            primaryLanguage {
                name
              }
          }
          }
       }
}
`;

const token = "c0c6649a83c3252a4cc7adb66889738c750f59f8";
const auth = {
  headers: {
    authorization: "token " + token,
  },
};

async function loadRepos(query, auth) {
  return await graphql(query, auth);
}

window.onload = (event) => {
  (async () => {
    const data = await loadRepos(query, auth);
    const dataFiltered = data.viewer.repositories.nodes;

    let eachRepo = "";
    dataFiltered.map((repo) => {
      return (eachRepo += `
            <div class = "all-repos">
            <h3>${repo.name}</h3>
            <div class = "col-1">
            <p>${repo.description}</p>
            <button><span><i class="fa fa-star-o" aria-hidden="true"></i></span>Star</button>
            </div>
            <div class = "col-2">
            <p>${repo.primaryLanguage.name}</p>
            <p><span><i class="fa fa-star-o" aria-hidden="true"></i></span>${repo.stargazers.totalCount}</p>
            <p><span><i class="fa fa-code-fork" aria-hidden="true"></i></span>${repo.forkCount}</p>
            <p>${repo.updatedAt}</p>
            </div>
            `);
    });

    let test = (document.querySelector(".display-repo").innerHTML = eachRepo);
  })();
};
