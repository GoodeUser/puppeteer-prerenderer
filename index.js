const program = require('commander');
const puppeteer = require('puppeteer');
const fs = require('fs');
const minifier = require('html-minifier')

program
    .version('0.1.0')
    .option('-u, --url <url>', 'The url you want to render')
    .option('-o, --output <output>', 'The ouput path')
    .option('-t, --time <time>', 'The amount of time to wait b4 rendering', parseInt)
    .option('-e, --element <element>', 'css selector to wait for b4 rendering')
    .option('-m, --minify', 'if flag is passed will minify html (and inline js/css)');

program.parse(process.argv);

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(program.url);

    try {
        if (program.element) {
            await page.waitForSelector(program.element);
        }

        if (program.time) {
            await page.waitFor(program.time);
        } else {
            await page.waitFor(1000);
        }
    } catch(err) {
        console.log('timeout');
    }

    let content = await page.content();

    if (program.minify) {
        content = minifier.minify(content, {
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
        });
    }

    fs.writeFileSync(program.output, content);
    await browser.close();
})();
