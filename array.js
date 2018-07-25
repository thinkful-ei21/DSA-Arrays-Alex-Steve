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
}

main();