import ChatApp from '@/components/ChatApp';
import { getMode } from '@/lib/server/config';
export const dynamic = 'force-dynamic';
export default function Home() { return <ChatApp mode={getMode()} />; }
