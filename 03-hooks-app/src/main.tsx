import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { ProffessionalApp } from './09-useContext/ProffessionalApp';
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
    {/* <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1>Loading...</h1>
        </div>
      }
    >
      <ClientInfo getUser={getUserAction(1000)} />
    </Suspense> */}
    <ProffessionalApp />
  </StrictMode>
);
