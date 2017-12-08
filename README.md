# puppeteer-prerenderer
Usees puppeteer to get the html of a page and save it to a file (or optionally output it to the console)


| parameter | description | required | example |
| ------ | ------ | ------ | ------ |
| -u, --url | The url you want to render | true |--url="http://www.google.com" |
| -o, --output | The ouput path | true |--output="./test.html" |
| -t, --time | The amount of time (in milliseconds) to wait before rendering | false | --time=1000 |
| -e, --element | css selector to wait for before rendering | false | --element="#q" |
| -m, --minify | if flag is passed will minify html (and inline js/css) | false | --minify |
