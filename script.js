class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let root = null;

function generateTree() {
  const input = document.getElementById("treeInput").value;
  const values = input.split(",").map(v => v.trim());
  if (values.length === 0 || values[0] === "") {
    alert("Please enter tree nodes!");
    return;
  }

  root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;

  while (i < values.length && queue.length > 0) {
    const current = queue.shift();
    
    if (i < values.length && values[i] !== "null") {
      current.left = new TreeNode(values[i]);
      queue.push(current.left);
    }
    i++;
    
    if (i < values.length && values[i] !== "null") {
      current.right = new TreeNode(values[i]);
      queue.push(current.right);
    }
    i++;
  }

  drawTree();
}

function drawTree() {
  const container = document.getElementById("tree-container");
  container.innerHTML = "";
  
  function drawNode(node, x, y, gap) {
    if (!node) return;

    const div = document.createElement("div");
    div.className = "node";
    div.innerText = node.val;
    div.style.left = x + "px";
    div.style.top = y + "px";
    container.appendChild(div);
    node.element = div;

    if (node.left) drawNode(node.left, x - gap, y + 80, gap / 2);
    if (node.right) drawNode(node.right, x + gap, y + 80, gap / 2);
  }

  if (root) drawNode(root, 380, 20, 150);
}

function traverse(type) {
  if (!root) {
    alert("Please generate a tree first!");
    return;
  }

  const steps = [];
  const result = [];
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    steps.push(node);
    result.push(node.val);
    inorder(node.right);
  }

  function preorder(node) {
    if (!node) return;
    steps.push(node);
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  }

  function postorder(node) {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    steps.push(node);
    result.push(node.val);
  }

  if (type === "inorder") inorder(root);
  else if (type === "preorder") preorder(root);
  else if (type === "postorder") postorder(root);

  animateTraversal(steps, result);
}

function animateTraversal(steps, result) {
  const stepsDiv = document.getElementById("steps");
  const resultDiv = document.getElementById("result");
  stepsDiv.innerHTML = "";
  resultDiv.innerHTML = "";
  
  let i = 0;
  
  function step() {
    if (i > 0) {
      steps[i - 1].element.classList.add("visited");
      steps[i - 1].element.classList.remove("visiting");
    }

    if (i < steps.length) {
      steps[i].element.classList.add("visiting");
      
      const log = document.createElement("div");
      log.className = "step";
      log.innerText = `Visiting node: ${steps[i].val}`;
      stepsDiv.appendChild(log);
      
      i++;
      setTimeout(step, 1000);
    } else {
      resultDiv.innerHTML = `<h3>Result: ${result.join(", ")}</h3>`;
    }
  }

  step();
}