const KNOWN_HEADINGS = new Set([
  'brief',
  'objectives',
  'my role',
  'outcome',
  'results',
  'solution',
  'approach',
  'challenge',
  'target audience',
  'insights',
  'deliverables',
  'scope',
  'impact',
]);

const normalizeLineEndings = (text = '') => text.replace(/\r\n?/g, '\n');

const slugify = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';

const isMetaLine = (line = '') =>
  /^(client|project|year)\s*:/i.test(line.trim());

const isSectionHeading = (line = '') => {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (isMetaLine(trimmed)) return false;

  const withoutColon = trimmed.replace(/:$/, '').trim();

  if (KNOWN_HEADINGS.has(withoutColon.toLowerCase())) return true;

  // Treat any short line ending with a colon as heading (e.g., "Brief:")
  if (/^[\w\s&'()/-]{2,80}:$/.test(trimmed)) return true;

  return false;
};

const cleanItemText = (line = '') => line.replace(/^[-•\d.\s]+/, '').trim();

const toParagraphs = (lines) => {
  const paragraphs = [];
  let buffer = [];

  lines.forEach((line) => {
    if (!line.trim()) {
      if (buffer.length) {
        paragraphs.push(buffer.join(' ').replace(/\s+/g, ' ').trim());
        buffer = [];
      }
    } else {
      buffer.push(line.trim());
    }
  });

  if (buffer.length) {
    paragraphs.push(buffer.join(' ').replace(/\s+/g, ' ').trim());
  }

  return paragraphs;
};

const linesToList = (lines) =>
  lines.map((line) => cleanItemText(line)).filter((line) => line.length > 0);

const shouldRenderAsList = (heading, lines) => {
  const normalizedHeading = (heading || '').toLowerCase();
  if (normalizedHeading.includes('objective')) return true;
  if (normalizedHeading.includes('deliverable')) return true;
  if (normalizedHeading.includes('target audience')) return true;
  if (lines.some((line) => /^[-•]/.test(line.trim()))) return true;

  const nonEmpty = lines.filter((line) => line.trim().length > 0);
  if (
    nonEmpty.length > 1 &&
    nonEmpty.every((line) => line.trim().length <= 160)
  ) {
    return true;
  }

  return false;
};

export const parseCaseStudyText = (text) => {
  if (!text || typeof text !== 'string') return null;

  const lines = normalizeLineEndings(text).split('\n');
  const total = lines.length;
  let index = 0;

  const advanceToContent = () => {
    while (index < total && !lines[index].trim()) {
      index += 1;
    }
  };

  advanceToContent();

  if (index >= total) return null;

  const result = {
    title: '',
    subtitle: '',
    meta: {},
    sections: [],
  };

  result.title = lines[index].trim();
  index += 1;

  advanceToContent();

  if (index < total) {
    const potentialSubtitle = lines[index].trim();
    if (potentialSubtitle && !isMetaLine(potentialSubtitle)) {
      result.subtitle = potentialSubtitle;
      index += 1;
    }
  }

  advanceToContent();

  while (index < total && isMetaLine(lines[index])) {
    const line = lines[index].trim();
    const [label, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (label && value) {
      const key = label.toLowerCase();
      result.meta[key] = value;
    }
    index += 1;
  }

  let currentSection = null;

  const commitSection = () => {
    if (!currentSection) return;
    const rawLines = currentSection.lines;
    const heading = currentSection.heading;
    const nonEmptyLines = rawLines.filter((line) => line.trim().length > 0);

    if (nonEmptyLines.length === 0) {
      currentSection = null;
      return;
    }

    const asList = shouldRenderAsList(heading, nonEmptyLines);

    const section = {
      id: currentSection.id,
      heading,
      type: asList ? 'list' : 'paragraphs',
      items: [],
      paragraphs: [],
    };

    if (asList) {
      section.items = linesToList(nonEmptyLines);
    } else {
      section.paragraphs = toParagraphs(rawLines);
    }

    result.sections.push(section);
    currentSection = null;
  };

  const startSection = (headingLine) => {
    commitSection();
    const cleanHeading = headingLine.replace(/:$/, '').trim();
    currentSection = {
      heading: cleanHeading,
      id: slugify(cleanHeading),
      lines: [],
    };
  };

  while (index < total) {
    const line = lines[index];
    if (isSectionHeading(line)) {
      startSection(line.trim());
      index += 1;
      continue;
    }

    if (!currentSection) {
      // Treat stray text as intro section
      startSection('Overview');
    }

    currentSection.lines.push(line);
    index += 1;
  }

  commitSection();

  return result;
};

export default parseCaseStudyText;
