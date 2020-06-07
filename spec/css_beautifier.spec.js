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
        
        it("should exclude files without element in head that has relation of stylesheet", function() {
            const { document } = 
               new JSDOM('<html><head></head><body><pre>Html without the stylesheet in head</pre></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        it("should exclude files with more elements in head than a relation of stylesheet", function() {
            const { document } = 
               new JSDOM('<html><head><link rel="stylesheet" href="resource://content-accessible/plaintext.css"><title>CSS code</title></head><body><pre>Html with more than one element in head</pre></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        it("should exclude files with more than just one pre tag in body", function() {
            const { document } = 
               new JSDOM('<html><head><link rel="stylesheet" href="resource://content-accessible/plaintext.css"></head><body><pre>Html with more than just a pre tag</pre><pre>See my awesome code above</pre></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        it("should exclude files with nodes within the pre tag", function() {
            const { document } = 
               new JSDOM('<html><head><link rel="stylesheet" href="resource://content-accessible/plaintext.css"></head><body><pre>Html with <em>more nodes here</em> than just a pre tag</pre></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        it("should exclude files no pre tag", function() {
            const { document } = 
               new JSDOM('<html><head><link rel="stylesheet" href="resource://content-accessible/plaintext.css"></head><body><code>Html with no pre tag</code></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(false);
        });

        it("should accept files that match the usual way of rendering code as plain text at FF", function() {
            const { document } = 
               new JSDOM('<html><head><link rel="stylesheet" href="resource://content-accessible/plaintext.css"></head><body><pre>a { color: black }</pre></body></html>').window;
            context.document = document;
            expect(checkIfPlainText()).toBe(true);
        });

    });
});