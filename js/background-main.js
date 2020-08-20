alert("tttt");

chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu Demo',
    id: 'menuDemo',
    contexts: ['all'],
    onclick: genericOnClick
}, function () {
    console.log('contextMenus are create.');
});


function genericOnClick(){
  
}