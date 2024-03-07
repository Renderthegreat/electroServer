class JSG {
	constructor(res, req){
		this.req = req
		this.data = "";
	}
	print(data){
		this.data += data;
	}
	_G(){
		return this.data;
	}
	contentType = "text/html";
}
module.exports = JSG