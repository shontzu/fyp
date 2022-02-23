const fs=require("fs");
function perElement(data /**site pd */,result/**out array of merchantsv2 */){
    let merchants=data.searchMerchants;
    //iterate those
    merchants.forEach(merchant => {
        //we key those using  chainName
        //check weather is it exist
        let curPtr=result.find(merv2=>merv2.chainName===merchant.chainName);
        if(curPtr){
        //we got it lets append its info
        let dataW=Object.assign(merchant,{});
        curPtr.providers[data.fdsName]= curPtr.providers[data.fdsName]??[];
        curPtr.providers[data.fdsName].push(dataW);
        }
        else{
            let base={
                chainName:merchant.chainName,
                providers:{} //as per provider and also array dd
            }; //base dataa
            let dataW=Object.assign(merchant,{});
            base.providers[data.fdsName]= [];
            base.providers[data.fdsName].push(dataW);
            //append to master
            result.push(base);
        }
    });
}
//read all data from json
let data=JSON.parse(fs.readFileSync("./GrabFoodData.json",{encoding:"UTF-8"}));
//first lets rekey all the stuffs
//site key go back!
let pid=[];
data.forEach(y=>perElement(y,pid))
console.log(JSON.stringify(pid.find(y=>y.chainName===("Nando's")),null,4));