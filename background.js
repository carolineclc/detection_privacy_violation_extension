const getAllExternalLinks = () => {
  console.log("entrou");
  var allExternalLinks = Array.prototype.map.call(
    
    document.querySelectorAll(
      "link, img, video, audio,script, iframe, source, embed"
    ),
    (HTMLtag) => { 
      return HTMLtag.href || HTMLtag.src; 
    }
  )

  const data = {
    links: allExternalLinks,
    numberOfLinks: allExternalLinks.length
  }

  return data;
} 
const getFingerprint = () => {

  // Initialize the agent at application startup.
  // If you're using an ad blocker or Brave/Firefox, this import will not work.
  // Please use the NPM package instead: https://t.ly/ORyXk
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
    .then(FingerprintJS => FingerprintJS.load())

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // This is the visitor identifier:
      const visitorId = result.visitorId
      if(visitorId){
        return visitorId
      }else{
        return null;
      }
    })}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request.method) {
    case "sessionStorageData":
      sendResponse({ 
        data: Object.entries(sessionStorage) 
      });
      break;
    case "localStorageData":
    
      sendResponse({ 
        data: Object.entries(localStorage) 
      });
      break;
    case "thirdPartyDomains":
      
      sendResponse({ 
        data: getAllExternalLinks() 
      });
      break;
    case "fingerprintData":
      sendResponse({ 
        data: getFingerprint() 
      });
      break;
    default:
      sendResponse({ 
        data: null 
      });
  }
});