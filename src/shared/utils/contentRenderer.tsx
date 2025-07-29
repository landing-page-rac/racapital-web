import React, { ReactNode } from 'react';
import { RichTextParagraph, RichTextContent } from '../types';

// Helper function to render inline content with links
interface InlineChild {
  type?: string;
  text?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  children?: InlineChild[];
}

const renderInlineContent = (children: InlineChild[], key?: string | number) => {
  return children.map((child, childIndex) => {
    const elementKey = key !== undefined ? `${key}-${childIndex}` : childIndex;

    // Handle link objects with type "link"
    if (child.type === 'link' && child.url) {
      return (
        <a
          key={elementKey}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
        >
          {child.children?.map((linkChild: InlineChild, linkIndex: number) => (
            <span key={linkIndex}>{linkChild.text}</span>
          )) || child.text}
        </a>
      );
    }

    // Handle inline links (fallback for direct url property)
    if (child.url && child.type !== 'link') {
      return (
        <a
          key={elementKey}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
        >
          {child.text}
        </a>
      );
    }

    // Handle text formatting
    if (child.bold) {
      return <span key={elementKey} className='font-bold'>{child.text}</span>;
    }
    if (child.italic) {
      return <em key={elementKey}>{child.text}</em>;
    }
    if (child.underline) {
      return <u key={elementKey}>{child.text}</u>;
    }

    return <span key={elementKey}>{child.text}</span>;
  });
};

/**
 * Renders inline content without wrapping in a paragraph tag
 * Use this when you're already inside a paragraph element
 */
export const renderInlineBlock = (block: RichTextParagraph, key?: string | number): ReactNode => {
  if (block.type === 'paragraph') {
    return renderInlineContent(block.children, key);
  }

  // For other block types, we still need to render them as blocks
  return renderBlock(block, key as number);
};

export const renderBlock = (block: RichTextParagraph, index: number): ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="break-words">
          {renderInlineContent(block.children, index)}
        </p>
      );

    case 'heading':
      switch (block.level) {
        case 1:
          return (
            <h1 key={index} className="text-3xl font-bold my-4 break-words">
              {renderInlineContent(block.children, index)}
            </h1>
          );
        case 2:
          return (
            <h2 key={index} className="text-2xl font-bold my-4 break-words">
              {renderInlineContent(block.children, index)}
            </h2>
          );
        case 3:
          return (
            <h3 key={index} className="text-xl font-bold my-4 break-words">
              {renderInlineContent(block.children, index)}
            </h3>
          );
        default:
          return (
            <h4 key={index} className="text-lg font-bold my-4 break-words">
              {renderInlineContent(block.children, index)}
            </h4>
          );
      }

    case 'link':
      // Block-level link
      return (
        <p key={index} className="mb-4 break-words">
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
          >
            {renderInlineContent(block.children, index)}
          </a>
        </p>
      );

    case 'list':
      if (block.format === 'ordered') {
        return (
          <ol key={index} className="list-decimal pl-5 mb-4">
            {block.children.map((child, childIndex) => {
              if (child.type === 'list-item') {
                return (
                  <li key={childIndex} className="mb-1 break-words">
                    {child.children?.map((item, itemIndex) => {
                      if (item.type === 'link' && item.url) {
                        return (
                          <a
                            key={itemIndex}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
                          >
                            {item.children?.map((linkChild: InlineChild, linkChildIndex: number) => (
                              <span key={linkChildIndex}>{linkChild.text}</span>
                            )) || item.text}
                          </a>
                        );
                      }
                      if (item.url) {
                        return (
                          <a
                            key={itemIndex}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
                          >
                            {item.text}
                          </a>
                        );
                      }
                      return <span key={itemIndex}>{item.text}</span>;
                    }) || renderInlineContent([child], `${index}-${childIndex}`)}
                  </li>
                );
              }
              return (
                <li key={childIndex} className="mb-1 break-words">
                  {renderInlineContent([child], `${index}-${childIndex}`)}
                </li>
              );
            })}
          </ol>
        );
      } else {
        return (
          <ul key={index} className="list-disc pl-5 mb-4">
            {block.children.map((child, childIndex) => {
              if (child.type === 'list-item') {
                return (
                  <li key={childIndex} className="mb-1 break-words">
                    {child.children?.map((item, itemIndex) => {
                      if (item.type === 'link' && item.url) {
                        return (
                          <a
                            key={itemIndex}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
                          >
                            {item.children?.map((linkChild: InlineChild, linkChildIndex: number) => (
                              <span key={linkChildIndex}>{linkChild.text}</span>
                            )) || item.text}
                          </a>
                        );
                      }
                      if (item.url) {
                        return (
                          <a
                            key={itemIndex}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-words break-all max-w-full inline-block"
                          >
                            {item.text}
                          </a>
                        );
                      }
                      return <span key={itemIndex}>{item.text}</span>;
                    }) || renderInlineContent([child], `${index}-${childIndex}`)}
                  </li>
                );
              }
              return (
                <li key={childIndex} className="mb-1 break-words">
                  {renderInlineContent([child], `${index}-${childIndex}`)}
                </li>
              );
            })}
          </ul>
        );
      }

    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 break-words">
          {renderInlineContent(block.children, index)}
        </blockquote>
      );

    case 'code':
      return (
        <pre key={index} className="bg-gray-100 p-4 rounded my-4 overflow-x-auto break-words">
          <code>
            {renderInlineContent(block.children, index)}
          </code>
        </pre>
      );

    default:
      return (
        <p key={index} className="text-gray-700 mb-4 break-words">
          {renderInlineContent(block.children, index)}
        </p>
      );
  }
};

/**
 * Renders an array of RichTextParagraphs (RichTextContent)
 */
export const renderRichTextContent = (content: RichTextContent): ReactNode => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return content.map((block, index) => renderBlock(block, index));
};
