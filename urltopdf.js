const puppeteer = require('puppeteer');

// const myCookies = [
//     {name:'JSESSIONID', value:'729C5E71E5790461FC5C2702BE85AB5D.jvm1', domain:'blog.naver.com'}
// ]

var myCookies = [];

let surl = 'about:blank';
let cName = '';
let cValue = '';
let cDomain = '';

async function urltopdf(myCookies){
    const browser = await puppeteer.launch({ headless: true });
    const webPage = await browser.newPage();

    //await webPage.setCookie(...myCookies);

    await webPage.setCookie({
        'name' : myCookies.name,
        'value' : myCookies.value,
        'domain' : myCookies.domain
    })

    await webPage.goto(surl, {
        waitUntil: "networkidle0"
    })

    const pdf = await webPage.pdf({
        printBackground: true,
        displayHeaderFooter: true,
        path: "webpage.pdf",
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

    await browser.close();

}

surl = process.argv[2];
cName = process.argv[3];
cValue = process.argv[4];
cDomain = process.argv[5];

console.log(surl);
console.log(cName);
console.log(cValue);
console.log(cDomain);

var CookieInfo = function (c1, c2, c3) {
    this.name = c1;
    this.value = c2;
    this.domain = c3;
    
    return this;
}
var mycook = new CookieInfo(cName, cValue, cDomain);

//console.log(mycook);

//myCookies.push(mycook);

//console.log(mycook);

urltopdf(mycook);