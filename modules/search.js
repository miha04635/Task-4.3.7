export class Search {
  constructor(view, api) {
    this.view = view
    this.api = api
    this.view.searchInput.addEventListener(
      'keyup',
      this.debounce(this.loadRepos.bind(this), 500)
    )
  }

  loadRepos() {
    const searchValue = this.view.searchInput.value
    if (searchValue) {
      this.clearRepos()
      this.reposRequset(searchValue)
    } else {
      this.clearRepos()
    }
  }
  loadMoreRepos() {
    this.reposRequset(this.view.searchInput.value)
  }

  reposRequset(searchValue) {
    this.api.loadRepos(searchValue).then(res => {
      if (res.ok) {
        res.json().then(res => {
          res.items.forEach(repo => this.view.createRepos(repo))
        })
      } else {
      }
    })
  }

  clearRepos() {
    this.view.reposList.innerHTML = ''
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
