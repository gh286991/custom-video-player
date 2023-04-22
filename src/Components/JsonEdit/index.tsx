import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface JSONTextAreaProps {
  value: string;
  rows?: number;
  cols?: number;
  onChange: (newValue: string, isValid: boolean) => void;
}

const JSONTextArea: React.FC<JSONTextAreaProps> = ({
  value,
  rows = 10,
  cols = 50,
  onChange,
}) => {
  const [isValidJSON, setIsValidJSON] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    let valid = true;

    try {
      JSON.parse(newValue);
      setIsValidJSON(true);
    } catch (error) {
      valid = false;
      setIsValidJSON(false);
    }

    onChange(newValue, valid);
  };

  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (isValidJSON) {
      const parsedJSON = JSON.parse(event.target.value);
      const formattedJSON = JSON.stringify(parsedJSON, null, 2);
      onChange(formattedJSON, true);
    }
  };

  return (
    <textarea
      className={classNames(styles.textarea, {
        [styles.invalid]: !isValidJSON,
      })}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      rows={rows}
      cols={cols}
      placeholder="輸入 JSON 格式的數據..."
    />
  );
};

export default JSONTextArea;
