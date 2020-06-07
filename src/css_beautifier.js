/**
 * Checks if the file open on the tab of browser is really a plain text.
 * 
 * The FF default behavior by CSS files it to put an stylesheet at head and
 * to render the text in a pre tag. The conditions below try to be sure of that
 * and avoid that similar htmls are interpreted as being a plain text.
 * 
 */
function checkIfPlainText() {
        
        if (document.body.childNodes.length === 1 &&
                document.body.children[0].nodeName === "PRE" &&
                document.body.children[0].children.length === 0 &&
                document.head.children.length === 1 &&
                document.head.children[0].rel === "stylesheet") {
                        
                        return true;
                }
        else {
                return false
        }
}

/**
 * 
 * reads the file of panel template, namely panel.html
 *  
 * @param {string} file Url to the file
 * @returns {string} html The text read from the file
 * 
 *  adapted from https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file 
 */
function readPanelTemplate(file) {
        
        let html;
        const rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);

        // TODO: maybe a simpler way to achieve the same result
        rawFile.onreadystatechange = () => {
                if(rawFile.readyState === 4) {
                        if(rawFile.status === 200 || rawFile.status == 0) {
                                html = rawFile.responseText;
                        } else {
                                // TODO: better error handling
                                return "An error occurred";
                        }
                }
        };
        rawFile.send(null);

        return html;
}

/**
 * 
 * Set up html of the page, put texts at its right places and add event listeners
 * 
 * @param {HTMLPreElement} pre 
 * @param {string} css_code 
 */
function buildPanel(pre, css_code) {

        const htmlFile = 
                readPanelTemplate(browser.runtime.getURL("assets/panel.html"));
        
        document.body.appendChild(document.createRange()
                .createContextualFragment(htmlFile));

        const codeColumn = document.getElementById('value');
        codeColumn.appendChild(pre);
                
        const rawContainer = document.getElementById('raw-code');
        rawContainer.innerText = css_code;

        const rawPanel = document.getElementById('rawdata-panel');
        const jsonPanel = document.getElementById('json-panel')

        const rawTab = document.getElementById('rawdata-tab');
        const beautyTab = document.getElementById('json-tab');
        
        rawTab.addEventListener('click', () =>   {
                rawTab.parentNode.classList.add('is-active');
                beautyTab.parentNode.classList.remove('is-active');
                rawPanel.style.visibility = "visible";
                rawPanel.style.height = "100%";
                rawPanel.classList.toggle("hidden")
                
                jsonPanel.classList.toggle("hidden")
                jsonPanel.style.visibility = "hidden";
                jsonPanel.style.height = "0px";
        });
                
        
        beautyTab.addEventListener('click', () => {
                rawTab.parentNode.classList.remove('is-active');
                beautyTab.parentNode.classList.add('is-active');
                rawPanel.style.visibility = "hidden";
                rawPanel.style.height = "0px";
                rawPanel.classList.toggle("hidden")

                jsonPanel.classList.toggle("hidden")
                jsonPanel.style.visibility = "visible";
                jsonPanel.style.height = "100%";
        });

        // TODO: feature: Save file

        
}

/**
 * Function that starts the extension action
 * 
 * Checks if the text is a plain text, 
 * if that is the case, gets text, beautifies, highlights it
 * and calls buildPanel
 */
function beautify() {
        
        if (checkIfPlainText) {
                                
                const pre = document.getElementsByTagName('pre')[0];
                if (pre.innerText === '') {
                        throw console.error('Error: empty code');
                }
                const css_code = pre.innerText;

                /* TODO: improve performance, just erase text when the 
                 * panel is ready. Show a message that the beautifing 
                 * process is taking place
                 */
                pre.innerText = "";
                
                const code = document.createElement("code");
                code.classList.add("css");
                pre.appendChild(code);
                
                const source_code = css_beautify(css_code);
                code.innerHTML = source_code;
                
                hljs.highlightBlock(code);
                
                buildPanel(pre, css_code);
        }

};

// TODO: major feature: list all CSS of a page, like View CSS
