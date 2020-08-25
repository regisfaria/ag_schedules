import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Option {
  id: string | number;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Radio: React.FC<InputProps> = ({ name, options }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue(refs: HTMLInputElement[]) {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs: HTMLInputElement[], value) {
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {options.map((option, index) => (
        <label key={option.id}>
          <input
            ref={elRef =>
              (inputRefs.current[index] = elRef as HTMLInputElement)
            }
            type="radio"
            name={fieldName}
            value={option.id}
            defaultChecked={defaultValue === option.id}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio;
