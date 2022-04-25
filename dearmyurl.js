const puppeteer = require('puppeteer');
const path = require('path');
// const myCookies = [
//     {name:'JSESSIONID', value:'729C5E71E5790461FC5C2702BE85AB5D.jvm1', domain:'blog.naver.com'}
// ]

var myCookies = [];

let surl = 'about:blank';
let cName = '';
let cValue = '';
let cDomain = '';

async function urltopdf(getParams){
    const browser = await puppeteer.launch({ headless: true });
    const webPage = await browser.newPage();
    //await webPage.setCookie(...myCookies);

    await webPage.setCookie({
        'name' : getParams.name,
        'value' : decodeURIComponent(getParams.value),
        'domain' : getParams.domain
    })

    await webPage.goto(getParams.url, {
        waitUntil: "networkidle0",
        timeout: 10000
        //networkIdleTimeout: 3000
    })

    await webPage.waitFor(1000);

    if (getParams.type==="image") {
        //await webPage.setContent();

/*        
        webPage.setViewport({
            width:500,
            height:500,
            deviceScaleFactor:2
        });
*/
        const image = await webPage.screenshot({
            path : getParams.outputpath,
            fullPage: true
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

    await webPage.close();
    await browser.close();

}

ctype = process.argv[2];
cName = process.argv[3];
cValue = process.argv[4];
cDomain = process.argv[5];
cOuputpath = process.argv[6];
cUrl = process.argv[7];

// console.log(surl);
// console.log(cName);
 console.log(cOuputpath);
 console.log(cUrl);

var CookieInfo = function (param1, param2, param3, param4, param5, param6) {
    this.type = param1;
    this.name = param2;
    this.value = param3;
    this.domain = param4;
    this.outputpath = param5;
    this.url = param6;
    
    return this;
}
var mycook = new CookieInfo(ctype, cName, cValue, cDomain, cOuputpath, cUrl);

console.log(mycook);
//myCookies.push(mycook);
//console.log(mycook);

urltopdf(mycook);


// command-line : 
// node urltopdf.js "pdf" "abc" "abcd" ".daum.net" "./url.pdf" "http://daum.net"
// node urltopdf.js "image" "abc" "abcd" ".daum.net" "./url.png" "http://daum.net"

// node "C:\Program Files (x86)\SAT Info\sPDFConvert\NodeJS\dearmyurl.js"  "pdf" "LtpaToken" "NoCookie" "http://daum.net" "C:\sPDFTmp\ConvertFiles\66F387DDEB29317C851953F0C0057A30A1FE25C3\66F387DDEB29317C851953F0C0057A30A1FE25C3.pdf" "http://daum.net"