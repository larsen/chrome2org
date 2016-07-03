var moewServiceUrl = 'http://localhost:8002/save';

function clipText(tab) {
    var url = tab.url;
    var title = tab.title;
    
    console.assert(typeof url == 'string', 'tab.url should be a string');
    
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        var text = selection[0];
        
        var form = new FormData();
        form.append( 'text', '[[' + title + '][' + url + ']]\n' + text );

        var xhr = new XMLHttpRequest();
        xhr.open( 'POST', moewServiceUrl, true );
        xhr.setRequestHeader(
            'Content-type', 'application/x-www-form-urlencoded; ;charset=utf-8');
        xhr.onload = function() {
            if ( xhr.readyState == 4 ) {
                if (xhr.status == 200) {
                    console.log("Data sent OK to moew!");
                }
                else {
                    console.error("An error occurred!");
                }
            }
        };
        xhr.send( form );
    });
}


chrome.browserAction.onClicked.addListener( clipText );
