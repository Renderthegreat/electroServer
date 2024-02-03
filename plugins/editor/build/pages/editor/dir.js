async function getD() {
  let dirFiles = await fetch(location.origin + location.pathname + "files/");
  let path = "/";
  dirFiles = await dirFiles.json();
  let dirList = document.getElementById("dirFiles");
  for (let file in dirFiles) {
    const node = document.createElement("a");
    const textnode = document.createTextNode(dirFiles[file]);
    node.appendChild(textnode);
    node.href =
      location.origin + location.pathname + "edit/?file=" + dirFiles[file];
    if (dirFiles[file].includes(".")) {
      const item = document.createElement("li");
      item.appendChild(node);
      
      dirList.appendChild(item);
    } else{
      
    }
    //document.getElementById("dirFiles").appendChild(node);
  }
}
getD();
