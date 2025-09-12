// lib/mentionUtils.ts
export const mentionUtils = {
  formatMentionsToHtml: (content: string, _users?: any[]) => {
    // Aquí podrías transformar "@usuario" en <span data-mention="usuario">@usuario</span>
    // De momento, solo devolvemos el contenido sin cambios
    return content;
  },

  extractUserIdsFromHtml: (html: string): string[] => {
    // Extraer data-mention="id" si lo hubiera
    const regex = /data-mention="([^"]+)"/g;
    const ids: string[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      ids.push(match[1]);
    }
    return ids;
  },

  extractAllMentions: (text: string): string[] => {
    // Capturar todos los "@usuario" en el texto plano
    const regex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  },

  setCursorPosition: (element: HTMLElement, index: number) => {
    const range = document.createRange();
    const sel = window.getSelection();
    let current = 0;

    function traverse(node: Node): boolean {
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = (node.textContent || '').length;
        if (current + textLength >= index) {
          range.setStart(node, index - current);
          range.collapse(true);
          return true;
        }
        current += textLength;
      } else {
        for (const child of Array.from(node.childNodes)) {
          if (traverse(child)) return true;
        }
      }
      return false;
    }

    traverse(element);
    sel?.removeAllRanges();
    sel?.addRange(range);
  },

  getCursorPosition: (element: HTMLElement | null): number => {
    if (!element) return 0;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    let position = 0;

    function traverse(node: Node): boolean {
      if (node === range.startContainer) {
        position += range.startOffset;
        return true;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        position += (node.textContent || '').length;
      }
      for (const child of Array.from(node.childNodes)) {
        if (traverse(child)) return true;
      }
      return false;
    }

    traverse(element);
    return position;
  },

  replaceMentionAtPosition: (
    html: string,
    startPos: number,
    length: number,
    id: string,
    label: string
  ): string => {
    // Reemplaza texto plano con un span que represente la mención
    const before = html.slice(0, startPos);
    const after = html.slice(startPos + length);
    const mentionHtml = `<span data-mention="${id}">@${label}</span>`;
    return before + mentionHtml + after;
  },
};
