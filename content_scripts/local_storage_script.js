function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }

const getLocalStorage = async (tabs) =>{
    let tab = tabs.pop();
    var localStorageSize = document.getElementById('size-local-storage');
    var localStorageList = document.getElementById('list-local-storage');
    let localStorageLength = 0;
    var localStorageSecurity = document.getElementById('local-storage-security');

    const response = await browser.tabs.sendMessage(tab.id, { 
        method: "localStorageData"
      });
      if (response.data.length > 0) {
        for (let localStorageItem of response.data) {
          if (localStorageItem) {
            localStorageLength++;
            let li = document.createElement("li");
            let content = document.createTextNode(localStorageItem);
            li.appendChild(content);
            localStorageList.appendChild(li);
          }
        }
        let size = document.createTextNode("Number of items on Local Storage: " + localStorageLength);
        localStorageSize.appendChild(size);
        
        if(localStorageSize > 50){
          localStorageSecurity.setAttribute("value", "50");
        } else if (localStorageLength > 25 && localStorageLength < 50){
          localStorageSecurity.setAttribute("value", localStorageLength.toString());

        } else {
          localStorageSecurity.setAttribute("value", localStorageLength.toString());
        }
    
    
      }




}

getActiveTab().then(getLocalStorage);
