const { select } = require('soupselect-update')
const request = require('request-promise')
const htmlparser = require('htmlparser')

class BeautifulScrape {
  async scrape(url) {
    const response = await request.get({ url })
    return this.parse(response)
  }

  parse(html) {
    return new Promise(async (resolve, reject) => {
      const handler = new htmlparser.DefaultHandler(async (err, dom) => {
        if (err) {
          reject(err)
          return
        }

        const soup = select.bind(null, dom)
        resolve({
          find: selector => {
            const found = soup(selector)
            if (found.length) {
              return found[0]
            }
          },
          findAll: selector => {
            return soup(selector)
          },
          dom
        })
      })
      const parser = new htmlparser.Parser(handler)
      parser.parseComplete(html)
    })
  }
}

module.exports = new BeautifulScrape()
