var sa = require("superagent");

var index = 0;

var doPost = function () {
    
    let i = index++;
    let startTime = new Date();

    console.log(`start post request [${i}]: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`);

    sa.post('https://fee.dccnet.com.cn:554/icbc/ecams/ecollege/service')
        .set({
            'user-agent': 'ICBCiPhoneCSNew college 300000 fullversion:3.0.0',
            'accept': 'keep-alive',
            'content-type': 'application/x-www-form-urlencoded'
        })
        .send(
        {
            'action': "ecams_mainmenu.flowc",
            'appType': "O8hITWMbJP4=",
            'cino': "",
            'flowActionName': '001',
            'md5': "",
            'termType': "O8hITWMbJP4="
        }
        )
        .end((req, res) => {
            let endTime = new Date();

            if(res && res.status == 200
                && res.text.substr(0, 5) === '{"md5'){
                console.log(`end post request [${i}]: success ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}:${endTime.getMilliseconds()}`);
            }else{
                console.log(`end post request [${i}]: false ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}:${endTime.getMilliseconds()}`);
            } 
        });
}

setInterval(doPost, 500);