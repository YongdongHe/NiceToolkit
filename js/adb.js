module.exports =  {getAdbCmd,runCmd,runCmdArray};


function getAdbCmd(deviceId,cmd){
    if(deviceId != ""){
        return "adb -s " + deviceId + " " + cmd;
    }else{
        return "adb " +  cmd;
    }
}


function runCmd(cmd) {
    return new Promise((resolve, reject) => {
        let exec = require('child_process').exec
        exec(cmd, function (err, stdout, stderr) {
            if(err){
                reject(stderr);
            }else{
                resolve(stdout);
            }
        });
    });
}

 function runCmdArray(cmds) {
    return new Promise((resolve, reject) => {
        console.log("runCmdArray");
        
        let exec = require('child_process').exec
        function _runCmds(_cmds){
            console.log(_cmds);
            if(_cmds.length <= 0){
                resolve("Execute all cmd finished.");
                return;
            }
            let cmd = _cmds.shift()
            console.log("exec");
            console.log(cmd);
            exec(cmd, function (err, stdout, stderr) {
                if(err){
                    reject(stderr);
                }else{
                    console.log(stdout);
                    _runCmds(_cmds);
                }
            });
        }
        _runCmds(cmds);
        
    });
}
