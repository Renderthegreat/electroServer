module.exports = async function(Include, Includes, Host, Server, Content, Runtime, SSR){
	for(let item of Includes){
		Include(item, Server, Content, Host, Runtime, SSR)
	}
}