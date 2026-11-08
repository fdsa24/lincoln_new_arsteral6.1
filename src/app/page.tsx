import ChatApp from '@/components/ChatApp';
import { getLiveConfig, getMode, hasApiKey } from '@/lib/server/config';
export const dynamic = 'force-dynamic';
export default function Home() {
  const mode = getMode();
  const requiresCode = mode === 'live' ? Boolean(getLiveConfig().classroomCode) : false;
  return <ChatApp mode={mode} keyDetected={hasApiKey()} requiresCode={requiresCode} />;
}
