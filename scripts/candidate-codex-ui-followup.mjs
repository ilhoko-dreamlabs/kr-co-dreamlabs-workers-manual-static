// Public edition notes. Exact source and image digests remain in private release evidence.
export const codexUiFollowupCandidate = {
  slug: 'candidate-20261016-codex-ui-followup',
  label: '2026.10.16 Codex 공개 요약·Console 후속 개선 이미지',
  status: {
    build: '완료 · 로컬 불변 이미지 빌드·격리 검사 통과',
    registry: '미수행 · 공급 보류',
    prestage: '미수행 · 서버 이미지 배치 없음',
    offer: '미수행 · 새 대상 할당 없음',
    apply: '미수행 · 지정 워커 실행 확인 없음'
  }
};

export const codexUiFollowupCandidateGuide = {
  slug: codexUiFollowupCandidate.slug, title: codexUiFollowupCandidate.label, category: '버전',
  description: 'Codex의 실제 공개 요약, Action 작업 식별, 대화 맨 아래로 이동, 업데이트 완료 안내의 변경점과 적용 후 검사를 설명합니다.',
  verifiedAt: '2026.10.16', evidenceLabel: '로컬 이미지 검사 완료 / 공급·워커 적용 보류', history: true, candidate: true,
  toc: [['state','후보 이미지 상태'],['summary','Codex 공개 요약'],['dashboard','Action 작업 식별'],['bottom','대화 맨 아래로 이동'],['update','업데이트 완료 안내'],['compat','이전 이미지와의 경계'],['checks','확인된 검사'],['acceptance','적용 후 직접 테스트'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>로컬 이미지 후보 · 운영 화면 미촬영</strong>불변 이미지의 로컬 빌드와 격리 검사는 끝났습니다. 공유 이미지 공급이 일부 워커의 자동 적용으로 이어질 수 있어 배포 정책을 확인할 때까지 Registry 등록과 서버 배치를 보류했습니다. 새 업데이트 제안이나 실제 워커 적용은 없습니다. 아래 사용법은 적용 후 검사 기준이며 운영 통과 기록이 아닙니다.</div>
    <section id="state"><h2>후보 이미지 상태</h2><p>2026.10.16은 정식 제품 버전 번호가 아닌 이력 구분 날짜입니다. 이번 이미지는 <a href="../candidate-20261015-console-upload-integration/">직전 실행 기록·업로드 설정 이미지</a>를 비교 기준으로 합니다. worker0에서 직전 이미지의 실행·건강 상태는 10월 16일 08:57(KST) 읽기로 확인했지만, <strong>이번 새 이미지는 어떤 지정 워커에서도 실행 확인되지 않았습니다.</strong> 공급 보류는 이미지 빌드 실패가 아니며, 자동 적용 정책에 관한 운영 판단이 남아 있다는 뜻입니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${codexUiFollowupCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${codexUiFollowupCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${codexUiFollowupCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${codexUiFollowupCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${codexUiFollowupCandidate.status.apply}</span></div>
    </div><p>제품 버전의 주 표시는 숫자형 출처가 있을 때만 사용합니다. 이 후보처럼 이미지 SHA만으로 식별되는 경우 주 버전은 <strong>알 수 없음</strong>으로 남기며 날짜를 제품 버전으로 해석하지 않습니다. 정확한 이미지 일치는 비공개 배포 기록에서 검증합니다.</p></section>
    <section id="summary"><h2>Codex가 내보낸 공개 요약 읽기</h2><p>Codex 요청을 실행하면 네이티브 실행기가 실제로 내보낸 <strong>공개 요약</strong>이 대화의 진행 기록과 <strong>도구 → 응답 원문</strong>에 나타납니다. 생성 중의 부분 요약은 최종 요약이 도착하면 교체됩니다. Chat과 RRA에서 같은 공개 기록을 저장하고, 실행 중 세션 재진입·새로고침 뒤에도 다시 읽을 수 있도록 보완했습니다.</p><p>요약이 보이지 않는 과거 기록을 화면 표시만 바꿔 복구하지는 않습니다. 제공자가 공개 요약을 내보내지 않으면 임의의 설명을 만들어 보여 주어서는 안 됩니다. <strong>비공개 내부 추론, 암호화된 원문, 내부 이벤트 원문은 수집·공개 대상이 아닙니다.</strong> 공개 요약은 답변 과정의 설명일 뿐 최종 업무 성공의 증거가 아니므로 Task 상태와 실제 답변을 함께 확인하세요. <a href="../response-tools/">응답 원문 사용법</a>을 참고하세요.</p></section>
    <section id="dashboard"><h2>Action에서 현재 작업 식별하기</h2><p><strong>대시보드 → Action → 진행 중</strong> 카드에서 작업의 읽기 쉬운 제목, 요청 출처, 요청자를 봅니다. 실행 중 세션 링크는 Usage 집계가 아직 생기기 전에도 해당 세션으로 이동해야 합니다. Mattermost에서 시작한 작업은 같은 채널의 나중 메시지가 아닌 <strong>원래 요청자</strong>를 표시해야 합니다. 제목이나 요청자가 확인되지 않으면 추측한 이름 대신 확인 불가 상태를 읽고 Task 식별자로 대조합니다. <a href="../dashboard/">Action 대시보드 안내</a>로 이어집니다.</p></section>
    <section id="bottom"><h2>과거 대화를 읽다가 맨 아래로 이동하기</h2><p>대화에서 과거 메시지로 위로 스크롤하면 <strong>맨 아래로</strong> 버튼이 나타납니다. 과거 내용을 읽는 동안 새 진행 기록 때문에 화면이 강제로 최신 위치로 이동하지 않아야 합니다. 읽기를 마친 뒤 버튼을 선택하면 최신 메시지 영역으로 돌아갑니다. 데스크톱과 좁은 화면에서 버튼이 내용이나 입력란을 가리지 않는지, 키보드·화면 읽기 도구에서 이름이 전달되는지 확인하세요. 움직임 줄이기 환경에서도 조작할 수 있어야 합니다. <a href="../session-actions/">대화 조작 안내</a>를 참고하세요.</p></section>
    <section id="update"><h2>업데이트 완료 안내 읽기</h2><p>사람이 직접 시작한 워커 업데이트가 완료되면 차단성 alert 대신 화면 안의 완료 안내가 나타나고, 같은 업데이트 의도에 대해 콘솔을 <strong>한 번만 자동 새로고침</strong>합니다. 다시 로그인했을 때 과거 완료 알림이 반복해서 떠서는 안 됩니다. 완료 화면만으로 기능 수용을 끝내지 말고 새 실행 이미지·건강·보존 상태를 확인하세요. 이 후보 자체의 업데이트는 아직 수행되지 않았으며, 안내 흐름은 적용 후에만 검사할 수 있습니다. <a href="../whole-update/">전체 업데이트 상태 읽기</a>를 참고하세요.</p></section>
    <section id="compat"><h2>이전 이미지와의 경계</h2><p>이번 새 변경은 위 네 가지입니다. 직전 이미지에 이미 들어 있던 업로드 크기 정책, Claude·Kimi 실행 기록, 스킬 기능을 신규 개선으로 다시 세지 않습니다. Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2, Node 22.23.3의 번들 버전은 같습니다. 새 모델·CLI 갱신, API·권한·저장 형식 변경, 데이터 이전 작업은 없습니다. 이 설명이 이전 요청을 자동으로 재실행하거나 누락된 옛 공개 요약을 복원한다는 뜻도 아닙니다.</p></section>
    <section id="checks"><h2>확인된 검사</h2><p>깨끗한 소스 기준 전체 개발 검사 <strong>468건 통과·실패 0·차단 0</strong>을 확인했습니다. 로컬 이미지 내부 <strong>1,410개 파일</strong>의 출처·무결성을 재검사하고, 비루트·읽기 전용·네트워크 차단 격리 조건에서 공개 요약의 Chat/RRA 보존·재진입, 기존 여섯 슬롯 동시 실행, 인증 fixture, 업로드 설정의 동시 저장 충돌, 예약 회귀를 확인했습니다. 로컬 브라우저 시뮬레이션도 통과했지만 <strong>실제 제공자 응답·지정 워커 기능·운영 화면은 아직 검증하지 않았습니다.</strong></p></section>
    <section id="acceptance"><h2>적용 후 직접 테스트하기</h2><ol><li>사용자가 실제 업데이트한 지정 워커의 정확한 실행 이미지·건강·재시작·보존 상태를 먼저 확인합니다. 빌드·Registry·제안만으로 적용을 판정하지 않습니다.</li><li>새로운 무해한 Codex Chat 한 건에서 공개 요약의 부분 표시와 최종 교체, 도구 → 응답 원문, 실행 중 재진입·새로고침 후 보존을 확인합니다. 실제 답변과 최종 Task 상태를 별도로 대조합니다.</li><li>승인된 새 RRA 시험 요청에서 같은 공개 요약의 저장·재접속을 확인합니다. 과거 업무 요청을 요약 확인 목적으로 재실행하지 않습니다.</li><li>Action에서 Console과 Mattermost 시험 작업의 제목·출처·요청자·세션 링크를 대조합니다. Mattermost의 원 요청자가 뒤따른 채널 메시지 작성자로 바뀌지 않아야 합니다.</li><li>긴 시험 대화에서 위로 스크롤해 과거 내용을 읽는 동안 자동으로 내려가지 않는지 보고, <strong>맨 아래로</strong>로 복귀합니다. 모바일·키보드·움직임 줄이기를 함께 확인합니다.</li><li>사용자가 시작한 업데이트의 완료 화면, 1회 새로고침, 재로그인 뒤 과거 완료 알림 미반복을 관찰합니다. 이미 끝난 업무 요청을 다시 보내지 않습니다.</li></ol><p>각 검사에 워커·정확한 이미지·시각·Task/RRA 식별자·실제 결과와 데스크톱·모바일 캡처를 비공개 기록으로 남깁니다. 공개 캡처에는 계정·비밀값·내부 주소를 넣지 않습니다.</p></section>
    <section id="captures"><h2>화면 증거</h2><p><strong>새 이미지의 운영 화면 캡처 미확보</strong>입니다. 이 후보는 공급·적용되지 않아 새 화면을 지정 워커에서 촬영할 수 없습니다. 적용 뒤에는 Codex 공개 요약과 응답 원문, Action의 작업 식별, 대화 맨 아래로 버튼, 업데이트 완료 안내를 실제 데스크톱·좁은 화면에서 촬영하고 정확한 실행 이미지·촬영 시각·기능 결과를 연결합니다. 과거 캡처를 이번 이미지의 운영 증거로 재사용하지 않습니다.</p></section>`
};
