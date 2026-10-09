import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { fullGuides } from './full-guides.mjs';
import { testCases } from './test-cases.mjs';
import { latestGuides } from './latest-guides.mjs';
import { releaseHistoryGuide } from './release-history.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'guide');
const esc = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const prompt = `아래 가상 회의 메모를 정리해 주세요.
제공한 내용만 사용하고 도구 호출, 파일 저장, Wiki 수정, 외부 전송은 하지 마세요.

[가상 회의 메모]
- 새 고객 안내 페이지를 10월 8일에 공개하기로 했습니다.
- 디자인 담당은 10월 5일까지 화면 시안을 준비합니다.
- 개발 담당은 10월 7일까지 링크와 모바일 화면을 점검합니다.
- 고객 문의 이메일 주소는 아직 정하지 않았습니다.

결과 형식: ① 결정사항 ② 할 일(담당·기한 표) ③ 추가 확인사항.
간결하게 답해 주세요.`;
const followupPrompt = '위 할 일을 기한순 체크리스트로 바꿔 주세요. 결정사항과 미정 항목은 마지막에 따로 적어 주세요. 이 대화의 내용만 사용하고 도구 호출, 파일 저장, Wiki 수정, 외부 전송은 하지 마세요.';
const pages = [
 {slug:'new-session',title:'새 세션에서 요청 보내기',description:'새 대화를 열고, 원하는 작업과 결과 형식을 입력해 요청합니다.',category:'세션',toc:[['prepare','시작하기 전에'],['open','새 세션 열기'],['compose','요청 작성하기'],['send','보내고 상태 확인하기']],body:(fig)=>`
  <section id="prepare"><h2>시작하기 전에</h2><p>사용할 워커 콘솔에 로그인하세요. 이 예제는 실제 고객 자료 대신 가상의 회의 메모를 사용합니다.</p><div class="note"><strong>이번 예제에서 해 볼 일</strong>회의 메모를 결정사항·담당별 할 일·추가 확인사항으로 정리하도록 요청합니다. 파일이나 외부 서비스의 데이터를 변경하지 않습니다.</div></section>
  <section id="open"><h2 class="step-title"><span class="step-number">1</span>새 세션 열기</h2><p>현재 콘솔의 왼쪽 <strong>최근 세션</strong> 그룹 옆 <strong>새 세션</strong> 버튼을 선택합니다. 빈 대화 화면 아래에 요청 입력란이 나타납니다. 아래 캡처에는 10월 1일의 이전 메뉴가 보입니다.</p>${fig('01-new-session.png','이전 버전 새 세션 입력 화면','10월 1일 당시 새 세션의 입력란과 실행 프로필입니다.')}</section>
  <section id="compose"><h2 class="step-title"><span class="step-number">2</span>할 일과 원하는 결과를 입력하기</h2><p>입력란에 <strong>작업할 내용·참고자료·결과 형식</strong>을 함께 적습니다. 아래 예제를 복사해 사용해 보세요.</p><div class="prompt"><div class="prompt-header"><span>직접 실행해 볼 예제</span><button class="copy-button" data-copy="sample-prompt" type="button">예제 복사</button></div><pre id="sample-prompt">${esc(prompt)}</pre></div>${fig('02-compose.png','회의 메모 정리 요청을 실제로 입력한 화면','요청 입력 후 보내기 버튼(위쪽 화살표)이 활성화됩니다.')}<p>입력란 옆에는 <strong>모델·추론 강도·속도</strong>가 표시됩니다. 선택 가능한 항목은 워커 구성에 따라 다릅니다. 이번 촬영은 기본 선택을 유지했습니다.</p></section>
  <section id="send"><h2 class="step-title"><span class="step-number">3</span>보내기를 누르고 상태 확인하기</h2><p><strong>보내기(↑)</strong>를 선택합니다. 실행 중에는 입력란 위에 <strong>작업 진행중</strong>이 표시됩니다. 전송 직후 같은 요청을 반복해서 보내기보다 현재 상태를 먼저 확인하세요.</p>${fig('03-running.png','요청 전송 후 작업 진행중 표시','작업 진행중은 요청 처리 상태이며 결과 생성 성공을 뜻하지 않습니다.')}<div class="note"><strong>이 샘플의 실제 실행 결과</strong>첫 실행은 상태 파일 잠금으로 차단되었고, 운영 담당자 확인 후 재실행한 요청은 정상 완료되었습니다. 다음 문서에서 정상 응답과 차단 응답을 함께 확인합니다.</div></section>`},
 {slug:'task-status',title:'작업 상태와 결과 확인하기',description:'처리 중 표시와 최종 결과를 구분하고, 작업이 멈췄을 때 확인할 정보를 찾습니다.',category:'요청과 결과',toc:[['running','처리 중 상태'],['success','정상 결과 확인'],['final','차단 결과 확인'],['blocked','차단되었을 때']],body:(fig)=>`
  <section id="running"><h2 class="step-title"><span class="step-number">1</span>진행 상태 확인하기</h2><p>요청을 보내면 <strong>작업 진행중</strong> 표시가 나타납니다. 진행 중 표시와 최종 응답을 구분해 확인합니다.</p>${fig('03-running.png','작업 진행중 표시가 나타난 실제 화면','이 화면만으로 작업 완료 여부를 판단하지 않습니다.')}</section>
  <section id="success"><h2 class="step-title"><span class="step-number">2</span>정상 결과 확인하기</h2><p>워커가 답변을 마치면 <strong>최종 응답</strong>과 결과 상태가 표시됩니다. 이 예제에서는 회의 메모가 결정사항·담당/기한 표·추가 확인사항으로 정리되었습니다.</p>${fig('07-success.png','회의 메모가 표로 정리되고 정상 완료된 실제 응답','운영 담당자 확인 후 재실행한 요청: ok · turn completed · exit 0.')}<p>완료 표시와 함께 <strong>요청한 내용이 답변에 포함되었는지</strong>도 확인합니다. 예제의 담당·기한과 미정인 이메일 주소가 정확히 구분되어 있습니다.</p></section><section id="final"><h2 class="step-title"><span class="step-number">3</span>차단 결과 구분하기</h2><p>같은 예제의 첫 실행은 아래와 같이 <strong>Worker blocked</strong>로 종료되었습니다. 화면에 응답 카드가 나타났더라도 요청한 업무가 완료된 것은 아닙니다.</p>${fig('04-blocked.png','프로젝트 상태 파일 잠금 시간 초과로 차단된 실제 응답','실제 촬영 결과입니다. 성공 응답으로 재구성하거나 대체하지 않았습니다.')}<div class="result-list"><div class="result-item"><b>Objective: failed</b><span>요청한 목표가 완료되지 않음</span></div><div class="result-item"><b>Turn: blocked</b><span>작업이 차단된 상태로 종료</span></div><div class="result-item"><b>오류 메시지</b><span>상태 파일 잠금 대기 시간 초과</span></div></div></section>
  <section id="blocked"><h2 class="step-title"><span class="step-number">4</span>확인할 정보를 모아 문의하기</h2><p>오류 메시지, 발생 시각, 요청한 작업, 화면의 <strong>Task 식별자</strong>를 확인합니다. 계정 비밀번호나 API 키는 문의 내용에 넣지 않습니다.</p><ul><li>오류가 실행 환경 문제이면 워커 운영 담당자에게 확인을 요청합니다.</li><li>외부 전송이나 자료 수정 작업은 실제 처리 여부를 확인한 뒤 재실행 여부를 결정합니다.</li><li>이 예제는 첫 실행에서 차단되었고, 운영 담당자 확인 후 다시 실행해 정상 요약을 받았습니다.</li></ul><div class="note"><strong>저장된 세션에서 이어서 확인</strong>실패한 요청도 이번 촬영에서 세션 검색으로 다시 찾을 수 있었습니다. 다음 문서에서는 검색으로 해당 대화를 다시 엽니다.</div></section>`},
 {slug:'session-search',title:'이전 세션 찾아 다시 열기',description:'제목이나 메시지의 키워드로 저장된 대화를 찾고, 이전 요청과 결과를 다시 확인합니다.',category:'세션',toc:[['open-search','세션 검색 열기'],['keyword','키워드로 찾기'],['reopen','대화 다시 열기']],body:(fig)=>`
  <section id="open-search"><h2 class="step-title"><span class="step-number">1</span>세션 검색 열기</h2><p>현재 콘솔의 왼쪽 <strong>최근 세션</strong> 그룹 옆 <strong>검색</strong>을 선택합니다. 검색 창은 저장된 워커 채팅 세션의 제목과 메시지를 대상으로 합니다.</p></section>
  <section id="keyword"><h2 class="step-title"><span class="step-number">2</span>기억나는 문장으로 검색하기</h2><p>앞에서 입력한 요청의 일부인 <strong>아래 가상 회의 메모</strong>를 검색어로 입력하고 <strong>검색</strong>을 선택합니다.</p>${fig('05-session-search.png','가상 회의 메모 키워드로 샘플 세션을 찾은 실제 화면','첫 실행 직후 촬영한 검색 결과입니다. 당시 샘플 세션 1건·2개 메시지가 표시되었습니다.')}<p>결과에서 <strong>세션 제목·최근 시각·메시지 수·프로젝트 표시</strong>를 확인하고 원하는 대화를 고릅니다.</p></section>
  <section id="reopen"><h2 class="step-title"><span class="step-number">3</span>검색 결과를 선택해 대화 열기</h2><p>검색 결과를 선택하면 해당 세션의 이전 요청과 응답을 확인할 수 있습니다. 이번 예제에서는 저장된 요청과 차단 결과를 다시 확인했습니다.</p>${fig('06-reopened.png','검색 결과를 선택해 다시 연 샘플 대화','대화를 다시 여는 것과 작업을 재실행하는 것은 별개입니다.')}<div class="note"><strong>검색이 끝날 때까지 기다리세요</strong>“최근 세션을 불러오는 중입니다”가 표시되면 아직 결과를 읽고 있는 상태입니다. 로딩 중 화면을 최종 검색 결과로 판단하지 않습니다.</div></section>`}
];

pages.push({slug:'follow-up',title:'같은 세션에서 후속 요청하기',description:'앞에서 받은 결과를 바탕으로 형식이나 내용을 더 다듬습니다.',category:'요청과 결과',toc:[['context','기존 대화 확인'],['request','후속 요청 작성'],['result','바뀐 결과 확인']],body:(fig)=>`
  <section id="context"><h2 class="step-title"><span class="step-number">1</span>이어 갈 대화 확인하기</h2><p>앞에서 회의 메모를 정리한 세션을 그대로 사용합니다. 대화를 나갔다면 <strong>세션 검색</strong>으로 찾아 다시 엽니다. 후속 요청 전에 이전 응답이 완료되었는지 확인합니다.</p>${fig('07-success.png','후속 요청의 바탕이 되는 회의 메모 정리 결과','이전 답변에 있던 두 가지 할 일을 다시 정리해 봅니다.')}</section>
  <section id="request"><h2 class="step-title"><span class="step-number">2</span>바꾸고 싶은 부분 요청하기</h2><p>같은 입력란에 <strong>어떤 내용을 어떻게 바꿀지</strong> 적고 <strong>보내기(↑)</strong>를 선택합니다. 이번에는 담당·기한 표를 기한순 체크리스트로 바꿉니다.</p><div class="prompt"><div class="prompt-header"><span>같은 세션에서 실행할 예제</span><button class="copy-button" data-copy="followup-prompt" type="button">예제 복사</button></div><pre id="followup-prompt">${esc(followupPrompt)}</pre></div>${fig('08-followup-compose.png','앞선 응답 아래에 후속 요청을 입력한 실제 화면','새 세션을 만들지 않고 같은 대화에서 이어서 요청합니다.')}</section>
  <section id="result"><h2 class="step-title"><span class="step-number">3</span>요청한 형식으로 바뀌었는지 확인하기</h2><p>실제 응답에서 <strong>10월 5일 → 10월 7일</strong> 순으로 할 일이 정리되고, 결정사항과 미정 항목이 분리되었습니다. 결과 하단의 <strong>ok · turn completed · exit 0</strong>도 확인할 수 있습니다.</p>${fig('09-followup-result.png','같은 대화의 내용을 기한순 체크리스트로 바꾼 실제 최종 응답','후속 요청과 실제 결과를 함께 촬영했습니다.')}<div class="note"><strong>내용을 함께 점검하세요</strong>형식이 바뀌어도 담당자·기한·미정 사항이 원래 내용과 일치하는지 확인합니다. 이 예제는 대화 안의 문장을 정리하는 작업입니다.</div></section>`});
pages.push(...fullGuides(esc));
pages.push(...latestGuides);
pages.push(releaseHistoryGuide);

pages.push({
 slug:'skill-registry', title:'공식 스킬 찾고 설치하기', description:'적용 대상과 설치·활성화 상태를 확인한 뒤 필요한 스킬 하나만 설치합니다.', category:'설정',
 verifiedAt:'2026.10.09', evidenceLabel:'실행 이미지·소스 확인 / 화면 미촬영', noScreenshot:true,
 quick:{where:'설정 → 스킬 → 공식 스킬 레지스트리',do:'한 스킬의 버전·호환성을 확인하고 설치 미리보기와 확인 창 검토',check:'목록 재조회 뒤 설치·활성화·새 작업 적용을 각각 확인'},
 toc:[['scope','적용 대상'],['catalog','카탈로그 확인'],['install','선택 설치'],['enable','사용 활성화'],['status','상태와 오류 읽기'],['verify','계획 대비 확인']],
 body:()=>`
 <section id="scope"><h2 class="step-title"><span class="step-number">1</span>적용 대상 확인하기</h2><p>2026년 10월 9일 실행 이미지 기준 worker0과 worker00에 공식 스킬 레지스트리 소스가 포함됩니다. 콘솔의 <strong>설정 → 스킬</strong>에서 공식 레지스트리와 설치 버튼이 실제로 표시되는지 확인하세요.</p><div class="note"><strong>화면 검증 범위</strong>새 스킬 레지스트리 화면을 이 문서 작업에서 직접 열거나 촬영하지 못했습니다. 10월 1일의 구형 설정 메뉴 캡처는 최신 화면의 증거가 아니므로 이 페이지에 재사용하지 않습니다. 설치·주입 결과도 이번 배포에서 직접 실행하지 않았습니다.</div></section>
 <section id="catalog"><h2 class="step-title"><span class="step-number">2</span>공식 카탈로그 확인하기</h2><p><strong>설정 → 스킬</strong>에서 공식 스킬 레지스트리와 사용 가능한 스킬 목록을 엽니다. 관리자 계정에서 <strong>업데이트 확인</strong>을 누르면 현재 게시된 목록과 버전·호환성·설치 상태를 다시 확인합니다. 확인만으로 스킬이 다운로드되거나 활성화되지는 않습니다. 목록의 설명과 설치된 버전을 함께 읽으세요.</p></section>
 <section id="install"><h2 class="step-title"><span class="step-number">3</span>한 가지 스킬을 선택해 설치하기</h2><p>필요한 스킬 행의 <strong>설치</strong> 또는 <strong>업데이트</strong>를 선택합니다. 워커는 최신 카탈로그를 다시 확인하고 설치 미리보기 검사를 거친 뒤, 선택한 스킬 ID와 버전이 적힌 확인 창을 엽니다. 확인 후 완료 알림과 목록의 설치 상태를 다시 확인하세요. 취소하면 기존 스킬은 바뀌지 않아야 합니다. 관리자만 이 작업을 할 수 있습니다.</p></section>
 <section id="enable"><h2 class="step-title"><span class="step-number">4</span>실제 사용을 따로 활성화하기</h2><p><strong>설치 완료</strong>는 스킬 파일과 설치 기록이 있다는 뜻입니다. <strong>스킬 주입 정책</strong>에서 해당 스킬을 활성화하고, 새 요청에서 사용하는 어댑터에 투영되는지 확인해야 실제 사용 여부를 판단할 수 있습니다. 스킬 목록에 보이는 것, 활성화된 것, 새 요청에 적용된 것은 서로 다른 상태입니다.</p></section>
 <section id="status"><h2 class="step-title"><span class="step-number">5</span>상태와 오류 읽기</h2><p>공식 카탈로그에는 <strong>설치 안 됨</strong>, <strong>설치됨 · 활성화는 별도</strong>, <strong>설치됨 · 주입 불가</strong>, <strong>업데이트 가능</strong>, <strong>호환되지 않음</strong> 등이 표시될 수 있습니다. 주입 불가는 설치 기록과 실제 스킬 목록의 대조에 문제가 있다는 뜻입니다. 페이지 새로고침만으로 해결됐다고 판단하지 말고 차단 코드와 선택한 버전을 기록하세요. 활성화 여부는 별도의 <strong>주입 정책</strong>에서 확인하고, 새 요청에 실제 적용됐는지는 실행 결과로 확인합니다.</p></section>
 <section id="verify"><h2 class="step-title"><span class="step-number">6</span>계획대로 구현됐는지 확인하기</h2><p>계획된 순서는 <strong>목록 확인 → 한 스킬 선택 → 미리보기 → 명시적 확인 → 설치 결과 재조회 → 별도 활성화 → 새 요청에서 적용 확인</strong>입니다. 카탈로그의 다른 스킬까지 자동 설치되거나, 설치만으로 자동 활성화되면 계획과 다릅니다. 기능이 배포된 워커의 이미지와 건강 상태는 확인했지만, 기존 설치 스킬의 주입 목록 복구 및 새 요청 적용은 아직 검증 전입니다.</p></section>`
});

function shell(page,body,isHome=false){
 const prefix=isHome?'':'../';
 const groups=new Map();
 for(const p of pages){if(!groups.has(p.category)) groups.set(p.category,[]); groups.get(p.category).push(p);}
 const nav=[...groups].map(([category,items])=>`<div class="sidebar-group"><span class="sidebar-label">${esc(category)}</span>${items.map(p=>`<a href="${prefix}${p.slug}/" ${page?.slug===p.slug?'aria-current="page"':''}>${esc(p.title)}</a>`).join('')}</div>`).join('');
 const sourceLabel=page?(page.history?`배포 확인 ${page.verifiedAt}`:page.noScreenshot?`실행 이미지·소스 ${page.verifiedAt}`:page.slug==='changes'?'문서 이력 기준 2026.10.09':'과거 화면 2026.10.01'):'문서 기준 2026.10.09';
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page?.title??'워커 기능별 매뉴얼')} · 워커 매뉴얼</title><meta name="description" content="${esc(page?.description??'실제 워커 화면으로 따라 하는 기능별 사용법')} "><link rel="stylesheet" href="${prefix}manual.css"><script src="${prefix}manual.js" defer></script></head><body><a class="skip" href="#main">본문으로 이동</a><header class="topbar"><a class="brand" href="${prefix}index.html"><span class="brand-mark">W</span>워커 매뉴얼 <span>DreamLabs</span></a><nav class="top-links" aria-label="주요 메뉴"><a href="${prefix}index.html">기능별 사용법</a><a href="${prefix}release-history/">버전별 개선</a><span>${sourceLabel}</span></nav></header><div class="layout"><aside class="sidebar" aria-label="기능별 문서"><span class="sidebar-label">기능별 사용법</span>${nav}<hr><p>실제 워커 화면을 바탕으로 작성했습니다. 각 문서에서 실행 검증 범위를 확인하세요.</p><p>과거 캡처에는 v0.1.0이 표시됐습니다.<br>배포별 개선은 버전별 개선 이력에서 확인하세요.</p></aside><main class="page" id="main"><div class="page-inner">${body}</div></main></div><footer class="footer"><span>DreamLabs · 워커 사용자 매뉴얼</span><span>${sourceLabel}</span></footer><dialog id="screenshot-dialog" class="screenshot-dialog" aria-label="화면 캡처 확대"><div class="dialog-bar"><span data-image-title>화면 캡처</span><button type="button" data-close>닫기</button></div><img alt=""></dialog><span id="copy-status" class="sr-only" role="status"></span></body></html>`;
}

for(let i=0;i<pages.length;i++){
 const p=pages[i];
 const check=testCases[p.slug];
 if(!check) throw new Error(`Missing test case for ${p.slug}`);
 const fig=(name,alt,caption)=>`<figure class="figure"><div class="capture-archive">2026.10.01 과거 화면 · 최신 UI 증거 아님</div><button type="button" class="capture-button" data-capture aria-label="${esc(alt)} 확대"><img src="../../assets/screenshots/2026-10-01/${name}" alt="${esc(alt)}" loading="lazy"></button><figcaption><span>${esc(caption)}</span><span>선택하여 확대 ↗</span></figcaption></figure>`;
 const sameCategory=pages.filter(x=>x.slug!==p.slug && x.category===p.category);
 const other=sameCategory.length ? sameCategory.slice(0,3) : pages.filter(x=>x.slug!==p.slug).slice(0,2);
 const historyPage=p.history||p.slug==='changes';
 const testBlock=`<section id="test-case" class="test-case"><span class="eyebrow">${historyPage?'이력 대조':'따라 해 보는 기능 검사'}</span><h2>${historyPage?'이력과 실제 워커 대조하기':'이 화면을 직접 테스트하기'}</h2><p class="test-scope">${historyPage?'아래는 이력의 적용 범위와 실제 워커를 비교하는 절차입니다.':'아래는 독자가 실행할 검사 절차입니다. 이 페이지에 적힌 기대 결과는 이번 배포에서 통과했다는 뜻이 아닙니다.'}</p><h3>시작 조건</h3><p>${esc(check.setup)}</p><h3>실행 순서</h3><ol>${check.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><h3>통과 기준</h3><p>${esc(check.expected)}</p><h3>남길 증거</h3><p>${esc(check.evidence)}</p><div class="test-result"><strong>판정 기록</strong><span>통과 / 실패 / 차단 / 미실행 중 하나를 고르고 워커·확인 시각을 함께 적으세요.</span></div></section>`;
 const evidenceLabel=p.evidenceLabel??(p.slug==='changes'?'문서 이력 확인':'실제 화면 캡처');
 const verifiedAt=p.verifiedAt??(p.slug==='changes'?'2026.10.09':'2026.10.01');
 const imageNote=p.history?'이 페이지는 배포별 개선 내역과 확인 범위를 기록합니다.':p.noScreenshot?'최신 화면 캡처는 확인 전입니다.':p.slug==='changes'?'이 페이지는 문서 갱신을 기록합니다.':'2026.10.01 과거 캡처입니다. 최신 화면은 확인 전입니다.';
 const quick=p.quick?`<section class="quickstart" aria-label="이 기능 한눈에 보기"><h2>한눈에 따라하기</h2><div class="quickstart-grid"><div><span>1 · 화면 열기</span><p>${esc(p.quick.where)}</p></div><div><span>2 · 해볼 조작</span><p>${esc(p.quick.do)}</p></div><div><span>3 · 결과 확인</span><p>${esc(p.quick.check)}</p></div></div><p class="quickstart-status">${p.noScreenshot?'화면 미촬영 · 아래 메뉴 설명은 실행 이미지의 소스를 기준으로 작성했습니다.':'아래 실제 화면과 함께 확인하세요.'}</p></section>`:'';
 const mobileToc=`<nav class="mobile-toc" aria-label="이 페이지의 단계"><strong>바로 이동</strong><div>${p.toc.map(([id,label])=>`<a href="#${id}">${esc(label)}</a>`).join('')}<a href="#test-case">직접 테스트</a></div></nav>`;
 const evidenceBanner=!p.verifiedAt && p.slug!=='changes' ? '<div class="note capture-warning"><strong>최신 화면 재촬영 전</strong>이 페이지의 캡처와 클릭 결과는 2026년 10월 1일 worker00 기준입니다. 이후 좌측 탐색과 일부 설정 UI가 바뀌었습니다. 현재 배포의 화면 증거로 사용하지 말고, 실행 검사에서는 최신 메뉴와 실제 결과를 새로 기록하세요. <a href="../console-navigation/">새 탐색 메뉴 안내</a></div>' : '';
 const body=`<div class="breadcrumbs"><a href="../index.html">기능별 사용법</a> / ${esc(p.category)}</div><span class="eyebrow">FEATURE GUIDE · ${String(i+1).padStart(2,'0')}</span><h1>${esc(p.title)}</h1><p class="lead">${esc(p.description)}</p><div class="metadata"><b>${esc(evidenceLabel)}</b><span>확인일 ${esc(verifiedAt)}</span><span>읽기·검사 약 5분</span></div>${quick}${mobileToc}<div class="article-grid"><article class="article">${evidenceBanner}${p.body(fig)}${testBlock}<nav class="related" aria-label="관련 문서">${other.map(x=>`<a href="../${x.slug}/"><small>함께 볼 사용법</small>${esc(x.title)} →</a>`).join('')}</nav></article><aside class="toc" aria-label="이 페이지 목차"><strong>이 페이지에서</strong>${p.toc.map(([id,label])=>`<a href="#${id}">${esc(label)}</a>`).join('')}<a href="#test-case">직접 테스트하기</a><p>${imageNote}</p></aside></div>`;
 await mkdir(path.join(out,p.slug),{recursive:true});
 await writeFile(path.join(out,p.slug,'index.html'),shell(p,body),'utf8');
}
const categories=[...new Set(pages.map(p=>p.category))];
const catalog=categories.map((category,n)=>`<section class="catalog-section" id="category-${n+1}"><div class="catalog-heading"><h2>${esc(category)}</h2><a href="#main">맨 위로 ↑</a></div><div class="cards">${pages.filter(p=>p.category===category).map(p=>`<a class="feature-card" href="${p.slug}/"><span class="num">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="card-evidence">${p.history?'제품 배포 이력':p.noScreenshot?'최신 화면 미촬영':p.slug==='changes'?'문서 갱신 이력':'2026.10.01 과거 화면'}</span><span class="arrow">사용법·테스트 보기 →</span></a>`).join('')}</div></section>`).join('');
const home=`<div class="breadcrumbs">사용자 매뉴얼 / 기능별 사용법</div><span class="eyebrow">WORKER MANUAL · SCREEN &amp; TEST GUIDE</span><h1>워커 기능별 사용법</h1><p class="lead">하고 싶은 일을 고르면 화면 위치, 조작 순서, 기대 결과와 테스트 방법을 함께 볼 수 있습니다.</p><div class="metadata"><b>안내 문서 ${pages.length}개</b><span>페이지별 검사 ${Object.keys(testCases).length}개</span><span>2026.10.09 배포 확인</span></div><p class="release-home-link"><a href="release-history/">워커 버전별 개선 이력 보기 →</a></p><section class="start-here"><h2>처음이라면 여기서 시작하세요</h2><div class="start-grid"><a href="new-session/"><span>01</span><strong>요청 보내기</strong><small>가상 회의 메모로 첫 요청을 연습합니다.</small></a><a href="task-status/"><span>02</span><strong>결과 읽기</strong><small>진행 중·완료·차단을 구분합니다.</small></a><a href="session-search/"><span>03</span><strong>다시 찾기</strong><small>저장된 대화를 검색해 엽니다.</small></a></div><p>이 세 예제의 실제 화면은 2026년 10월 1일 촬영본입니다. 현재 메뉴 위치는 <a href="console-navigation/">새 탐색 메뉴 안내</a>에서 먼저 확인하세요.</p></section><nav class="category-jump" aria-label="기능 분류 바로 가기"><strong>기능 찾기</strong>${categories.map((category,n)=>`<a href="#category-${n+1}">${esc(category)}</a>`).join('')}</nav><div class="note capture-warning"><strong>최신 화면 캡처 확인 전</strong>10월 9일 worker0·worker00의 동일 실행 이미지와 소스를 확인했고 worker00 대시보드를 열었습니다. 스킬 정책, 워커 간 요청 및 업데이트의 세부 화면은 직접 촬영하거나 동작을 검증하지 못했습니다. 10월 1일 캡처는 날짜가 표시된 과거 사례이며 현재 화면 증거가 아닙니다. 신규 기능 페이지는 화면 미촬영 상태로 게시합니다.</div>${catalog}<div class="note"><strong>테스트 기록 기준</strong>각 페이지 끝의 절차를 실행할 때 워커 ID·이미지/콘솔 버전·확인 시각을 기록하세요. 실제 결과가 기준에 맞으면 「통과」, 다르면 「실패」, 권한·환경 문제로 끝까지 실행할 수 없으면 「차단」, 실행하지 않았으면 「미실행」입니다. 비밀값과 계정 정보는 공개 캡처에 넣지 않습니다.</div><div class="note"><strong>검증 상태</strong>가상 회의 메모의 요청·정상 결과·후속 요청·세션 검색은 10월 1일 worker00에서 직접 실행했습니다. 나머지 절차는 현재 배포에서 새로 실행해 통과시킨 결과가 아닙니다. 관리자 운영 설정과 전체 업데이트의 실제 적용 절차는 내부 운영 문서에서 관리합니다.</div>`;
await writeFile(path.join(out,'index.html'),shell(null,home,true),'utf8');
const rootHome=shell(null,home,true)
  .replaceAll('href="manual.css"','href="guide/manual.css"')
  .replaceAll('src="manual.js"','src="guide/manual.js"')
  .replace(/href="([a-z-]+)\/"/g,'href="guide/$1/"');
await writeFile(path.join(root,'index.html'),rootHome,'utf8');
console.log(`Generated ${pages.length+1} static guide pages.`);
