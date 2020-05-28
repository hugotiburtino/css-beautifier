if (document.body.childNodes.length === 1 &&
	document.body.children[0].nodeName === 'PRE') {

        const pre = document.getElementsByTagName('pre')[0];
        css_code = pre.innerText;
        pre.innerText = "";

        const code = document.createElement("code");
        code.classList.add("css");
        pre.appendChild(code);

        const source_code = css_beautify(css_code);
        code.innerHTML = source_code;

        hljs.highlightBlock(code);

}

