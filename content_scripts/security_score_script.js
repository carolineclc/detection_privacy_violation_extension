const calculateScore = () => {
    var scoreTag = document.getElementById("website-score");
    var cookiesData = document.getElementById('cookie-security').getAttribute('value');
    var localStorageData = document.getElementById('local-storage-security').getAttribute('value');
    var thirdPartyData = document.getElementById('third-party-domain-security').getAttribute('value');
    var fingerprintData = document.getElementById('fingerprint-status').getAttribute('value');
  
    var cookiesScore = parseInt(cookiesData);
    var localStorageScore = parseInt(localStorageData);
    var thirdPartyScore = parseInt(thirdPartyData);
    var fingerprintScore = parseInt(fingerprintData);
  
    var scoreProgressBar = document.getElementById('website-score');
  
    var score = cookiesScore + localStorageScore + thirdPartyScore ;
    scoreTag.innerHTML = "Website score: " + score;
    console.log(fingerprintScore);
    
    if(score > 200){
      scoreProgressBar.setAttribute("value", (200-score));
    }
    else if(score <= 200 && score > 100){
      scoreProgressBar.setAttribute("value", (200-score));
    }
    else{
      scoreProgressBar.setAttribute("value", (200-score));
    }
  }
  
  function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }
  
  setTimeout(() => {
    getActiveTab().then(calculateScore);
  }, 100);