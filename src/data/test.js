const fs=require("fs");
const counter=(function*(){
  let i=(Math.round(Math.floor(Math.random() * 5) + 1));
  while(true){
    yield i++;
  }
})();

function perElement(data /**site pd */,result/**out array of merchantsv2 */){
    let merchants=data.searchMerchants;
    //iterate those
    merchants.forEach(function generate(merchant,_parent){
        //we key those using  chainName
        //check weather is it exist
        const name=merchant.name??`${_parent.chainName}-${merchant.branchName}`;
        let curPtr=result.find(merv2=>merv2.name===name);
        let dataW=Object.assign({},_parent??{});
        Object.assign(dataW,merchant);
        dataW.estimatedDeliveryTime=(Math.floor(Math.random() * 120) + 10); // between 10 - 120 minutes
        dataW.distanceInKm=(Math.floor(Math.random() * 5) + 1); //between 1 - 10 km
        dataW.price=(Math.floor(Math.random() * 15) + 5); //between 1 - 10 km
        dataW.rating=(Math.round(Math.floor(Math.random() * 5) + 1)); //between 1 - 5 rating
        dataW.id=(Math.round(Math.floor(Math.random() * 5000000000000) + 1)); //between 1 - 5 rating
        dataW.branchMerchants?.splice(0,1);
        dataW.branchMerchants?.forEach(y=>generate(y,merchant));
        const photoHref=dataW.photoHref??dataW.merchantBrief.photoHref;
        const cuisine=dataW.cuisine??dataW.merchantBrief.cuisine;
        const {estimatedDeliveryTime,distanceInKm,price,rating,halal,id}=dataW;
        if(curPtr){
        //we got it lets append its info
        curPtr.providers.push({name:data.fdsName,estimatedDeliveryTime,distanceInKm,price,rating,halal,cuisine,photoHref,id});
        }
        else{
            let base={
                merchantId:counter.next().value,
                name,
                providers:[] //as per provider and also array dd
            }; //base data
            base.providers.push({name:data.fdsName,estimatedDeliveryTime,distanceInKm,price,rating,halal,cuisine,photoHref,id});
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
