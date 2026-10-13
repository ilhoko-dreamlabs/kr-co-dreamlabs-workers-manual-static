import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [];
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(full);
    else if (entry.name.endsWith('.html')) pages.push(full);
  }
}
await collect(path.join(root, 'guide'));
pages.push(path.join(root, 'index.html'));

const errors = [];
let refs = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const relativePage = path.relative(root, page).replaceAll('\\', '/');
  if (relativePage.startsWith('guide/') && relativePage !== 'guide/index.html') {
    if (!html.includes('id="test-case"')) errors.push(`${relativePage}: missing reproducible test case`);
    if (!html.includes('통과 기준') || !html.includes('남길 증거')) errors.push(`${relativePage}: missing test acceptance/evidence`);
    if (!['guide/changes/index.html','guide/release-history/index.html','guide/candidate-20261009-ui-context/index.html','guide/candidate-20261010-security-codex/index.html','guide/candidate-20261011-context-compat/index.html','guide/candidate-20261011-ui-skills/index.html','guide/candidate-20261013-system-events-skill-auto-update/index.html','guide/candidate-20261013-connector-ledger-compat/index.html','guide/candidate-20261013-rra-progress-capacity/index.html'].includes(relativePage) && !html.includes('data-capture') && !html.includes('화면 미촬영')) errors.push(`${relativePage}: missing real screenshot or explicit blocked capture status`);
    if (relativePage === 'guide/release-history/index.html' && (!html.includes('id="rra-progress-candidate"') || !html.includes('로컬 빌드·격리 검사 완료 · 운영 미적용 후보') || !html.includes('id="connector-ledger-candidate"') || !html.includes('worker00 적용·조회 확인 · worker0 실행·건강 확인') || !html.includes('id="system-events-candidate"') || !html.includes('worker0 과거 적용 확인 · 이벤트·스킬 자동업데이트 수용 전') || !html.includes('id="ui-skills-candidate"') || !html.includes('worker0 과거 적용 확인 · 기능·화면 수용 전') || !html.includes('id="context-candidate"') || !html.includes('id="security-deployed"') || !html.includes('id="ui-context-candidate"') || !html.includes('id="previous-operating"') || !html.includes('id="previous"'))) errors.push(`${relativePage}: missing candidate or verified deployment entries`);
    if (relativePage === 'guide/candidate-20261009-ui-context/index.html' && (!html.includes('운영 미적용') || !html.includes('후보 화면 캡처도 미촬영'))) errors.push(`${relativePage}: missing candidate status or screenshot boundary`);
    if (relativePage === 'guide/candidate-20261010-security-codex/index.html' && (!html.includes('worker0 적용 확인') || !html.includes('실제 화면 캡처도 미촬영') || !html.includes('7건'))) errors.push(`${relativePage}: missing deployed edition boundaries`);
    if (relativePage === 'guide/candidate-20261011-context-compat/index.html' && (!html.includes('worker0 적용 확인') || !html.includes('새 화면 캡처도 미촬영') || !html.includes('기본 20초'))) errors.push(`${relativePage}: missing context deployed boundaries`);
    if (relativePage === 'guide/candidate-20261011-ui-skills/index.html' && (!html.includes('worker0 과거 실행 확인') || !html.includes('UNIFIED_QUEUE_STATE_LOCK_UNCERTAIN') || !html.includes('시스템 이벤트·설치 스킬 자동업데이트 이미지') || !html.includes('화면 캡처'))) errors.push(`${relativePage}: missing UI/Skills historical runtime boundaries`);
    if (relativePage === 'guide/candidate-20261013-system-events-skill-auto-update/index.html' && (!html.includes('worker0 적용 확인 · 기능 수용 전') || !html.includes('handler ready') || !html.includes('수신 꺼짐') || !html.includes('발행자 0명') || !html.includes('EVENT_SECURE_TRANSPORT_REQUIRED') || !html.includes('CI 구현이 차단') || !html.includes('새 이미지 화면 캡처 미확보') || !html.includes('CI 알림이 자동으로 시작되는 것은 아닙니다'))) errors.push(`${relativePage}: missing system-events deployment and acceptance boundaries`);
    if (relativePage === 'guide/candidate-20261013-connector-ledger-compat/index.html' && (!html.includes('worker00 적용·조회 확인 / worker0 실행·건강 확인') || !html.includes('원격 이미지 식별 재검증') || !html.includes('13개 보존 검사') || !html.includes('2,000건') || !html.includes('확인 필요') || !html.includes('실제 GitLab Connector') || !html.includes('기록 삭제·초기화·재등록') || !html.includes('새 UI 변경 없음'))) errors.push(`${relativePage}: missing Connector deployment and acceptance boundaries`);
    if (relativePage === 'guide/candidate-20261013-rra-progress-capacity/index.html' && (!html.includes('운영 미적용') || !html.includes('Registry 등록') || !html.includes('대화로 이어가기') || !html.includes('실행과정 보기') || !html.includes('Adapter 동시 실행 상한') || !html.includes('최대 <strong>16</strong>') || !html.includes('기존 저장값 2') || !html.includes('새 후보의 운영 화면 캡처 미확보'))) errors.push(`${relativePage}: missing RRA candidate scope or acceptance boundaries`);
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]));
  for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    refs++;
    const [url, fragment] = value.split('#');
    let target = url ? path.resolve(path.dirname(page), url) : page;
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
    } catch {
      errors.push(`${path.relative(root, page)}: missing ${attribute} ${value}`);
      continue;
    }
    if (fragment) {
      const destinationIds = target === page ? ids : new Set([...((await readFile(target, 'utf8')).matchAll(/\bid="([^"]+)"/g))].map(x => x[1]));
      if (!destinationIds.has(fragment)) errors.push(`${path.relative(root, page)}: missing anchor ${value}`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${pages.length} HTML pages and ${refs} local references.`);
}
