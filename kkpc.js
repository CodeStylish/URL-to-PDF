const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const wt = require('./whattimeisitnow');
const { exit } = require('process');

async function htmlparse(filePath, outputImage){
    try{
        if (!fs.existsSync(filePath)){
            console.log("file not exists : " + filePath);
        }
        wt.now('STA');

        let htmltext = fs.readFileSync(filePath, 'utf8');


        const $ = cheerio.load(htmltext);

        $('table').each(function(){
            $(this).attr('textalign','left');
        })

        //console.log($.html());

        //fs.writeFileSync('./result.html', $.html(), {'encoding':'utf-8'});

        const browser = await puppeteer.launch({ headless: true });
        const webPage = await browser.newPage();      
        
        //let htmlText = fs.readFileSync('./result.html', "utf8");

        //await webPage.goto('./result.html', {waitUntil: 'networkidle0'});
        //await webPage.content();
        await webPage.setContent($.html());
        //await webPage.waitForTimeout(1000);

        //await webPage.waitFor(1000);

        /*
        webPage.setViewport({
            width:1200,
            height:800,
            deviceScaleFactor:1
        });
        */

        const image = await webPage.screenshot({
            path : outputImage,
            fullPage: true,
            printBackground: true,
            omitBackground: true,
            //quality: 300,
            format: "A4",
        })        

        await webPage.close();
        await browser.close();
                
    }catch(e){
        console.log(e);
    }
    wt.now('FIN');

    exit(0);
}

htmlparse(process.argv[2], process.argv[3]);

// node kkpc.js "./824DF56DD7.html" "./result.jpg"