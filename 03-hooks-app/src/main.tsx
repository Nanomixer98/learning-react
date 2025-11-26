import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { getUserAction } from './08-use-suspense/api/get-user.action';
import { ClientInfo } from './08-use-suspense/ClientInfo';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}
    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1>Loading...</h1>
        </div>
      }
    >
      <ClientInfo getUser={getUserAction(1000)} />
    </Suspense>
  </StrictMode>
);
