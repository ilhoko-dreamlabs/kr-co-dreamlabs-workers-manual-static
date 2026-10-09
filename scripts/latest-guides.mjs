// 2026-10-09: exact running images contain these surfaces. Fresh browser captures and UI acceptance remain pending.
const scope = '<div class="note"><strong>현재 확인 범위</strong>2026년 10월 9일 운영 중인 두 워커의 실행 이미지 및 해당 소스에서 기능을 확인했습니다. worker00 대시보드는 열었지만 이 기능의 세부 화면 캡처와 직접 조작 검증은 아직 없습니다. 아래 절차는 테스트 안내이며 실행 통과 기록이 아닙니다.</div>';

export const latestGuides = [
  {
    slug:'console-navigation', title:'새 탐색 메뉴와 모바일 화면', category:'세션',
    description:'접히는 메뉴에서 세션·프로젝트·외부 요청을 찾고 모바일에서도 같은 목적지로 이동합니다.',
    verifiedAt:'2026.10.09', evidenceLabel:'실행 이미지·소스 확인 / 화면 미촬영', noScreenshot:true,
    quick:{where:'콘솔 왼쪽 메뉴 · 모바일에서는 메뉴 버튼',do:'최근 세션·프로젝트·외부 요청 그룹을 펼쳐 원하는 항목 선택',check:'선택 항목 강조와 본문 이동, 모바일 서랍 닫힘 확인'},
    toc:[['scope','적용 범위'],['groups','메뉴 구조'],['navigate','목적지 열기'],['mobile','모바일에서 열기'],['refresh','새로고침 후 확인']],
    body:()=>`
      <section id="scope"><h2>적용 범위</h2><p>최신 콘솔은 최근 세션, Mattermost, Remote Request API, 프로젝트, 예약, 탐색 및 도구를 각각 독립 메뉴로 둡니다. 10월 1일의 세션 중심 캡처는 이전 화면입니다.</p>${scope}</section>
      <section id="groups"><h2>메뉴 구조 읽기</h2><p>그룹 이름과 폴더 아이콘으로 접고 펼칩니다. <strong>최근 세션</strong>에는 프로젝트에 속하지 않은 콘솔 대화가, <strong>프로젝트</strong>에는 해당 프로젝트의 대화가 표시됩니다. Mattermost 채널/DM과 Remote Request API의 API Key별 세션은 각각의 그룹에서 찾습니다. 같은 세션을 여러 그룹에 중복 표시하지 않는 것이 기준입니다.</p></section>
      <section id="navigate"><h2>목적지 열기</h2><p>그룹을 펼치는 조작은 목록만 바꿉니다. 세션·대시보드 관점·예약·탐색기 항목을 선택해야 본문이 이동합니다. 현재 선택한 항목은 강조 표시되고 해당 그룹이 펼쳐집니다. 프로젝트 행의 펼침과 뒤쪽 설정 버튼은 서로 다른 동작입니다.</p></section>
      <section id="mobile"><h2>모바일에서 열기</h2><p>좁은 화면에서는 메뉴 버튼으로 서랍을 열고, 항목을 고른 뒤 닫기 버튼으로 본문에 돌아옵니다. 화면을 가로로 밀어야만 버튼을 찾을 수 있거나 닫기 버튼이 가려진다면 기대 동작과 다릅니다.</p></section>
      <section id="refresh"><h2>새로고침 후 확인하기</h2><p>메뉴의 펼침 상태는 브라우저의 화면 선호값으로 기억될 수 있지만 세션 내용과 작업 상태는 서버에서 다시 읽습니다. Remote Request 이외의 상태 변경으로 Remote Request API 목록을 펼쳐 둔 상태가 반복해서 닫히지 않아야 합니다.</p></section>`
  },
  {
    slug:'remote-collaboration', title:'다른 워커에 요청하고 결과 이어받기', category:'요청과 결과',
    description:'설정된 대상 워커에 한 번의 승인을 거쳐 요청하고 같은 원격 대화에서 후속 요청을 이어갑니다.',
    verifiedAt:'2026.10.09', evidenceLabel:'실행 이미지·소스 확인 / 화면 미촬영', noScreenshot:true,
    quick:{where:'Remote Request API → 협업',do:'대상·요약·만료를 확인한 뒤 해당 요청만 1회 승인',check:'보낸 요청의 최종 상태와 대상 요청의 결과를 대조'},
    toc:[['scope','시작 조건'],['prepare','요청 준비'],['approve','1회 승인'],['result','결과 확인'],['continue','같은 대화 이어가기'],['failure','차단·불확실한 전송']],
    body:()=>`
      <section id="scope"><h2>시작 조건</h2><p>관리자가 대상 워커용 <strong>Worker RRA Connector</strong>를 미리 구성하고, 현재 대화에 사용할 수 있도록 배정해야 합니다. 연결 이름이 목록에 있다는 것과 대상의 인증·권한·준비 상태가 통과했다는 것은 다릅니다. 공개 매뉴얼에서는 API Key나 대상 내부 주소를 입력하지 않습니다.</p>${scope}</section>
      <section id="prepare"><h2>요청 준비</h2><p>대화에서 사용할 대상 워커와 할 일을 명시합니다. 예: “연결된 시험 워커에 아래 가상 회의 메모를 요약해 달라고 요청해 주세요. 파일 첨부와 외부 전송은 하지 마세요.” 워커가 요청 미리보기와 정확한 대상·내용을 보여 줄 때 검토합니다. 모델이 대상 워커를 임의로 만들거나 선택하는 흐름은 기대 동작이 아닙니다.</p></section>
      <section id="approve"><h2>한 요청만 승인하기</h2><p>Remote Request API의 <strong>협업</strong> 화면에 <strong>승인 대기</strong> 요청이 생기면 대상, 요약, 만료 상태를 확인합니다. 의도한 요청에만 <strong>1회 승인 및 전송</strong>을 선택합니다. 승인은 그 요청 하나에만 적용되고 후속 요청에는 새 승인이 필요합니다.</p></section>
      <section id="result"><h2>양쪽 결과 읽기</h2><p>호출 워커의 보낸 요청에서 상태를 확인하고, 대상 워커의 Remote Request 기록과 결과를 대조합니다. 정상 완료는 호출 측 <strong>succeeded</strong>와 대상 측 <strong>completed</strong>, 실제 답변 내용이 함께 있어야 합니다. 보낸 요청 ID와 대상 요청 ID는 서로 다릅니다.</p></section>
      <section id="continue"><h2>같은 원격 대화에서 이어가기</h2><p>앞선 결과를 읽은 뒤 같은 원격 대화에 대한 후속 질문을 작성합니다. 원격 세션은 유지하되 요청 ID와 1회 승인은 새로 생성됩니다. 후속 요청이 별도 새 원격 세션으로 열리거나 사용자의 새 승인 없이 자동 실행되면 기록하고 중단합니다.</p></section>
      <section id="failure"><h2>만료·차단·전송 불확실성</h2><p>승인이 만료됐다면 새 요청을 준비해 다시 검토합니다. <strong>delivery_uncertain</strong>이면 <strong>전송 상태 복구</strong>로 기존 요청을 확인한 뒤 재시도 여부를 결정합니다. 결과가 blocked/failed여도 자동 후속 요청을 만들지 않습니다. 이 기능은 과거 worker0→worker1 한 쌍의 무첨부 시험에서 최초·후속 요청이 확인됐으며, 모든 워커 조합의 통과를 뜻하지 않습니다.</p></section>`
  },
  {
    slug:'skill-loading', title:'스킬 선택과 로딩 상태 확인하기', category:'설정',
    description:'설치·사용 허용·선택·새 작업 적용을 나눠 읽고 스킬이 선택된 이유를 확인합니다.',
    verifiedAt:'2026.10.09', evidenceLabel:'실행 이미지·소스 확인 / 화면 미촬영', noScreenshot:true,
    quick:{where:'설정 → 스킬 → 주입 정책',do:'사용 허용·로딩 방식·범위를 확인하고 선택 미리보기 실행',check:'새 작업 뒤 실제 선택 ID·사유·정책 revision 재조회'},
    toc:[['scope','상태 구분'],['modes','로딩 방식'],['preview','선택 미리보기'],['effective','실제 선택 확인'],['limits','한도와 차단']],
    body:()=>`
      <section id="scope"><h2>설치와 사용을 구분하기</h2><p><strong>설정 → 스킬 → 주입 정책</strong>에서 스킬이 설치됐는지, 사용 허용 상태인지, 어느 화면·프로젝트·세션에서 쓸 수 있는지 확인합니다. 설치 완료만으로 새 요청에 전문이 들어가지는 않습니다. 기존 전체 스킬 일괄 주입과 달리 새 정책은 요청마다 관련 스킬을 제한해 선택합니다.</p>${scope}</section>
      <section id="modes"><h2>로딩 방식 읽기</h2><p><strong>상시 안내</strong>는 짧은 라우팅 안내만 항상 제공하고 전체 절차는 필요할 때 선택합니다. <strong>자동</strong>은 요청 의도와 허용 범위가 맞을 때 선택합니다. <strong>수동</strong>은 명시적으로 고른 스킬만 사용합니다. 비활성 스킬은 설치돼 있어도 선택되지 않습니다. 필수 Worker 스킬은 해제할 수 없지만 매 요청에 전체 본문이 들어간다는 뜻은 아닙니다.</p></section>
      <section id="preview"><h2>선택 미리보기</h2><p>관리자는 샘플 요청, 실행 화면, 프로젝트·세션 범위를 입력해 <strong>선택 미리보기</strong>를 실행할 수 있습니다. 결과의 <strong>Routing</strong>, <strong>전문</strong>, <strong>사유</strong>와 bytes/tokens/개수 한도를 확인합니다. 미리보기는 정책 계산이며 실제 새 작업의 실행 결과가 아닙니다.</p></section>
      <section id="effective"><h2>실제 선택 기록</h2><p>새 요청을 실행했다면 <strong>실제 선택</strong>과 <strong>스킬별 마지막 선택 시각</strong>을 다시 읽습니다. 선택된 스킬 ID, 이유, 정책 revision과 새 작업의 결과를 함께 봐야 적용 여부를 판단할 수 있습니다. 수동 선택은 정확한 <code>$스킬-이름</code> 언급 또는 UI의 명시 선택으로 요청합니다.</p></section>
      <section id="limits"><h2>한도 초과와 오류</h2><p>스킬 전문이 너무 크거나 범위·권한이 맞지 않으면 해당 스킬은 제외되거나 차단될 수 있습니다. 관련 없는 일반 요청까지 모든 스킬을 넣다가 차단되는 현상을 해결하는 것이 새 정책의 목적입니다. 예고 없이 권한이나 커넥터 범위가 늘어나는 것은 기대 동작이 아닙니다.</p></section>`
  },
  {
    slug:'whole-update', title:'워커 전체 업데이트 상태 읽기', category:'설정',
    description:'관리자 화면에서 할당·차단 사유·유지보수 단계와 보존 요청 상태를 확인합니다.',
    verifiedAt:'2026.10.09', evidenceLabel:'실행 이미지·소스 확인 / 화면 미촬영', noScreenshot:true,
    quick:{where:'대시보드 → 업데이트 열기 또는 설정 → 런타임 → 전체 업데이트',do:'현재·대상 할당과 차단 사유를 읽기 전용으로 확인',check:'단계와 보존 요청 상태를 재조회해 기록'},
    toc:[['scope','접근과 적용 범위'],['inspect','할당 확인'],['run','수동 업데이트'],['maintenance','유지보수 중'],['finish','완료·복구 판단']],
    body:()=>`
      <section id="scope"><h2>접근과 적용 범위</h2><p>대시보드의 <strong>업데이트 열기</strong> 또는 <strong>설정 → 런타임 → 전체 업데이트</strong>에서 현재 릴리스, 대상 할당, 차단 사유와 단계를 읽습니다. 업데이트 적용과 자동 정책 변경은 관리자·업데이트 운영자 권한의 운영 작업입니다. 이 페이지의 재현 검사는 우선 읽기 전용으로 진행합니다.</p>${scope}</section>
      <section id="inspect"><h2>현재·대상 할당 확인하기</h2><p><strong>할당 대기</strong>, <strong>할당 수신</strong>, <strong>확인 필요</strong>, <strong>만료됨</strong>을 구분합니다. 버튼이 비활성인 이유를 읽고 현재와 대상 릴리스가 예상한 한 쌍인지 확인합니다. 자동 할당은 콘솔에서 수동 실행할 수 없습니다.</p></section>
      <section id="run"><h2>수동 업데이트 요청하기</h2><p>운영 검증과 대상 할당 확인이 끝난 경우에만 <strong>전체 업데이트 실행</strong>을 사용합니다. 확인 창은 한 할당을 외부 실행기에 요청하며 새 요청은 보존 대기열에 들어가고 설정 변경이 잠길 수 있음을 알립니다. 버튼 클릭 직후 접수 메시지는 업데이트 성공을 뜻하지 않습니다.</p></section>
      <section id="maintenance"><h2>유지보수 중 화면 읽기</h2><p><strong>외부 실행 요청됨 → 업데이트 적용 중 → 업데이트 검증 중</strong> 단계를 따라갑니다. 연결이 잠시 끊기면 콘솔을 새로고침하거나 다시 로그인해 현재 단계를 재조회합니다. 유지보수 중 변경 작업과 로그아웃이 제한될 수 있습니다.</p></section>
      <section id="finish"><h2>완료와 보존 요청 확인하기</h2><p><strong>업데이트 완료</strong> 이후 새 릴리스와 Worker 건강 상태를 확인합니다. 보존 요청이 남아 있다면 검증 완료 뒤 <strong>보존 요청 재개</strong> 가능 여부를 별도로 봅니다. 실패·차단·롤백 단계라면 새 업데이트를 연속 실행하지 말고 운영 기록의 사유와 기존 요청 상태를 확인합니다.</p></section>`
  }
];
