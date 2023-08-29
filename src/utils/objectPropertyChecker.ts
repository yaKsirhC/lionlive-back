export default function objectPropertyChecker(obj: any, keys: string[]): boolean {
	if(typeof obj !== 'object') throw "objectPropertyChecker: The sample passed is not an Object";
	for(let i = 0; i < keys.length; i++){
		if(! (keys[i] in obj)){
			return true;
		}
	}
	return false
}