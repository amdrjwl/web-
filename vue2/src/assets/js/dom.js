

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

export function contains(arr, obj) {
	console.log(arr)
 		var i = arr.length;
			while(i--) {
				if(arr[i].id === obj) {
					return true;
				}
			}
			return false;
}

export function indexof(arr, item) {
 		for(var i = 0; i < arr.length; i++) {
					if(arr[i].id == item) {

						return i;
					}
				}
}
