export class Search {
  constructor(view, api) {
    this.view = view
    this.api = api
    this.view.searchInput.oninput = this.debounce(
      this.loadRepos.bind(this),
      500
    )
  }

  loadRepos(event) {
    if (event.target.value) {
      this.clearRepos()
      this.reposRequest(event.target.value)
    } else {
      this.clearRepos()
    }
  }
  loadMoreRepos(event) {
    this.reposRequest(event.target.value)
  }

  reposRequest(searchValue) {
    this.api.loadRepos(searchValue).then(res => {
      if (res.ok) {
        res.json().then(res => {
          res.items.forEach(repo => this.view.createRepos(repo))
        })
      }
    })
  }

  clearRepos() {
    this.view.reposList.textContent = ''
  }

  debounce(func, wait, immediate) {
    let timeout
    return function () {
      const context = this,
        args = arguments
      const later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context.args)
    }
  }
}
