import fs from 'fs';
import path from 'path';

const UPDATE_LOG = 'CHANGELOG.md';
export default function updatelog(tag, type = 'updater') {
  tag = tag.replace(/^v/, '');
  const reTag = /### \[([\d\.]+)/;

  const file = path.join(process.cwd(), UPDATE_LOG);

  if (!fs.existsSync(file)) {
    console.log('Could not found CHANGELOG.md');
    process.exit(1);
  }

  let _tag;
  const tagMap = {};
  const content = fs.readFileSync(file, { encoding: 'utf8' }).split('\n');

  content.forEach((line, index) => {
    if (reTag.test(line)) {
      _tag = line.match(reTag)[1];
      if (!tagMap[_tag]) {
        tagMap[_tag] = [];
        return;
      }
    }
    if (_tag) {
      tagMap[_tag].push(line);
    }
    if (reTag.test(content[index + 1])) {
      _tag = null;
    }
  });

  if (!tagMap?.[tag]) {
    console.log(
      `${type === 'release' ? '[CHANGELOG.md] ' : ''}Tag ${tag} does not exist`
    );
    process.exit(1);
  }

  return tagMap[tag].join('\n').trim() || '';
}
