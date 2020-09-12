class Validator {
  constructor({id, pattern, method}){
    this.id = id;
    this.pattern = pattern;
    this.method = method;
  }

  init() {
    console.log(this.selector);
  }

  showError(elem){

  }

  showSuccess(elem){

  }

  applyStyle(){
    const style = document.createElement('style');
    style.textContent = `
    input.success {
      border: 2px solid green
    }
    input.error {
      border: 2px solid red
    }
    `;
    document.head.append(style);
  }
}