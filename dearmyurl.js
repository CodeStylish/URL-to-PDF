const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const wt = require('whattimeisitnow');

var myCookies = [];

let surl = 'about:blank';
let cName = '';
let cValue = '';
let cDomain = '';


async function urltopdf(getParams){
    var dt = new Date();
    var hours = ('0' + dt.getHours()).slice(-2); 
    var minutes = ('0' + dt.getMinutes()).slice(-2);
    var seconds = ('0' + dt.getSeconds()).slice(-2); 
    console.log(hours + ':' + minutes + ':' + seconds);

    

    const browser = await puppeteer.launch({ headless: true });
    const webPage = await browser.newPage();
    //await webPage.setCookie(...myCookies);

    if (getParams.originType === "url") {        
        await webPage.setCookie({
            'name' : getParams.name,
            'value' : decodeURIComponent(getParams.value),
            'domain' : getParams.domain
        });

        await webPage.goto(getParams.url,{
            waitUntil: "networkidle0",
            timeout: 10000
            //networkIdleTimeout: 3000
        });

        await webPage.waitFor(1000);

    }else{
        let htmlText = fs.readFileSync(getParams.url, "utf8");
        await webPage.setContent(htmlText);
    }

    if (getParams.type==="image") {
/* loadingstatus
        let loadingstatus = await webPage.waitFor(
            "<insert name=loadingstatus value=true>"
        );
*/        
        // viewport      
        webPage.setViewport({
            width:1200,
            height:800,
            deviceScaleFactor:1
        });

        const image = await webPage.screenshot({
            path : getParams.outputpath,
            fullPage: true,
            printBackground: true,
            //quality: 300,
            format: "A4",
        })
    }else if (getParams.type==="pdf") {
        const pdf = await webPage.pdf({
            printBackground: true,
            displayHeaderFooter: false,
            path: getParams.outputpath,
            format: "A4",
            landscape: false,
            margin:{
                top: "10px",
                bottom: "10px",
                left: "10px",
                right: "10px"
            }
        }).then(_=>{
            console.log("File Downloaded.");
        }).catch(e=>{
            console.log(e);
        });
    }
    var dt = new Date();
    var hours = ('0' + dt.getHours()).slice(-2); 
    var minutes = ('0' + dt.getMinutes()).slice(-2);
    var seconds = ('0' + dt.getSeconds()).slice(-2); 
    console.log(hours + ':' + minutes + ':' + seconds);       

    await webPage.close();
    await browser.close();
}

cOriginType = process.argv[2];
ctype = process.argv[3];
cName = process.argv[4];
cValue = process.argv[5];
cDomain = process.argv[6];
cOuputpath = process.argv[7];
cUrl = process.argv[8];

var paramInfo = function (param0, param1, param2, param3, param4, param5, param6) {
    this.originType = param0;
    this.type = param1;
    this.name = param2;
    this.value = param3;
    this.domain = param4;
    this.outputpath = param5;
    this.url = param6;
    
    return this;
}
var paramObj = new paramInfo(cOriginType, ctype, cName, cValue, cDomain, cOuputpath, cUrl);

console.log(paramObj);
//myCookies.push(mycook);
//console.log(mycook);

urltopdf(paramObj);

// command-line : 
// node urltopdf.js "pdf" "abc" "abcd" ".daum.net" "./url.pdf" "http://daum.net"
// node urltopdf.js "image" "abc" "abcd" ".daum.net" "./url.png" "http://daum.net"

// node "C:\Program Files (x86)\SAT Info\sPDFConvert\NodeJS\dearmyurl.js" "url" "pdf" "LtpaToken" "NoCookie" "http://daum.net" "C:\sPDFTmp\ConvertFiles\66F387DDEB29317C851953F0C0057A30A1FE25C3\66F387DDEB29317C851953F0C0057A30A1FE25C3.pdf" "http://daum.net"

// node "C:\Program Files (x86)\SAT Info\sPDFConvert\NodeJS\dearmyurl.js" "file" "image" "LtpaToken" "NoCookie" "none" "./html.png" "./test.html"

//node "D:\NodeJS\urltopdf\URL-to-PDF\dearmyurl.js" "file" "image" "LtpaToken" "NoCookie" "none" "./html.jpg" "./test.html"

//htmlviewer.exe "IMAGE_CONVERT" "D:\test\bgf\1.html" "0" "0" "D:\test\bgf\1.jpg" "none" "300" "none" "none"