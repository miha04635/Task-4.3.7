export class View {
  constructor(api) {
    this.app = document.getElementById('app')
    this.api = api

    this.searchLine = this.createElement('div', 'search-line')
    this.searchInput = this.createElement('input', 'search-input')
    this.searchLine.append(this.searchInput)

    this.reposWrapper = this.createElement('div', 'repos-wrapper')
    this.reposList = this.createElement('ul', 'repos')
    this.reposWrapper.append(this.reposList)

    this.addReposWrapper = this.createElement('div', 'add-repos-wrapper')
    this.addReposList = this.createElement('ul', 'add-repos-list')
    this.addReposWrapper.append(this.addReposList)

    this.main = this.createElement('div', 'main')

    this.main.append(this.reposWrapper)
    this.main.append(this.addReposWrapper)

    this.app.append(this.searchLine)
    this.app.append(this.main)
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag)
    if (elementClass) {
      element.classList.add(elementClass)
    }
    return element
  }

  createRepos(reposData) {
    const reposElement = this.createElement('li', 'repos-prev')
    reposElement.innerHTML = `<span class='repos-prev-name'>${reposData.name}</span>`
    this.reposList.append(reposElement)
    reposElement.addEventListener('click', () => this.showReposData(reposData))
  }

  clearInput() {
    this.addReposWrapper.innerHTML = ''
  }

  showReposData(name) {
    const reposElementAdded = this.createElement('li', 'repos-prev-added')
    const createBth = this.createElement('button', 'bth')
    createBth.addEventListener('click', function () {
      reposElementAdded.remove()
    })
    reposElementAdded.innerHTML =
      `<span class='elAdded'>Name: ${name.name}</span>` +
      `
    <br><span class='elAdded'>Owner: ${name.owner.login}</span><br>` +
      `<span class='elAdded'>Stars: ${name.stargazers_count}</span>`
    this.addReposList.append(reposElementAdded)

    reposElementAdded.appendChild(createBth)
  }
}
