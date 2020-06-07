const fs = require('fs');
const vm = require('vm');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("CSS Beautifier", function() {
    
    const css_beautifier = fs.readFileSync('src/css_beautifier.js')
    const context = { }
    vm.runInContext(css_beautifier, vm.createContext(context))
    const { checkIfPlainText } = context


    describe("checkIfPlainText", function() {
        
        //const { checkIfPlainText } = require("../src/css_beautifier");

        it("should exclude files without element in head that has relation of stylesheet", function() {
            const { document } = 
               new JSDOM('<html><head></head><body><pre>Code without the stylesheet in head</pre></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        it("should exclude files with more than just pre tag in body", function() {
            const { document } = 
               new JSDOM('<html><head></head><body><pre>Code with more than just a pre tag</pre><p>See my awesome code above</></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        // TODO test other situations
        
    });
});