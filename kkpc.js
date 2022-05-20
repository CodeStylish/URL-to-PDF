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
            $(this).attr('align','left');
        })

        //console.log($.html());

        //fs.writeFileSync('./result.html', $.html(), {'encoding':'utf-8'});

        const browser = await puppeteer.launch({ headless: true });
        const webPage = await browser.newPage();      
        
        await webPage.setContent($.html());

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
            //quality: 300,
            format: "A4",
        })        

    }catch(e){
        console.log(e);
    }
    wt.now('FIN');

    exit(0);
}

htmlparse(process.argv[2], process.argv[3]);

// node kkpc.js "./test.html" "./result.jpg"