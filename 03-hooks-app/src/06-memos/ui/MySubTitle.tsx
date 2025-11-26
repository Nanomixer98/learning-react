import { memo } from 'react';

interface Props {
  subtitle: string;
  callMyAPI: () => void;
}

export const MySubTitle = memo(({ subtitle, callMyAPI }: Props) => {
  console.log('My sub-title re-render');

  return (
    <>
      <h5 className="text-2xl">{subtitle}</h5>

      <button
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        onClick={callMyAPI}
      >
        Call to function
      </button>
    </>
  );
});
