/**
* Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/

class Node {

  constructor(tag, id, classes, children) {
      // Tag name of the node.
      this.tag = tag;

      // Array of CSS class names (string) on this element.
      this.classes = classes;
      
      // Array of children nodes.
      this.children = children; // All children are of type Node
      
      // ID attributes of the node
      this.id = id;
  }

  //my search function 
  /**
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
   
  search(selector) {

    //Checking my coundary conditions
      if (selector == null || selector == undefined) {
          console.log("Please provide a valid, non-null tag or class name")
          return;
      }
      if (this.children.length <= 0) {
          console.log("No children/descendent nodes found for " + selector + " within " + this.id);
          return;
      }

      //my resulting array 
      let result = [];

      //declaring a boolean variable for differentiating between a class and a tag selector
      let isSelectorTypeClass;

      if(selector.charAt(0)===".") {
        //updating the selector value for the class selector
        selector=selector.split(".")[1];
        console.log("Searching for class: " + selector + " within " + this.id + " block");
        isSelectorTypeClass = true;
      }
      else {
        console.log("Searching for tag: " + selector + " within " + this.id + " block");
        isSelectorTypeClass = false;
      }

      //calling the traversal fundtion
      result = this.traverse(this, result, isSelectorTypeClass, selector);
      if (result.length > 0) {
          console.log("Printing all descendent nodes");
          result.forEach(childelement => {
              //printing only the child/descendants nodes' ids for console clarity
              console.log(childelement.id);
          })
      }
      else {
          console.log("No descendent nodes for this input " + selector + " within " + this.id);
      }
  }

  //method to traverse the depth of the selected node
  // it is using a recursive dfs method to search the DOM Tree
  traverse(node, result, isClass, key) {
      //checking for the tags    
      if (!isClass) {
          if (node.tag == key) {
              result.push(node);
          }
      }
      
      //checking for the classes    
      else {
          node.classes.forEach(classValue => {
              if (classValue == key) {
                  result.push(node);
              }
          })
      };

      // using the recursion for the descendants of the node
      if (node.children.length > 0) {
          node.children.forEach(child => {
              this.traverse(child, result, isClass, key);
          })
      }
      else {
          return;
      }
      //returning the resulting array of nodes
      return result;
  }

}

let randomNode = new Node("span", "span-6", ["randomSpan"], []);
let spanNode5 = new Node("span", "span-5", ["note", "mania"], []);
let spanNode4 = new Node("span", "span-4", ["mania"], []);
let divNode4 = new Node("div", "div-4", [], [spanNode4, spanNode5]);
let labelNode1 = new Node("label", "lbl-1", [], []);
let sectionNode1 = new Node("section", "sec-1", [], [labelNode1]);
let divNode3 = new Node("div", "div-3", ["subContainer2"], [sectionNode1]);
let spanNode3 = new Node("span", "span-3", ["sub1-span3"], []);
let p1 = new Node("p", "para-1", ["sub1-p1", "note"], []);
let divNode2 = new Node("div", "div-2", ["subContainer1"], [p1, spanNode3]);
let spanNode2 = new Node("span", "span-2", [], []);
let spanNode1 = new Node("span", "span-1", ["note"], []);
let divNode1 = new Node("div", "div-1", ["mainContainer"], [spanNode1, spanNode2, divNode2, divNode3, divNode4]);
let bodyNode = new Node("body", "content", [], [divNode1, randomNode]);

// Testing
console.log("Started...");



// Test case 1 -
console.log("Test case 1 -");
console.log(divNode1.search("span"));
console.log();



// Test case 2 -
console.log("Test case 2 -");
console.log(divNode1.search(".note"));
console.log();



// Test case 3 -
console.log("Test case 3 -");
console.log(divNode1.search("label"));
console.log();



// Test case 4 -
console.log("Test case 4 -");
console.log(p1.search(".note"));
console.log();



// Test case 5 -
console.log("Test case 5 -");
console.log(divNode1.search("div"));
console.log();



// Test case 6 -
console.log("Test case 6 -");
console.log(randomNode.search("div"));
console.log();



// Test case 7 -
console.log("Test case 7 -");
console.log(divNode2.search("section"));
console.log();



// Test case 8 -
console.log("Test case 8 -");
console.log(bodyNode.search());
console.log();
// Error conditions need to be handled
// invalid input need to be handled



// Test case 9 -
console.log("Test case 9 -");
console.log(bodyNode.search("section"));
console.log();



// Test case 10 -
console.log("Test case 10 -");
console.log(divNode1.search(".randomSpan"));
console.log();
// randomSpan is some Span outside your divNode1 closed

