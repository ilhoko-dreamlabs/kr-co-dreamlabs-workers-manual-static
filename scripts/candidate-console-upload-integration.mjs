// Public edition notes. Exact source, image digests, and internal endpoints are kept in private evidence.
export const consoleUploadIntegrationCandidate = {
  slug: 'candidate-20261015-console-upload-integration',
  label: '2026.10.15 실행 기록·업로드 설정 통합 이미지',
  status: {
    build: '완료 · 불변 이미지와 격리 검사 통과',
    registry: '완료 · 원격 이미지 식별 재검증',
    prestage: '완료 · 서버 이미지 단독 배치·식별 재검증',
    offer: '10월 15일 12:46(KST) worker0 Manager 준비 확인 · Console 버튼 미확인',
    apply: 'worker0 실행 이미지·건강 확인 · 기능·화면 수용 전'
  }
};

export const consoleUploadIntegrationCandidateGuide = {
  slug: consoleUploadIntegrationCandidate.slug, title: consoleUploadIntegrationCandidate.label, category: '버전',
  description: '실행 기록, RRA 응답, 예약 프롬프트, 업로드 한도, 세션 활동 표시를 한 이미지에서 비교하고 적용 후 직접 검증합니다.',
  verifiedAt: '2026.10.16', evidenceLabel: 'worker0 실행 이미지·건강 확인 / 기능·화면 수용 전', history: true, deployed: true, deployedWorker: 'worker0',
  toc: [['state','공급과 적용 상태'],['trace','Claude·Kimi 실행 기록'],['workbench','응답 원문·RRA'],['schedule','예약 프롬프트 이력'],['uploads','네 가지 업로드 한도'],['activity','세션 활동 표시'],['version','버전 표기'],['checks','검증된 범위'],['acceptance','적용 후 테스트'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>worker0 실행·건강 확인 · 새 기능 화면 미촬영</strong>10월 15일에는 Registry와 서버 사전 배치, 시간 제한 Manager 준비 응답까지만 확인했습니다. 이후 2026년 10월 16일 08:57(KST) 읽기 전용 조회에서 worker0이 이 정확한 이미지로 건강하게 실행 중임을 확인했습니다. 업데이트를 누른 경로와 Console 완료 화면, 실제 제공자·업로드·예약 기능 결과는 이 조회로 입증되지 않았습니다. 아래는 직접 재현할 검사 기준이며 기능 통과 기록이 아닙니다.</div>
    <section id="state"><h2>공급과 적용 상태</h2><p>2026.10.15는 이미지 이력 구분 날짜이며 정식 제품 버전 번호가 아닙니다. 10월 16일 08:57(KST) 읽기에서 worker0은 이 이미지로 건강하게 실행 중이고 재시작 0·활성 작업 0이었습니다. 다른 워커의 적용이나 이 이미지의 실제 업무 결과는 확인 범위 밖입니다. 앞선 공급 단계에서는 기존 컨테이너·설정·마운트가 보존됐으며, 새로운 실행 상태의 데이터 보존과 UI 수용은 별도 검사가 필요합니다. 경로의 candidate는 최초 게시 당시 이름입니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${consoleUploadIntegrationCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${consoleUploadIntegrationCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${consoleUploadIntegrationCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${consoleUploadIntegrationCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${consoleUploadIntegrationCandidate.status.apply}</span></div>
    </div><p>Registry 등록과 사전 배치만으로는 실행 상태를 판정하지 않습니다. worker0의 실제 실행 이미지는 후속 조회로 따로 확인했으며 Console 완료 버튼·알림과 기능 결과는 확인되지 않았습니다. 현재 상태를 다시 검사할 때는 대상 워커의 정확한 이미지·건강을 새로 읽으세요. <a href="../whole-update/">전체 업데이트 상태 읽기</a>를 참고하세요.</p></section>
    <section id="trace"><h2>Claude·Kimi 실행 기록</h2><p>새 세션에서 Claude 또는 Kimi를 선택해 외부 변경이 없는 짧은 요청을 보냅니다. 대화의 공개 진행 기록에는 제공자 실행 단계를 정규화해 표시합니다. Claude의 부분 스트림 이벤트와 Kimi의 줄바꿈·공백·유니코드는 사용자가 읽을 답변에 맞게 이어져야 합니다. <strong>비공개 추론이나 내부 이벤트 원문</strong>이 일반 사용자에게 노출되어서는 안 됩니다. 완료 카드가 보인 뒤 Task 상태와 실제 답변을 대조하세요. 제공자 호출의 운영 성공은 이 이미지의 격리 검사만으로 입증되지 않았습니다.</p><p>짧은 시험 문장: “가상 회의 메모의 결정사항 한 줄과 미정 항목 한 줄만 정리해 주세요. 파일 저장·외부 전송은 하지 마세요.” 결과에 두 항목이 있고 동일 세션을 다시 열어도 공개 기록과 최종 답변이 유지되는지 확인합니다. <a href="../response-tools/">응답 도구 사용법</a>으로 이어집니다.</p></section>
    <section id="workbench"><h2>응답 원문과 RRA 결과 읽기</h2><p><strong>도구 → 응답 원문</strong>을 열면 선택한 세션의 <strong>응답 타임라인</strong>을 채널·실행 기록 필터로 좁히고, 필요한 경우 접힌 <strong>기술 상세</strong>를 펼쳐 볼 수 있습니다. 복사는 표시 중인 내용을 확인한 후 수행합니다. 선택 세션이 바뀌면 타임라인도 그 세션에 맞게 바뀌어야 합니다. 보존 기간이 끝났거나 기록을 얻을 수 없는 경우에는 추측한 내용을 채우지 않고 사용할 수 없음을 알려야 합니다.</p><p>RRA 응답은 안전한 Markdown으로 읽고 공개 진행 상태를 재접속 후 다시 확인합니다. 스크립트나 위험한 HTML은 실행되면 안 됩니다. 일반 Chat 초안으로 이어가기는 명시적으로 보내기 전까지 실행되지 않습니다. <strong>대화 맥락</strong>은 헤더가 아닌 <strong>도구</strong> 메뉴에서 엽니다. 운영 화면에서는 실제 RRA 요청·결과와 재접속을 별도로 시험해야 합니다.</p></section>
    <section id="schedule"><h2>예약 실행의 프롬프트 이력</h2><p>예약의 프롬프트를 수정한 뒤에도 과거 실행 결과는 <strong>그 실행에 사용된 변경 불가능한 프롬프트 revision</strong>에 연결돼야 합니다. 지금 보이는 최신 예약 내용으로 과거 결과를 다시 설명하면 안 됩니다. 새 예약을 만들고 무해한 요청으로 한 번 실행한 다음 프롬프트를 수정해 다시 실행하세요. 두 결과에서 실행 시각·상태·프롬프트 revision을 비교합니다. 과거 기록을 정확히 연결할 수 없으면 <strong>알 수 없음</strong>으로 표시하는 것이 기준입니다. <a href="../reservations/">예약 작업 사용법</a>을 참고하세요.</p></section>
    <section id="uploads"><h2>시스템의 네 가지 업로드 한도</h2><p>관리자는 <strong>설정 → 시스템 → 파일 업로드</strong>에서 네 값을 독립적으로 읽고 저장합니다. 각 카드의 현재 유효값·출처·허용 범위를 먼저 읽으세요. <strong>파일 하나의 최대 크기</strong>는 Console·RRA·Mattermost 대화 첨부에 공통 적용됩니다. <strong>프로필 원본 이미지 최대 크기</strong>와 <strong>프로필 변환 PNG 최대 크기</strong>는 서로 다른 단계의 한도입니다. <strong>스킬 패키지 전체 파일 최대 합계</strong>는 Registry 설치 패키지의 총량이며 일반 스킬 파일 업로더나 Git 다운로드 총량 한도가 아닙니다.</p><p>코드 기본값은 대화 첨부 10 MiB(배포 재정의 가능), 프로필 원본 8 MiB, 변환 PNG 0.5 MiB, 스킬 패키지 8 MiB입니다. 화면의 실제 유효값을 우선합니다. 저장한 새 값은 <strong>새 업로드부터</strong> 적용되고 기존 첨부·이미지·설치 스킬은 지우거나 다시 검사하지 않습니다. 파일 종류·이미지 픽셀·파일 수·경로·해시 등 다른 검사는 유지되며 프록시 등의 외부 제한은 별도입니다. 다른 관리자가 먼저 바꾼 충돌이 표시되면 <strong>새로고침</strong>해 최신값과 입력 초안을 비교한 후 다시 저장하세요. <a href="../settings-map/">설정 메뉴 설명</a>과 <a href="../attachments/">첨부 사용법</a>을 함께 보세요.</p></section>
    <section id="activity"><h2>세션 목록의 활동 표시</h2><p><strong>최근 세션·프로젝트·Mattermost·RRA</strong> 각 목록에서 실행 중인 해당 세션에만 활동 표시가 있어야 합니다. 일반 대화의 서버 상태는 정확한 세션 ID와 실행 상태를 기준으로 하며, 선택한 세션에서 방금 보낸 요청은 서버 상태를 다시 읽을 때까지 잠시 표시될 수 있습니다. 대기·완료·다른 세션의 작업을 계속 실행 중처럼 표시하지 않아야 합니다. RRA는 활성 요청 ID를 기준으로 확인합니다. 움직임 줄이기 설정에서는 정지된 표시가 나타나고 회전 애니메이션은 없어야 합니다. <a href="../console-navigation/">탐색 메뉴 사용법</a>을 참고하세요.</p></section>
    <section id="version"><h2>버전 표기 구분</h2><p>사이드바의 주 버전은 숫자형 이미지 출처가 확인될 때만 제품 버전으로 표시합니다. SHA로만 식별되는 후보라면 주 버전은 <strong>알 수 없음</strong>으로 표시합니다. SHA 일부나 문서 날짜를 제품 버전으로 바꾸어 읽지 마세요. 정확한 이미지 일치는 내부 배포 기록으로 검증합니다.</p></section>
    <section id="checks"><h2>검증된 범위</h2><p>깨끗한 소스에서 개발 검사 <strong>464건 통과·실패 0·차단 0</strong>을 확인했습니다. 불변 이미지의 <strong>1,407개 파일</strong> 출처·무결성과 네트워크 차단·읽기 전용·비루트 격리 조건을 검사했습니다. Registry와 서버 사전 배치 식별이 일치하고 10월 16일 worker0의 정확한 실행 이미지·건강·재시작 0을 후속 조회로 확인했습니다. 번들 Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2, Node 22.23.3은 이전 이미지와 같습니다. 실제 제공자 응답, 관리자 저장, Console 완료 화면, 기능별 UI는 이 검사의 범위 밖입니다.</p></section>
    <section id="acceptance"><h2>적용 후 직접 테스트하기</h2><ol><li>대상 워커의 실행 이미지·건강 상태와 업데이트 성공을 확인하고, 변경 전 기록과 대조합니다.</li><li>Claude·Kimi에서 무해한 요청을 각각 실행하고 공개 진행 기록·최종 답변·재진입을 확인합니다. 도구 → 응답 원문에서 선택 세션 필터·기술 상세·기록 부재 상태를 봅니다.</li><li>RRA 시험 요청에서 Markdown 표시, 위험한 HTML 무력화, 진행 재접속과 일반 Chat 초안의 수동 전송을 확인합니다. 도구 → 대화 맥락의 위치도 촬영합니다.</li><li>예약 프롬프트를 두 revision으로 실행해 각각의 과거 결과에 올바른 revision이 연결되는지 확인합니다. 연결할 수 없는 오래된 결과는 알 수 없음으로 남겨야 합니다.</li><li>시험 워커 관리자가 네 업로드 값을 각각 저장·재조회한 뒤 한도 아래/초과인 새 업로드를 시험하고 원래 값으로 복원합니다. 기존 파일은 그대로인지 확인합니다.</li><li>네 세션 목록에서 실행 중·대기·완료·다른 세션·움직임 줄이기를 비교합니다. 숫자형 이미지 출처와 SHA 전용 후보의 버전 표시도 구분합니다.</li></ol><p>각 단계마다 워커·정확한 이미지·시각·Task/예약/업로드 식별자·결과와 복원값을 비공개 검사 기록에 남깁니다. 비밀값·고객 자료·내부 주소는 공개 화면에 넣지 않습니다.</p></section>
    <section id="captures"><h2>화면 증거</h2><p><strong>새 이미지의 운영 화면 캡처 미확보</strong>입니다. 10월 1일 과거 캡처를 이번 변경의 증거로 사용하지 않습니다. 적용 뒤에는 대화의 공개 진행·응답 원문·도구 메뉴·예약 과거 실행·시스템 파일 업로드 네 필드·네 그룹의 활동 표시를 데스크톱과 좁은 화면에서 촬영하고, 이미지 적용 시각과 기능 결과를 함께 기록합니다. 인증된 Console 화면을 확보하기 전에는 이 페이지의 화면 설명을 소스 기반 사용법으로 읽으세요.</p></section>`
};
