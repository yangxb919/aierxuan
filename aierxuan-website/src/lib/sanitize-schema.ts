/**
 * Shared sanitize schema for rehype-sanitize
 * Defines allowed HTML tags and attributes for Markdown content
 * Used in both admin preview and public blog pages
 */

import { defaultSchema } from 'rehype-sanitize'
import type { Schema } from 'hast-util-sanitize'

/**
 * Custom sanitize schema based on GitHub's schema with additional allowances
 * for common blog content needs
 */
export const sanitizeSchema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Allow class on all elements for styling
    '*': [...(defaultSchema.attributes?.['*'] || []), 'className', 'class'],
    // Allow id for anchor links
    h1: ['id'],
    h2: ['id'],
    h3: ['id'],
    h4: ['id'],
    h5: ['id'],
    h6: ['id'],
    // Allow standard link attributes
    a: ['href', 'title', 'target', 'rel'],
    // Allow image attributes
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    // Allow code block attributes for syntax highlighting
    code: ['className', 'class'],
    pre: ['className', 'class'],
    span: ['className', 'class'],
    // Allow table attributes
    table: ['className', 'class'],
    th: ['align', 'valign', 'scope'],
    td: ['align', 'valign'],
    // Allow video/iframe for embedded content (restricted)
    iframe: ['src', 'width', 'height', 'frameBorder', 'allowFullScreen', 'title'],
  },
  tagNames: [
    // Text content
    'p', 'br', 'hr',
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // Lists
    'ul', 'ol', 'li',
    // Formatting
    'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'mark',
    'sub', 'sup', 'small',
    // Links and media
    'a', 'img',
    // Code
    'code', 'pre', 'kbd', 'samp', 'var',
    // Quotes and citations
    'blockquote', 'q', 'cite', 'abbr',
    // Tables
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
    // Semantic
    'div', 'span', 'section', 'article', 'aside', 'header', 'footer', 'nav',
    'figure', 'figcaption',
    // Details/Summary
    'details', 'summary',
    // Definition lists
    'dl', 'dt', 'dd',
  ],
  // Only allow specific protocols for URLs
  protocols: {
    href: ['http', 'https', 'mailto', 'tel'],
    src: ['http', 'https'],
  },
  // Strip dangerous elements completely
  strip: ['script', 'style', 'noscript', 'object', 'embed', 'applet'],
}
