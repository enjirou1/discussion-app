import { useState } from 'react';

function useInput(defaultValue: string = ''): [string, (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(target.value);
  }

  return [value, handleValueChange, setValue];
}

export default useInput;