/**
 * Pure Node.js HTML parsing and inspection utilities
 * Supports querying by tag, class, ID, and attribute without third-party dependencies.
 */

function parseAttributes(attrString) {
  const attrs = {};
  if (!attrString) return attrs;
  // Match key="value", key='value', or boolean key
  const regex = /([a-zA-Z0-9_\-:]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1].toLowerCase();
    const val = match[2] !== undefined ? match[2] :
                match[3] !== undefined ? match[3] :
                match[4] !== undefined ? match[4] : true;
    attrs[key] = val;
  }
  return attrs;
}

function extractElements(html) {
  // Returns array of element representations { tag, raw, attributes, innerHTML }
  const elements = [];
  const tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>([\s\S]*?)<\/\1>|<([a-zA-Z0-9\-]+)([^>]*)\/?>/g;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    if (match[1]) {
      const tag = match[1].toLowerCase();
      const rawAttrs = match[2] || '';
      const innerHTML = match[3] || '';
      elements.push({
        tag,
        raw: match[0],
        attributes: parseAttributes(rawAttrs),
        innerHTML,
        isSelfClosing: false,
      });
    } else if (match[4]) {
      const tag = match[4].toLowerCase();
      const rawAttrs = match[5] || '';
      elements.push({
        tag,
        raw: match[0],
        attributes: parseAttributes(rawAttrs),
        innerHTML: '',
        isSelfClosing: true,
      });
    }
  }
  return elements;
}

function querySelectorAll(html, selector) {
  const elements = extractElements(html);
  selector = selector.trim();

  // ID selector #my-id
  if (selector.startsWith('#')) {
    const id = selector.slice(1);
    return elements.filter(el => el.attributes.id === id);
  }

  // Class selector .my-class
  if (selector.startsWith('.')) {
    const cls = selector.slice(1);
    return elements.filter(el => {
      const classAttr = el.attributes.class;
      return typeof classAttr === 'string' && classAttr.split(/\s+/).includes(cls);
    });
  }

  // Attribute selector [data-target] or [name="value"]
  if (selector.startsWith('[') && selector.endsWith(']')) {
    const inner = selector.slice(1, -1);
    if (inner.includes('=')) {
      const [k, v] = inner.split('=').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      return elements.filter(el => el.attributes[k.toLowerCase()] === v);
    }
    return elements.filter(el => k in el.attributes);
  }

  // Tag selector, e.g., 'nav', 'header', 'section'
  return elements.filter(el => el.tag === selector.toLowerCase());
}

function querySelector(html, selector) {
  const results = querySelectorAll(html, selector);
  return results.length > 0 ? results[0] : null;
}

function hasTag(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b[^>]*>`, 'i');
  return regex.test(html);
}

function hasId(html, id) {
  const regex = new RegExp(`id=["']${id}["']`, 'i');
  return regex.test(html);
}

function hasClass(html, className) {
  const regex = new RegExp(`class=["'][^"']*\\b${className}\\b[^"']*["']`, 'i');
  return regex.test(html);
}

function getAttribute(tagRaw, attrName) {
  const attrs = parseAttributes(tagRaw.replace(/^<[^\s>]+/, '').replace(/\/?>$/, ''));
  return attrs[attrName.toLowerCase()];
}

function extractLinks(html) {
  // Returns all href values
  const links = [];
  const regex = /<a\b[^>]*\bhref=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function extractImages(html) {
  // Returns all img elements with src and alt
  const imgs = [];
  const regex = /<img\b([^>]*)>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const attrs = parseAttributes(match[1]);
    imgs.push({
      raw: match[0],
      src: attrs.src || '',
      alt: attrs.alt || '',
      attributes: attrs,
    });
  }
  return imgs;
}

function extractVideos(html) {
  // Returns all video elements and sources
  const videos = [];
  const regex = /<video\b([^>]*)>([\s\S]*?)<\/video>|<video\b([^>]*)\/?>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawAttrs = match[1] || match[3] || '';
    const inner = match[2] || '';
    const attrs = parseAttributes(rawAttrs);

    // Extract child <source> tags
    const sources = [];
    const srcRegex = /<source\b([^>]*)>/gi;
    let sMatch;
    while ((sMatch = srcRegex.exec(inner)) !== null) {
      sources.push(parseAttributes(sMatch[1]));
    }

    videos.push({
      raw: match[0],
      attributes: attrs,
      sources,
      poster: attrs.poster || '',
    });
  }
  return videos;
}

module.exports = {
  parseAttributes,
  extractElements,
  querySelectorAll,
  querySelector,
  hasTag,
  hasId,
  hasClass,
  getAttribute,
  extractLinks,
  extractImages,
  extractVideos,
};
