export function fileCheck (_path) {
    const fileObject = new File(_path);
    return fileObject.exists; 
}