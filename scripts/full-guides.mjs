// Public-facing guides. Administrative configuration belongs to the separate internal manual.
const guides = [
  {
    slug:'dashboard', category:'대시보드', title:'작업 대시보드 읽기', description:'현재 작업, 확인이 필요한 결과, 요청 대기열과 최근 세션을 확인합니다.',
    sections:[
      {id:'open',title:'Action 화면 열기',text:'왼쪽 대시보드에서 Action을 선택합니다. “지금 할 일”은 워커가 이미 가진 상태를 보여 줍니다.',image:'10-dashboard-action.png',alt:'실제 Action 대시보드 상단',caption:'실제 워커 화면의 Action 상단과 현재 작업 현황입니다.'},
      {id:'status',title:'작업 상태 읽기',text:'현재 작업 현황의 확인 및 처리, 진행 중, 세션 요청 대기열, 최근 세션 항목을 봅니다. 숫자를 선택하면 해당 목록으로 이동합니다. 요청을 완료했다고 판단할 때는 원래 대화의 최종 응답도 확인합니다.'},
      {id:'continue',title:'기존 작업으로 이동하기',text:'확인 및 처리 카드의 세션 열기·상세 보기, 최근 세션의 계속하기를 사용합니다. 업데이트 항목은 업데이트 상세 화면으로 연결됩니다. 각 항목은 현재 표시된 상태에 따라 달라집니다.'}
    ]
  },
  {
    slug:'dashboard-views', category:'대시보드', title:'다섯 가지 대시보드 관점', description:'Action, Operations, Projects, Knowledge, PARA가 보여 주는 정보를 구분합니다.',
    sections:[
      {id:'switch',title:'관점 전환하기',text:'왼쪽 대시보드 아래에서 Action, Operations, Projects, Knowledge, PARA를 선택합니다. 선택 후 중앙 제목이 바뀌었는지 확인하세요. 데이터가 느리게 갱신될 수 있습니다.',image:'10-dashboard-action.png',alt:'대시보드 관점 메뉴와 Action 화면',caption:'다섯 관점 메뉴가 있는 실제 콘솔입니다.'},
      {id:'meanings',title:'화면별 의미',text:'Action은 확인이 필요한 일과 최근 활동, Operations는 워커 준비 상태와 런타임·업데이트 정보, Projects는 프로젝트별 세션·완료·오류 지표, Knowledge는 지식 자료 상태, PARA는 프로젝트와 Wiki 자료를 Projects·Areas·Resources·Archive로 모아 보여 줍니다.'},
      {id:'read-only',title:'숫자에서 원본으로 이동하기',text:'대시보드 숫자는 현재 상태를 요약합니다. 카드를 선택해 해당 세션·프로젝트·설정 원본을 열고 상세 내용을 확인하세요. PARA 화면은 현재 프로젝트와 Wiki revision의 읽기 전용 투영입니다.'}
    ]
  },
  {
    slug:'execution-options', category:'세션', title:'모델과 실행 옵션 선택하기', description:'요청 입력란의 모델·추론 강도·속도와 결과 상태를 확인합니다.',
    sections:[
      {id:'find',title:'실행 프로필 찾기',text:'새 세션 또는 기존 세션의 요청 입력란 옆에서 모델, 추론 강도, 속도 선택기를 확인합니다. 선택 가능한 값은 워커 구성에 따라 달라집니다.',image:'02-compose.png',alt:'요청 입력란과 실행 프로필이 보이는 실제 화면',caption:'기본 선택 상태에서 요청을 작성한 실제 화면입니다.'},
      {id:'choose',title:'요청 전 옵션 확인하기',text:'모델 목록에서 원하는 항목을 선택하고, 추론 강도와 속도를 확인한 뒤 요청을 보냅니다. 예제 촬영에서는 기본 선택을 유지했습니다. 옵션을 바꾼 실행 결과는 별도 검증이 필요합니다.'},
      {id:'result',title:'결과 확인하기',text:'모델 선택과 작업 성공 여부는 별개입니다. 최종 답변과 Worker result의 상태를 확인합니다. 처리 중에는 같은 요청을 다시 보내기 전에 현재 상태를 살핍니다.'}
    ]
  },
  {
    slug:'session-controls', category:'세션', title:'세션 목록과 대화 관리', description:'최근 세션·외부 세션을 찾아 대화를 이어서 확인합니다.',
    sections:[
      {id:'list',title:'세션 목록 펼치기',text:'왼쪽 세션에서 최근 세션 또는 외부 세션을 펼칩니다. 원하는 대화를 선택하면 해당 세션의 메시지가 열립니다. 제목이 비슷하면 세션 검색에서 문장 일부를 사용합니다.',image:'05-session-search.png',alt:'실제 세션 검색 결과',caption:'가상 회의 메모 세션을 검색한 화면입니다.'},
      {id:'reopen',title:'이전 대화 확인하기',text:'요청과 최종 응답을 함께 확인합니다. 대화를 다시 여는 것만으로 작업이 재실행되지는 않습니다. 후속 요청은 같은 대화의 입력란에서 보낼 수 있습니다.',image:'06-reopened.png',alt:'다시 연 대화의 실제 화면',caption:'첫 실행의 차단 결과를 다시 확인한 화면입니다.'},
      {id:'copy',title:'필요한 내용 복사하기',text:'메시지 옆의 메시지 복사 버튼으로 해당 요청 또는 답변을 복사할 수 있습니다. 복사한 내용에 개인정보나 비밀값이 포함되었는지 공유 전에 확인하세요.'}
    ]
  },
  {
    slug:'session-actions', category:'세션', title:'진행 중 작업과 메시지 다루기', description:'작업 중지, 메시지 복사, 단락 삭제 위치를 확인합니다.',
    sections:[
      {id:'running',title:'진행 중인 작업 확인하기',text:'요청을 보낸 뒤 입력란 위의 작업 진행중 표시를 봅니다. 처리 중에는 현재 작업 중지 버튼이 나타날 수 있습니다. 중지를 누르기 전 요청의 외부 변경 가능성을 확인하세요.',image:'03-running.png',alt:'실제 워커 작업 진행중 화면',caption:'요청을 처리하고 있는 실제 화면입니다.'},
      {id:'copy',title:'메시지 복사하기',text:'사용자 요청과 워커 응답 카드에는 메시지 복사 버튼이 있습니다. 복사한 문장을 공유할 때 자료의 공개 범위를 확인합니다.',image:'07-success.png',alt:'복사 버튼이 있는 실제 최종 답변',caption:'완료된 워커 응답 카드와 하단 복사 버튼입니다.'},
      {id:'delete',title:'단락 삭제 위치 확인하기',text:'사용자 메시지 카드에는 이 단락 삭제 버튼이 보입니다. 이 문서 제작 중 삭제를 실행하지 않았으므로 삭제 범위와 복구 가능성은 별도 확인이 필요합니다. 필요한 대화는 삭제 전에 보관 방식을 확인하세요.'}
    ]
  },
  {
    slug:'attachments', category:'세션', title:'자료를 첨부해 요청하기', description:'입력란의 파일 첨부 위치와 자료 사용 시 확인할 점을 안내합니다.',
    sections:[
      {id:'attach',title:'첨부 위치 확인하기',text:'요청 입력란 왼쪽의 ＋(파일 첨부) 버튼을 선택합니다. 파일 선택 뒤에는 첨부가 입력란에 표시되는지 확인하고, 어떤 부분을 참고할지 요청에 적습니다.',image:'01-new-session.png',alt:'파일 첨부 버튼이 보이는 새 세션 화면',caption:'실제 콘솔의 새 세션 입력란입니다.'},
      {id:'scope',title:'자료 범위 적기',text:'자료의 필요한 범위와 원하는 답변 형식을 명시합니다. 계정·고객 자료의 사용 권한을 먼저 확인하세요. 파일 종류별 업로드와 워커 처리 결과는 이번 촬영에서 실행하지 않았습니다.'}
    ]
  },
  {
    slug:'reservations', category:'예약', title:'예약 작업 만들고 확인하기', description:'반복 요청의 이름·내용·일정·활성 상태를 설정합니다.',
    sections:[
      {id:'new',title:'새 예약 양식 열기',text:'왼쪽 예약 항목 옆 ＋를 선택합니다. 이름과 프롬프트를 입력한 뒤 일정 방식을 고릅니다.',image:'schedule-editor.png',alt:'실제 새 예약 설정 화면',caption:'저장 전의 예약 양식입니다. 실제 예약은 생성하지 않았습니다.'},
      {id:'schedule',title:'실행 일정 확인하기',text:'화면에는 Daily, Weekly, Monthly, Yearly, Minute interval, Cron Expression 방식이 있습니다. 실행 시간을 정하면 Canonical Cron 표현식이 표시됩니다. Enabled와 Dry run 상태를 확인한 뒤 저장합니다.'},
      {id:'review',title:'예약 다시 보기',text:'예약 목록에는 사용 여부와 다음 실행 시각이 표시됩니다. 기존 예약의 수정 버튼에서 설정을 확인할 수 있습니다. 시간대와 실행 결과는 예약 상세에서 다시 확인하세요.'}
    ]
  },
  {
    slug:'projects', category:'프로젝트', title:'프로젝트와 대화 연결하기', description:'프로젝트의 목적·지침·상태를 확인하고 관련 세션을 묶습니다.',
    sections:[
      {id:'create',title:'프로젝트 양식 확인하기',text:'왼쪽 프로젝트 옆 ＋를 선택합니다. 프로젝트 이름, 프로젝트 AGENTS.md 지침, 프로젝트 구분, 상태를 입력합니다. 프로젝트 구분은 목표달성·상시진행·기타, 상태는 진행·완료 항목이 보입니다.',image:'project-editor.png',alt:'실제 프로젝트 생성 화면',caption:'저장 전의 프로젝트 양식입니다. 이 문서 제작 중 새 프로젝트를 만들지 않았습니다.'},
      {id:'instruction',title:'지침 적용 범위 이해하기',text:'프로젝트 지침은 워커 전역 지침과 안전 경계 뒤에 적용되며, 이미 진행 중인 턴에는 소급되지 않습니다. 지침에 비밀번호나 API 키를 입력하지 않습니다.'},
      {id:'open',title:'프로젝트 대화 보기',text:'왼쪽 프로젝트 항목을 펼쳐 관련 세션을 확인합니다. 대시보드의 Projects 관점에서는 프로젝트별 세션·완료·오류 지표를 읽을 수 있습니다.'}
    ]
  },
  {
    slug:'workspace', category:'자료', title:'작업공간 탐색기 사용하기', description:'워커 작업공간의 폴더와 결과 파일을 찾아봅니다.',
    sections:[
      {id:'open',title:'탐색기 열기',text:'왼쪽 작업공간에서 작업공간 탐색기를 선택합니다. 오른쪽 패널에 현재 작업공간 경로와 콘텐츠 목록이 나타납니다.',image:'workspace-explorer.png',alt:'실제 작업공간 탐색기 패널',caption:'화면 촬영 시 콘텐츠를 불러오는 중이었습니다. 파일 목록의 완료 상태는 검증 전입니다.'},
      {id:'navigate',title:'목록 이동하기',text:'폴더를 선택해 하위 항목으로 이동하고 위로 버튼으로 상위 경로로 돌아갑니다. 새로고침은 현재 목록을 다시 읽습니다. 버튼이 비활성화된 동안에는 로딩 완료를 기다리세요.'},
      {id:'verify',title:'결과 확인하기',text:'워커가 파일을 만들었다면 응답에 나온 경로와 탐색기의 파일 이름을 대조합니다. 파일 생성·다운로드의 실제 성공은 이 샘플에서 아직 확인하지 않았습니다.'}
    ]
  },
  {
    slug:'wiki-explorer', category:'지식', title:'Wiki 탐색기로 문서 찾기', description:'Runtime Knowledge Wiki의 문서를 패널에서 탐색합니다.',
    sections:[
      {id:'open',title:'Wiki 탐색기 열기',text:'왼쪽 Wiki에서 Wiki 탐색기를 선택하면 오른쪽 콘텐츠 패널이 열립니다. 패널 제목과 기준 Wiki를 확인합니다.',image:'wiki-workbench.png',alt:'실제 Wiki 패널의 검색 항목',caption:'Wiki 워크벤치와 탐색기는 같은 오른쪽 작업 영역을 사용합니다.'},
      {id:'navigate',title:'문서 탐색하기',text:'목록의 폴더와 문서를 선택합니다. 내용을 불러오는 중이면 잠시 기다린 뒤 새로고침 상태를 확인하세요. 이번 촬영에서 문서 열기 결과까지는 확인하지 않았습니다.'}
    ]
  },
  {
    slug:'wiki-workbench', category:'지식', title:'Wiki 검색과 그래프 보기', description:'현재 Wiki revision을 검색하고 관계·통계 화면을 읽습니다.',
    sections:[
      {id:'search',title:'문장으로 Wiki 검색하기',text:'왼쪽 Wiki 워크벤치를 열고 검색 탭의 Wiki 검색어에 키워드를 입력합니다. 결과에는 승인된 revision과 content digest가 출처로 표시됩니다.',image:'wiki-workbench.png',alt:'실제 Wiki 워크벤치 검색 탭',caption:'검색 입력란과 추천 검색어 영역이 보이는 실제 화면입니다.'},
      {id:'graph',title:'그래프에서 관계 보기',text:'그래프 탭에는 연결되지 않은 문서만 보기, 불러온 노드 검색, 노드 찾기, 전체 맞춤, 보기 초기화, 움직임 일시정지가 있습니다. 그래프는 현재 로드한 범위의 관계를 보여 줍니다.',image:'wiki-graph.png',alt:'실제 Wiki 관계 그래프 화면',caption:'그래프 탭의 조작 버튼입니다.'},
      {id:'stats',title:'통계와 마이그레이션 구분하기',text:'통계 탭에는 노드 유형·엣지 유형·카테고리·로드 범위 내 참조 상위가 있습니다. 마이그레이션 탭은 기존 상태 이전을 위한 화면이며 일반 문서 검색 절차와 구분합니다.'}
    ]
  },
  {
    slug:'response-tools', category:'결과', title:'응답 원문과 정보 확인하기', description:'결과와 관련된 상세 화면으로 이동합니다.',
    sections:[
      {id:'open',title:'도구 영역 찾기',text:'왼쪽 도구 영역에서 응답 원문과 정보 열기를 찾습니다. 실제 콘솔에서 두 버튼이 표시되는 것을 확인했습니다.',image:'07-success.png',alt:'워커가 정상 완료된 실제 답변',caption:'결과를 먼저 확인한 뒤 필요한 상세 도구를 엽니다.'},
      {id:'read',title:'최종 답변과 상태 함께 읽기',text:'응답 원문은 처리 결과의 원문을 확인하는 진입점입니다. 정보 열기는 현재 작업에 대한 추가 정보를 확인하는 진입점입니다. 상세 화면의 항목은 이번 촬영에서 열어 검증하지 않았습니다.'}
    ]
  },
  {
    slug:'preferences', category:'설정', title:'언어와 화면 테마', description:'콘솔 상단의 언어와 테마 표시를 확인합니다.',
    sections:[
      {id:'language',title:'언어 선택하기',text:'콘솔 상단의 언어 메뉴에는 한국어와 English가 표시됩니다. 원하는 표시 언어를 선택한 뒤 메뉴와 안내 문구가 바뀌는지 확인하세요.',image:'preferences.png',alt:'실제 콘솔 상단의 언어와 테마 선택기',caption:'계정 정보가 보이지 않도록 선택기 부분만 잘랐습니다.'},
      {id:'theme',title:'화면 테마 선택하기',text:'테마 메뉴에는 시스템, 라이트, 다크가 표시됩니다. 선택 후 화면을 확인합니다. 선택값의 계정별 저장 여부는 이번 촬영에서 확인하지 않았습니다.'},
      {id:'account',title:'계정 메뉴',text:'상단에는 로그인 계정과 로그아웃이 표시됩니다. 공용 기기에서는 작업을 마친 뒤 로그아웃합니다.'}
    ]
  },
  {
    slug:'settings-map', category:'설정', title:'설정 메뉴와 상태 읽기', description:'열 가지 설정 탭의 목적과 저장·적용 상태를 구분합니다.',
    sections:[
      {id:'open',title:'설정 열기',text:'왼쪽 아래 계정 영역의 설정 열기를 선택합니다. 런타임, 어댑터, 환경 변수, 예약 설정, 플러그인, 커넥터, 스킬, 지식, 도구, 보안 탭이 있습니다.',image:'settings-overview.png',alt:'실제 워커 설정의 열 가지 탭',caption:'설정 전체 구조를 보여 주는 실제 콘솔입니다.'},
      {id:'runtime',title:'런타임: 작업 실행 조건',text:'워커 기반에서 작업 디렉터리·공통 지침·권한·실행 제한을 확인하고, 프로필과 현재 선택된 런타임을 구분합니다. 원격 요청, 업데이트, 프로세스 상태, 실행 파일 미리보기, 안전 경계는 각각 별도 카드입니다. 런타임 선택 버튼을 눌렀다면 현재 선택값을 다시 읽고 새 작업에 적용됐는지 확인해야 합니다.'},
      {id:'adapters',title:'어댑터: 모델과 인증',text:'어댑터 카드는 제공자별 로그인 또는 API 키와 모델 설정을 나누어 보여 줍니다. 사용 중, available, not configured, not logged in, 후보 상태를 서로 구분하세요. available은 실제 로그인이나 모델 호출 성공을 뜻하지 않습니다. 모델 선택을 바꾼 뒤에는 새 요청의 모델과 결과를 확인합니다.'},
      {id:'env',title:'환경 변수: 저장값과 실제 주입',text:'저장된 키 목록과 선택 어댑터에 실제로 적용되는 유효 환경 변수 목록을 따로 확인합니다. 비밀값은 다시 표시되지 않으며 교체 입력으로 다룹니다. 로컬 .env 가져오기는 키 미리보기 뒤 Merge 또는 Replace를 선택하므로, 적용 전에 어떤 키가 바뀌는지 확인하세요.'},
      {id:'timers',title:'예약 설정: 공통 정책',text:'이 탭은 모든 예약에 적용할 공통 지침과 최근 실행 결과 보존 한도를 다룹니다. 개별 예약의 이름·내용·일정·활성 상태는 왼쪽 예약 메뉴에서 관리합니다. 공통 정책을 저장했다면 다음 예약 실행에서 반영됐는지 결과로 확인합니다.'},
      {id:'plugins',title:'플러그인: 외부 채널',text:'Mattermost 카드는 채널 메시지 수신과 답장, 허용 범위, 대화 문맥을 다룹니다. Slack과 Discord가 미래 채널로 표시되면 사용 가능한 연동으로 해석하지 않습니다. 플러그인 카드가 보이는 것과 실제 메시지 왕복 성공은 별개입니다.'},
      {id:'connectors',title:'커넥터: 서비스 계정과 사용 범위',text:'연결 가능한 서비스를 고른 뒤 계정별 연결, 인증, 사용할 자료 범위, 워커·프로젝트·현재 대화의 배정을 확인합니다. 저장된 인스턴스가 보여도 인증과 리소스 검증이 끝나지 않으면 요청에서 사용할 수 없습니다. 현재 대화에 배정된 연결과 실제 호출 결과를 함께 확인하세요.'},
      {id:'skills',title:'스킬: 목록·공급원·활성 정책',text:'스킬 세트는 사용 가능한 절차의 목록, 공급원은 로컬 또는 저장소 출처, 주입 정책은 현재 워커에서 활성화할 절차를 다룹니다. 목록에 보이는 스킬이 자동으로 활성화되거나 모델에서 발견되는 것은 아닙니다. 활성 상태와 새 작업의 적용 결과를 구분해 확인합니다.'},
      {id:'knowledge',title:'지식: Wiki·문서·메모리·검색 순서',text:'Wiki/문서, 작업공간 문서, 메모리/감사, 인덱스 정책을 각각 엽니다. 인덱스 정책의 우선순위와 한도는 검색 대상 선택에 관한 설정입니다. 문서가 존재하는지, 검색 결과에 나타나는지, 실제 답변에 사용됐는지는 별도로 확인해야 합니다. 비활성화된 현재 세션 Knowledge Mode는 선택 가능한 기능으로 안내하지 않습니다.'},
      {id:'tools',title:'도구: 현재 상태와 설치 의도',text:'정규 상태는 설치됨·요청 중·실패 항목을 구분해 보여 줍니다. 설치 의도 기록은 버전과 검증 조건을 남기는 절차로, 도구 설치나 실행을 뜻하지 않습니다. record-only 또는 Not provided가 표시되면 해당 작업이나 정책을 사용 가능으로 해석하지 않습니다.'},
      {id:'security',title:'보안: 인증·경계·감사',text:'콘솔 인증, 자격증명·플러그인 비밀정보 정책, 시스템 상태, 작업공간 경계, 감사 항목을 읽습니다. ok, partial, degraded 같은 진단은 카드별 원인과 검사 시각을 함께 확인해야 합니다. 읽기 전용 설명 화면만으로 보안 규칙이 실제로 적용됐다고 판단하지 않습니다.'},
      {id:'verify',title:'설정이 적용됐는지 확인하기',text:'설정 화면의 표시 → 저장 결과 → 화면을 다시 열었을 때의 값 → 새 요청이나 예약의 실제 결과를 순서대로 확인합니다. 화면 표시만 확인한 항목은 실행 검증이 끝난 것으로 표시하지 않습니다. 현재 매뉴얼의 설정 화면은 2026년 10월 1일 worker00에서 확인했으며, 설정 저장·외부 연동·업데이트 실행은 이 문서 제작 중 수행하지 않았습니다.'},
      {id:'admin',title:'관리 권한이 필요한 항목',text:'설정에 보이는 항목과 실제 편집 권한은 계정·워커 정책에 따라 달라집니다. 자격증명, 런타임 권한, 업데이트 등 운영 설정의 필드별 절차와 구현 검증은 내부 운영 문서에서 관리합니다. 비밀값과 운영 상태는 공개 사용자 매뉴얼에 게시하지 않습니다.'}
    ]
  },
  {
    slug:'troubleshooting', category:'도움말', title:'진행이 멈추거나 결과가 차단될 때', description:'실행 상태·오류 메시지·세션 기록을 확인합니다.',
    sections:[
      {id:'status',title:'최종 상태 확인하기',text:'작업 진행중이 사라질 때까지 기다린 뒤 최종 답변과 Worker result 상태를 읽습니다. blocked 또는 failed이면 요청한 일이 완료되지 않았을 수 있습니다.',image:'04-blocked.png',alt:'실제 차단 결과 카드',caption:'첫 가상 회의 메모 요청에서 발생한 차단 응답입니다.'},
      {id:'details',title:'문의할 정보 모으기',text:'발생 시각, 작업한 세션, Task 식별자, 오류 메시지를 메모합니다. 비밀번호·토큰·비밀 환경 변수는 전달하지 않습니다.'},
      {id:'retry',title:'재실행 여부 판단하기',text:'외부 서비스에 글을 쓰거나 파일을 바꾼 요청은 실제 처리 여부를 확인한 뒤 다시 실행합니다. 이번 예제는 가상 텍스트 정리만 요청했고, 운영 담당자 확인 후 다시 실행해 정상 결과를 받았습니다.',image:'07-success.png',alt:'같은 예제를 재실행해 완료한 실제 답변',caption:'차단 화면과 정상 완료 화면을 구분해 확인합니다.'}
    ]
  },
  {
    slug:'changes', category:'버전', title:'버전과 변경 이력 확인하기', description:'현재 확인된 화면 기준과 제품 릴리스 이력을 구분합니다.',
    sections:[
      {id:'current',title:'현재 문서의 화면 기준',text:'이 문서의 캡처와 메뉴는 2026년 10월 1일 worker00 콘솔에서 확인했습니다. 콘솔에는 v0.1.0이 표시되지만 사용자용 정식 제품 릴리스 번호와의 대응은 아직 확정되지 않았습니다.'},
      {id:'docs',title:'문서 변경 이력',text:'2026년 10월 1일: 실제 요청·정상 결과·후속 요청·세션 검색 예제를 추가하고, 대시보드·예약·프로젝트·Wiki·설정 메뉴 안내를 확장했습니다. 이는 문서 제작 기록이며 제품 업데이트 기록은 아닙니다.'},
      {id:'release',title:'제품 변경 이력의 기준',text:'정식 릴리스마다 기능 변경 목록과 화면 캡처를 연결합니다. 제품 배포 식별자와 공개 버전명이 확정되면 이 페이지에서 버전별 변경사항과 해당 사용법으로 이동할 수 있게 갱신합니다.'}
    ]
  }
];

export function fullGuides(esc) {
  return guides.map(g=>({
    slug:g.slug,title:g.title,description:g.description,category:g.category,
    toc:g.sections.map(s=>[s.id,s.title]),
    body:fig=>g.sections.map((s,i)=>`<section id="${s.id}"><h2 class="step-title"><span class="step-number">${i+1}</span>${esc(s.title)}</h2><p>${esc(s.text)}</p>${s.image?fig(s.image,s.alt,s.caption):''}</section>`).join('')
  }));
}
