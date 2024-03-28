import Path from "path"

export const getFileType = (path) => {
    const fileName = Path.basename(path);
    return fileName.split(".").pop();
}