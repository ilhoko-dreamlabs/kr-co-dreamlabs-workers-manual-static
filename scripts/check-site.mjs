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
    if (!['guide/changes/index.html','guide/release-history/index.html','guide/candidate-20261009-ui-context/index.html','guide/candidate-20261010-security-codex/index.html','guide/candidate-20261011-context-compat/index.html','guide/candidate-20261011-ui-skills/index.html','guide/candidate-20261013-system-events-skill-auto-update/index.html','guide/candidate-20261013-connector-ledger-compat/index.html','guide/candidate-20261014-claude-subscription-auth/index.html','guide/candidate-20261015-console-upload-integration/index.html','guide/candidate-20261016-codex-ui-followup/index.html','guide/candidate-20261019-gitlab-rest-fallback/index.html','guide/candidate-20261013-rra-progress-capacity/index.html'].includes(relativePage) && !html.includes('data-capture') && !html.includes('화면 미촬영')) errors.push(`${relativePage}: missing real screenshot or explicit blocked capture status`);
    if (relativePage === 'guide/release-history/index.html' && (!html.includes('id="claude-auth-candidate"') || !html.includes('claude-worker 실행·건강·인증 준비 확인 · 모델 요청 전') || !html.includes('id="rra-progress-candidate"') || !html.includes('worker0·worker1 실행 이미지·건강 확인 · 기능 수용 전') || !html.includes('id="connector-ledger-candidate"') || !html.includes('worker00 적용·조회 확인 · worker0 실행·건강 확인') || !html.includes('id="system-events-candidate"') || !html.includes('worker0 과거 적용 확인 · 이벤트·스킬 자동업데이트 수용 전') || !html.includes('id="ui-skills-candidate"') || !html.includes('worker0 과거 적용 확인 · 기능·화면 수용 전') || !html.includes('id="context-candidate"') || !html.includes('id="security-deployed"') || !html.includes('id="ui-context-candidate"') || !html.includes('id="previous-operating"') || !html.includes('id="previous"'))) errors.push(`${relativePage}: missing candidate or verified deployment entries`);
    if (relativePage === 'guide/release-history/index.html' && (!html.includes('id="gitlab-fallback-candidate"') || !html.includes('빌드·Registry·서버 배치·8개 워커 제안 확인 · 실제 적용 미확인') || !html.includes('당시 기존 컨테이너는 바뀌지 않았고 업데이트 제출도 없었습니다') || !html.includes('id="codex-ui-followup-candidate"') || !html.includes('worker0 실행 이미지·건강 확인 · 기능·화면 수용 전') || !html.includes('id="console-upload-candidate"'))) errors.push(`${relativePage}: missing 2026-10-19 supply stage or previous runtime correction`);
    if (relativePage === 'guide/release-history/index.html' && (!html.includes('id="git-provider-grant-candidate"') || !html.includes('별도 이미지 · 빌드·Registry·서버 배치·8개 제안 확인') || !html.includes('href="../candidate-20261019-git-provider-grant/"') || !html.includes('22:28 관리 워커 8개'))) errors.push(`${relativePage}: missing separate provider-grant image stage`);
    if (relativePage === 'guide/candidate-20261019-git-provider-grant/index.html' && (!html.includes('472건 통과') || !html.includes('완료 · 22:25(KST) 원격 이미지 식별 확인') || !html.includes('완료 · 22:27(KST) 서버 이미지 단독 배치') || !html.includes('확인 · 22:28(KST) 관리 워커 8개 대상 제안') || !html.includes('이후 재조회 필요') || !html.includes('이전 이미지에서 어느 Connector 설정이든 저장하면') || !html.includes('로컬 후보 화면 · 모의 API · 운영 화면 아님') || !html.includes('새 이미지의 운영 화면 캡처 미확보'))) errors.push(`${relativePage}: missing provider-grant candidate boundary`);
    if (relativePage === 'guide/git-provider-access/index.html' && (!html.includes('계정/토큰 권한 방식으로 전환') || !html.includes('현재 토큰에 보고된 OAuth 범위') || !html.includes('401') || !html.includes('403') || !html.includes('grant-card-mobile-ko.png') || !html.includes('legacy-card-mobile-ko.png') || !html.includes('create-desktop-ko.png') || !html.includes('로컬 후보 화면 · 모의 API · 운영 화면 아님') || !html.includes('운영 화면 캡처'))) errors.push(`${relativePage}: missing provider-grant procedure or candidate captures`);
    if (relativePage === 'guide/candidate-20261019-gitlab-rest-fallback/index.html' && (!html.includes('완료 · 원격 이미지 식별 재검증') || !html.includes('완료 · 18:36(KST) 서버 이미지 단독 배치·식별 확인') || !html.includes('확인 · 18:37(KST) 관리 워커 8개에서 대상 제안') || !html.includes('이후 재조회 필요') || !html.includes('470건 통과') || !html.includes('1,420개 파일') || !html.includes('결과 불명 쓰기') || !html.includes('새 이미지의 운영 화면 캡처 미확보'))) errors.push(`${relativePage}: missing 2026-10-19 candidate supply boundaries`);
    if (relativePage === 'guide/gitlab-work/index.html' && (!html.includes('읽기 전용 시험 요청 예제') || !html.includes('서버에 설정된 자격') || !html.includes('같은 변경 요청을 자동·수동으로 반복하지 않습니다') || !html.includes('실제 화면 미촬영'))) errors.push(`${relativePage}: missing GitLab user workflow or screenshot boundary`);
    if (relativePage === 'guide/candidate-20261016-codex-ui-followup/index.html' && (!html.includes('worker0 실행 이미지·건강 확인') || !html.includes('완료 · 서버 이미지 단독 배치') || !html.includes('468건 통과') || !html.includes('1,410개 파일') || !html.includes('맨 아래로') || !html.includes('새 이미지의 운영 화면 캡처 미확보'))) errors.push(`${relativePage}: missing 2026-10-16 runtime boundaries`);
    if (relativePage === 'guide/candidate-20261015-console-upload-integration/index.html' && (!html.includes('worker0 실행 이미지·건강 확인') || !html.includes('Console 완료 화면') || !html.includes('네 가지 업로드 한도') || !html.includes('새 이미지의 운영 화면 캡처 미확보'))) errors.push(`${relativePage}: missing 2026-10-15 deployed boundaries`);
    if (relativePage === 'guide/candidate-20261009-ui-context/index.html' && (!html.includes('운영 미적용') || !html.includes('후보 화면 캡처도 미촬영'))) errors.push(`${relativePage}: missing candidate status or screenshot boundary`);
    if (relativePage === 'guide/candidate-20261010-security-codex/index.html' && (!html.includes('worker0 적용 확인') || !html.includes('실제 화면 캡처도 미촬영') || !html.includes('7건'))) errors.push(`${relativePage}: missing deployed edition boundaries`);
    if (relativePage === 'guide/candidate-20261011-context-compat/index.html' && (!html.includes('worker0 적용 확인') || !html.includes('새 화면 캡처도 미촬영') || !html.includes('기본 20초'))) errors.push(`${relativePage}: missing context deployed boundaries`);
    if (relativePage === 'guide/candidate-20261011-ui-skills/index.html' && (!html.includes('worker0 과거 실행 확인') || !html.includes('UNIFIED_QUEUE_STATE_LOCK_UNCERTAIN') || !html.includes('시스템 이벤트·설치 스킬 자동업데이트 이미지') || !html.includes('화면 캡처'))) errors.push(`${relativePage}: missing UI/Skills historical runtime boundaries`);
    if (relativePage === 'guide/candidate-20261013-system-events-skill-auto-update/index.html' && (!html.includes('worker0 적용 확인 · 기능 수용 전') || !html.includes('handler ready') || !html.includes('수신 꺼짐') || !html.includes('발행자 0명') || !html.includes('EVENT_SECURE_TRANSPORT_REQUIRED') || !html.includes('CI 구현이 차단') || !html.includes('새 이미지 화면 캡처 미확보') || !html.includes('CI 알림이 자동으로 시작되는 것은 아닙니다'))) errors.push(`${relativePage}: missing system-events deployment and acceptance boundaries`);
    if (relativePage === 'guide/candidate-20261013-connector-ledger-compat/index.html' && (!html.includes('worker00 적용·조회 확인 / worker0 실행·건강 확인') || !html.includes('원격 이미지 식별 재검증') || !html.includes('13개 보존 검사') || !html.includes('2,000건') || !html.includes('확인 필요') || !html.includes('실제 GitLab Connector') || !html.includes('기록 삭제·초기화·재등록') || !html.includes('새 UI 변경 없음'))) errors.push(`${relativePage}: missing Connector deployment and acceptance boundaries`);
    if (relativePage === 'guide/candidate-20261014-claude-subscription-auth/index.html' && (!html.includes('claude-worker 실행·건강·인증 준비 확인') || !html.includes('갱신 토큰') || !html.includes('first-party') || !html.includes('종량제 API') || !html.includes('--bare') || !html.includes('455건 통과') || !html.includes('17개 그룹') || !html.includes('실제 모델 요청') || !html.includes('새 이미지의 운영 인증 화면 캡처 미확보'))) errors.push(`${relativePage}: missing Claude auth candidate scope or acceptance boundaries`);
    if (relativePage === 'guide/candidate-20261013-rra-progress-capacity/index.html' && (!html.includes('worker0·worker1 실행 이미지·건강 확인 · 기능 수용 전') || !html.includes('원격 식별 재검증') || !html.includes('worker0·worker1의 정확한 실행 이미지') || !html.includes('worker0과 worker1의 정확한 실행 이미지') || !html.includes('대화로 이어가기') || !html.includes('실행과정 보기') || !html.includes('Adapter 동시 실행 상한') || !html.includes('최대 <strong>16</strong>') || !html.includes('기존 저장값 2') || !html.includes('새 이미지의 운영 기능 화면 캡처 미확보'))) errors.push(`${relativePage}: missing RRA candidate scope or acceptance boundaries`);
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
