
module.exports.now = function(tag){

    var dt = new Date();
    var hours = ('0' + dt.getHours()).slice(-2); 
    var minutes = ('0' + dt.getMinutes()).slice(-2);
    var seconds = ('0' + dt.getSeconds()).slice(-2); 

    var year = dt.getFullYear(); 
    var month = dt.getMonth() + 1; 
    var date = dt.getDate();

    console.log('['+tag+'] ' + year +'-'+month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
}