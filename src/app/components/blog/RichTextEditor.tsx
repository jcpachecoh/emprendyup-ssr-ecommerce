'use client';
import React, {
  useRef,
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import './RichTextEditor.scss';
import classNames from 'classnames';
import {
  Bold as IconRTEBold,
  Italic as IconRTEItalic,
  Underline as IconRTEUnderline,
  Strikethrough as IconRTECrossed,
  List as IconRTEUL,
  ListOrdered as IconRTEOL,
  Link as IconRTELink,
} from 'lucide-react';

import DOMPurify from 'dompurify';
import { mentionUtils } from '@/lib/blog/mentionUtils';

export interface RichTextEditorRef {
  insertText: (text: string) => void;
  focus: () => void;
  submit: () => void;
  KAI: (text: string) => void;
  getEditor: () => HTMLDivElement | null;
  setValue: (html: string) => void;
  getValue: () => string;
  setSelection: (selection: Selection) => void;
  getSelection: () => Selection | Range;
  posFromIndex: (index: number) => number;
  replaceMention: (startPos: number, length: number, mentionHtml: string) => void;
  getCursorPosition: () => number;
  getAllMentions: () => string[];
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string, plainText: string, mentions?: string[]) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  maxHeight?: string;
  toolbar?: boolean;
  getEditor?: (editor: HTMLDivElement | null) => void;
  setValue?: (html: string) => void;
  isUserSearchOpen?: boolean;
  onMentionDetected?: (mentions: any[]) => void;
}

let isUpdating = false;

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      onSubmit,
      placeholder = 'Write your message...',
      className = '',
      autoFocus = false,
      maxHeight = '250px',
      toolbar = true,
      getEditor,
      isUserSearchOpen = false,
      onMentionDetected,
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [showPlaceholder, setShowPlaceholder] = useState(!value);
    const operationInProgressRef = useRef(false);
    const lastKnownSelectionRef = useRef<Range | null>(null);

    const purifyConfig = {
      ALLOWED_TAGS: [
        'b',
        'i',
        'em',
        'strong',
        'u',
        'a',
        'ul',
        'ol',
        'li',
        'p',
        'br',
        'strike',
        'del',
        'div',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class', 'data-mention'],
      ADD_ATTR: ['target', 'rel', 'data-mention'],
      KEEP_CONTENT: true,
    };

    const [activeFormats, setActiveFormats] = useState({
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
      ul: false,
      ol: false,
    });

    /**
     * Enhanced formatMentions function using our utility
     */
    const formatMentions = useCallback((content: string, skipAutoFormat: boolean = false) => {
      if (skipAutoFormat) {
        return content;
      }
      return mentionUtils.formatMentionsToHtml(content);
    }, []);

    const checkFormatting = useCallback(() => {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;

      if (container.nodeType === Node.TEXT_NODE) {
        container = container.parentNode as Node;
      }

      let currentNode = container as HTMLElement;
      const formats = {
        bold: false,
        italic: false,
        underline: false,
        strikeThrough: false,
        ul: false,
        ol: false,
      };

      while (currentNode && currentNode !== editorRef.current) {
        const nodeName = currentNode.nodeName.toLowerCase();

        if (
          nodeName === 'b' ||
          nodeName === 'strong' ||
          (currentNode.style && currentNode.style.fontWeight === 'bold') ||
          (currentNode.style && parseInt(currentNode.style.fontWeight, 10) >= 700)
        ) {
          formats.bold = true;
        }

        if (
          nodeName === 'i' ||
          nodeName === 'em' ||
          (currentNode.style && currentNode.style.fontStyle === 'italic')
        ) {
          formats.italic = true;
        }

        if (
          nodeName === 'u' ||
          (currentNode.style && currentNode.style.textDecoration === 'underline')
        ) {
          formats.underline = true;
        }

        if (
          nodeName === 's' ||
          nodeName === 'strike' ||
          nodeName === 'del' ||
          (currentNode.style &&
            (currentNode.style.textDecoration === 'line-through' ||
              currentNode.style.textDecoration.includes('line-through')))
        ) {
          formats.strikeThrough = true;
        }

        if (nodeName === 'ul') {
          formats.ul = true;
        }
        if (nodeName === 'ol') {
          formats.ol = true;
        }

        currentNode = currentNode.parentNode as HTMLElement;
      }

      setActiveFormats(formats);
    }, []);

    const handleAutoGrow = () => {
      if (editorRef.current) {
        // Get the minimum height from CSS (80px as defined in SCSS)
        const minHeightPx = 80;

        // Store the current height before changing it
        const currentHeight = editorRef.current.offsetHeight;

        // Temporarily set height to auto to measure scroll height
        const originalHeight = editorRef.current.style.height;
        editorRef.current.style.height = 'auto';
        const scrollHeight = editorRef.current.scrollHeight;

        // Reset to original height immediately to prevent flicker
        editorRef.current.style.height = originalHeight;

        const maxHeightPx = parseInt(maxHeight.replace('px', ''), 10);

        // Calculate the new height, ensuring it never goes below minimum
        const newHeight = Math.max(Math.min(scrollHeight, maxHeightPx), minHeightPx);

        // Only update if the height actually needs to change
        if (newHeight !== currentHeight) {
          editorRef.current.style.height = `${newHeight}px`;
          editorRef.current.style.overflowY = scrollHeight > maxHeightPx ? 'auto' : 'hidden';
        }
      }
    };

    const insertAtCursor = (html: string) => {
      if (!editorRef.current) return;

      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      if (!editorRef.current.contains(range.commonAncestorContainer)) {
        editorRef.current.focus();
        const newRange = document.createRange();
        newRange.setStart(editorRef.current, 0);
        newRange.setEnd(editorRef.current, 0);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      operationInProgressRef.current = true;
      document.execCommand('insertHTML', false, html);

      setTimeout(() => {
        const rawHtmlContent = editorRef?.current?.innerHTML || '';
        const sanitizedHtml = DOMPurify.sanitize(rawHtmlContent, purifyConfig);
        const plainText = editorRef?.current?.textContent || '';
        const formattedHtml = formatMentions(sanitizedHtml, isUserSearchOpen);
        const mentions = mentionUtils.extractUserIdsFromHtml(formattedHtml);
        onChange(formattedHtml, plainText, mentions);
        operationInProgressRef.current = false;
        handleAutoGrow();
      }, 10);
    };

    const withOperation = (callback: () => void) => {
      operationInProgressRef.current = true;
      callback();
      setTimeout(() => {
        operationInProgressRef.current = false;
      }, 10);
    };

    /**
     * Enhanced replaceMentionInEditor using our utility
     */
    const replaceMentionInEditor = (startPos: number, length: number, mentionHtml: string) => {
      if (!editorRef.current) return;

      try {
        const currentHtml = editorRef.current.innerHTML;
        const newHtml = mentionUtils.replaceMentionAtPosition(
          currentHtml,
          startPos,
          length,
          mentionHtml.match(/data-mention="([^"]*)"?/)?.[1] || '',
          mentionHtml.match(/>@([^<]*)</)?.[1] || ''
        );

        editorRef.current.innerHTML = newHtml;
        editorRef.current.focus();

        setTimeout(() => {
          updateContent();
        }, 10);
      } catch (error) {
        console.error('Error replacing mention:', error);
        insertAtCursor(mentionHtml + ' ');
      }
    };

    // Enhanced ref methods
    useImperativeHandle(ref, () => ({
      insertText: (text: string) => {
        editorRef.current?.focus();

        if (lastKnownSelectionRef.current) {
          const selection = window.getSelection();
          if (selection) {
            try {
              selection.removeAllRanges();
              selection.addRange(lastKnownSelectionRef.current);
            } catch (e) {
              console.error('Failed to restore selection:', e);
            }
          }
        }

        const safeText = DOMPurify.sanitize(text, purifyConfig);
        insertAtCursor(safeText);
      },
      focus: () => {
        editorRef.current?.focus();
      },
      submit: () => {
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.innerHTML = '';
            setShowPlaceholder(value === '' || value === '<br>');
            editorRef.current.focus();
          }
        }, 10);
      },
      KAI: (text: string) => {
        editorRef.current?.focus();
        if (editorRef.current) {
          editorRef.current.innerHTML = '';
          const safeText = DOMPurify.sanitize(text, purifyConfig);
          insertAtCursor(safeText);
        }
      },
      getEditor: () => editorRef.current,
      setValue: (html: string) => {
        if (editorRef.current) {
          const sanitizedHtml = DOMPurify.sanitize(html, purifyConfig);
          editorRef.current.innerHTML = sanitizedHtml;
          updateContent();
        }
      },
      setSelection: (selection: Selection) => {
        if (selection.rangeCount > 0 && editorRef.current) {
          const range = selection.getRangeAt(0);
          if (editorRef.current.contains(range.commonAncestorContainer)) {
            const newSelection = window.getSelection();
            newSelection?.removeAllRanges();
            newSelection?.addRange(range);
          }
        }
      },
      getSelection: () => {
        return window.getSelection() || document.createRange();
      },
      getValue: () => {
        return editorRef.current?.innerHTML || '';
      },
      posFromIndex: (index: number) => {
        if (!editorRef.current) return 0;
        mentionUtils.setCursorPosition(editorRef.current, index);
        return index;
      },
      replaceMention: (startPos: number, length: number, mentionHtml: string) => {
        replaceMentionInEditor(startPos, length, mentionHtml);
      },
      getCursorPosition: () => {
        return mentionUtils.getCursorPosition(editorRef.current);
      },
      getAllMentions: () => {
        return mentionUtils.extractUserIdsFromHtml(editorRef.current?.innerHTML || '');
      },
    }));

    const ensureLinkStyling = () => {
      if (!editorRef.current) return;
      const links = editorRef.current.querySelectorAll('a[href]:not(.rte-link)');
      links.forEach((link) => {
        link.classList.add('rte-link');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    };

    const updateContent = () => {
      if (!editorRef.current || isUpdating) return;

      isUpdating = true;

      if (operationInProgressRef.current) {
        isUpdating = false;
        return;
      }

      try {
        const rawHtmlContent = editorRef.current.innerHTML;
        const mentionsFormattedValue = formatMentions(rawHtmlContent, isUserSearchOpen);
        const sanitizedHtml = DOMPurify.sanitize(mentionsFormattedValue, purifyConfig);

        // Extract mentions for callback
        const mentions = mentionUtils.extractUserIdsFromHtml(sanitizedHtml);
        const allMentions = mentionUtils.extractAllMentions(editorRef.current.textContent || '');

        // Call mention detected callback
        if (onMentionDetected) {
          onMentionDetected(allMentions);
        }

        if (sanitizedHtml !== rawHtmlContent) {
          const selection = window.getSelection();
          let selectionSaved = false;
          let startContainer: Node | null = null;
          let startOffset = 0;
          let endContainer: Node | null = null;
          let endOffset = 0;

          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (editorRef.current.contains(range.startContainer)) {
              startContainer = range.startContainer;
              startOffset = range.startOffset;
              endContainer = range.endContainer;
              endOffset = range.endOffset;
              selectionSaved = true;
            }
          }

          editorRef.current.innerHTML = sanitizedHtml;

          if (selectionSaved && selection && startContainer && endContainer) {
            try {
              const hadFocus = document.activeElement === editorRef.current;
              const newRange = document.createRange();
              newRange.setStart(startContainer, startOffset);
              newRange.setEnd(endContainer, endOffset);
              selection.removeAllRanges();
              selection.addRange(newRange);

              if (hadFocus) {
                editorRef.current.focus();
                setTimeout(() => {
                  if (editorRef.current) {
                    editorRef.current.focus();
                    try {
                      selection.removeAllRanges();
                      selection.addRange(newRange);
                    } catch (e) {
                      console.error('Failed to restore selection after timeout:', e);
                    }
                  }
                }, 0);
              }
            } catch (e) {
              console.error('Failed to restore selection:', e);
              editorRef.current.focus();
            }
          }
        }

        ensureLinkStyling();

        const isEmpty =
          editorRef.current.innerHTML === '' || editorRef.current.innerHTML === '<br>';
        setShowPlaceholder(isEmpty);

        const plainText = editorRef.current.textContent || '';
        onChange(sanitizedHtml, plainText, mentions);

        handleAutoGrow();
      } finally {
        isUpdating = false;
      }
    };

    // Rest of your component methods (execCommand, handleBold, etc.)...
    const execCommand = (command: string, value: string = '') => {
      withOperation(() => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);

        const rawHtmlContent = editorRef?.current?.innerHTML || '';
        const sanitizedHtml = DOMPurify.sanitize(rawHtmlContent, purifyConfig);
        const plainText = editorRef?.current?.textContent || '';
        const mentions = mentionUtils.extractUserIdsFromHtml(sanitizedHtml);
        onChange(sanitizedHtml, plainText, mentions);
        updateContent();
      });
    };

    const handleBold = () => execCommand('bold');
    const handleItalic = () => execCommand('italic');
    const handleUnderline = () => execCommand('underline');
    const handleStrikethrough = () => execCommand('strikeThrough');
    const handleOrderedList = () => execCommand('insertOrderedList');
    const handleUnorderedList = () => execCommand('insertUnorderedList');

    const handleLink = () => {
      const selection = window.getSelection();
      const hasSelection = selection && selection.toString().trim() !== '';
      const url = prompt('Enter URL:', 'https://');
      if (!url) return;

      let formattedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        formattedUrl = 'https://' + url;
      }

      withOperation(() => {
        if (hasSelection) {
          execCommand('createLink', formattedUrl);
          if (selection && selection.rangeCount) {
            const range = selection.getRangeAt(0);
            const linkNode = range.commonAncestorContainer.parentElement;
            if (linkNode && linkNode.tagName === 'A') {
              linkNode.className = 'rte-link';
              linkNode.setAttribute('target', '_blank');
              linkNode.setAttribute('rel', 'noopener noreferrer');
            }
          }
        } else {
          const linkText = new URL(formattedUrl).hostname;
          const linkHtml = `<a href="${formattedUrl}" class="rte-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
          insertAtCursor(linkHtml);
        }
      });
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();

      let pastedText = '';
      if (e.clipboardData) {
        pastedText = e.clipboardData.getData('text/plain');
      }

      withOperation(() => {
        const isEmoji = /^\p{Emoji}+$/u.test(pastedText);

        if (isEmoji) {
          insertAtCursor(pastedText);
          return;
        }

        if (/^https?:\/\/\S+$/.test(pastedText.trim())) {
          const url = pastedText.trim();
          try {
            const linkText = new URL(url).hostname;
            const linkHtml = `<a href="${url}" class="rte-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
            insertAtCursor(linkHtml);
          } catch (e) {
            insertAtCursor(pastedText);
          }
        } else {
          insertAtCursor(pastedText);
        }
      });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (onKeyDown) {
        onKeyDown(e);
      }

      // Let the parent component handle Shift+Enter submission
      // Remove duplicate handling to prevent double submission
    };

    const handleFocus = () => {
      setShowPlaceholder(false);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        lastKnownSelectionRef.current = selection.getRangeAt(0).cloneRange() || null;
      }

      if (editorRef.current) {
        const isEmpty =
          editorRef.current.innerHTML === '' || editorRef.current.innerHTML === '<br>';
        setShowPlaceholder(isEmpty);
      }
    };

    // Initialize editor
    useEffect(() => {
      if (editorRef.current) {
        if (value) {
          const mentionFormattedValue = formatMentions(value, false);
          const sanitizedValue = DOMPurify.sanitize(mentionFormattedValue, purifyConfig);
          editorRef.current.innerHTML = sanitizedValue;
          if (sanitizedValue !== value) {
            const mentions = mentionUtils.extractUserIdsFromHtml(sanitizedValue);
            onChange(sanitizedValue, editorRef.current.textContent || '', mentions);
          }
        }

        handleAutoGrow();

        const observer = new MutationObserver(() => {
          if (!operationInProgressRef.current) {
            ensureLinkStyling();
          }
        });

        observer.observe(editorRef.current, {
          childList: true,
          subtree: true,
          characterData: true,
        });

        return () => observer.disconnect();
      }
    }, []);

    useEffect(() => {
      if (autoFocus && editorRef.current) {
        editorRef.current.focus();
      }
    }, [autoFocus]);

    useEffect(() => {
      if (getEditor && editorRef.current) {
        getEditor(editorRef.current);
      }
    }, [getEditor]);

    useEffect(() => {
      const handleSelectionChange = () => {
        if (document.activeElement === editorRef.current) {
          checkFormatting();
        }
      };

      document.addEventListener('selectionchange', handleSelectionChange);

      const handleFocusEvent = () => {
        checkFormatting();
      };

      if (editorRef.current) {
        editorRef.current.addEventListener('focus', handleFocusEvent);
      }

      return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
        if (editorRef.current) {
          editorRef.current.removeEventListener('focus', handleFocusEvent);
        }
      };
    }, [checkFormatting]);

    return (
      <div className={`rich-text-editor ${className}`}>
        {toolbar && (
          <div className="rich-text-toolbar">
            <div className="rich-text-toolbar-group">
              <button
                type="button"
                className={`toolbar-button ${activeFormats.bold ? 'active' : ''}`}
                onClick={handleBold}
                title="Bold"
              >
                <IconRTEBold />
              </button>
              <button
                type="button"
                className={`toolbar-button ${activeFormats.italic ? 'active' : ''}`}
                onClick={handleItalic}
                title="Italic"
              >
                <IconRTEItalic />
              </button>
              <button
                type="button"
                className={`toolbar-button ${activeFormats.underline ? 'active' : ''}`}
                onClick={handleUnderline}
                title="Underline"
              >
                <IconRTEUnderline />
              </button>
              <button
                type="button"
                className={`toolbar-button ${activeFormats.strikeThrough ? 'active' : ''}`}
                onClick={handleStrikethrough}
                title="Strikethrough"
              >
                <IconRTECrossed />
              </button>
            </div>
            <div className="rich-text-toolbar-group">
              <button
                type="button"
                className={`toolbar-button ${activeFormats.ul ? 'active' : ''}`}
                onClick={handleUnorderedList}
                title="Unordered List"
              >
                <IconRTEUL />
              </button>
              <button
                type="button"
                className={`toolbar-button ${activeFormats.ol ? 'active' : ''}`}
                onClick={handleOrderedList}
                title="Ordered List"
              >
                <IconRTEOL />
              </button>
            </div>

            <button type="button" className="toolbar-button" onClick={handleLink} title="Add URL">
              <IconRTELink />
            </button>
          </div>
        )}

        <div
          className={classNames('rich-text-content', { 'show-placeholder': showPlaceholder })}
          ref={editorRef}
          contentEditable={true}
          onInput={updateContent}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-placeholder={placeholder}
          style={{
            minHeight: '80px',
            maxHeight: maxHeight,
            overflow: 'hidden',
          }}
        />
      </div>
    );
  }
);

export default RichTextEditor;
RichTextEditor.displayName = 'RichTextEditor';
