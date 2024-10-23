function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

const setThirdPartyDomains = async (tabs) => {
  let tab = tabs.pop();
  var thirdPartyDomainsList = document.getElementById('third-party-domain-list');

  const response = await browser.tabs.sendMessage(tab.id, {
    method: "thirdPartyDomains"
  });
  
  var thirdPartyDomains = response.data.links;
  var numberOfLinks = response.data.numberOfLinks;

  var sizeLinks = document.getElementById("size-third-party");
  var sizeLinksText = document.createTextNode("Number of external links: "+ numberOfLinks);
  sizeLinks.appendChild(sizeLinksText);

  thirdPartyDomains.forEach(function(domain) {
    var li = document.createElement('li');
    var text = document.createTextNode(domain);
    li.appendChild(text);
    thirdPartyDomainsList.appendChild(li);
  });


}



getActiveTab().then(setThirdPartyDomains);