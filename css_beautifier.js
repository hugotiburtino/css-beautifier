isRawText = document.body.childNodes.length === 1 &&
        document.body.children[0].nodeName === "PRE" &&
        document.body.children[0].children.length === 0 &&
        document.head.children.length === 1 &&
        document.head.children[0].rel === "stylesheet"

if (isRawText) {

        let htmlFile = ''

        // https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file 
        function readPanelTemplate(file)
        {
                var rawFile = new XMLHttpRequest();
                rawFile.open("GET", file, false);
                rawFile.onreadystatechange = function ()
                {
                        if(rawFile.readyState === 4)
                        {
                                if(rawFile.status === 200 || rawFile.status == 0)
                                {
                                        var allText = rawFile.responseText;
                                        htmlFile = allText;
                                }
                        }
                }
                rawFile.send(null);
        }
        readPanelTemplate(browser.runtime.getURL("panel.html"));
        
        document.body.appendChild(document.createRange()
                .createContextualFragment(htmlFile))

        const pre = document.getElementsByTagName('pre')[0];
        css_code = pre.innerText;
        pre.innerText = "";

        const code = document.createElement("code");
        code.classList.add("css");
        pre.appendChild(code);
    
        const codeColumn = document.getElementById('value')
        codeColumn.appendChild(pre)

        const source_code = css_beautify(css_code);
        code.innerHTML = source_code;

        hljs.highlightBlock(code);

}

