const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const codeBlock = (id, label, value) => `<div class="prompt api-code"><div class="prompt-header"><span>${escapeHtml(label)}</span><button class="copy-button" data-copy="${id}" type="button">예제 복사</button></div><pre id="${id}">${escapeHtml(value)}</pre></div>`;

const firstRequest = `POST /api/v1/requests HTTP/1.1
Authorization: Bearer <관리자에게 발급받은 RRA API Key>
Idempotency-Key: <이 요청만의 고유한 값>
Content-Type: application/json

{
  "prompt": "가상 회의 메모: 디자인 시안은 10월 5일, 링크 점검은 10월 7일입니다. 두 일정을 표로 정리해 주세요. 외부 도구나 파일은 사용하지 마세요.",
  "waitSeconds": 0
}`;

const continuedRequest = `POST /api/v1/requests HTTP/1.1
Authorization: Bearer <첫 요청과 같은 RRA API Key>
Idempotency-Key: <첫 요청과 다른 새 고유값>
Content-Type: application/json

{
  "prompt": "앞에서 정리한 두 일정을 기한순 체크리스트로 바꾸고, 각 날짜를 그대로 유지해 주세요. 외부 도구나 파일은 사용하지 마세요.",
  "waitSeconds": 0,
  "sessionId": "<첫 요청의 상태 또는 결과에서 얻은 rsn-...>"
}`;

const nodeExample = `// Node.js 20+ · rra-continue.mjs · 시험용 가상 데이터만 사용
// 실행 전 WORKER_BASE_URL과 WORKER_RRA_KEY를 환경 변수로 설정하세요.
import { randomUUID } from "node:crypto";

const base = process.env.WORKER_BASE_URL?.replace(/\\/$/, "");
const key = process.env.WORKER_RRA_KEY;
if (!base || !key) throw new Error("WORKER_BASE_URL / WORKER_RRA_KEY가 필요합니다.");

async function api(method, path, body, idempotencyKey) {
  const headers = { Authorization: "Bearer " + key };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  const response = await fetch(base + path, {
    method, headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(response.status + " " + (result.code ?? "RRA_ERROR"));
  return result;
}

async function completedResult(requestId) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const result = await api("GET", "/api/v1/requests/" + requestId + "/result");
    if (result.terminal) return result;
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  throw new Error("대기 제한 도달: 기존 requestId로 상태를 다시 조회하세요.");
}

// 처음에는 sessionId를 보내지 않습니다. 서버가 새 RRA 대화를 만듭니다.
const first = await api("POST", "/api/v1/requests", {
  prompt: "가상 회의 메모: 디자인 시안은 10월 5일, 링크 점검은 10월 7일입니다. 두 일정을 표로 정리해 주세요. 외부 도구나 파일은 사용하지 마세요.",
  waitSeconds: 0,
}, randomUUID());
const firstResult = await completedResult(first.requestId);
if (firstResult.state !== "completed") throw new Error("첫 요청: " + firstResult.state);
const sessionId = firstResult.sessionId; // 202 응답에는 없으므로 결과에서 읽습니다.
if (!sessionId) throw new Error("sessionId가 없습니다. 서버 버전을 확인하세요.");

// 새 요청 ID와 새 Idempotency-Key를 사용하고 sessionId만 이어받습니다.
const second = await api("POST", "/api/v1/requests", {
  prompt: "앞에서 정리한 두 일정을 기한순 체크리스트로 바꾸고, 각 날짜를 그대로 유지해 주세요. 외부 도구나 파일은 사용하지 마세요.",
  waitSeconds: 0,
  sessionId,
}, randomUUID());
const secondResult = await completedResult(second.requestId);
const conversation = await api("GET", "/api/v1/sessions/" + sessionId);
console.log(JSON.stringify({
  sessionId,
  firstRequestId: first.requestId,
  secondRequestId: second.requestId,
  firstState: firstResult.state,
  secondState: secondResult.state,
  messages: conversation.messages.map(({ role, status, content }) => ({ role, status, content })),
}, null, 2));`;

const attachmentRequest = `POST /api/v1/attachments HTTP/1.1
Authorization: Bearer <RRA API Key>
Content-Type: application/json

{"fileName":"sample.txt","mimeType":"text/plain","contentBase64":"aGVsbG8=","size":5}

// 201 응답의 attachment.attachmentId를 다음 요청에 사용
{"prompt":"첨부한 시험 텍스트를 읽고 한 문장으로 요약해 주세요.","attachments":[{"attachmentId":"<att-...>"}]}`;

export const rraIntegrationGuide = {
  slug: 'rra-integration',
  title: 'RRA v1 연동 개발자 가이드',
  category: '개발자 연동',
  description: '인증·규약·요청/결과·첨부·오류와 같은 RRA 세션에서 대화를 이어가는 방법을 코드 예제로 확인합니다.',
  verifiedAt: '2026.10.21',
  evidenceLabel: 'RRA v1 구현 소스·계약 검사 대조 / 운영 호출 미실행',
  noScreenshot: true,
  quick: {
    where: '대상 Worker의 HTTPS 주소와 관리자가 발급한 RRA API Key',
    do: '첫 POST → 결과에서 sessionId 저장 → 같은 Key·새 Idempotency-Key로 다음 POST',
    check: '서로 다른 requestId, 같은 sessionId, 완료된 메시지 2쌍 확인',
  },
  toc: [
    ['scope','버전과 두 연동 방식'], ['flow','한눈에 보는 흐름'],
    ['contract','인증·HTTP 규약'], ['continuation','세션 이어가기'],
    ['example','실행 가능한 Node.js 예제'], ['attachments','첨부파일'],
    ['errors','상태·오류·재시도'], ['worker','개발 워커에서 호출하기'],
    ['compatibility','호환성과 확인 범위'],
  ],
  body: () => `
    <div class="note capture-warning"><strong>구현 계약 기준 · 운영 수용 전</strong>2026.10.21 Worker 소스의 RRA 라우트·입력 디코더·대화 저장소·계약 검사를 대조했습니다. 아래 요청/응답 예시는 실제 운영 워커 호출 기록이 아닙니다. 대상 워커에서 기능 사용 전 정확한 실행 이미지와 설정, 시험 결과를 확인하세요. 이 페이지는 HTTP 연동 문서라 새 Console 화면 캡처는 화면 미촬영 상태입니다.</div>
    <section id="scope"><h2>RRA v1과 연동 방식</h2><p><strong>RRA(Remote Request API)의 공개 경로 버전은 <code>/api/v1</code></strong>입니다. 저장 설정은 <code>standalone-worker-remote-request-api.v1</code>, 공개 요청 상태·결과는 <code>standalone-worker-remote-request-status.v1</code>, 대화 세션은 <code>standalone-worker-remote-request-conversation-session.v1</code>입니다. 이 숫자는 제품 이미지의 릴리스 번호나 콘솔의 <code>v0.1.0</code> 표기와 다릅니다. 현재 공개 API에 버전 협상 엔드포인트는 없습니다.</p><div class="rra-mode-grid"><div><strong>외부 프로그램 → Worker</strong><p>관리자가 발급한 RRA API Key로 HTTPS 요청을 보내고 <code>requestId</code>로 결과를 조회합니다. 이 페이지의 HTTP 예제가 해당합니다.</p></div><div><strong>Worker → 다른 Worker</strong><p>관리자가 설정한 Worker RRA Connector와 서버 제공 <code>rra.*</code> 도구를 사용합니다. Console의 사용자 1회 승인을 거쳐 전송합니다. 아래 <a href="#worker">개발 워커 절차</a>를 따릅니다.</p></div></div><p>RRA 세션은 일반 Console Chat 세션과 별도 원장입니다. RRA의 <code>sessionId</code>를 Chat 세션 ID로 사용하지 않습니다.</p></section>
    <section id="flow"><h2>같은 대화에서 두 번 요청하는 흐름</h2><div class="rra-flow" role="img" aria-label="새 요청은 세션 ID 없이 시작하고, 결과에서 세션 ID를 얻어 두 번째 새 요청에 전달하며 요청 ID와 멱등성 키는 매번 새로 생성"><div><span>1 · 시작</span><strong>새 Idempotency-Key</strong><small>POST /api/v1/requests<br>sessionId 생략</small></div><div><span>2 · 읽기</span><strong>requestId로 결과 조회</strong><small>GET /api/v1/requests/{id}/result<br>sessionId 저장</small></div><div><span>3 · 이어가기</span><strong>같은 Key · 같은 sessionId</strong><small>새 Idempotency-Key로 POST<br>새 requestId 생성</small></div><div><span>4 · 검증</span><strong>같은 세션의 메시지 확인</strong><small>GET /api/v1/sessions/{sessionId}<br>user/assistant 두 쌍</small></div></div><p><strong>요청 ID는 실행 한 건</strong>, <strong>세션 ID는 대화 한 줄기</strong>, <strong>Idempotency-Key는 같은 HTTP 제출의 중복 방지</strong>입니다. 세 값의 역할을 바꿔 쓰지 않습니다.</p></section>
    <section id="contract"><h2>인증과 HTTP 규약</h2><p>관리자가 대상 Worker에서 Remote Request API를 켜고 API Key를 발급해야 합니다. 기본 설정은 비활성입니다. 외부 호출에는 <code>Authorization: Bearer &lt;RRA API Key&gt;</code>가 필요하며, <strong>모든 새 요청 POST에는 <code>Idempotency-Key</code>가 필수</strong>입니다. HTTPS 주소와 Key는 서버별로 관리하고 문서·로그·스크린샷에 원문을 넣지 않습니다.</p><table><thead><tr><th>메서드·경로</th><th>용도</th><th>주요 결과</th></tr></thead><tbody><tr><td><code>POST /api/v1/requests</code></td><td>새 실행 또는 같은 대화의 후속 실행</td><td>즉시 <code>202</code>, 제한 시간 내 완료 시 <code>200</code></td></tr><tr><td><code>GET /api/v1/requests/{requestId}</code></td><td>상태·세션·메시지 ID 확인</td><td><code>200</code>, <code>terminal</code></td></tr><tr><td><code>GET /api/v1/requests/{requestId}/result</code></td><td>결과 폴링</td><td>진행 중 <code>202</code>, 최종 <code>200</code></td></tr><tr><td><code>GET /api/v1/sessions</code></td><td>현재 Key가 소유한 대화 목록</td><td><code>groups[].sessions[]</code></td></tr><tr><td><code>GET /api/v1/sessions/{sessionId}</code></td><td>대화 메시지 조회</td><td><code>messages[]</code></td></tr><tr><td><code>POST /api/v1/attachments</code></td><td>파일 사전 업로드</td><td><code>201</code>, <code>attachment.attachmentId</code></td></tr><tr><td><code>POST /api/v1/requests/{requestId}/cancel</code></td><td>현재 Key의 활성 요청 취소</td><td><code>202</code></td></tr></tbody></table><p>요청 JSON은 <code>prompt</code>(필수), <code>waitSeconds</code>(선택, 생략 시 0), <code>sessionId</code>(선택), <code>attachments</code>(선택, 최대 10개)만 허용합니다. 기본 설정은 <code>prompt</code> UTF-8 64 KiB, 응답 256 KiB, <code>waitSeconds</code> 최대 30초, 활성 원격 요청 1건, 실행 기록 7일 보관입니다. 관리자가 변경할 수 있으므로 대상 Worker의 현재 설정을 우선합니다. <code>waitSeconds</code>는 응답을 기다리는 시간이지 실행 제한이나 자동 취소 시간이 아닙니다. 콜백·웹훅은 v1에 없습니다.</p><p><code>workerId</code>, <code>adapterId</code>, 모델, 런타임, 권한, Wiki 접근 수준, 도구, 작업 디렉터리와 후속 요청 지시는 caller JSON에 넣을 수 없습니다. 권한과 실행 정책은 Worker가 결정합니다.</p></section>
    <section id="continuation"><h2>세션 이어가기: 요청과 응답 읽는 순서</h2><ol><li>첫 요청에서는 <code>sessionId</code>를 생략하고 각 제출에 고유한 <code>Idempotency-Key</code>를 보냅니다.</li><li>POST가 <code>202</code>이면 <code>requestId</code>와 <code>resultUrl</code>만 받습니다. <strong>현재 라우트 구현의 202 응답에는 <code>sessionId</code>가 없습니다.</strong> <code>GET /api/v1/requests/{requestId}</code> 또는 <code>.../result</code>에서 읽어 저장합니다. POST가 <code>200</code>으로 끝나면 응답에 <code>sessionId</code>가 있습니다.</li><li><code>GET .../result</code>를 <code>terminal: true</code>가 될 때까지 조회하고 <code>state</code>와 <code>response</code>를 읽습니다. HTTP 200만으로 성공이라 판단하지 않고 <code>state: completed</code>를 확인합니다.</li><li>후속 질문에는 <strong>첫 요청과 같은 API Key</strong>와 저장한 <code>sessionId</code>, <strong>새 Idempotency-Key</strong>를 함께 보냅니다. 결과의 <code>requestId</code>는 첫 요청과 달라야 합니다.</li><li><code>GET /api/v1/sessions/{sessionId}</code>에서 user/assistant 메시지를 확인합니다. 서버는 같은 Key·세션의 완료된 이전 대화만 제한된 크기로 맥락에 넣으므로 오래된 모든 메시지가 모델에 무한히 들어가지는 않습니다.</li></ol>${codeBlock('rra-first-request', 'HTTP · 새 대화 시작', firstRequest)}${codeBlock('rra-continued-request', 'HTTP · 같은 세션에서 후속 질문', continuedRequest)}<div class="note"><strong>202와 200의 차이</strong>POST <code>202</code>는 제출이 접수됐다는 뜻이며 결과가 아닙니다. <code>GET .../result</code>의 <code>202</code>도 계속 실행 중임을 뜻합니다. 최종 <code>200</code>에서는 <code>terminal: true</code>와 <code>state</code>를 읽고, 답변 요약은 <code>response.resultSummary</code>에서 확인합니다. 별도 세션 조회에는 저장된 메시지가 표시됩니다.</div></section>
    <section id="example"><h2>복사해 실행하는 Node.js 예제</h2><p>Node.js 20 이상에서 아래 내용을 <code>rra-continue.mjs</code>로 저장하고, 대상 Worker의 HTTPS origin을 <code>WORKER_BASE_URL</code>, 발급받은 비밀값을 <code>WORKER_RRA_KEY</code> 환경 변수로 넣어 실행합니다. 두 변수의 값은 저장소에 커밋하지 않습니다. 예제는 첫 결과가 완료될 때까지 기다린 뒤 동일한 세션으로 후속 질문을 보냅니다.</p>${codeBlock('rra-node-example', 'Node.js · 첫 요청 → 폴링 → 같은 세션에서 후속 요청', nodeExample)}<p>실서비스에서는 <strong>HTTP 전송 전에 Idempotency-Key를 로컬의 안전한 기록에 저장</strong>하고, 응답을 잃으면 같은 Key·같은 요청 본문으로만 재조회/재전송하세요. 새 의미의 후속 질문에는 새 Key가 필요합니다. 이 예제는 자동 재시도를 하지 않습니다.</p></section>
    <section id="attachments"><h2>첨부파일을 사용할 때</h2><p>요청 본문에 파일 원문을 넣지 않고 <code>POST /api/v1/attachments</code>로 먼저 업로드합니다. <code>fileName</code>, 허용 <code>mimeType</code>, 정규 Base64 <code>contentBase64</code>와 필요하면 원본 바이트 수 <code>size</code>를 보냅니다. 아래 <code>aGVsbG8=</code>는 안전한 샘플 문자열 <code>hello</code>의 Base64입니다. 응답의 <code>attachment.attachmentId</code>를 <code>attachments: [{"attachmentId":"..."}]</code>로 제출합니다. 업로드와 요청은 같은 API Key여야 하고, 이미 다른 요청에 묶인 첨부를 새 요청에 다시 사용하지 않습니다.</p>${codeBlock('rra-attachment-request', 'HTTP · 첨부 업로드와 참조 예시', attachmentRequest)}<p>허용 형식은 TXT/Markdown/CSV/JSON/PDF/PNG/JPEG/WebP입니다. MIME 유형과 확장자를 모두 검사하며 실제 크기 한도는 Worker의 현재 업로드 설정에 따릅니다.</p></section>
    <section id="errors"><h2>상태·오류·안전한 재시도</h2><table><thead><tr><th>응답</th><th>뜻과 조치</th></tr></thead><tbody><tr><td><code>200</code> + <code>terminal: true</code></td><td><code>state</code>가 <code>completed</code>인지, <code>blocked</code>/<code>failed</code>/<code>cancelled</code>인지 구분합니다. HTTP 성공이 업무 성공은 아닙니다.</td></tr><tr><td><code>400 REMOTE_REQUEST_INVALID</code></td><td>필수 필드·길이·ID 형식·허용되지 않은 필드를 고칩니다. 잘못된 Authorization 형식도 400이 될 수 있습니다.</td></tr><tr><td><code>401 REMOTE_API_KEY_INVALID</code> / <code>403 REMOTE_API_DISABLED</code> 등</td><td>Key 또는 API 활성·만료 상태를 관리자에게 확인합니다. Key를 URL이나 로그에 붙이지 않습니다.</td></tr><tr><td><code>404 REMOTE_REQUEST_NOT_FOUND</code></td><td>요청·세션·첨부가 없거나 현재 Key가 소유하지 않을 수 있습니다. 다른 Key의 세션 존재 여부는 드러나지 않습니다.</td></tr><tr><td><code>409 REMOTE_SESSION_BUSY</code></td><td>같은 세션에 활성 요청이 하나 있습니다. 기존 요청을 조회해 종료된 뒤 새 의미의 요청을 다시 결정합니다.</td></tr><tr><td><code>409 REMOTE_IDEMPOTENCY_CONFLICT</code></td><td>같은 Idempotency-Key에 다른 본문을 보냈습니다. 기존 요청을 확인하고 새 요청이라면 새 Key를 사용합니다.</td></tr><tr><td><code>429 REMOTE_INGRESS_SATURATED</code></td><td>Worker 수용량이 찼습니다. <code>Retry-After</code>를 따르고 원래 요청의 처리 여부를 먼저 확인합니다.</td></tr><tr><td><code>503 REMOTE_EXECUTION_DISABLED</code></td><td>대상 Worker의 실행이 꺼져 있습니다. 운영자 확인이 필요합니다.</td></tr></tbody></table><p>결과 상태는 <code>accepted</code>, <code>running</code>, <code>completed</code>, <code>blocked</code>, <code>failed</code>, <code>cancelled</code> 및 보존/복구 상황의 <code>expired</code>, <code>reconciliation_required</code>를 포함할 수 있습니다. 불확실한 전송에는 <strong>새 Idempotency-Key를 만들지 말고</strong> 같은 Key·같은 본문의 기존 제출인지 확인합니다. <code>reconciliation_required</code>는 결과 원장을 읽어 대조한 뒤 판단합니다. 모델이나 클라이언트가 임의의 자동 후속 실행을 만들지 않습니다.</p></section>
    <section id="worker"><h2>개발 워커가 다른 워커에 요청할 때</h2><p>Worker 내부 개발자/개발 워커의 협업은 이 HTTP 예제를 셸에서 직접 보내는 방식이 아니라 서버가 제공하는 <strong>Worker RRA Connector</strong>를 사용합니다. 관리자가 대상 URL·Worker 식별·쓰기 전용 자격을 설정해야 하며, 스킬 설치만으로 연결이 생기지 않습니다. <code>rra.targets</code>로 대상을 찾고, 사용자가 명시적으로 요청했을 때 <code>rra.preview</code>로 한 요청을 준비합니다. 실제 전송은 Console에서 사용자가 그 미리보기를 1회 승인한 뒤 이루어집니다. <code>rra.status</code>로 기존 보낸 요청을 조회합니다.</p><p>같은 대상 대화를 이어갈 때는 서버가 보유한 <strong>session anchor</strong>를 사용합니다. 후속 의미 요청은 새로운 outbound 요청 ID·멱등성 키·미리보기·승인을 갖고, 대상 측 <code>sessionId</code>만 이어갑니다. 승인 만료, <code>delivery_uncertain</code>, 대상 세션 분실에서 임의의 새 대화를 만들거나 중복 전송하지 않습니다. 사용자용 조작은 <a href="../remote-collaboration/">다른 워커에 요청하고 결과 이어받기</a>에 있습니다.</p></section>
    <section id="compatibility"><h2>호환성과 확인 범위</h2><p>기존 v1의 <code>{"prompt":"...","waitSeconds":0}</code> 본문은 계속 새 세션을 만드는 방식으로 유효합니다. <code>sessionId</code>와 <code>attachments</code>는 선택 필드입니다. 이전 설계 문서의 접수 응답 예시에는 세션 ID가 있으나, <strong>202 응답의 현재 구현은 <code>requestId</code>·<code>resultUrl</code> 중심</strong>입니다. 통합 코드는 POST 응답에 세션 ID가 즉시 있다고 가정하지 말고 상태/결과 조회로 얻어야 합니다.</p><p>이 페이지는 2026.10.21 소스 커밋의 라우트·입력 계약과 대화 서비스 및 기존 계약 검사를 기준으로 작성했습니다. 신규 운영 API 호출이나 새 Console 화면을 이번 문서 작업에서 실행·촬영하지 않았습니다. 실제 대상 Worker마다 실행 이미지, API 설정·Key 상태, 두 요청의 <code>requestId</code>/<code>sessionId</code>, 메시지와 결과를 검사해 기록하세요. 제품 이미지 변경 내역은 <a href="../release-history/">버전별 개선 이력</a>에서 확인합니다.</p></section>`,
};
