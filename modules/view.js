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
    reposElement.textContent = reposData.name
    this.reposList.append(reposElement)
    reposElement.addEventListener('click', () => this.showReposData(reposData))
  }

  clearInput() {
    this.addReposWrapper.textContent = ''
  }

  showReposData(name) {
    const reposElementAdded = this.createElement('li', 'repos-prev-added')
    const createBth = this.createElement('button', 'bth')
    createBth.addEventListener('click', function () {
      reposElementAdded.remove()
    })
    const reposElementSpan = this.createElement('span', 'elAdded')
    reposElementSpan.textContent = `Name: ${name.name}
Owner: ${name.owner.login}
Stars: ${name.stargazers_count}`

    reposElementAdded.append(reposElementSpan)
    this.addReposList.append(reposElementAdded)

    reposElementAdded.appendChild(createBth)

    this.searchInput.value = ''
    this.reposList.textContent = ''
    }
  }
}
