const FilesWorker = require('./filesWorker.js')
const GoodReads = require('./goodreads.js')

// Store all content to JSON
storeContent().catch(e => console.error(e))


async function storeContent() {
  // site information
  await storeSiteInfo()

  // store projects
  await storeProjects()

  // get goodreads and store JSON
  await storeGoodreadsInfo();
}

async function storeSiteInfo() {
  const siteWorker = new FilesWorker('./../content/site')
  const siteInfo = await siteWorker.getFiles()
  FilesWorker.WriteJSONToFile('./../content/site.json', siteInfo[0], print.bind(this, 'site information.'))
}

async function storeProjects() {
  const projectWorker = new FilesWorker('./../content/projects')
  const projectInfo = await projectWorker.getFiles()
  FilesWorker.WriteJSONToFile('./../content/projects.json', projectInfo, print.bind(this, 'project information.'))
}

async function storeGoodreadsInfo() {
  const goodreadsWorker = new FilesWorker('./../content/goodreads')
  const info = await GoodReads.getCurrentlyReading()
  FilesWorker.WriteJSONToFile('./../content/goodreads.json',
    { current: info, favorites: {} },
    print.bind(this, 'goodreads info'))
}

function print(message) {
  console.log('Successfully generated:: ' + message)
}
