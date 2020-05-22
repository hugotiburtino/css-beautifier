const pre = document.getElementsByTagName('pre')[0];
css_code = pre.innerText;
pre.innerText = "";

const code = document.createElement("code");
code.classList.add("css");
pre.appendChild(code);

const source_code = vkbeautify.css(css_code);
code.innerText = source_code;

hljs.highlightBlock(code);

document.body.style.backgroundColor = window.getComputedStyle(code).backgroundColor;
