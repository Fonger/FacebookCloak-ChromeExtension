var regexList = [
  /^https:\/\/www\.(?:facebook|messenger)\.com\/ajax\/messaging\/typ\.php/,
  /^https:\/\/www\.(?:facebook|messenger)\.com\/ajax\/mercury\/change_read_status\.php/,
  /^https:\/\/www\.(?:facebook|messenger)\.com\/ajax\/mercury\/delivery_receipts\.php/,
  /^https:\/\/www\.(?:facebook|messenger)\.com\/common\/scribe_endpoint\.php/,
  /^https:\/\/www\.(?:facebook|messenger)\.com\/common\/scribe_endpoint\.php/,
  /^https:\/\/www\.facebook\.com\/ajax\/chat/,
  /^https:\/\/(?:.+)?edge-chat/,
  /^https:\/\/m\.facebook\.com\/messages/,
  /^https:\/\/m\.facebook\.com\/buddylist\.php/,
];

function fbActiveFilter(info) {
  for (var i = 0; i < regexList.length; i++) {
    if (info.url.match(regexList[i])) {
      return { cancel: true };
    }
  };

  return { cancel: false };
}

chrome.storage.sync.get({ 'enabled': true }, function(data) {
  if (data.enabled) {
    startFilter();
  } else {
    stopFilter();
  }
});

chrome.runtime.onMessage.addListener(
  function(req) {
    if (req.enabled) {
      startFilter();
    } else {
      stopFilter();
    }
  }
)

function startFilter() {
  /*
    * declarativeWebRequest is only available in beta channel,
    * so we can't use it to block request with improve performance 
  */
  chrome.webRequest.onBeforeRequest.addListener(
    fbActiveFilter,
    {
      urls: [
        "https://*.facebook.com/*",
        "https://*.messenger.com/*"
      ]
    },
    ["blocking"]);

  chrome.declarativeContent.onPageChanged.removeRules (undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules ([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.facebook.com', schemes: ['https'] }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.messenger.com', schemes: ['https'] },
        })
      ],
      actions: [
        new chrome.declarativeContent.RequestContentScript({ js: ['inject.js'] })
      ]
    }]);
  });

  chrome.browserAction.setIcon({
    path: {
      "16": "icons/icon-offline-16x16.png",
      "32": "icons/icon-offline-32x32.png",
      "48": "icons/icon-offline-48x48.png",
      "64": "icons/icon-offline-64x64.png",
      "128": "icons/icon-offline-128x128.png"
    }
  });
  chrome.browserAction.setTitle({
    title: 'Cloak mode is activated now.'
  });
}

function stopFilter() {
  chrome.webRequest.onBeforeRequest.removeListener(fbActiveFilter);
  chrome.declarativeContent.onPageChanged.removeRules (undefined, function () {});
  chrome.browserAction.setIcon({
    path: {
      "16": "icons/icon-online-16x16.png",
      "32": "icons/icon-online-32x32.png",
      "48": "icons/icon-online-48x48.png",
      "64": "icons/icon-online-64x64.png",
      "128": "icons/icon-online-128x128.png"
    }
  });
  chrome.browserAction.setTitle({
    title: 'Cloak mode is not activated now.'
  });
}
