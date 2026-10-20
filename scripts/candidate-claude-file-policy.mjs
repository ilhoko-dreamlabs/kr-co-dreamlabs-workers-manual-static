import { claudeFileCandidateCapture } from './claude-file-policy-guide.mjs';

export const claudeFilePolicyCandidate = {
  slug: 'candidate-20261020-claude-file-policy',
  label: '2026.10.20 Claude 파일 한도·오류 안내 개선 후보',
  status: {
    build: '완료 · 14:08(KST) 불변 이미지·격리 검사 통과',
    registry: '완료 · 14:09(KST) 원격 이미지 식별 확인',
    prestage: '완료 · 14:21(KST) 서버 이미지 단독 배치·식별 확인',
    offer: '확인 · 14:21(KST) 관리 워커 8개 대상 제안',
    apply: '미확인 · 14:21(KST) 당시 미적용, 이후 재조회 필요'
  }
};

export const claudeFilePolicyCandidateGuide = {
  slug: claudeFilePolicyCandidate.slug, title: claudeFilePolicyCandidate.label, category: '버전',
  description: '대화 첨부 한도를 Claude의 지원되는 MCP 파일 결과에 연결하고 첫 오류를 보존한 별도 이미지의 개선·검사·공급 범위입니다.',
  verifiedAt: '2026.10.20', evidenceLabel: '이미지·Registry·서버 배치·8개 제안 / 실제 적용 전', history: true, candidate: true, localCapture: true,
  toc: [['state','공급·적용 단계'],['changes','이번 이미지 개선'],['setting','관리자 설정·호환'],['checks','검사와 한계'],['acceptance','적용 뒤 직접 검사'],['captures','후보 화면']],
  body: () => `<div class="note capture-warning"><strong>새 별도 이미지 · 공급 및 제안 확인</strong>이번 이미지는 <a href="../candidate-20261019-git-provider-grant/">앞선 GitLab·GitHub 계정 권한 방식 이미지</a> 다음에 만들어진 별도 후보입니다. 2026년 10월 20일 14:21(KST)까지 불변 이미지 검사·Registry 식별·서버 이미지 단독 배치와 관리 워커 8개의 대상 제안을 확인했습니다. 그 시점에 실제 적용·운영 Claude 파일 결과는 확인되지 않았습니다. 날짜를 정식 제품 버전 번호로 해석하지 마세요.</div>
    <section id="state"><h2>공급·적용 단계</h2><p>정확한 비교 기준은 앞선 Git 계정 권한 방식 이미지입니다. 아래 상태는 단계별 증거이며 서버 배치나 업데이트 제안만으로 현재 워커가 새 기능을 쓴다고 판정하지 않습니다.</p><div class="release-stage-grid"><div><strong>이미지 빌드·격리 검사</strong><span>${claudeFilePolicyCandidate.status.build}</span></div><div><strong>Registry 등록</strong><span>${claudeFilePolicyCandidate.status.registry}</span></div><div><strong>서버 사전 배치</strong><span>${claudeFilePolicyCandidate.status.prestage}</span></div><div><strong>워커 업데이트 제안</strong><span>${claudeFilePolicyCandidate.status.offer}</span></div><div><strong>워커 실제 적용</strong><span>${claudeFilePolicyCandidate.status.apply}</span></div></div><p>14:21(KST) 읽기에서 관리 워커 8개 모두 정확한 새 이미지 제안이 <strong>사용 가능</strong>했고 정상·활성 작업 0·대기 중 업데이트 없음이었습니다. 기존 13개 컨테이너의 식별·상태와 worker0의 환경·마운트·보호 설정은 보존됐습니다. 강제 실행·수동 Update·재시작·정책 변경은 없었습니다. worker1과 dl-dev-worker의 기존 자동 업데이트 정책은 유지되고 예약 적용이 허용됐으므로 이후 실제 적용 여부는 각 워커의 실행 이미지로 다시 판정해야 합니다. 제안의 사용 가능 상태는 조회 시점의 결과이며 지속을 보장하지 않습니다.</p></section>
    <section id="changes"><h2>이번 이미지에서 달라진 점</h2><p><strong>설정 → 시스템 → 파일 업로드</strong>의 대화 첨부파일 한도를 Claude의 지원되는 MCP 파일 응답에도 연결했습니다. 실제 원본 파일 바이트와 Base64 전송량을 구분해 제한된 크기로 처리하며, 실행 시작 시 유효한 설정과 리비전을 고정합니다. 변경된 설정은 다음 Claude 실행부터 적용되고 진행 중인 실행의 한도를 바꾸지 않습니다.</p><p>파일 크기·전송 한도가 먼저 실패했는데 종료 처리 중 <code>CONTEXT_NATIVE_PROTOCOL_INVALID</code>로 덮이던 문제를 고쳤습니다. Chat과 RRA는 한국어·영어로 파일 크기, 전송 용량, 형식 문제와 안전한 후속 확인을 구분합니다. <a href="../claude-file-policy/">화면 위치·설정·오류별 조치와 시험 절차</a>를 제공합니다.</p></section>
    <section id="setting"><h2>관리자 설정과 기존 자료</h2><p>관리자는 현재 유효값·출처·허용 범위를 확인하고, 허가된 시험 환경에서만 저장·재조회합니다. 이 필드는 Console·RRA·Mattermost의 새 대화 첨부파일과 다음 Claude 실행의 지원되는 MCP 파일 결과에 공통으로 작용합니다. 기존 첨부파일을 지우지 않으며 설정/자료 마이그레이션과 운영 설정 자동 증설도 없습니다. 프로필·스킬 한도, 실행 슬롯·권한·인증, 컨텍스트 요약 알고리즘과 번들 CLI 버전은 바뀌지 않았습니다.</p><p>외부 MCP·Claude·서비스 자체 한도와 모델 내부 메모리까지 늘리는 개선은 아닙니다. 실패한 작업을 자동 재실행하지도 않습니다. 결과가 불확실한 외부 작업은 원본 서비스의 실제 효과를 먼저 확인하세요.</p></section>
    <section id="checks"><h2>확인된 검사와 한계</h2><p>깨끗한 소스 기준 <strong>478건 통과·실패 0·차단 0</strong>입니다. 이미지 내부 애플리케이션·출처와 주요 회귀, Node 22.23.3 및 고정된 Codex 0.162.0·Claude 2.1.183·Kimi 0.29.2 실행을 격리 검사했습니다. 실제 후보 이미지의 패키지된 코드와 Claude 2.1.183을 합성 loopback MCP/모델에 연결해 <strong>한도 5 MiB/원본 3 MiB 성공</strong>, <strong>2 MiB/3 MiB에서 파일 크기 오류만 보존</strong>, <strong>5 MiB/5 MiB 경계 성공</strong>을 확인했습니다. 각 경우 도구 호출은 한 번, 운영 변경·호스팅 모델 호출은 0회였습니다.</p><p>한국어·영어 안내와 모바일 설정의 제품 브라우저 검사는 통과했습니다. 다른 제공자·모든 파일 형식·운영 계정의 실제 MCP 결과를 전면 보장하지 않으며, 새 이미지의 지정 워커 기능·화면 수용은 아직 없습니다.</p></section>
    <section id="acceptance"><h2>적용 뒤 직접 테스트하기</h2><ol><li>시험 워커가 이 후보를 정확히 실행 중인지 이미지·건강·기존 자료를 확인합니다. Registry 또는 업데이트 제안만으로 적용을 통과로 기록하지 않습니다.</li><li>관리자는 <strong>설정 → 시스템 → 파일 업로드</strong>의 현재 한도·한국어/영어·좁은 화면을 확인하고, 일반 사용자는 이 설정을 조회·변경할 수 없는지 대조합니다. 허가된 시험 설정은 저장→재조회→복원 순서로 기록합니다.</li><li>안전한 합성 파일을 반환하는 승인된 MCP 경로에서 한도 아래·초과·경계 크기를 새 Claude 실행마다 시험합니다. 시작 당시 설정·리비전과 실제 원본 크기, Task 결과를 비교합니다.</li><li>Chat과 RRA의 첫 파일 크기 오류와 안내가 프로토콜 오류로 덮이지 않는지 확인합니다. 파일 결과를 만든 도구의 외부 효과를 읽은 뒤에만 다시 요청합니다.</li></ol><p>비공개 기록에는 워커·정확한 실행 이미지·시각·설정 전후 값과 리비전·안전한 시험 파일의 크기·Task/도구 결과·가린 실제 화면을 남깁니다. 운영 설정 변경과 업데이트는 이 페이지 게시로 승인되지 않습니다.</p></section>
    <section id="captures"><h2>후보 화면</h2><p>아래는 실제 후보 제품 컴포넌트·스타일을 로컬 Chromium에 합성 값으로 렌더링한 화면입니다. 운영 워커의 캡처나 저장·제공자 성공 증거는 아닙니다.</p>${claudeFileCandidateCapture('settings-mobile-ko.png','Claude 파일 응답을 포함한 로컬 후보 설정 모바일 화면','대화 첨부 한도의 새 적용 범위와 다음 Claude 실행부터 적용한다는 문구를 보여 줍니다.')}${claudeFileCandidateCapture('file-size-error-mobile-ko.png','Claude 파일 크기 초과 로컬 후보 안내 화면','합성 2 MiB 한도·3 MiB 파일 결과의 원인별 안내입니다. 실제 운영 실패 화면은 미확보입니다.')}<p><strong>지정 워커의 새 운영 화면 캡처 미확보</strong>입니다. 적용과 기능 결과를 확인한 뒤 실제 화면으로 별도 보완해야 합니다.</p></section>`
};
