export const honoPatchesCandidate = {
  slug: 'candidate-20261120-hono-patches',
  label: '2026.11.20 Hono 보안 보완 로컬 후보',
};

export const honoPatchesCandidateGuide = {
  slug: honoPatchesCandidate.slug, title: honoPatchesCandidate.label,
  category: '버전', history: true, candidate: true, noScreenshot: true,
  description: '같은 날 앞선 Console Next 후보에 Hono 보안 패치를 더한 별도 로컬 이미지를 구분합니다.',
  verifiedAt: '2026.11.20',
  evidenceLabel: '로컬 이미지·전체 검사 1,124건·생산 감사 0건 / 공급·적용 전',
  toc: [['state','별도 이미지와 단계'],['delta','이전 후보와 차이'],['validation','검사와 한계'],['acceptance','적용 뒤 확인'],['captures','화면 캡처']],
  body: () => `<div class="note capture-warning"><strong>로컬 이미지 후보 · 운영 미적용</strong>같은 날 앞선 <a href="../candidate-20261120-console-recovery/">Console Next 기능·복구 후보</a>와 다른 불변 이미지입니다. Registry 등록·서버 공급·워커 제안·실제 적용은 확인되지 않았습니다. 이 이미지 뒤에 만든 업데이트 v4 소스는 포함되지 않습니다.</div>
    <section id="state"><h2>별도 이미지와 단계</h2><div class="release-stage-grid"><div><strong>로컬 빌드</strong><span>완료 · linux/amd64 이미지 식별</span></div><div><strong>전체 검사</strong><span>완료 · 1,124건 통과·실패 0·차단 0</span></div><div><strong>생산 의존성 감사</strong><span>확인 · 권고 0건</span></div><div><strong>Registry·서버 공급</strong><span>미수행</span></div><div><strong>워커 제안·적용</strong><span>미수행</span></div></div><p>실제 운영 워커의 현재 이미지는 이 로컬 후보의 존재만으로 바뀌지 않습니다. 제품 날짜와 Console에 표시되는 일반 버전 문자열을 정확한 이미지 식별 대신 사용하지 않습니다.</p></section>
    <section id="delta"><h2>앞선 후보와 달라진 점</h2><p>두 lockfile에서 Hono를 <code>4.13.13 → 4.13.19</code>, <code>@hono/node-server</code>를 <code>2.1.0 → 2.1.9</code>로 올리고 Standalone의 기존 jose 선언을 lock root와 맞췄습니다. SDK 1.32.1, Express 4, Codex·Claude Code·Kimi CLI 버전은 유지했습니다. 화면 배치나 사용법을 새로 바꾸는 패치가 아니며, 앞선 Console Next 기능·자료 복구 범위는 그대로 포함합니다.</p><p>마운트된 경로의 인가 회귀 검사에서 예전 설치 Hono는 실패하고 갱신된 소스·이미지는 통과했습니다. 생산 의존성 감사의 권고 0건은 이 검사 시점과 범위의 결과이며 모든 운영 보안 수용을 뜻하지 않습니다.</p></section>
    <section id="validation"><h2>검사와 한계</h2><p>정확한 소스의 깨끗한 전체 검사 <strong>1,124건 통과·실패 0·차단 0</strong>, 보안 집중 검사 12건, MCP 전송, 타입 검사·빌드, 이미지 식별·CLI 18건, 생산 npm 감사 0건, 격리 Linux 기동과 네 마운트의 합성 RRA 자료 복구를 확인했습니다. 이전 후보에서 관찰한 CLI 시작 지연 원인은 아직 확정하지 않았으며, 이번 로컬 이미지의 정해진 제한 시간 내 검사 통과와 원인 규명을 구분합니다.</p><p>실제 HTTPS 로그인, 외부 제공자, 운영 worker0 자료와 이 이미지의 적용·화면 결과는 아직 확인되지 않았습니다. 이미지의 Registry push나 배포를 이 페이지의 작성으로 수행하지 않습니다.</p></section>
    <section id="acceptance"><h2>정확한 이미지 적용 뒤 확인</h2><ol><li>관리자가 대상 워커의 실행 이미지·건강·보존 자료·업데이트/복구 계획을 먼저 대조합니다.</li><li>승인된 범위에서 적용했다면 정확한 새 실행 이미지, 건강·준비 상태, 기존 세션과 자료 수를 다시 읽습니다.</li><li>Console의 관리자·일반 사용자 권한, 파일·RRA·연결·스킬의 대표 읽기와 가상 요청을 시험하고, 보안 회귀 범위와 외부 제공자 결과를 각각 기록합니다.</li><li>데스크톱·모바일 실제 화면을 촬영해 앞선 후보와 화면 변경 없음도 해당 이미지의 증거로 확인합니다.</li></ol><p>현재 수용 결과가 아니라 적용 후 판정 절차입니다.</p></section>
    <section id="captures"><h2>화면 캡처</h2><p><strong>화면 미촬영 · 이 이미지가 적용된 실제 Worker 화면은 확보되지 않았습니다.</strong> 사용자에게 보이는 새 화면 변경은 이 보안 패치 범위에 없지만, 이전 캡처를 이 이미지의 운영 증거로 바꾸어 쓰지 않습니다.</p></section>`,
};
