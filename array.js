const Memory = require('./memory');
let memory = new Memory();

class Array {
	
	constructor() {
		this.length = 0;
		this._capacity = 0;
        this.ptr = memory.allocate(this.length);
	}

	push(value) {
		if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
	}

	_resize(size) {
		const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of Memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
	}

	get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }

    makeUrl(str) {
    	let tempStr = str;
    	let strIter = 0;
    	for(let i=0; i<str.length; i++) {
    		if(str[i] === ' ') {
    			tempStr += str.substring(strIter, i) + '%20';
    			strIter = i+1;
    		}
    	}
    	tempStr += str.substr(strIter);
    	return tempStr;
    }

    filterLessThanFive() {
    	let output = "";
    	for(let i=0; i<this.length; i++) {
    		if(this.get(i) < 5) {
    			this.remove(i);
    			i--;
    		} else {
    			output += " " + this.get(i);
    		}
    	}
    	return output;
    }

    maxSum() {
    	
    	let max = 0;
    	let tempMax = 0;
    	let current = 0;

    	for(let i=0; i<this.length; i++) {
    		current = this.get(i);
    		tempMax += current;
    		if(tempMax > max) {
    			max = tempMax;
    		}
    	}
		return max;
    }

}
Array.SIZE_RATIO = 3;

function main() {
    //create an instance of the array class
    let arr = new Array();

    //add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    // arr.pop();
    // arr.pop();
    // arr.pop();

    console.log(arr);
    const str = arr.makeUrl("www.thinkful.com /tauh ida parv een");
    console.log(str);

    console.log(arr.filterLessThanFive());

    let arr1 = new Array();

    arr1.push(4);
    arr1.push(6);
    arr1.push(-3);
    arr1.push(5);
    arr1.push(-2);
    arr1.push(1);
    
    console.log(arr1.maxSum());

    arrTemp1 = [1, 3, 6, 8, 11];
    arrTemp2 = [2, 3, 5, 8, 9, 10];

    console.log(mergeArrays(arrTemp1, arrTemp2));

    console.log(removeCharacters('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

    products([1, 3, 9, 4]);
}

function mergeArrays(arr1, arr2) {
    
	let currentMin = arr1[0] < arr2[0] ? arr1[0] : arr2[0];
	let outputString = "" + currentMin;
	let iter1 = arr1[0] < arr2[0] ? 1 : 0;
	let iter2 = arr1[0] < arr2[0] ? 0 : 1;
	let combined = new Array();
	combined.push(currentMin);

	while(iter1 < arr1.length || iter2 < arr2.length) {
		if((iter1 < arr1.length && iter2 < arr2.length)) {
			currentMin = arr1[iter1] < arr2[iter2] ? arr1[iter1] : arr2[iter2];
			arr1[iter1] < arr2[iter2] ? iter1++ : iter2++;
			combined.push(currentMin);
			outputString += " " + currentMin;
		} else if(iter1 < arr1.length) {
			combined.push(arr1[iter1]);
			outputString += " " + arr1[iter1];
			iter1++;
		} else {
			combined.push(arr2[iter2]);
			outputString += " " + arr2[iter2];
			iter2++;
		}
	}

	console.log(outputString);
	return combined;
}

function swap(arr, i, j) {
	const temp = arr.get(i);

}

function removeCharacters(str, rmv) {
	let rtn = "";
	let current = '';
	for(let i=0; i<str.length; i++) {
		current = str[i];
		for(let j=0; j<rmv.length; j++) {
			if(current === rmv[j]) {
				current = '';
			}
		}
		rtn += current;
	}

	return rtn;
}

function products(arr) {
	
	let product = 1;
	let productArr = new Array();
	let productStr = "";

	for(let i=0; i<arr.length; i++) {
		product = 1;
		for(let j=0; j<arr.length; j++) {
			if(i !== j) {
				product *= arr[j];
			}
		}
		productArr.push(product);
		productStr += product + " ";
	}

	console.log(productStr);
	return productArr;
}

main();