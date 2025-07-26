import { RichTextContent, RichTextChild } from '@/features/landing/types';

/**
 * Converts rich text content to plain text string
 */
export const richTextToPlainText = (richText: RichTextContent): string => {
  return richText
    .map(paragraph =>
      paragraph.children
        .map((child: RichTextChild) => child.text)
        .join('')
    )
    .join('\n');
};

/**
 * Converts rich text content to HTML string (preserving formatting)
 */
export const richTextToHTML = (richText: RichTextContent): string => {
  return richText
    .map(paragraph => {
      const content = paragraph.children
        .map((child: RichTextChild) => {
          let text = child.text;
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.underline) text = `<u>${text}</u>`;
          return text;
        })
        .join('');
      return `<p>${content}</p>`;
    })
    .join('');
};

/**
 * Gets the first image URL from rich text content (if any)
 */
export const extractImageUrl = (imageData: { image?: { url?: string } }): string | null => {
  return imageData?.image?.url || null;
}; 