export function getdata(el,name,val){
	const prefix='data-'
	if(val){
		return el.setAttribute(prefix+name,val)
	}
	
	
	return el.getAttribute(prefix + name)
	
}
