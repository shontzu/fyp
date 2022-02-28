const fs=require("fs");
function perElement(data /**site pd */,result/**out array of merchantsv2 */){
    let merchants=data.searchMerchants;
    //iterate those
    merchants.forEach(merchant => {
        let estimatedDeliveryTime=merchant.estimatedDeliveryTime;
        let distanceInKm=merchant.distanceInKm;
        let rating=merchant.rating;

        //we key those using  chainName
        //check weather is it exist
        let curPtr=result.find(merv2=>merv2.chainName===merchant.chainName);

        merchant.randomize=(Math.floor(Math.random() * 1000000000) % 1000000);
        estimatedDeliveryTime.randomize=(Math.floor(Math.random() * 120) + 10); // between 10 - 120 minutes
        distanceInKm.randomise=(Math.floor(Math.random() * 5) + 1); //between 1 - 10 km
        rating.randomize=(Math.round(Math.floor(Math.random() * 5) + 1)); //between 1 - 5 rating

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
data.forEach(y=>perElement(y,pid));
//  write the pivoted data into new json
fs.writeFileSync('FdsAggregated.json', JSON.stringify(pid,null,4));
