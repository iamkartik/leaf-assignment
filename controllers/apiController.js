const doWork = (req,res)=>{
    // get the value from the path params 
    const {value} = req.params;
    // check if the value lies between 1 and 3
    if(!value||value<1||value>3){
        res.send({err:'Please send a type value between 1 and 3'});
    }
    // get the input 
    const {input} = req.body;   

    let resp=[];

    for(let i=0;i<input.length;i++){
        resp.push(getOutput(input[i],value));
    }

    res.send({output:resp});

}

const getOutput = (input,value)=>{
    switch(parseInt(value)){
        case 1:
            return oddEvenSorter(input);
        case 2:
            return reverseString(input);
        case 3:
            return missingNumbers(input);
    }
}

const oddEvenSorter = (input)=>{
    let odd=[],even=[];
    // separate the evens and odds in the array
    for(let i=0;i<input.length;i++){
        if(input[i]%2===0){
            even.push(input[i]);
        }else{
            odd.push(input[i]);
        }
    }

    // sort them even -> asc , odd ->desc
    even = even.sort((a,b)=>a-b);
    odd = odd.sort((a,b)=>b-a);

    // concat them into an array 
    let sortedArray=[];
    let minLength = Math.min(even.length,odd.length);
    
    for(let i=0;i<minLength;i++){
        sortedArray.push(odd[i],even[i]);
    }
    sortedArray.push(...odd.slice(minLength),...even.slice(minLength));

    return sortedArray;

}

const reverseString = (input)=>{
    // get all the a-z characters from the string
    let chars = input.match(/[a-z]/g);

    let temp='';
    for(let i=0;i<input.length;i++){
        if(/[a-z]/.test(input[i])){
            temp = `${temp}${chars.pop()}`;
        }else{
            temp = `${temp}${input[i]}`;
        }
    }

    return temp;
}

const missingNumbers = (input)=>{
    const start = input[0];
    const end = input[input.length-1];

    let temp =[];
    for(let i=start;i<=end;i++){
        temp.push(i);
    }
    return temp;
}

exports.doWork = doWork;