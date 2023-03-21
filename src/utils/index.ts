import CryptoJS from "crypto-js";

export function wait(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const md5 = (s) => CryptoJS.MD5(s).toString();

export function download(link: string, name: string) {
  if (!name) {
    name = link.slice(link.lastIndexOf("/") + 1);
  }
  let eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.style.display = "none";
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}

export function downloadFile(name, content) {
  if (typeof name == "undefined") {
    throw new Error("The first parameter name is a must");
  }
  if (typeof content == "undefined") {
    throw new Error("The second parameter content is a must");
  }
  if (!(content instanceof Blob)) {
    if (typeof content !== "string") {
      content = JSON.stringify(content, null, 2);
    }
    content = new Blob([content]);
  }
  const link = URL.createObjectURL(content);
  download(link, name);
}
export function copy2Clipboard(text) {
	// navigator clipboard 需要https等安全上下文
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard 向剪贴板写文本
		return navigator.clipboard.writeText(text)
	} else {
		// 创建text area
		let textArea = document.createElement('textarea')
		textArea.value = text
		// 使text area不在viewport，同时设置不可见
		textArea.style.position = 'absolute'
		textArea.style.left = '-999999px'
		textArea.style.top = '-999999px'
		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()
		return new Promise<void>((res, rej) => {
			// 执行复制命令并移除文本框
			document.execCommand('copy') ? res() : rej()
			textArea.remove()
			document.body.removeChild(textArea)
		})
	}
}
