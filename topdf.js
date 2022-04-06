const puppeteer = require('puppeteer');

const myCookies = [
    {name:'JSESSIONID', value:'4BF4CDBA554AB11DF839D281846B91CE.jvm1'}
]
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await webPage.setCookie(...myCookies);
  await page.goto('https://blog.naver.com/backtothefuture', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ path: "webpage.pdf",format: 'A4', landscape: true }); 
  await browser.close();
  
}

printPDF();