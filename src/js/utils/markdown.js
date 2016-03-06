import hljs from 'highlight.js'
import Remarkable from 'remarkable'

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {}

  return '';
};

const md = new Remarkable('full', {
  html: true,
  linkify: true,
  typographer: true,
  highlight
});

export default function markdownToHTML(text) {
  return md.render(text);
}
