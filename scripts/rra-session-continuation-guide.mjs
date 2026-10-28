const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const codeBlock = (id, label, value) => `<div class="prompt api-code"><div class="prompt-header"><span>${escapeHtml(label)}</span><button class="copy-button" data-copy="${id}" type="button">예제 복사</button></div><pre id="${id}">${escapeHtml(value)}</pre></div>`;

const firstRequest = `POST /api/v1/requests HTTP/1.1
Authorization: Bearer <대상 Worker에서 발급한 시험 RRA API Key>
Idempotency-Key: <첫 제출에 고정할 고유값>
Content-Type: application/json

{"prompt":"가상 회의 메모의 10월 5일·10월 7일 일정을 표로 정리해 주세요. 외부 도구나 파일은 사용하지 마세요.","waitSeconds":0}`;

const followUpRequest = `POST /api/v1/requests HTTP/1.1
Authorization: Bearer <첫 요청과 같은 RRA API Key>
Idempotency-Key: <첫 제출과 다른 새 고유값>
Content-Type: application/json

{"prompt":"앞의 두 일정을 기한순 체크리스트로 바꾸고 날짜는 유지해 주세요. 외부 도구나 파일은 사용하지 마세요.","waitSeconds":0,"sessionId":"<첫 결과에서 얻은 rsn-...>"}`;

const readback = `GET /api/v1/requests/<첫 requestId>/result
// 202: 아직 실행 중. terminal: true까지 같은 requestId로 재조회
// 200: state === "completed"와 sessionId를 읽어 저장

GET /api/v1/requests/<두 번째 requestId>/result
// 첫 요청과 다른 requestId, 같은 sessionId 확인

GET /api/v1/sessions/<첫 결과의 sessionId>
// 같은 Key로 user/assistant 메시지 두 쌍과 각 상태 확인`;

const workerExample = `// 같은 Console Chat에서 사용자가 대상 Worker로 두 번 질문하도록 명시한 경우
rra.targets({})
// Connector의 connectorId와 기존 outbound 세션을 확인합니다.

rra.preview({"connectorId":"<선택한 Connector ID>","prompt":"가상 회의 메모의 두 일정을 표로 정리해 주세요."})
// 응답의 outboundRequestId와 sessionAnchorId를 보관합니다.
// Console에서 사용자가 정확한 대상·내용을 확인하고 이 요청을 1회 승인합니다.
rra.status({"outboundRequestId":"<첫 outboundRequestId>"})
// 첫 요청의 최종 상태와 대상 대화 연결을 확인합니다.

rra.preview({"connectorId":"<같은 Connector ID>","sessionAnchorId":"<첫 응답의 ranch-...>","prompt":"앞의 두 일정을 기한순 체크리스트로 바꿔 주세요."})
// 새 outboundRequestId가 생깁니다. Console에서 이 요청도 별도로 1회 승인합니다.
rra.status({"outboundRequestId":"<두 번째 outboundRequestId>"})`;

export const rraSessionContinuationGuide = {
  slug: 'rra-session-continuation',
  title: 'RRA 세션 이어 대화하기',
  category: '개발자 연동',
  description: '외부 HTTP 호출과 개발 워커 협업에서 같은 원격 대화를 안전하게 이어 가는 규약·예제·검사 기준입니다.',
  verifiedAt: '2026.10.28',
  evidenceLabel: 'RRA v1 소스 계약 대조 / 운영 호출·화면 미촬영',
  noScreenshot: true,
  quick: {
    where: 'RRA가 켜진 시험 Worker와 같은 소유자의 시험 API Key 또는 설정된 Worker Connector',
    do: '첫 결과의 sessionId 또는 첫 미리보기의 sessionAnchorId를 저장해 후속 요청에 사용',
    check: '두 요청 ID는 다르고 대상 대화 ID는 같으며, 각각 최종 상태와 메시지를 확인',
  },
  toc: [
    ['version', '버전·전제 조건'], ['identities', '대화·요청 식별자'],
    ['http', 'HTTP 호출로 이어가기'], ['worker', '개발 워커에서 이어가기'],
    ['recover', '오류·전달 불명 복구'], ['verify', '완료 확인과 호환성'],
  ],
  body: () => `
    <div class="note capture-warning"><strong>소스 계약 기준 · 운영 수용 전</strong>2026.10.28 Worker 소스의 공개 RRA 라우트, 대화 서비스, 워커 간 협업 도구를 대조했습니다. 아래 값과 호출은 안전한 모의 예제이며 실제 운영 성공 기록이 아닙니다. API·도구 문서의 화면 캡처는 아직 확보하지 못했습니다.</div>
    <section id="version"><h2>버전과 전제 조건</h2><p>공개 RRA 경로 버전은 <strong><code>/api/v1</code></strong>입니다. 결과 스키마는 <code>standalone-worker-remote-request-status.v1</code>, 대화 스키마는 <code>standalone-worker-remote-request-conversation-session.v1</code>, 워커 간 협업 원장은 <code>standalone-worker-rra-collaboration.v1</code>입니다. 이 버전은 Worker 이미지 버전과 별개이며, 현재 버전 협상 엔드포인트는 없습니다. 전체 인증·첨부·오류 규약과 실행 가능한 Node.js 예제는 <a href="../rra-integration/">RRA v1 연동 개발자 가이드</a>에 있습니다.</p><p>외부 프로그램은 대상 Worker의 HTTPS 주소, 관리자가 켠 Remote Request API, 그 Worker가 발급한 시험 API Key가 필요합니다. 개발 워커는 관리자가 설정한 대상 HTTPS origin·Worker/instance ID·RRA 자격을 가진 <strong>Worker RRA Connector</strong>가 필요합니다. RRA는 일반 Console Chat 세션과 별도 대화 원장을 사용합니다.</p></section>
    <section id="identities"><h2>무엇을 이어받는가</h2><table><thead><tr><th>값</th><th>의미</th><th>후속 요청</th></tr></thead><tbody><tr><td><code>requestId</code> / <code>outboundRequestId</code></td><td>실행 요청 한 건의 조회·대조 ID</td><td>새 의미 요청마다 새로 생성</td></tr><tr><td><code>sessionId</code> (<code>rsn-...</code>)</td><td>대상 Worker가 소유하는 RRA 대화</td><td>같은 API Key의 후속 HTTP POST에 재사용</td></tr><tr><td><code>sessionAnchorId</code> (<code>ranch-...</code>)</td><td>호출 Worker의 Chat·Connector와 대상 대화를 묶는 로컬 ID</td><td>같은 Console Chat·Connector의 후속 <code>rra.preview</code>에 재사용</td></tr><tr><td><code>Idempotency-Key</code></td><td>한 HTTP 제출의 중복 방지</td><td>새 의미 요청에는 새 Key; 전송 결과가 불분명한 같은 제출에는 원래 Key</td></tr></tbody></table><p><strong>호출 측 anchor와 대상 sessionId를 바꿔 쓰지 않습니다.</strong> 개발 워커의 도구에는 대상 Key나 원격 <code>sessionId</code>를 직접 넣지 않습니다. 서버가 anchor에 보관한 대상 세션 연결을 사용합니다.</p></section>
    <section id="http"><h2>외부 HTTP 호출로 같은 대화 이어가기</h2><div class="rra-flow" role="img" aria-label="첫 POST에서는 sessionId를 생략하고 결과에서 저장한 뒤 같은 API Key와 새 멱등성 키로 두 번째 POST를 보내며 세션 상세에서 두 결과를 확인"><div><span>1 · 새 대화</span><strong>sessionId 생략</strong><small>새 Idempotency-Key<br>POST /api/v1/requests</small></div><div><span>2 · 첫 결과</span><strong>sessionId 저장</strong><small>requestId로 결과 조회<br>terminal·state 확인</small></div><div><span>3 · 후속 질문</span><strong>같은 Key·sessionId</strong><small>새 Idempotency-Key<br>새 requestId</small></div><div><span>4 · 대조</span><strong>대화 메시지 조회</strong><small>GET /api/v1/sessions/{id}<br>user/assistant 두 쌍</small></div></div><ol><li>첫 <code>POST /api/v1/requests</code>에는 <code>sessionId</code>를 보내지 않습니다. <code>Authorization: Bearer ...</code>와 <code>Idempotency-Key</code>는 필수입니다.</li><li><code>waitSeconds: 0</code>이면 보통 <code>202</code>를 받습니다. <strong>202 접수 응답에는 현재 <code>sessionId</code>가 없습니다.</strong> 응답의 <code>requestId</code>로 <code>GET /api/v1/requests/{requestId}/result</code>를 조회하고, 최종 결과에서 <code>sessionId</code>를 저장합니다. POST가 제한 시간 내 <code>200</code>으로 끝났다면 그 결과에서 읽습니다.</li><li>첫 결과의 <code>terminal: true</code>와 <code>state: completed</code>를 확인합니다. HTTP 200 자체는 업무 성공을 뜻하지 않습니다.</li><li>같은 API Key·<code>sessionId</code>와 <strong>새</strong> Idempotency-Key로 후속 질문을 보냅니다. 응답의 새 <code>requestId</code>로 결과를 조회합니다.</li><li><code>GET /api/v1/sessions/{sessionId}</code>에서 두 user/assistant 메시지 쌍을 확인합니다. 모델 맥락에는 완료된 이전 대화가 크기 제한 안에서 반영되므로 오래된 전체 대화가 무제한 들어가는 것은 아닙니다.</li></ol>${codeBlock('rra-session-first', 'HTTP · 첫 요청', firstRequest)}${codeBlock('rra-session-followup', 'HTTP · 후속 요청', followUpRequest)}${codeBlock('rra-session-readback', 'HTTP · 상태와 대화 대조', readback)}<p>요청 본문은 <code>prompt</code>, 선택적 <code>waitSeconds</code>·<code>sessionId</code>·<code>attachments</code>만 허용합니다. 모델·권한·실행 도구는 caller가 지정할 수 없습니다. 테스트에 실제 개인정보나 외부 파일을 넣지 마세요.</p></section>
    <section id="worker"><h2>개발 워커가 다른 워커와 이어 대화하기</h2><p>사용자가 원격 요청을 명시한 같은 Console Chat에서 <code>rra.targets({})</code>로 Connector와 기존 outbound 세션을 확인합니다. <code>rra.preview({connectorId,prompt})</code>는 전송하지 않는 미리보기이며 <code>outboundRequestId</code>와 <code>sessionAnchorId</code>를 반환합니다. 사용자가 Console에서 정확한 대상·내용을 <strong>1회 승인</strong>한 뒤 <code>rra.status({outboundRequestId})</code>로 첫 요청의 최종 상태를 읽습니다.</p><p>후속 요청에는 <strong>같은 Console Chat·같은 Connector·첫 <code>sessionAnchorId</code></strong>를 넣어 새 <code>rra.preview</code>를 만듭니다. 호출 Worker가 저장한 대상 <code>remoteSessionId</code>를 대상의 <code>sessionId</code>로 사용합니다. 새 미리보기와 별도의 사용자 승인 후 새 <code>outboundRequestId</code>를 조회합니다. 읽기 전용 대화에서는 <code>rra.preview</code>가 제공되지 않을 수 있습니다.</p>${codeBlock('rra-session-worker-example', '개발 워커 · 같은 원격 대화에서 두 번 질문', workerExample)}<p>개발 워커에게 참조 URL을 줄 때는 이 페이지의 고정 주소 <code>https://manual.workers.dreamlabs.co.kr/guide/rra-session-continuation/</code>를 사용합니다. 사용자 화면에서 승인하는 절차는 <a href="../remote-collaboration/">다른 워커에 요청하기</a>에 있습니다.</p></section>
    <section id="recover"><h2>오류와 전달 결과 불명 상태</h2><table><thead><tr><th>상태</th><th>안전한 조치</th></tr></thead><tbody><tr><td><code>409 REMOTE_SESSION_BUSY</code> / <code>RRA_REMOTE_SESSION_BUSY</code></td><td>같은 대화의 기존 활성 요청을 먼저 조회하고 최종 상태를 기다립니다.</td></tr><tr><td><code>409 REMOTE_IDEMPOTENCY_CONFLICT</code></td><td>같은 Key로 다른 본문을 보냈습니다. 원래 제출을 대조하고 새 의미 요청에만 새 Key를 씁니다.</td></tr><tr><td><code>404</code> 또는 anchor mismatch</td><td>같은 API Key·Chat·Connector인지 확인합니다. 다른 Key의 세션을 읽거나 잇지 않습니다.</td></tr><tr><td><code>delivery_uncertain</code></td><td>새 미리보기·재전송을 만들지 않고 원래 <code>outboundRequestId</code>를 <code>rra.status</code>로 대조합니다.</td></tr><tr><td><code>recovery_required</code> / 승인 만료</td><td>새 대화로 조용히 바꾸지 않습니다. 대상 세션·원래 요청의 상태를 확인하고 사용자 또는 관리자에게 선택을 요청합니다.</td></tr></tbody></table><p>HTTP 응답을 잃었다면 원래 Idempotency-Key와 동일 본문을 보존하고 기존 요청의 접수 여부를 먼저 확인합니다. 새 Key로 재제출하면 중복 실행될 수 있습니다. RRA 실행 저장소의 <code>503 REMOTE_REQUEST_EXECUTION_UNAVAILABLE</code>은 대상 이미지에 해당 복구 규약이 적용된 경우에만 기대하며, 대상의 실행 이미지와 <a href="../release-history/">버전별 적용 상태</a>를 먼저 확인합니다.</p></section>
    <section id="verify"><h2>완료 판정과 호환성</h2><p>최소 확인 기록은 대상 Worker 이미지·API/Connector 설정 revision·확인 시각, 비밀값을 가린 첫/두 번째 요청 ID, 첫/두 번째 최종 <code>state</code>, 동일한 대상 <code>sessionId</code>, 개발 워커라면 동일한 <code>sessionAnchorId</code>와 각 승인 시각입니다. <code>GET /api/v1/sessions/{sessionId}</code>로 실제 메시지 두 쌍을 대조해야 대화가 이어졌다고 판정합니다.</p><p>기존 v1의 <code>{"prompt":"...","waitSeconds":0}</code>는 새 대화로 계속 유효합니다. 후속 대화는 선택 필드 <code>sessionId</code>를 추가합니다. 이 문서의 확인일은 API 버전 변경이나 지정 워커 적용 완료를 뜻하지 않습니다. 제품별 변경과 적용 범위는 <a href="../release-history/">버전별 개선 이력</a>을 참고하세요.</p></section>`,
};
