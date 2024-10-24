
function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }

  function getDomain(url) {
    try {
      let domain = new URL(url).hostname;
      return domain;
    } catch (e) {
      console.error('Invalid URL:', e);
      return null;
    }
  }

const showCookiesForTab = (tabs) => {
    let tab = tabs.pop();

    let currentDomain = getDomain(tab.url);
    let countCookies = 0;
    var gettingAllCookies = browser.cookies.getAll({
      url: tab.url
    });
    
  
    gettingAllCookies.then((cookies) => {
      
    
      var activeTabUrl = document.getElementById('header-title-cookies');
      var text = document.createTextNode("Cookies at: "+tab.title);
      var firstpartycookieList = document.getElementById('fp-cookie-list');
      var thirdpartycookieList = document.getElementById('tp-cookie-list');
      var numberOfCookies = document.getElementById('number-cookies');
      activeTabUrl.appendChild(text);
  
      if (cookies.length > 0) {
        for (let cookie of cookies) {
          if (cookie.domain === currentDomain || cookie.domain.endsWith(currentDomain)){
            let li = document.createElement("li");
            let content = document.createTextNode(cookie.name + ": "+ cookie.value);
            li.appendChild(content);
            firstpartycookieList.appendChild(li);
          } else{


            let li = document.createElement("li");
            let content = document.createTextNode(cookie.name + ": "+ cookie.value);
            li.appendChild(content);
            thirdpartycookieList.appendChild(li);
          }
          countCookies++;
        }
        let cookiesText = document.createElement("p");
        let cookiesContent = document.createTextNode("Number of cookies: "+countCookies);
        cookiesText.appendChild(cookiesContent);
        numberOfCookies.appendChild(cookiesText);
      } else {
        let p = document.createElement("p");
        let content = document.createTextNode("No cookies in this tab.");
        let parent = firstpartycookieList.parentNode;
  
        p.appendChild(content);
        parent.appendChild(p);
      }

      var CookieSecurity = document.getElementById('cookie-security');
      if (countCookies >= 200){
        CookieSecurity.setAttribute("value", "100");
      } else if (countCookies > 100 && countCookies < 200){
        CookieSecurity.setAttribute("value", countCookies.toString());
      } else {
        CookieSecurity.setAttribute("value", countCookies.toString());
      }


    });
  }
  

  getActiveTab().then(showCookiesForTab);