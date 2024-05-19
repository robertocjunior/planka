import React, { useCallback, useImperativeHandle, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'semantic-ui-react';

import styles from './DescriptionEdit.module.scss';

const DEFAULT_FIELDS = {
  VLR_TOTAL_DO_FRETE: 'VLR TOTAL DO FRETE',
  VLR_DO_FRETE_TON: 'VLR DO FRETE TON.',
  TOTAL_COMPRADO: 'TOTAL COMPRADO',
  TOTAL_RECEBIDO: 'TOTAL RECEBIDO',
  PESO_DE_ORIGEM: 'PESO DE ORIGEM',
  PESO_DE_CHEGADA: 'PESO DE CHEGADA',
};

const DescriptionEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [fields, setFields] = useState(() => {
    const initialFields = {};
    Object.keys(DEFAULT_FIELDS).forEach(key => {
      initialFields[key] = '';
    });
    return initialFields;
  });

  const open = useCallback(() => {
    setIsOpened(true);
    const newFields = { ...fields };
    if (defaultValue) {
      const values = defaultValue.split('\n');
      Object.keys(DEFAULT_FIELDS).forEach((key, index) => {
        newFields[key] = values[index] || '';
      });
    }
    setFields(newFields);
  }, [defaultValue, fields]);

  const close = useCallback(() => {
    const cleanValues = Object.values(fields).map(value => value.trim());
    const cleanValue = cleanValues.join('\n') || null;

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
    setFields(prevFields => {
      const resetFields = { ...prevFields };
      Object.keys(DEFAULT_FIELDS).forEach(key => {
        resetFields[key] = '';
      });
      return resetFields;
    });
  }, [defaultValue, onUpdate, fields]);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }), [open, close]);

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldChange = useCallback((e, { name, value }) => {
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  const renderInputFields = useMemo(() => {
    return Object.entries(DEFAULT_FIELDS).map(([key, label]) => (
      <Form.Field
        key={key}
        control={Input}
        name={key}
        label={label}
        value={fields[key]}
        onChange={handleFieldChange}
        className={styles.field}
      />
    ));
  }, [fields, handleFieldChange]);

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {renderInputFields}
      <Form.Field control={Button} positive content={t('action.save')} />
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
