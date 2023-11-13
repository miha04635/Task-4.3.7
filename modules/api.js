const URL = 'https://api.github.com/search/repositories?q='
const perPage = 5

export class Api {
  async loadRepos(value) {
    return await fetch(`${URL}${value}&per_page=${perPage}`)
  }

  loadReposData(name) {
    const urls = []
    const requests = urls.map((url = fetch(urls)))
    return Promise.all(requests).then(responses =>
      Promise.all(responses.map(r => r.json))
    )
  }
}
