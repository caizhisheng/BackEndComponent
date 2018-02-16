const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fsExistsSync = name => { // 查找文件/文件夹
  try{
    fs.accessSync(__dirname+"/component/"+name,fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
};

const getFsExists = name => {
  let dirExists = fsExistsSync(name);
  if(dirExists){ // 如果存在该文件夹
    let fileExists = fsExistsSync(name+"/"+name+".jsx");
    if(fileExists){
      rl.write(`文件夹/文件 ${name} 已存在，请检查`);
      questionLoop();
    }else{
      createComponent(name, "file");
    }
  }else{ // 如果文件夹不存在
    createComponent(name, "dir");
  }
};

const createComponent = (name, type) => {
  let js = fs.readFileSync("./template.js").toString()
    .replace(/template/g, name);
  let jsx = fs.readFileSync("./template.jsx").toString()
    .replace(/template/g, name)
    .replace("Template", name.substring(0,1).toUpperCase()+name.substring(1));
  let scss = fs.readFileSync("./template.scss").toString();
  if(type === "dir"){
    fs.mkdirSync(__dirname+"/component/"+name);
  }
  fs.writeFileSync(__dirname+"/component/"+name+"/"+name+".js", js );
  fs.writeFileSync(__dirname+"/component/"+name+"/"+name+".jsx", jsx );
  fs.writeFileSync(__dirname+"/component/"+name+"/"+name+".scss", scss );
  questionLoop();
};

const questionLoop = () => {
  let question = "请输入组件名称：";
  rl.question(question, answer => {
    if(answer){
      getFsExists(answer);
    }
  });
};

questionLoop();