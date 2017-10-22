document.addEventListener('DOMContentLoaded', function () {
  var onOffSwitch = document.getElementById('switch');
  
  onOffSwitch.addEventListener('change', function () {
    chrome.storage.sync.set({ enabled: onOffSwitch.checked ? true : false });
    chrome.runtime.sendMessage({ enabled: onOffSwitch.checked ? true : false });
  });

  chrome.storage.sync.get({ 'enabled': true }, function(data) {
    if (data.enabled) onOffSwitch.checked = 'checked';
  })
});
