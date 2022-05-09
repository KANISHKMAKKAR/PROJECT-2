let arr=[12,3,4,5,5,]
let count=0
arr.sort((a,b)=>{return a-b})
for(let i=0;i<arr.length-1;i++){
    if(arr[i]>arr[i+1]){
        count +=arr[i]-arr[i+1]
    }
    else{
        count +=arr[i+1]-arr[i]
    }
}
console.log( count)



//my college cgc link
//https://functionup-stg.s3.ap-south-1.amazonaws.com/uranium/cgc.jpeg
