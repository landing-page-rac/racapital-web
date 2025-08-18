export interface RichTextParagraph {
  type: string;
  level?: number;
  format?: string;
  url?: string;
  children: Array<{
    text?: string;
    type: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    url?: string;
    children?: Array<{
      text?: string;
      type: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      url?: string;
      children?: Array<{
        text: string;
        type: string;
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        url?: string;
      }>;
    }>;
  }>;
}

export type RichTextContent = RichTextParagraph[];

// Contact form types
export * from './contact';