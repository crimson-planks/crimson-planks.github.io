//code from https://codereview.stackexchange.com/a/126722
const ConvertToHTMLSafe = function(text){
	var table = {
		'<': 'lt',
		'>': 'gt',
		'"': 'quot',
		'\'': 'apos',
		'&': 'amp',
		'\r': '#10',
		'\n': '#13'
	};
	
	return text.toString().replace(/[<>"'\r\n&]/g, function(chr){
		return '&' + table[chr] + ';';
	});
};
const ConvertToASCIISafe=function(chr){
	const code=chr.codePointAt(0);
	//short for unicode big character convert
	const ubcc= (code)=>`\\u${("0000"+code.toString(16)).slice(-4)}`;
	let rslt='';
	if(code<=0x7f){
		const table={
			"\"":"\\\"",
			"\'":"\\\'",
		}
		rslt=chr;
		if(Object.keys(table).includes(chr)){
			rslt=convertTable[rslt]
		}
	}
	else if(code<=0xff){
		rslt=`\\x${code.toString(16)}`
	}
	else if(code<=0xffff){
		rslt=ubcc(code);
	}
	else{
		for(let i=0;i<element.length;i++){
			rslt+=ubcc(element.charCodeAt(i));
		}
	}
	return rslt;
}