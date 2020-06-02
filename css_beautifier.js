function checkIfPlainText() {
        
        if (document.body.childNodes.length === 1 &&
                document.body.children[0].nodeName === "PRE" &&
                document.body.children[0].children.length === 0 &&
                document.head.children.length === 1 &&
                document.head.children[0].rel === "stylesheet") {
                        
                        return true
                
                }
}

// adapted from https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file 
function readPanelTemplate(file) {
        
        let html;
        const rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
                if(rawFile.readyState === 4) {
                        if(rawFile.status === 200 || rawFile.status == 0) {
                                html = rawFile.responseText;
                        } else {
                                return "An error occurred"
                        }
                }
        }
        rawFile.send(null);

        return html
}

function buildPanel(pre, css_code) {

        const htmlFile = 
                readPanelTemplate(browser.runtime.getURL("resources/panel.html"));
        
        document.body.appendChild(document.createRange()
                .createContextualFragment(htmlFile));

        const codeColumn = document.getElementById('value');
        codeColumn.appendChild(pre);
                
        const rawContainer = document.createElement('pre');
        rawContainer.innerText = css_code;

        const rawPanel = document.getElementById('rawdata-panel');
        rawPanel.appendChild(rawContainer);

        const rawTab = document.getElementById('rawdata-tab');
        const beautyTab = document.getElementById('json-tab');
        
        rawTab.addEventListener('click', () =>   {
                rawTab.parentNode.classList.add('is-active');
                beautyTab.parentNode.classList.remove('is-active');
                rawPanel.style.visibility = "visible";
                rawPanel.style.height = "100%";
                document.getElementById('json-panel')
                        .style.visibility = "hidden";
                document.getElementById('json-panel')
                        .style.height = "0px";
        });
                
        
        beautyTab.addEventListener('click', () => {
                rawTab.parentNode.classList.remove('is-active');
                beautyTab.parentNode.classList.add('is-active');
                rawPanel.style.visibility = "hidden";
                rawPanel.style.height = "0px";
                document.getElementById('json-panel')
                        .style.visibility = "visible";
                document.getElementById('json-panel')
                        .style.height = "100%";
        });
        
}

(function beautify() {
        
        if (checkIfPlainText) {
                
                
                const pre = document.getElementsByTagName('pre')[0];
                const css_code = pre.innerText;
                pre.innerText = "";
                
                const code = document.createElement("code");
                code.classList.add("css");
                pre.appendChild(code);
                
                const source_code = css_beautify(css_code);
                code.innerHTML = source_code;
                
                hljs.highlightBlock(code);
                
                buildPanel(pre, css_code);
        }

})()