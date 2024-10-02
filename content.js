// コンフリクト解消画面かどうかを確認する関数
function isConflictResolutionPage() {
    return window.location.href.includes("/conflicts") || 
           document.querySelector('.js-resolvable-conflicts') !== null;
}
  
// YAMLファイルかどうかを確認する関数
function isYAMLFile(block) {
    const dataPath = block.closest('div[data-path]').getAttribute('data-path');
    return dataPath.endsWith('.yml') || dataPath.endsWith('.yaml');
}

// UnityYAMLファイルかどうかを確認する関数
function isUnityYAML(textContent) {
    const unityTag = textContent.includes('%TAG !u! tag:unity3d.com,2011:');
    const hasUnityFields = textContent.includes('GameObject') || textContent.includes('MonoBehaviour') || textContent.includes('m_ObjectHideFlags');
    return unityTag || hasUnityFields;
}
  
// セクションを色分けしてフォーマットする関数
function formatYAMLSections(textContent) {
    const lines = textContent.split('\n');
    let insideSection = false;
    let sectionColor = '';
    const formattedLines = lines.map((line) => {
        if (line.trim() === '---') {
            insideSection = !insideSection;
            sectionColor = insideSection ? '#e6f7ff' : '#fff7e6';
        }
        return `<span style="background-color: ${sectionColor};">${line}</span>`;
    });
  
    return formattedLines.join('\n');
}
  
// メイン処理
function processCodeBlocks() {
    const codeBlocks = document.querySelectorAll('table.diff-table td.blob-code-inner');
  
    codeBlocks.forEach((block) => {
        const textContent = block.innerText;
  
        if (isYAMLFile(block) && isUnityYAML(textContent)) {
            console.log("true");
            const formattedHTML = formatYAMLSections(textContent);
            block.innerHTML = formattedHTML;
        }
    });
}
  
// 拡張機能のエントリーポイント
if (isConflictResolutionPage()) {
    processCodeBlocks();
}