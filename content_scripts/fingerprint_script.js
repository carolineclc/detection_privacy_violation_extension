function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }

  const getFingerprint = async (tabs) => {
    let tab = tabs.pop();
  
    var fingerprintExists = document.getElementById('fingerprint-exists');
    var fingerprintId = document.getElementById('fingerprint-id');
;
  
    const response = await browser.tabs.sendMessage(tab.id, {
      method: "fingerprintData"
    });
  
    var fingerprintSecurity = document.getElementById('fingerprint-status');
  
    var fingerprintData = response.data;
  
    if (fingerprintData) {
      fingerprintExists.innerHTML = "You are being fingerprinted";
      fingerprintId.innerHTML = "The fingerprinter is "+ fingerprintData;
      fingerprintSecurity.setAttribute("value", "100");
    } else{
      fingerprintExists.innerHTML = "No one is fingerprinting you";
      fingerprintId.innerHTML = "";
      fingerprintSecurity.setAttribute("value", "0");
    }
  }
  
  
getActiveTab().then(getFingerprint);