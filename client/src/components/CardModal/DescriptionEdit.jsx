import React, { useCallback, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'semantic-ui-react';

import styles from './DescriptionEdit.module.scss';

const DescriptionEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [values, setValues] = useState(Array(6).fill(''));

  const open = useCallback(() => {
    setIsOpened(true);
    setValues(defaultValue ? defaultValue.split('\n').slice(0, 6) : Array(6).fill(''));
  }, [defaultValue]);

  const close = useCallback(() => {
    const cleanValues = values.map(value => value.trim());
    const cleanValue = cleanValues.join('\n');

    if (cleanValue !== (defaultValue || '')) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
    setValues(Array(6).fill(''));
  }, [defaultValue, onUpdate, values]);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }), [open, close]);

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      close();
    }
  }, [close]);

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  const handleChange = useCallback((index, newValue) => {
    setValues(values => values.map((value, i) => i === index ? newValue : value));
  }, []);

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {values.map((value, index) => (
        <Input
          key={index}
          value={value}
          placeholder={t(`common.enterDescriptionPart${index + 1}`)}
          className={styles.field}
          onKeyDown={handleFieldKeyDown}
          onChange={(e) => handleChange(index, e.target.value)}
          fluid
        />
      ))}
      <div className={styles.controls}>
        <Button positive content={t('action.save')} />
      </div>
    </Form>
  );
});

DescriptionEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

DescriptionEdit.defaultProps = {
  defaultValue: undefined,
};

export default React.memo(DescriptionEdit);
