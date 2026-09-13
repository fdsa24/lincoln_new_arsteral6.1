import { expect, test } from '@playwright/test';
test('연습 모드 질문·새로고침·시점 이동·삭제', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'Lincoln History Lab'})).toBeVisible();
  await expect(page.getByLabel('링컨에게 질문하기')).toBeVisible();
  await page.getByLabel('링컨에게 질문하기').fill('해방 선언의 적용 범위를 알려주세요.');
  await page.getByRole('button',{name:'질문 보내기'}).click();
  await expect(page.getByText('고정 연습 예시',{exact:true})).toBeVisible();
  await expect(page.getByRole('link',{name:'전사문 출처 열기 ↗'})).toBeVisible();
  await page.reload();
  await expect(page.getByText('해방 선언의 적용 범위를 알려주세요.',{exact:true})).toBeVisible();
  await page.getByLabel('새 대화의 날짜').selectOption('1858-10');
  await page.getByRole('button',{name:'새 대화 만들기',exact:true}).click();
  await expect(page.getByRole('heading',{name:'1858.10.16 · 상원의원 선거',exact:true})).toBeVisible();
  await expect(page.getByText('해방 선언의 적용 범위를 알려주세요.',{exact:true})).toHaveCount(0);
  page.once('dialog',d=>d.accept()); await page.getByRole('button',{name:'대화 삭제',exact:true}).click();
  await expect(page.getByRole('heading',{name:'대화를 선택하거나 새로 만들어 주세요.'})).toBeVisible();
});
test('다른 브라우저 소유자의 대화는 API로도 조회 불가', async ({ page, browser }) => {
  await page.goto('/'); await expect(page.getByLabel('링컨에게 질문하기')).toBeVisible();
  const first = await page.request.get('/api/sessions'); const {sessions} = await first.json();
  const other = await browser.newContext(); const secondPage=await other.newPage();
  await secondPage.goto('/'); await expect(secondPage.getByLabel('링컨에게 질문하기')).toBeVisible();
  const denied=await other.request.get(`/api/sessions/${sessions[0].id}`); expect(denied.status()).toBe(404);
  await other.close();
});
