window.cookieConsent = {
  set: function(expires) {
    if (typeof expires == "undefined") // Accepts Date object as expires
      var current_year = new Date().getFullYear()
      var expires = new Date(current_year+10,12,31)
    document.cookie =  '_cookieConsent=1;expires=' + expires.toUTCString();
  },
  isSet: function() {
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
      var c = cookies[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf('_cookieConsent=') == 0) {
        return true;
      }
    }
    return false;
  },
  createElement: function(element, attrs) {
    element = document.createElement(element);
    for (var idx in attrs) {
      if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
        for (var prop in attrs[idx]){element.style[prop] = attrs[idx][prop];}
      } else if (idx === 'html') {
          element.innerHTML = attrs[idx];
      } else {
          element.setAttribute(idx, attrs[idx]);
      }
    }
    return element;
  },
  template: function(params) {
    cookieMain = this;
    wrapper = this.createElement('div', {id: 'cookieConsent', html: params['message'], styles: {background: params['mainBackground'], color: params['mainColor']}});
    setting = this.createElement('a', {target: '_blank', id:'cookieCollapsible', html: params['settingText'], href: params['settingUrl']});
    settingContent = this.createElement('div', {id: 'cookieContent', html: '<strong>'+params['settingTitle']+'</strong><p>'+params['settingMessage']+'</p>'})
    acceptBtn = this.createElement('a', {class: 'cookieAccept', html: params['acceptText'], style: {background: params['acceptBackground'], color: params['acceptColor']}});
    if (params["setting"]) {
      wrapper.appendChild(setting);
      wrapper.appendChild(acceptBtn);
      wrapper.appendChild(settingContent);
      if (params['settingUrl'] == '#') {
        setting.onclick = function(e) {
          e.preventDefault();
          this.classList.toggle("active");
          if (settingContent.style.maxHeight){
            settingContent.style.maxHeight = null;
          } else {
            settingContent.style.maxHeight = settingContent.scrollHeight + "px";
          }
        }
      }
    } else { wrapper.appendChild(acceptBtn); }
    acceptBtn.onclick = function() {
      cookieMain.set();
      wrapper.classList.toggle('fade')
    }
    document.getElementById('cookie-container').appendChild(wrapper);
  },
  init: function(params) {
    defaultParams = {
      message: 'This site uses functional cookies and external scripts to improve your experience.',
      mainBackground: '#FFF',
      mainText: '#333',
      setting: true,
      settingText: 'Learn More',
      settingUrl: '#',
      settingTitle: 'What do we use cookies for?',
      settingMessage: 'We use cookies and similar technologies to recognize your repeat visits and preferences, as well as to measure the effectiveness of campaigns and analyze traffic.',
      acceptText: 'Accept',
      acceptBackground: '#337ab7',
      acceptColor: '#FFF'
    }
    if (!this.isSet())
      this.template(Object.assign(defaultParams, params))
  }
}