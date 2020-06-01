class PanelBuilder {
    
    htmlFile = 'test'
    
    // adapted from https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file 
    readPanelTemplate(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0) {
                            var allText = rawFile.responseText;
                            this.htmlFile = allText;
                    }
            }
        }
        rawFile.send(null);
    }

    build(templatePath) {
        this.readPanelTemplate(browser.runtime.getURL(templatePath));
        
        document.body.appendChild(document.createRange()
            .createContextualFragment(this.htmlFile))
    }

}

