
# beautiful-scrape

```js

var beautiful = require('beautiful-scrape')

class MyClass {
  async scrapeExample() {

    const reddit = await beautiful.scrape('http://www.reddit.com');

    // find first title
    const title = reddit.find("a.title")
    console.log(title)
    
    // find all titles
    reddit.findAll("a.title").forEach(title =>{
      console.log(title)
    });

    // get raw dom
    console.log(reddit.dom)

    // parse html
    const html = await beautiful.parse('<div>hello</div><div>world</div>');

    html.findAll("div").forEach(div =>{
      console.log(div)
    });

  }
}
```
