const htmlPdf = require('html-pdf');
const fs = require('fs');
const cheerio = require('cheerio');
const domparser = require('html-dom-parser');

async function htmlparse(filePath){
    try{
        if (!fs.existsSync(filePath)){
            console.log("file not exists : " + filePath);
        }
        let htmltext = fs.readFileSync(filePath, 'utf8');

        console.log(htmltext);
        //console.log(domparser(htmltext));

        //const $ = cheerio.load(htmltext);
        //$.html();
        //$.text();

    }catch(e){
        console.log(e);
    }
}

async function htmlto(typeOffice, filePath, fileName, toBeGenFileName){
    try{
        let HTMLFilePath = `.${filePath}${fileName}`;

        if (!fs.existsSync(HTMLFilePath)){
            console.log("file not exists : " + HTMLFilePath);
        }else{console.log(HTMLFilePath);}

        typeOffice === "PNG" ? toBeGenFileName += ".png" : toBeGenFileName += ".pdf"

        const htmlcontent = fs.readFileSync(HTMLFilePath, 'utf8');

        const htmlToPdfOption = {
            "type": typeOffice,  // png,jpeg, pdf            
            "quality" : 100,
            "height": "650px",
            "width": "850px",
            "renderDelay": 2000,
            "format": "Tabloid",  // Letter, A3, A5, Legal, Tabloid...
            //"orientation": "landscape",  // portrait or landscape

/*            
            "httpCookies": [
                {
                  "name": "Valid-Cookie-Name", // required
                  "value": "Valid-Cookie-Value", // required
                  "domain": "localhost",
                  "path": "/foo", // required
                  "httponly": true,
                  "secure": false,
                  "expires": (new Date()).getTime() + (1000 * 60 * 60) // e.g. expires in 1 hour
                }
              ]            
*/            
        };

        htmlPdf.create(htmlcontent, htmlToPdfOption).toFile(toBeGenFileName, function(err, result){
            if (err) return console.log(err);
            console.log(result);
        });

    }catch(error){
        console.log("ERROR", error);
    }
}

//htmlto("PNG", "/", "test.html", "result");

// command-line : 
// node dearmyhtml.js "image" "./html.png" "./test.html"

htmlparse("./test.html");
