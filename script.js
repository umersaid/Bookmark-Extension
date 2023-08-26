let myUrls = [];
const saveEl = document.getElementById("save-el");
const getUrlBtn = document.getElementById("get-url-btn");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");


const urlsFromLocalStorage = JSON.parse(localStorage.getItem("myUrls"));
// console.log(urlsFromLocalStorage);

if (urlsFromLocalStorage) {
    myUrls = urlsFromLocalStorage;
    render(myUrls);
}

function render(urls){
    let listItems = "";
    for(let i = 0; i < urls.length; i++){
        listItems += `
        <li>
            <a target="_blank" href="${urls[i]}">
                ${urls[i]} 
            </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

getUrlBtn.addEventListener("click", function(){ 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myUrls.push(tabs[0].url);
        localStorage.setItem("myUrls", JSON.stringify(myUrls) );
        render(myUrls);
    })
})

saveBtn.addEventListener("click", function(){
    myUrls.push(saveEl.value);
    saveEl.value = "";
    localStorage.setItem("myUrls", JSON.stringify(myUrls));
    render(myUrls);

})
deleteBtn.addEventListener("dblclick", function(){
    myUrls = [];
    localStorage.clear();
    render(myUrls);
})
