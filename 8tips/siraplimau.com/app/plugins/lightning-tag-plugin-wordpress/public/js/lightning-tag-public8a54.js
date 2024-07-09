!function(){

window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];
var audTargetingKey = 'lotauds';
var panoramaIdTargetingKey = 'lpanoramaid';
var audLocalStorageKey = 'lotame_' + lotameClientId + '_auds';
       
var lotameClientId=lightningtag_data.lotame_id;
var site_section=lightningtag_data.site_section;
var sitename=lightningtag_data.sitename;

//Chartbeat_Id
var cbid = window.localStorage.getItem('_cb');

// Immediately load audiences and Panorama ID from local storage
try {
var storedAuds = window.localStorage.getItem(audLocalStorageKey) || '';

if (storedAuds) {
googletag.cmd.push(function() {
window.googletag.pubads().setTargeting(audTargetingKey,storedAuds.split(','));
}); }

var localStoragePanoramaID = window.localStorage.getItem('panoramaId') || '';

if (localStoragePanoramaID) {
googletag.cmd.push(function() {
window.googletag.pubads().setTargeting(panoramaIdTargetingKey,localStoragePanoramaID); });
}
} catch(e) {}
    
// Callback when targeting audience is ready to push latest audience data
var audienceReadyCallback = function (profile) {
    
// Get audiences as an array
var lotameAudiences = profile.getAudiences() || [];
    
// Set the new target audiences for call to Google
googletag.cmd.push(function() {
window.googletag.pubads().setTargeting(audTargetingKey, lotameAudiences);
});
    
// Get the PanoramaID to set at Google
var lotamePanoramaID = profile.getPanoramaId() || '';
if (lotamePanoramaID) {
googletag.cmd.push(function() {
window.googletag.pubads().setTargeting(panoramaIdTargetingKey, lotamePanoramaID);
      });
}
};

if(site_section=='homepage'){
	var data={
		behaviors:{int:[lightningtag_data.traffic + ' : Section Tag : homepage',],},
		thirdParty:{namespace: 'CBID', value: cbid},
	};
}else{
	var data={
		thirdParty:{namespace: 'CBID', value: cbid},
};
}

var lotameTagInput={
data:data,
config:{
	clientId:Number(lotameClientId),
	audienceLocalStorage: audLocalStorageKey,
onProfileReady: audienceReadyCallback
}
};

var lotameConfig=lotameTagInput.config||{};
var namespace = window['lotame_' + lotameConfig.clientId] = {};
namespace.config=lotameConfig;
namespace.data=lotameTagInput.data||{};
namespace.cmd=namespace.cmd||[];

}();
