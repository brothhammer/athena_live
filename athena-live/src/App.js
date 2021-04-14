import './App.css';
import React, { useEffect, useState } from 'react';

import { Avatar, Grid, Button } from "@material-ui/core";

const getRepos = async () => {
    try{
      const response = await fetch('https://api.github.com/search/repositories?q=stars:>10000&sort=stars')
        .then(res => res.json());
      // console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
}

const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];

const filter = (repos, language) => {
  if(language === "All"){
    return repos;
  }
  return repos.filter(repos => repos.language === language);
}

function App() {

  const [repos, setRepos] = useState([])
  const [language, setLanguage] = useState('All');

  useEffect(async () => {
    const repos = await getRepos();
    setRepos(repos.items);
  }, []);

  console.log(repos);

  const filteredRepos = filter(repos, language);

  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          {
            languages.map((languageButton) =>
              <Button
                color={language !== languageButton ? "primary" : "secondary"}
                onClick={() => setLanguage(languageButton)}>
                {languageButton}
              </Button>
            )
          }
        </Grid>

      {console.log(language)}
      <br/>
      {
        filteredRepos.length && filteredRepos.map((repo, i) =>
          <>
            <Grid item xs={3}>
                <pre key={i} >
                  #{i+1}
                  <Avatar alt="Pic" src={repo.owner.avatar_url}/>
                  {repo.name}
                  <div/>
                  @{repo.owner.login}
                  <div/>
                  {repo.stargazers_count} stars
                </pre>
            </Grid>
          </>
        )
      }
      </Grid>
    </>
  );
}

export default App;
