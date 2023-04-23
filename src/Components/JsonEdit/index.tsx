import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { IJSONObject } from '../../types/types';

interface JSONTextAreaProps<T = IJSONObject> {
  value: T;
  rows?: number;
  cols?: number;
  onChange: (newValue: T) => void;
}

const JSONTextArea = <T extends IJSONObject>(props: JSONTextAreaProps<T>): React.ReactElement => {
  const { value, rows = 10, cols = 50, onChange } = props;
  const [isValidJSON, setIsValidJSON] = useState<boolean>(true);
  const [editValue, setEditValue] = useState<string>(JSON.stringify(value, null, 2));

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    try {
      JSON.parse(newValue);
      setIsValidJSON(true);
      onChange(JSON.parse(newValue));
      setEditValue(newValue);
    } catch (error) {
      setIsValidJSON(false);
      setEditValue(newValue);
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (isValidJSON) {
      const parsedJSON = JSON.parse(event.target.value);
      onChange(parsedJSON);
    }
  };

  return (
    <textarea
      className={classNames(styles.textarea, {
        [styles.invalid]: !isValidJSON,
      })}
      value={editValue}
      onChange={handleChange}
      onBlur={handleBlur}
      rows={rows}
      cols={cols}
      placeholder="輸入 JSON 格式的數據..."
    />
  );
};

export default JSONTextArea;
